import Sequelize from 'sequelize';

export default class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          notNull: true
        },
        name: {
          type: Sequelize.STRING(255)
        },
        location: {
          type: Sequelize.STRING(255)
        },
        description: {
          type: Sequelize.STRING(255)
        },
        imageUrl: {
          type: Sequelize.STRING(255),
          field: 'image_url'
        },
        ownerId: {
          type: Sequelize.INTEGER,
          field: 'owner_id'
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'item',
        schema: 'public'
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'ownerData',
      foreignKey: 'ownerId',
      targetKey: 'id'
    });
  }
}
