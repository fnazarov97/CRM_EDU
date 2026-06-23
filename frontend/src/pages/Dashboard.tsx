import React, { useState, useEffect } from 'react';
import { studentsService } from '../services/studentsService';
import { groupsService } from '../services/groupsService';
import { leadsService } from '../services/leadsService';
import { paymentsService } from '../services/paymentsService';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ students: 0, groups: 0, leads: 0, outstanding: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [students, groups, leads, invoices] = await Promise.all([
          studentsService.getStudents(),
          groupsService.getGroups(),
          leadsService.getLeads(),
          paymentsService.getInvoices(),
        ]);
        setStats({
          students: students.length,
          groups: groups.filter((g) => g.status === 'Faol').length,
          leads: leads.filter((l) => l.status === 'Yangi').length,
          outstanding: invoices.reduce((sum, i) => sum + i.remainingAmount, 0),
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    { label: 'Barcha o\'quvchilar', value: stats.students.toString(), icon: '🎓', color: 'bg-blue-500' },
    { label: 'Faol guruhlar', value: stats.groups.toString(), icon: '🏫', color: 'bg-green-500' },
    { label: 'Yangi leadlar', value: stats.leads.toString(), icon: '👥', color: 'bg-yellow-500' },
    { label: 'Qarzdorlik (UZS)', value: stats.outstanding.toLocaleString(), icon: '💰', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{isLoading ? '...' : stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-full text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Xush kelibsiz!</h2>
        <p className="text-gray-600">EduCRM Pro - ta'lim markazingizni boshqarish tizimi. Chap menyudan kerakli bo'limni tanlang.</p>
      </div>
    </div>
  );
};

export default Dashboard;
