const bathroom = (sequelize, DataTypes) => {
  const Bathroom = sequelize.define('bathroom', {
    temperature: DataTypes.DECIMAL,
    humidity: DataTypes.DECIMAL,
  });

  return Bathroom;
};

export default bathroom;
