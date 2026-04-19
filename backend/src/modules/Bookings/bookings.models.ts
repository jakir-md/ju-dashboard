import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";
import { Resource } from "../Resources/resources.models";

export class Booking extends Model {
  public id!: number;
  public resource_id!: number;
  public requested_by!: string;
  public booking_date!: string;
  public status!: string;
}

Booking.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    resource_id: { type: DataTypes.INTEGER, allowNull: false },
    requested_by: { type: DataTypes.STRING, allowNull: false },
    booking_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "Confirmed" },
  },
  { sequelize, modelName: "booking" },
);

// Define Relationship
Resource.hasMany(Booking, { foreignKey: "resource_id", as: "bookings" });
Booking.belongsTo(Resource, { foreignKey: "resource_id", as: "resource" });
