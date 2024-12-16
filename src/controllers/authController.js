const { User, Profile } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// To send the confirmation email
const sendEmail = require("../services/emailService");
const generateWelcomeEmail = require("../template/confirmationEmailTemplate");
const { registrationSchema } = require("../validators/userValidator"); // Import the schema

// Registration function
exports.registerUser = async (req, res) => {
  const { email, password, firstName, lastName, organisationName } = req.body;
  // Validate the incoming request data
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create User
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Create Profile
    const newProfile = await Profile.create({
      firstName: organisationName ? null : firstName,
      lastName: organisationName ? null : lastName,
      organisationName: organisationName || null,
      userId: newUser.id,
    });

    // Generate tokens for the newly created user
    const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    // Generate and store the refresh token
    const refreshToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    try {
      await User.update({ refreshToken }, { where: { id: newUser.id } });
      console.log("Refresh token updated successfully.");
    } catch (updateError) {
      console.error("Error updating refresh token:", updateError);
    }

    // Send email to the user after creating account
    if (newUser) {
      const emailContent = generateWelcomeEmail(newUser);
      sendEmail(
        newUser.email,
        `Hi ${
          newProfile.organisationName || newProfile.firstName
        }, Welcome to Waggy!`,
        emailContent
      );
    }

    console.log(accessToken);

    // Respond with tokens and user information
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
      token: accessToken,
      refreshToken: refreshToken, // Include refresh token in the response
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login function
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate new access token
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    // Use existing refresh token
    const refreshToken = user.refreshToken; // Use the refresh token stored in the database
 
    res.json({ userId: user.id, accessToken, refreshToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

// Refresh token function remains unchanged
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body; // Get refresh token from the request body

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
  
    if (!user || user.refreshToken !== refreshToken) {
      return res.sendStatus(403); // Forbidden
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });
    res.json({accessToken: newAccessToken, refreshToken });
  } catch (error) {
    
    res.sendStatus(403); // Forbidden
  }
};
