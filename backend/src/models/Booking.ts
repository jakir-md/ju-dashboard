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
  declare public id: number;
  declare public resource_id: number;
  declare public requested_by: string;
  declare public booking_date: Date;
  declare public status: string;
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
