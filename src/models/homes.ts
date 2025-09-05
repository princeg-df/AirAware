import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { rooms, roomsId } from './rooms';
import type { users, usersId } from './users';

export interface homesAttributes {
  id: number;
  user_id?: number;
  home_name: string;
  created_at?: Date;
}

export type homesPk = "id";
export type homesId = homes[homesPk];
export type homesOptionalAttributes = "id" | "user_id" | "created_at";
export type homesCreationAttributes = Optional<homesAttributes, homesOptionalAttributes>;

export class homes extends Model<homesAttributes, homesCreationAttributes> implements homesAttributes {
  id!: number;
  user_id?: number;
  home_name!: string;
  created_at?: Date;

  // homes hasMany rooms via home_id
  rooms!: rooms[];
  getRooms!: Sequelize.HasManyGetAssociationsMixin<rooms>;
  setRooms!: Sequelize.HasManySetAssociationsMixin<rooms, roomsId>;
  addRoom!: Sequelize.HasManyAddAssociationMixin<rooms, roomsId>;
  addRooms!: Sequelize.HasManyAddAssociationsMixin<rooms, roomsId>;
  createRoom!: Sequelize.HasManyCreateAssociationMixin<rooms>;
  removeRoom!: Sequelize.HasManyRemoveAssociationMixin<rooms, roomsId>;
  removeRooms!: Sequelize.HasManyRemoveAssociationsMixin<rooms, roomsId>;
  hasRoom!: Sequelize.HasManyHasAssociationMixin<rooms, roomsId>;
  hasRooms!: Sequelize.HasManyHasAssociationsMixin<rooms, roomsId>;
  countRooms!: Sequelize.HasManyCountAssociationsMixin;
  // homes belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof homes {
    return homes.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    home_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'homes',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "homes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
