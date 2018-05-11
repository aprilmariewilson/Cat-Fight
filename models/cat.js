module.exports = function (sequelize, DataTypes) {


    var Cat = sequelize.define("Cat",
        {
					
            cat_name: {
								type: DataTypes.STRING,
								allowNull: false,
								defaultValue: 'Cat'
            },

            hp: {
								type: DataTypes.INTEGER,
								allowNull: false,
								defaultValue: 100
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
						
						model: {
							type: DataTypes.INTEGER,
							allowNull: false,
							defaultValue: './'
						}
	
        }, {
            timestamps: false
        }
    );

    return Cat;
}