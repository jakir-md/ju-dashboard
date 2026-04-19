import React, { useState } from "react";
import ResourceDashboard from "./components/ResourceDashboard";
import ScheduleViewer from "./components/ScheduleViewer";
import { Calendar, LayoutDashboard } from "lucide-react";
import BookingForm from "./components/BookingForm";

function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "schedule">(
    "dashboard",
  );
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const refreshData = () => {
    setSelectedResource(null);
    setActiveTab("schedule"); // Move to schedule view after booking
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Calendar className="text-blue-500" /> SpaceSync
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === "schedule"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Calendar size={18} /> Schedule
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto mt-8 pb-12">
        {activeTab === "dashboard" ? (
          <div>
            <div className="px-6 mb-2">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Resource Dashboard
              </h2>
              <p className="text-gray-500 mt-1">
                Select a facility to schedule your session.
              </p>
            </div>
            <ResourceDashboard onBook={(res) => setSelectedResource(res)} />
          </div>
        ) : (
          <ScheduleViewer />
        )}
      </main>

      {/* Booking Modal Overlay */}
      {selectedResource && (
        <BookingForm
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
          onSuccess={refreshData}
        />
      )}
    </div>
  );
}

export default App;