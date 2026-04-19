import React, { useEffect, useState } from "react";
import api from "../api";
import { Trash2 } from "lucide-react";

const ScheduleViewer = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = () =>
    api.get("/bookings").then((res) => setBookings(res.data));

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: number) => {
    await api.delete(`/bookings/${id}`);
    setBookings(bookings.filter((b) => b.id !== id)); // Immediate UI update
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Current Schedule
      </h2>
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">
                Resource
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">
                Booked By
              </th>
              <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {b.resource?.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{b.requested_by}</td>
                <td className="px-6 py-4 text-gray-600">{b.booking_date}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleViewer;
