Installed modules:

npm install express 
- JavaScript Backend Server

npm install sequelize
- Sequelize: This is an ORM (Object-Relational Mapper) for Node.js. It lets you interact with your database  MySQL using JavaScript, without writing raw SQL queries.


npm install  mysql2 
- This is a database driver that allows Node.js to connect to MySQL databases.

npm install sequelize-cli
-  This is a command-line tool for Sequelize. It helps automate tasks like creating models, migrations, and seeders directly from the terminal.


<!-- Example on how to create a model using sequelize-cli -->
npx sequelize-cli model:generate --name User --attributes email:string,password:string,resetPassword:string,resetPasswordExpires:date

npx sequelize-cli model:generate --name Pets --attributes species:string,name:string,age:integer,description:text,gender

PS: after this command we need to add relationships of the model to the database with other models

npx sequelize-cli db:migrate

PS: this command will migrate

npx sequelize-cli seed:generate --name demo-user

PS: this command will generate a seeder for the model 

// seeders/{timestamp}-demo-user.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'demo@example.com',
      password: 'password',  // Note: Hash your passwords in a real app
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

npx sequelize-cli db:seed:all

PS: This command will create and run seeds

npx sequelize-cli model:generate --name Pets --attributes species:string,name:string,age:integer,description:text,gender:enum:Male,Female,petPicture:string,score:integer,interests:json,breed:string,userId:integer

npx sequelize-cli model:generate --name Pets --attributes species:string,name:string,age:integer,description:text,gender:string,petPicture:string,score:integer,interests:json,breed:string,userId:integer
