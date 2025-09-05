import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { devices, devicesId } from './devices';
import type { homes, homesId } from './homes';

export interface roomsAttributes {
  id: number;
  home_id?: number;
  room_name: string;
  created_at?: Date;
}

export type roomsPk = "id";
export type roomsId = rooms[roomsPk];
export type roomsOptionalAttributes = "id" | "home_id" | "created_at";
export type roomsCreationAttributes = Optional<roomsAttributes, roomsOptionalAttributes>;

export class rooms extends Model<roomsAttributes, roomsCreationAttributes> implements roomsAttributes {
  id!: number;
  home_id?: number;
  room_name!: string;
  created_at?: Date;

  // rooms belongsTo homes via home_id
  home!: homes;
  getHome!: Sequelize.BelongsToGetAssociationMixin<homes>;
  setHome!: Sequelize.BelongsToSetAssociationMixin<homes, homesId>;
  createHome!: Sequelize.BelongsToCreateAssociationMixin<homes>;
  // rooms hasMany devices via room_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof rooms {
    return rooms.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'homes',
        key: 'id'
      }
    },
    room_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rooms',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "rooms_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
