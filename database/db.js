// import Sequelize
// use posgres to store contactForms

// Database URI: 'postgres://whujvxgbxzsscr:fa7ce7d4d751bbf1d0d84f4e8ad37cdf423e3ae4994217c632338dadd1e161c6@ec2-54-84-98-18.compute-1.amazonaws.com:5432/d9o8qq17rgdsqb'
// translated: {dialect: 'postgres', user: 'whujvxgbxzsscr' password: 'fa7ce7d4d751bbf1d0d84f4e8ad37cdf423e3ae4994217c632338dadd1e161c6', port: 5432 host: {domain: ec2-54-84-98-18.compute-1.amazonaws.com, endpoint: '/d9o8qq17rgdsqb'}}

const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://whujvxgbxzsscr:fa7ce7d4d751bbf1d0d84f4e8ad37cdf423e3ae4994217c632338dadd1e161c6@ec2-54-84-98-18.compute-1.amazonaws.com:5432/d9o8qq17rgdsqb')
/* const sequelize = new Sequelize('profile-db', 'whujvxgbxzsscr', 'fa7ce7d4d751bbf1d0d84f4e8ad37cdf423e3ae4994217c632338dadd1e161c6', {
        // gimme postgres, please!
        host: 'ec2-54-84-98-18.compute-1.amazonaws.com/d9o8qq17rgdsqb',
        port: 5432,
        dialect: 'postgres'
      }) */




// initialise postgres model ContactForm:
class ContactForm extends Model {}

ContactForm.init({
  name: {
          type: DataTypes.STRING,
          allowNull: false
  },
  email: {
          type: DataTypes.STRING,
          allowNull: true
  },
  message: {
          type: DataTypes.TEXT,
          allowNull: false
  }
}, { sequelize, modelName: 'contactForm' });

module.exports = { ContactForm, sequelize };