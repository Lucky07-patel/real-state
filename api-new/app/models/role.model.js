module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      role: String, // Example values: 'landlord' or 'tenant'
      slug :String
    },
    { timestamps: true }
  );


  const Role = mongoose.model("role", schema);
  return Role;
};
