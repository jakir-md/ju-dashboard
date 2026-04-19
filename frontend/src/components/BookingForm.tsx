import React, { useState } from "react";
import api from "../api";

const BookingForm = ({ resource, onClose, onSuccess }: any) => {
  const [formData, setFormData] = useState({
    requested_by: "",
    booking_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requested_by || !formData.booking_date) return;

    setLoading(true);
    setError("");
    try {
      await api.post("/bookings", { ...formData, resource_id: resource.id });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || "Double-booking detected!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Book {resource.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, requested_by: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, booking_date: e.target.value })
              }
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:bg-blue-300"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
