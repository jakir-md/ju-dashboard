import React, { useEffect, useState } from "react";
import { Box, Users, BookOpen } from "lucide-react";
import api from "../api";

interface Resource {
  id: number;
  name: string;
  type: string;
  capacity: number;
}

const ResourceDashboard = ({ onBook }: { onBook: (res: Resource) => void }) => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    api.get("/resources").then((res) => setResources(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {resources.map((res) => (
        <div
          key={res.id}
          className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              {res.type === "Room" ? <Box size={24} /> : <BookOpen size={24} />}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {res.type}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">{res.name}</h3>
          <div className="flex items-center mt-2 text-gray-600 mb-6">
            <Users size={16} className="mr-2" />
            <span>Capacity: {res.capacity}</span>
          </div>
          <button
            onClick={() => onBook(res)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResourceDashboard;
