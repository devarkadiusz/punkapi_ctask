const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getToken = (id) => {
    const exp = Date.now() + 900000; // exp 15min

    try {
        return jwt.sign({id, exp}, process.env.TOKEN_KEY);

    } catch (err) {
        console.error(err);
        return null;
    }
}

exports.decodeToken = (token) => {
    try {
        return jwt.decode(token);

    } catch (err) {
        console.error(err);
        return null;
    }
}

exports.passHash = (pass) => {
    try {
        return bcrypt.hashSync(pass, 10);

    } catch (err) {
        console.error(err);
        return null;
    }
}

exports.compairHash = (plain, hash) => {
    try {
        return bcrypt.compareSync(plain, hash);

    } catch(err) {
        console.error(err);
        return false;
    }
}

exports.needToken = (req, res, next) => {
    const token = this.decodeToken(req.headers['authorization'].split(' ')[1]);

    if (!token || token.exp < Date.now()) {
        res.sendStatus(401);
        return;
    }

    next();
}

exports.getTokenByHeader = (headers) => {
    return this.decodeToken(headers['authorization'].split(' ')[1]);
}