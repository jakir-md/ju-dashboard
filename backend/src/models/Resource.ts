import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';

export interface ResourceAttributes {
  id: number;
  name: string;
  type: string;
  capacity: number;
}

export interface ResourceCreationAttributes extends Optional<ResourceAttributes, 'id'> { }

class Resource extends Model<ResourceAttributes, ResourceCreationAttributes> implements ResourceAttributes {
  declare public id: number;
  declare public name: string;
  declare public type: string;
  declare public capacity: number;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'resources',
    timestamps: false,
  }
);

export default Resource;
