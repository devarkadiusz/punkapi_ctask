const db = require("../models");
const Favorite = db.favorites;

exports.create = async (data) => {
    try {
        const favorite = new Favorite(data);
        await favorite.save();
        return 201;

    } catch (err) {
        console.error(err);
        return 500;
    }

}

exports.get = async (query, cols = [], options = {}) => {
    try {
        return await Favorite.find(query, cols, options);

    } catch (err) {
        console.error(err);
        return 500;
    }
}

exports.getById = async (id) => {
    try {
        return await Favorite.findById(id);

    } catch (err) {
        console.error(err);
        return 500;
    }
}

exports.update = async (id, data) => {
    try {
        await Favorite.findByIdAndUpdate(id, data);
        return 201;

    } catch (err) {
        console.error(err);
        return 500;
    }
}

exports.delete = async (query) => {
    try {
        await Favorite.deleteMany(query);
        return 200;
        
    } catch (err) {
        console.error(err);
        return 500;
    }
}