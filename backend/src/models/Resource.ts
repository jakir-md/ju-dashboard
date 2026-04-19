import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Resource extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public capacity!: number;
}

Resource.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "resource" },
);

export default Resource;
