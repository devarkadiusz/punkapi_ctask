const db = require("../models");
const Account = db.account;

exports.create = async (userData) => {
    try {
        const user = new Account(userData);
        await user.save();

        return user;
    } catch (err) {
        console.error(err);
        return 500;
    }

}

exports.get = async (query, cols = [], options = {}) => {
    try {
        return await Account.find(query, cols, options);
    } catch (err) {
        console.error(err);
        return 500;
    }
}

exports.getById = async (id) => {
    try {
        return await Account.findById(id);
    } catch (err) {
        console.error(err);
        return 500;
    }
}

exports.update = async (id, userData) => {
    try {
        await Account.findByIdAndUpdate(id, userData);

        return 201;
    } catch (err) {
        console.error(err);
        return 500;
    }
}

exports.delete = async (query) => {
    try {
        await Account.deleteMany(query);
        return 200;
    } catch (err) {
        console.error(err);
        return 500;
    }
}