// import Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://millsy@localhost:5432/')
const sequelize = new Sequelize('profile-db', 'millsy', null, {
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