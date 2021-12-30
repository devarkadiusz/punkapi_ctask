module.exports = app => {
  const authController = require("../controllers/auth.controller.js");
  const favoritesController = require("../controllers/favorite.controller.js");

  var router = require("express").Router();

  // add
  router.put('/', authController.needToken, async (req, res) => {

    if (!(req.body.beerID)) {
      res.sendStatus(400);
      return;
    }

    const token = authController.getTokenByHeader(req.headers);

    let favorite = await favoritesController.get({ beerID: req.body.beerID });

    if (favorite === 500) {
      res.sendStatus(500);
      return;

    } else if (favorite.length > 0) {
      await favoritesController.delete({ accID: token.id, beerID: req.body.beerID });
      res.sendStatus(409);
      return;
    }

    res.sendStatus(await favoritesController.create({
      accID: token.id,
      beerID: req.body.beerID
    }));
  });

  // get all 
  router.get('/', authController.needToken, async (req, res) => {
    const token = authController.getTokenByHeader(req.headers);
    let favorites = await favoritesController.get({ accID: token.id });
    return res.json(favorites);
  });

  // delete one / more
  router.delete('/', authController.needToken, async (req, res) => {

    const token = authController.getTokenByHeader(req.headers);

    if(req.body.beerID == -1)
    {

      let favorites = await favoritesController.get({ accID: token.id });

      await favoritesController.delete({ accID: token.id });

      return res.json(favorites);

    } else if(req.body.beerID > 0)
    {
      let favorites = await favoritesController.get({ accID: token.id, beerID: req.body.beerID });
      await favoritesController.delete({ accID: token.id, beerID: req.body.beerID });
      return res.json(favorites);
    }

    else res.sendStatus(500);
      
  });

  app.use('/api/favorite', router);
};