module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      bedroom: Number,
      bathroom: Number,
      parking: Number, // You can adjust the data type as needed
      images: [], // Assuming you want to store multiple images as an array
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the UserRole model
      },
      location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number], 
      },

      locationName:String
    },
    { timestamps: true }
  );


  const Property = mongoose.model("property", schema);
  return Property;
};
