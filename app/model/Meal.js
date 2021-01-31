const { Sequelize, sequelize } = require('../bootstrap/database')

// Meal 모델 정의
const Meal = sequelize.define('Meal', {
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  meal: {
    type: Sequelize.TEXT,
    allowNull: false,
  }, 
}, {
  freezeTableName: true,
  charset: 'utf8mb4'
})

module.exports = {
  Meal,
  init: () => {
    return Meal.sync({ force: true });
  },
};
