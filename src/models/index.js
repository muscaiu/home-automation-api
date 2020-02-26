import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    logging: false,
  },
);

const models = {
  Living: sequelize.import('./living'),
  Kitchen: sequelize.import('./kitchen'),
  Vlad: sequelize.import('./vlad'),
  Bathroom: sequelize.import('./bathroom'),
  User: sequelize.import('./user'),
};

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

export { sequelize };

export default models;
