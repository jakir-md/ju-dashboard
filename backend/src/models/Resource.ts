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
  public id!: number;
  public name!: string;
  public type!: string;
  public capacity!: number;
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
