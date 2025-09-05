import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { devices, devicesId } from './devices';
import type { homes, homesId } from './homes';

export interface usersAttributes {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at?: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "id" | "created_at";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  id!: number;
  username!: string;
  email!: string;
  password_hash!: string;
  created_at?: Date;

  // users hasMany devices via user_id
  devices!: devices[];
  getDevices!: Sequelize.HasManyGetAssociationsMixin<devices>;
  setDevices!: Sequelize.HasManySetAssociationsMixin<devices, devicesId>;
  addDevice!: Sequelize.HasManyAddAssociationMixin<devices, devicesId>;
  addDevices!: Sequelize.HasManyAddAssociationsMixin<devices, devicesId>;
  createDevice!: Sequelize.HasManyCreateAssociationMixin<devices>;
  removeDevice!: Sequelize.HasManyRemoveAssociationMixin<devices, devicesId>;
  removeDevices!: Sequelize.HasManyRemoveAssociationsMixin<devices, devicesId>;
  hasDevice!: Sequelize.HasManyHasAssociationMixin<devices, devicesId>;
  hasDevices!: Sequelize.HasManyHasAssociationsMixin<devices, devicesId>;
  countDevices!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany homes via user_id
  homes!: homes[];
  getHomes!: Sequelize.HasManyGetAssociationsMixin<homes>;
  setHomes!: Sequelize.HasManySetAssociationsMixin<homes, homesId>;
  addHome!: Sequelize.HasManyAddAssociationMixin<homes, homesId>;
  addHomes!: Sequelize.HasManyAddAssociationsMixin<homes, homesId>;
  createHome!: Sequelize.HasManyCreateAssociationMixin<homes>;
  removeHome!: Sequelize.HasManyRemoveAssociationMixin<homes, homesId>;
  removeHomes!: Sequelize.HasManyRemoveAssociationsMixin<homes, homesId>;
  hasHome!: Sequelize.HasManyHasAssociationMixin<homes, homesId>;
  hasHomes!: Sequelize.HasManyHasAssociationsMixin<homes, homesId>;
  countHomes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "users_username_key"
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "users_email_key"
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
