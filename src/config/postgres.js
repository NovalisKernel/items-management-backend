import { Sequelize } from 'sequelize';
import config from './environment';
import { User } from '../models';
import logger from './logger';

const { postgres } = config;

const sequelize = new Sequelize(postgres.uri, {
  logging: false,
  dialectOptions: {
    ssl: true
  }
});

export default function initializeDbPostgres() {
  sequelize
    .authenticate()
    .then(() => {
      logger.info('Postgre: Connection has been established successfully.');

      const models = {
        User: User.init(sequelize)
      };

      Object.values(models).forEach(model => {
        if (typeof model.associate === 'function') model.associate(models);
      });
      return sequelize.sync().catch(err => {
        throw new Error(err);
      });
    })
    .catch(err => {
      console.log(err);
      logger.error('Sequelize: Unable to connect to the database: ' + err.toString());
      process.exit(1);
    });
}
