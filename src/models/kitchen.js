const kitchen = (sequelize, DataTypes) => {
  const Kitchen = sequelize.define('kitchen', {
    temperature: DataTypes.DECIMAL,
    humidity: DataTypes.DECIMAL,
  });

  return Kitchen;
};

export default kitchen;
