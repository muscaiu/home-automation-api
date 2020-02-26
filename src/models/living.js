const living = (sequelize, DataTypes) => {
  const Living = sequelize.define('living', {
    temperature: DataTypes.DECIMAL,
    humidity: DataTypes.DECIMAL,
  });

  return Living;
};

export default living;
