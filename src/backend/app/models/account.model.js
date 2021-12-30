module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        token: String,
        username: String,
        password: String,
        email: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Favorite = mongoose.model("account", schema);
    return Favorite;
  };