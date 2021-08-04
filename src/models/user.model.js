import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: Sequelize.STRING(80)
        },
        password: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING(128)
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'user',
        schema: 'public'
      }
    );
  }
}
