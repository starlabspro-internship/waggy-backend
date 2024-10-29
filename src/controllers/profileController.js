const { Profile, User } = require("../models");

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
      include: { model: User, as: "user" },
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single profile by ID

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id, {
      include: { model: User, as: "user" },
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a profile

const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByPk(req.params.id);
    if (profile) {
      await profile.update(req.body);
      res.json(profile);
    } else {
      res.status(404).json({ error: "Profile not found" });
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
      res.status(404).json({ error: "Profile not found" });
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
