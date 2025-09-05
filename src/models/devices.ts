import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { device_configurations, device_configurationsId } from './device_configurations';
import type { rooms, roomsId } from './rooms';
import type { telemetry_data, telemetry_dataId } from './telemetry_data';
import type { users, usersId } from './users';

export interface devicesAttributes {
  id: number;
  device_id: string;
  mac_address: string;
  device_name: string;
  device_type?: string;
  product_number?: string;
  real_device_name?: string;
  user_id?: number;
  room_id?: number;
  created_at?: Date;
}

export type devicesPk = "id";
export type devicesId = devices[devicesPk];
export type devicesOptionalAttributes = "id" | "device_type" | "product_number" | "real_device_name" | "user_id" | "room_id" | "created_at";
export type devicesCreationAttributes = Optional<devicesAttributes, devicesOptionalAttributes>;

export class devices extends Model<devicesAttributes, devicesCreationAttributes> implements devicesAttributes {
  id!: number;
  device_id!: string;
  mac_address!: string;
  device_name!: string;
  device_type?: string;
  product_number?: string;
  real_device_name?: string;
  user_id?: number;
  room_id?: number;
  created_at?: Date;

  // devices hasMany device_configurations via device_id
  device_configurations!: device_configurations[];
  getDevice_configurations!: Sequelize.HasManyGetAssociationsMixin<device_configurations>;
  setDevice_configurations!: Sequelize.HasManySetAssociationsMixin<device_configurations, device_configurationsId>;
  addDevice_configuration!: Sequelize.HasManyAddAssociationMixin<device_configurations, device_configurationsId>;
  addDevice_configurations!: Sequelize.HasManyAddAssociationsMixin<device_configurations, device_configurationsId>;
  createDevice_configuration!: Sequelize.HasManyCreateAssociationMixin<device_configurations>;
  removeDevice_configuration!: Sequelize.HasManyRemoveAssociationMixin<device_configurations, device_configurationsId>;
  removeDevice_configurations!: Sequelize.HasManyRemoveAssociationsMixin<device_configurations, device_configurationsId>;
  hasDevice_configuration!: Sequelize.HasManyHasAssociationMixin<device_configurations, device_configurationsId>;
  hasDevice_configurations!: Sequelize.HasManyHasAssociationsMixin<device_configurations, device_configurationsId>;
  countDevice_configurations!: Sequelize.HasManyCountAssociationsMixin;
  // devices hasMany telemetry_data via device_id
  telemetry_data!: telemetry_data[];
  getTelemetry_data!: Sequelize.HasManyGetAssociationsMixin<telemetry_data>;
  setTelemetry_data!: Sequelize.HasManySetAssociationsMixin<telemetry_data, telemetry_dataId>;
  addTelemetry_datum!: Sequelize.HasManyAddAssociationMixin<telemetry_data, telemetry_dataId>;
  addTelemetry_data!: Sequelize.HasManyAddAssociationsMixin<telemetry_data, telemetry_dataId>;
  createTelemetry_datum!: Sequelize.HasManyCreateAssociationMixin<telemetry_data>;
  removeTelemetry_datum!: Sequelize.HasManyRemoveAssociationMixin<telemetry_data, telemetry_dataId>;
  removeTelemetry_data!: Sequelize.HasManyRemoveAssociationsMixin<telemetry_data, telemetry_dataId>;
  hasTelemetry_datum!: Sequelize.HasManyHasAssociationMixin<telemetry_data, telemetry_dataId>;
  hasTelemetry_data!: Sequelize.HasManyHasAssociationsMixin<telemetry_data, telemetry_dataId>;
  countTelemetry_data!: Sequelize.HasManyCountAssociationsMixin;
  // devices belongsTo rooms via room_id
  room!: rooms;
  getRoom!: Sequelize.BelongsToGetAssociationMixin<rooms>;
  setRoom!: Sequelize.BelongsToSetAssociationMixin<rooms, roomsId>;
  createRoom!: Sequelize.BelongsToCreateAssociationMixin<rooms>;
  // devices belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof devices {
    return devices.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    device_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "devices_device_id_key"
    },
    mac_address: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "devices_mac_address_key"
    },
    device_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    device_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    product_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    real_device_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rooms',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'devices',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "devices_device_id_key",
        unique: true,
        fields: [
          { name: "device_id" },
        ]
      },
      {
        name: "devices_mac_address_key",
        unique: true,
        fields: [
          { name: "mac_address" },
        ]
      },
      {
        name: "devices_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
