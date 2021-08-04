import { Sequelize } from 'sequelize';
import config from './environment';
import { User } from '../models';
import logger from './logger';

const { postgres } = config;

const sequelize = new Sequelize(postgres.uri, {
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

export default async function initializeDbPostgres(callback) {
  try {
    await sequelize.authenticate();
    logger.info(
      `Postgre: Connection has been established successfully to ${sequelize.config.host}`
    );

    const models = {
      User: User.init(sequelize)
    };

    Object.values(models).forEach(model => {
      if (typeof model.associate === 'function') model.associate(models);
    });
    await sequelize.sync();
    return callback(sequelize);
  } catch (err) {
    logger.error('Sequelize: Unable to connect to the database: ' + err.toString());
    process.exit(1);
  }
}

export { sequelize };
