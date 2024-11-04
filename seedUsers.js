const { User } = require('./src/models'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash('testPassword123', 10); // Hash the password

    await User.create({
      email: 'natyra.arifi@hotmail.com',
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    console.log('Test user created successfully!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1); // Exit with error
  }
};

seedUsers();

