const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite:jokes.sqlite');

class Joke extends Model {}

Joke.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Joke', // We need to choose the model name
  },
);

// the defined model is the class itself
//console.log(Joke === sequelize.models.Joke); // true

module.exports = Joke;