function Burger( sequelize, DataTypes )
{
    //object with the data field assignments
    const burgerData = 
    {
        burger_name:
        {
            type: DataTypes.STRING,
            allowNull: false,
            vaidate:
            {
                len: [ 1, 100 ]
            }
        },

        is_devoured:
        {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }

    const tempBurger = sequelize.define( "Burger", burgerData )

    return tempBurger;
}

module.exports = Burger;