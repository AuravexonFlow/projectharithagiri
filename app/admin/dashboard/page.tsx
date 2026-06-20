'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'donors' | 'events' | 'buildings'>('donors');

  // Check authentication on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuthenticated');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-temple-cream">
      {/* Admin Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-temple-green">පරිපාලක පැනලය</h1>
            <p className="text-sm text-gray-600">Admin Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            ඉවත් වන්න / Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('donors')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'donors'
                  ? 'border-temple-gold text-temple-green font-semibold'
                  : 'border-transparent text-gray-500 hover:text-temple-green'
              }`}
            >
              දායක සභාව / Donors
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'events'
                  ? 'border-temple-gold text-temple-green font-semibold'
                  : 'border-transparent text-gray-500 hover:text-temple-green'
              }`}
            >
              උත්සව / Events
            </button>
            <button
              onClick={() => setActiveTab('buildings')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'buildings'
                  ? 'border-temple-gold text-temple-green font-semibold'
                  : 'border-transparent text-gray-500 hover:text-temple-green'
              }`}
            >
              ගොඩනැගිලි / Buildings
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'donors' && <DonorsManagement />}
        {activeTab === 'events' && <EventsManagement />}
        {activeTab === 'buildings' && <BuildingsManagement />}
      </main>
    </div>
  );
}

// Donors Management Component
function DonorsManagement() {
  const [donors, setDonors] = useState([
    { id: 1, name: 'දායක නාමය 1', contribution: 'රු. 50,000', year: '2024' },
    { id: 2, name: 'දායක නාමය 2', contribution: 'රු. 30,000', year: '2024' },
  ]);

  const [newDonor, setNewDonor] = useState({ name: '', contribution: '', year: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const addDonor = () => {
    if (newDonor.name && newDonor.contribution && newDonor.year) {
      setDonors([...donors, { ...newDonor, id: Date.now() }]);
      setNewDonor({ name: '', contribution: '', year: '' });
    }
  };

  const deleteDonor = (id: number) => {
    setDonors(donors.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-temple-green mb-6">නව දායක එක් කරන්න</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="දායක නාමය"
            value={newDonor.name}
            onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <input
            type="text"
            placeholder="දායකත්වය (රු.)"
            value={newDonor.contribution}
            onChange={(e) => setNewDonor({ ...newDonor, contribution: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <input
            type="text"
            placeholder="වර්ෂය"
            value={newDonor.year}
            onChange={(e) => setNewDonor({ ...newDonor, year: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <button
            onClick={addDonor}
            className="bg-temple-green text-white px-6 py-2 rounded-lg hover:bg-temple-green-dark transition-colors"
          >
            එක් කරන්න
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-temple-green mb-6">දායක ලැයිස්තුව</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-temple-gold">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">නාමය</th>
                <th className="text-left py-3 px-4">දායකත්වය</th>
                <th className="text-left py-3 px-4">වර්ෂය</th>
                <th className="text-left py-3 px-4">ක්‍රියා</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor.id} className="border-b hover:bg-temple-cream">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{donor.name}</td>
                  <td className="py-3 px-4">{donor.contribution}</td>
                  <td className="py-3 px-4">{donor.year}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteDonor(donor.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      මකන්න
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Events Management Component
function EventsManagement() {
  const [events, setEvents] = useState([
    { id: 1, name: 'වෙසක් උත්සවය', date: 'මැයි 2026', description: 'වාර්ෂික වෙසක් උත්සවය', youtubeId: 'dQw4w9WgXcQ' },
  ]);

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '', youtubeId: '' });

  const addEvent = () => {
    if (newEvent.name && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ name: '', date: '', description: '', youtubeId: '' });
    }
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-temple-green mb-6">නව උත්සවය එක් කරන්න</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="උත්සව නාමය"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <input
            type="text"
            placeholder="දිනය"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <textarea
            placeholder="විස්තරය"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            rows={3}
            className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <input
            type="text"
            placeholder="YouTube Video ID (optional)"
            value={newEvent.youtubeId}
            onChange={(e) => setNewEvent({ ...newEvent, youtubeId: e.target.value })}
            className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
        </div>
        <button
          onClick={addEvent}
          className="bg-temple-green text-white px-6 py-2 rounded-lg hover:bg-temple-green-dark transition-colors"
        >
          එක් කරන්න
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-temple-green mb-6">ත්සව ලැයිස්තුව</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-temple-green">{event.name}</h3>
                <p className="text-temple-gold">{event.date}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
                {event.youtubeId && (
                  <p className="text-sm text-blue-600 mt-1">YouTube: {event.youtubeId}</p>
                )}
              </div>
              <button
                onClick={() => deleteEvent(event.id)}
                className="text-red-500 hover:text-red-700"
              >
                මකන්න
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Buildings Management Component
function BuildingsManagement() {
  const [buildings, setBuildings] = useState([
    { id: 1, name: 'ස්තපය', description: 'ප්‍රධාන ස්තූපය', height: 'අඩි 45', yearBuilt: '1975' },
  ]);

  const [newBuilding, setNewBuilding] = useState({ name: '', description: '', height: '', yearBuilt: '' });

  const addBuilding = () => {
    if (newBuilding.name && newBuilding.description) {
      setBuildings([...buildings, { ...newBuilding, id: Date.now() }]);
      setNewBuilding({ name: '', description: '', height: '', yearBuilt: '' });
    }
  };

  const deleteBuilding = (id: number) => {
    setBuildings(buildings.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-temple-green mb-6">නව ගොඩනැගිල්ල එක් කරන්න</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="නාමය"
            value={newBuilding.name}
            onChange={(e) => setNewBuilding({ ...newBuilding, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <input
            type="text"
            placeholder="උස/ප්‍රමාණය"
            value={newBuilding.height}
            onChange={(e) => setNewBuilding({ ...newBuilding, height: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <input
            type="text"
            placeholder="ඉදිකළ වර්ෂය"
            value={newBuilding.yearBuilt}
            onChange={(e) => setNewBuilding({ ...newBuilding, yearBuilt: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
          <textarea
            placeholder="විස්තරය"
            value={newBuilding.description}
            onChange={(e) => setNewBuilding({ ...newBuilding, description: e.target.value })}
            rows={2}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-temple-gold outline-none"
          />
        </div>
        <button
          onClick={addBuilding}
          className="bg-temple-green text-white px-6 py-2 rounded-lg hover:bg-temple-green-dark transition-colors"
        >
          එක් කරන්න
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-temple-green mb-6">ගොඩනැගිලි ලැයිස්තුව</h2>
        <div className="space-y-4">
          {buildings.map((building) => (
            <div key={building.id} className="border rounded-lg p-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-temple-green">{building.name}</h3>
                <p className="text-gray-600 mt-1">{building.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {building.height && `උස: ${building.height}`} 
                  {building.yearBuilt && ` | ඉදිකළ වර්ෂය: ${building.yearBuilt}`}
                </p>
              </div>
              <button
                onClick={() => deleteBuilding(building.id)}
                className="text-red-500 hover:text-red-700"
              >
                මකන්න
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
