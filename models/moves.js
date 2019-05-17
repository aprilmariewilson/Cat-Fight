module.exports = function(sequelize, DataTypes) {
    var Moves = sequelize.define(
      "Moves",
      {
        move_name: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Move"
        },
  
        atk: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 10
        },
  
        def: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 10
        },
      },
      {
        timestamps: false
      }
    );
  
    return Moves;
  };