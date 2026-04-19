import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.ts';

interface BookingAttributes {
  id: number;
  resource_id: number;
  requested_by: string;
  booking_date: Date;
  status: string;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'status'> { }

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public resource_id!: number;
  public requested_by!: string;
  public booking_date!: Date;
  public status!: string;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requested_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Confirmed',
    },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: false,
  }
);

export default Booking;
