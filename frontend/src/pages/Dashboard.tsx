import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Barcha o\'quvchilar', value: '150', icon: '🎓', color: 'bg-blue-500' },
    { label: 'Faol guruhlar', value: '12', icon: '🏫', color: 'bg-green-500' },
    { label: 'Yangi leadlar', value: '25', icon: '👥', color: 'bg-yellow-500' },
    { label: 'Oylik tushum', value: '45M UZS', icon: '💰', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-full text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">So'nggi faoliyat</h2>
        <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
      </div>
    </div>
  );
};

export default Dashboard;
