// import Sequelize
// use posgres to store contactForms
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('profile-db', 'millsy', '1234', {
        // gimme postgres, please!
        dialect: 'postgres'
      })

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