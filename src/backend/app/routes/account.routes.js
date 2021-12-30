module.exports = app => {
  const authController = require("../controllers/auth.controller.js");
  const accountController = require("../controllers/account.controller.js");

  var router = require("express").Router();

  // create
  router.post('/register', async (req, res) => {

    if (!(req.body.username && req.body.password && req.body.email)) {
      res.sendStatus(400);
      return;
    }

    let user = await accountController.get({ username: req.body.username });
    if (user === 500) {
      res.sendStatus(500);
      return;
    } else if (user.length > 0) {
      res.sendStatus(409);
      return;
    }

    user = await accountController.get({ email: req.body.email });
    if (user === 500) {
      res.sendStatus(500);
      return;
    } else if (user.length > 0) {
      res.sendStatus(409);
      return;
    }

    const hash = authController.passHash(req.body.password);

    await accountController.create({
      username: req.body.username,
      password: hash,
      email: req.body.email
    });

    user = (await accountController.get({ username: req.body.username }))[0];

    user.token = authController.getToken(user._id);

    try {
      await accountController.update(user._id, user);
      return res.json(user);

    } catch (err) {
      res.sendStatus(500);
      console.error(err);
      return;
    }

    res.status(201).json(user);
  });

  // auth user
  router.post('/login', async (req, res) => {
    if (!(req.body.password && req.body.username)) {
      res.sendStatus(400);
      return;
    }

    const user = (await accountController.get({ username: req.body.username }))[0];

    if (!user) {
      res.sendStatus(404);
      return;
    }

    if (authController.compairHash(req.body.password, user.password)) {
      user.token = authController.getToken(user._id);

      try {
        await accountController.update(user._id, user);
        return res.json(user);

      } catch (err) {
        res.sendStatus(500);
        return;

      }
    } else {
      res.sendStatus(401);
      return;
    }
  });

  // get token
  router.post('/token', async (req, res) => {
    if (!req.body.id) {
      res.sendStatus(400);
      return;
    }

    const user = (await accountController.get({ _id: req.body.id }))[0];
    res.json({ token: authController.getToken(user._id) });
  });

  // update
  router.put('/', authController.needToken, async (req, res) => {
    const token = authController.getTokenByHeader(req.headers);
    res.sendStatus(await accountController.update(token.id, req.body));
  });

  // delete
  router.delete('/', authController.needToken, async (req, res) => {
    res.sendStatus(await accountController.delete(req.query));
  });

  app.use('/api/', router);
};