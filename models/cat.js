module.exports = function(sequelize, DataTypes) {
  var Cat = sequelize.define(
    "Cat",
    {
      name: {
        type: DataTypes.STRING
      },
      hp: {
        type: DataTypes.INTEGER
      },
      atk: {
        type: DataTypes.INTEGER
      },
      def: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );
  return Cat;
};
