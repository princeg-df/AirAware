import type { Sequelize } from "sequelize";
import { device_configurations as _device_configurations } from "./device_configurations";
import type { device_configurationsAttributes, device_configurationsCreationAttributes } from "./device_configurations";
import { devices as _devices } from "./devices";
import type { devicesAttributes, devicesCreationAttributes } from "./devices";
import { homes as _homes } from "./homes";
import type { homesAttributes, homesCreationAttributes } from "./homes";
import { rooms as _rooms } from "./rooms";
import type { roomsAttributes, roomsCreationAttributes } from "./rooms";
import { telemetry_data as _telemetry_data } from "./telemetry_data";
import type { telemetry_dataAttributes, telemetry_dataCreationAttributes } from "./telemetry_data";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _device_configurations as device_configurations,
  _devices as devices,
  _homes as homes,
  _rooms as rooms,
  _telemetry_data as telemetry_data,
  _users as users,
};

export type {
  device_configurationsAttributes,
  device_configurationsCreationAttributes,
  devicesAttributes,
  devicesCreationAttributes,
  homesAttributes,
  homesCreationAttributes,
  roomsAttributes,
  roomsCreationAttributes,
  telemetry_dataAttributes,
  telemetry_dataCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const device_configurations = _device_configurations.initModel(sequelize);
  const devices = _devices.initModel(sequelize);
  const homes = _homes.initModel(sequelize);
  const rooms = _rooms.initModel(sequelize);
  const telemetry_data = _telemetry_data.initModel(sequelize);
  const users = _users.initModel(sequelize);

  device_configurations.belongsTo(devices, { as: "device", foreignKey: "device_id"});
  devices.hasMany(device_configurations, { as: "device_configurations", foreignKey: "device_id"});
  telemetry_data.belongsTo(devices, { as: "device", foreignKey: "device_id"});
  devices.hasMany(telemetry_data, { as: "telemetry_data", foreignKey: "device_id"});
  rooms.belongsTo(homes, { as: "home", foreignKey: "home_id"});
  homes.hasMany(rooms, { as: "rooms", foreignKey: "home_id"});
  devices.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(devices, { as: "devices", foreignKey: "room_id"});
  devices.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(devices, { as: "devices", foreignKey: "user_id"});
  homes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(homes, { as: "homes", foreignKey: "user_id"});

  return {
    device_configurations: device_configurations,
    devices: devices,
    homes: homes,
    rooms: rooms,
    telemetry_data: telemetry_data,
    users: users,
  };
}
