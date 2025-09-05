import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { devices, devicesId } from './devices';

export interface device_configurationsAttributes {
  id: number;
  device_id?: number;
  custom_device_name?: string;
  device_category?: string;
  device_config?: string;
  system_type?: string;
  udid?: string;
  uhid?: string;
  created_at?: Date;
}

export type device_configurationsPk = "id";
export type device_configurationsId = device_configurations[device_configurationsPk];
export type device_configurationsOptionalAttributes = "id" | "device_id" | "custom_device_name" | "device_category" | "device_config" | "system_type" | "udid" | "uhid" | "created_at";
export type device_configurationsCreationAttributes = Optional<device_configurationsAttributes, device_configurationsOptionalAttributes>;

export class device_configurations extends Model<device_configurationsAttributes, device_configurationsCreationAttributes> implements device_configurationsAttributes {
  id!: number;
  device_id?: number;
  custom_device_name?: string;
  device_category?: string;
  device_config?: string;
  system_type?: string;
  udid?: string;
  uhid?: string;
  created_at?: Date;

  // device_configurations belongsTo devices via device_id
  device!: devices;
  getDevice!: Sequelize.BelongsToGetAssociationMixin<devices>;
  setDevice!: Sequelize.BelongsToSetAssociationMixin<devices, devicesId>;
  createDevice!: Sequelize.BelongsToCreateAssociationMixin<devices>;

  static initModel(sequelize: Sequelize.Sequelize): typeof device_configurations {
    return device_configurations.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'devices',
        key: 'id'
      }
    },
    custom_device_name: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    device_category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    device_config: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    system_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    udid: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "device_configurations_udid_key"
    },
    uhid: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "device_configurations_uhid_key"
    }
  }, {
    sequelize,
    tableName: 'device_configurations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "device_configurations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "device_configurations_udid_key",
        unique: true,
        fields: [
          { name: "udid" },
        ]
      },
      {
        name: "device_configurations_uhid_key",
        unique: true,
        fields: [
          { name: "uhid" },
        ]
      },
    ]
  });
  }
}
