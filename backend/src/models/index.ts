import Resource from './Resource.ts';
import Booking from './Booking.ts';

// Define One-to-Many relationship
Resource.hasMany(Booking, {
  foreignKey: 'resource_id',
  as: 'bookings',
});

Booking.belongsTo(Resource, {
  foreignKey: 'resource_id',
  as: 'Resource',
});

export { Resource, Booking };
