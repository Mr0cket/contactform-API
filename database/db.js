// import Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://millsy@localhost:5432/profile-db')


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