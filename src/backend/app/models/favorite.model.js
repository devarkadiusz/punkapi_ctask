module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        accID: String,
        beerID: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Favorite = mongoose.model("favorite", schema);
    return Favorite;
  };