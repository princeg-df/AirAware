import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { devices, devicesId } from './devices';

export interface telemetry_dataAttributes {
  id: number;
  device_id?: number;
  pm25?: number;
  co2?: number;
  humidity?: number;
  aqi?: number;
  temperature?: number;
  recorded_at?: Date;
}

export type telemetry_dataPk = "id";
export type telemetry_dataId = telemetry_data[telemetry_dataPk];
export type telemetry_dataOptionalAttributes = "id" | "device_id" | "pm25" | "co2" | "humidity" | "aqi" | "temperature" | "recorded_at";
export type telemetry_dataCreationAttributes = Optional<telemetry_dataAttributes, telemetry_dataOptionalAttributes>;

export class telemetry_data extends Model<telemetry_dataAttributes, telemetry_dataCreationAttributes> implements telemetry_dataAttributes {
  id!: number;
  device_id?: number;
  pm25?: number;
  co2?: number;
  humidity?: number;
  aqi?: number;
  temperature?: number;
  recorded_at?: Date;

  // telemetry_data belongsTo devices via device_id
  device!: devices;
  getDevice!: Sequelize.BelongsToGetAssociationMixin<devices>;
  setDevice!: Sequelize.BelongsToSetAssociationMixin<devices, devicesId>;
  createDevice!: Sequelize.BelongsToCreateAssociationMixin<devices>;

  static initModel(sequelize: Sequelize.Sequelize): typeof telemetry_data {
    return telemetry_data.init({
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
    pm25: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    co2: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    humidity: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    aqi: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    temperature: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'telemetry_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "telemetry_data_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
