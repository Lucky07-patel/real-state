module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      email: {
        type: String,
        unique: true, // Ensure email is unique
        required: true, // Make the email field required
      },
    password: String,
    firstName: String,
    lastName: String,
    username: String,
    mobile: String,
    documents: {
    aadhaar: String,
    pancard: String,
    drivingLicence: String,
  },
    images: [String], // Assuming you want to store multiple images as an array
    weeklyBudget: Number,
    vehicle: String,
    salary: Number,
    status: String,
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', // Reference to the UserRole model
  },
    },
    { timestamps: true }
  );

  const User = mongoose.model("user", schema);
  return User;
};
