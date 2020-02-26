const vlad = (sequelize, DataTypes) => {
  const Vlad = sequelize.define('vlad', {
    temperature: DataTypes.DECIMAL,
    humidity: DataTypes.DECIMAL,
  });

  return Vlad;
};

export default vlad;
