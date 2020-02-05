const temperature = (sequelize, DataTypes) => {
  const Temperature = sequelize.define('temperature', {
    livingTemperature: DataTypes.DECIMAL,
    livingHumidity: DataTypes.DECIMAL,
    kitchenTemperature: DataTypes.DECIMAL,
    kitchenHumidity: DataTypes.DECIMAL,
    bathroomTemperature: DataTypes.DECIMAL,
    bathroomHumidity: DataTypes.DECIMAL,
    vladTemperature: DataTypes.DECIMAL,
    vladHumidity: DataTypes.DECIMAL,
  });

  return Temperature;
};

export default temperature;
