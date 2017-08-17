function Burger( sequelize, DataTypes )
{
    //object with the data field assignments
    const burgerData = 
    {
        burger_name: DataTypes.STRING,
        is_devoured: DataTypes.BOOLEAN 
    }

    const tempBurger = sequelize.define( "Burger", burgerData )

    return tempBurger;
}

module.exports = Burger;