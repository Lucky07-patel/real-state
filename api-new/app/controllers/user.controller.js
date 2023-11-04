const db = require("../models");
const Tutorial = db.user;
const User = db.user;
const Role = db.role
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.create = async (req, res) => {
  try {
    const { firstName, password, email, role,lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Check if the specified role is valid
    const validRoles = await Role.findOne({role})
    if (!validRoles) {
      return res.status(400).json({ error: 'No Role found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ email:email, password: hashedPassword, firstName:firstName, roleId:validRoles._id,lastName:lastName });

    await newUser.save(); // Save the user to the database
    res.send({
      status:200,
      message:"User Register Succesfully",
      data:newUser
    })
  } catch (error) {
    console.error(error);
    res.status(500).send(
      { 
        message: 'An error occurred during registration' ,
        error :error
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create a JWT token with the user's data
    const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', {
      expiresIn: '1y', // Token expiration time
    });

    res.status(200).json({
      message: 'Login successful',
      user: user,
      token: token, // Send the token in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'An error occurred during registration',
      error: error,
    });
  }
};


exports.createRole = async(req, res) => {

  try {
    const { role, slug } = req.body;
    //  throw 'Author and book already exits'

    if (!role || !slug) {
      return res.status(400).json({ error: 'Both role and slug are required' });
    }
    const newUser = new Role({ role:role, slug: slug });
    await newUser.save(); // Save the user to the database
    res.json({ message: 'Role create successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during create' });
  }
};

// Step 1: Generate and store a reset token for the user
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique reset token, set it in the user document, and send a reset email
    const resetToken = generateUniqueToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    res.status(200).json({ message: 'Password reset email sent',
      data:user,
      token :resetToken 
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during password reset request' });
  }
};
// Step 2: Handle the password reset link and update the password

exports.updatePassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Validate and hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and remove the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during password reset' });
  }
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
