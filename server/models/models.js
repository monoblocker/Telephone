const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Contact = sequelize.define('contacts',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    tel: {type: DataTypes.STRING, unique: true, allowNull: false}
});

module.exports = {
    Contact
}
