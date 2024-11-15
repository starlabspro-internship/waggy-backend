const { Profile, User } = require('../models');

// Create a new profile
const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all Profiles

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: { model: User, as: 'user' },
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single profile by ID

const getProfileById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { model: Profile, as: 'profile' },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a profile

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Profile,
        as: 'profile',
      },
    });

    if (user) {
      await user.update({
        email: req.body.emailaddress,
      });
      await user.profile.update({
        firstName: req.body.name,
        lastName: req.body.lastname,
        organisationName: req.body.organisationName,
        address: req.body.emailaddress,
        phoneNumber: req.body.phonenumber,
        address: req.body.location,
        profilePicture: req.body.profilePicture,
      });
      await user.save();

      const responseData = {
        userId: user.id,
        email: user.email,
        profile: {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          organisationName: user.profile.organisationName,
          phoneNumber: user.profile.phoneNumber,
          address: user.profile.address,
          profilePicture: user.profile.profilePicture,
        },
      };

      if (req.file) {
        user.profile.profilePicture = `/uploads/${req.file.filename}`;
        await user.profile.save(); // Save the file path or URL as needed
      }

      res.json(responseData);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      await profile.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export profile contollers
module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
