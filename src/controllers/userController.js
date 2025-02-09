const { User, Profile } = require('../models');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Profile, as: 'profile' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single user by ID / inlcuding profile
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password', 'refreshToken'] }, // Exclude sensitive fields
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: [
            'firstName',
            'lastName',
            'organisationName',
            'profilePicture',
          ], // Specify profile attributes
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // Handle user not found
    }

    res.json(user); // Respond with user data
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Consistent error response
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
