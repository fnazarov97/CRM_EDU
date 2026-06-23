import { useState, useEffect } from 'react';
import { studentsService } from '../services/studentsService';
import { groupsService } from '../services/groupsService';
import { leadsService } from '../services/leadsService';
import { paymentsService } from '../services/paymentsService';
import { sessionsService } from '../services/sessionsService';
import type { Lead, Invoice, Session } from '../types';
import Icon from '../components/Icon';
import { StatCard, PageHeader, Avatar } from '../components/ui';

const fmtM = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)} M` : n.toLocaleString());
const fmtSom = (n: number) => `${n.toLocaleString()} so'm`;

const monthNames = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState(0);
  const [groups, setGroups] = useState(0);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [s, g, l, inv, ses] = await Promise.all([
          studentsService.getStudents(),
          groupsService.getGroups(),
          leadsService.getLeads(),
          paymentsService.getInvoices(),
          sessionsService.getSessions(),
        ]);
        setStudents(s.length);
        setGroups(g.filter((x) => x.status === 'Faol').length);
        setLeads(l);
        setInvoices(inv);
        setSessions(ses);
      } catch (e) {
        console.error('Dashboard load failed', e);
      }
    })();
  }, []);

  const newLeads = leads.filter((l) => l.status === 'Yangi').length;
  const revenue = invoices.reduce((s, i) => s + i.paidAmount, 0);
  const outstanding = invoices.reduce((s, i) => s + i.remainingAmount, 0);
  const debtors = invoices.filter((i) => i.remainingAmount > 0).length;

  // Lead status donut
  const statusGroups = [
    { key: 'Yangi', label: 'Yangi', color: 'stroke-primary', dot: 'bg-primary' },
    { key: 'Aloqada', label: 'Aloqada', color: 'stroke-secondary', dot: 'bg-secondary' },
    { key: 'Sinov darsida', label: 'Sinov darsida', color: 'stroke-tertiary', dot: 'bg-tertiary' },
  ];
  const counts = statusGroups.map((g) => leads.filter((l) => l.status === g.key).length);
  const otherCount = leads.length - counts.reduce((a, b) => a + b, 0);
  const totalLeads = leads.length || 1;
  let acc = 0;
  const segments = counts.map((c, i) => {
    const pct = (c / totalLeads) * 100;
    const seg = { dash: `${pct}, 100`, offset: -acc, color: statusGroups[i].color };
    acc += pct;
    return seg;
  });

  // Revenue per month from invoice dueDate (paid amount)
  const now = new Date();
  const buckets: { label: string; value: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ label: monthNames[d.getMonth()], value: 0 });
  }
  invoices.forEach((inv) => {
    const d = new Date(inv.dueDate);
    const diff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
    if (diff >= 0 && diff <= 5) buckets[5 - diff].value += inv.paidAmount;
  });
  const maxBucket = Math.max(...buckets.map((b) => b.value), 1);

  const upcoming = [...sessions]
    .filter((s) => new Date(s.date) >= new Date(now.toDateString()))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, 3);

  const recentLeads = leads.slice(0, 1);
  const recentPaid = invoices.filter((i) => i.paidAmount > 0).slice(0, 1);
  const recentSession = sessions.slice(0, 1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Xush kelibsiz!"
        subtitle="O'quv markazingiz bugungi holati haqida qisqacha ma'lumot."
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <Icon name="calendar_month" />
              <span>Oxirgi 30 kun</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <Icon name="download" />
              <span>Hisobot yuklash</span>
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="group" label="Faol o'quvchilar" value={students.toLocaleString()} tone="primary" trend={{ value: 'Faol', neutral: true }} />
        <StatCard icon="person_add" label="Yangi lidlar" value={newLeads.toLocaleString()} tone="secondary" trend={{ value: `${leads.length} jami`, up: true }} />
        <StatCard icon="payments" label="Tushumlar" value={fmtM(revenue)} tone="tertiary" trend={{ value: fmtM(outstanding), up: false }} />
        <StatCard icon="done_all" label="Faol guruhlar" value={groups.toLocaleString()} tone="primary" trend={{ value: 'Yaxshi', neutral: true }} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-title-lg">Tushumlar grafigi</h4>
              <p className="text-on-surface-variant text-label-md">Oxirgi 6 oylik dinamika</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-container"></span>
              <span className="text-label-md">Kurs to'lovi</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {buckets.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-surface-container rounded-t-lg flex items-end" style={{ height: '200px' }}>
                  <div
                    className="w-full bg-primary-container rounded-t-lg group-hover:bg-primary transition-colors"
                    style={{ height: `${Math.max((b.value / maxBucket) * 100, 4)}%` }}
                    title={fmtSom(b.value)}
                  />
                </div>
                <span className="mt-4 text-label-md text-on-surface-variant">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut */}
        <div className="col-span-12 lg:col-span-4 bg-surface rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high">
          <h4 className="text-title-lg mb-1">Lidlar statusi</h4>
          <p className="text-on-surface-variant text-label-md mb-8">Hozirgi bosqichdagi lidlar soni</p>
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-surface-container" cx="18" cy="18" fill="none" r="16" strokeWidth="4" />
              {segments.map((s, i) => (
                <circle
                  key={i}
                  className={s.color}
                  cx="18"
                  cy="18"
                  fill="none"
                  r="16"
                  strokeDasharray={s.dash}
                  strokeDashoffset={s.offset}
                  strokeWidth="4"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-headline-lg">{leads.length}</span>
              <span className="text-label-md text-on-surface-variant">Jami</span>
            </div>
          </div>
          <div className="space-y-3">
            {statusGroups.map((g, i) => (
              <div key={g.key} className="flex justify-between items-center text-body-md">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${g.dot}`}></span>
                  <span>{g.label}</span>
                </div>
                <span className="font-bold">{counts[i]}</span>
              </div>
            ))}
            {otherCount > 0 && (
              <div className="flex justify-between items-center text-body-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                  <span>Boshqa</span>
                </div>
                <span className="font-bold">{otherCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity + notifications */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
            <div className="p-6 border-b border-surface-container flex justify-between items-center">
              <h4 className="text-title-lg">So'nggi harakatlar</h4>
              <button className="text-primary text-title-md hover:underline">Hammasini ko'rish</button>
            </div>
            <div className="divide-y divide-surface-container">
              {recentPaid.map((inv) => (
                <div key={inv.id} className="p-6 flex items-center gap-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center">
                    <Icon name="payments" />
                  </div>
                  <div className="flex-1">
                    <p className="text-title-md">To'lov qabul qilindi</p>
                    <p className="text-body-md text-on-surface-variant">{inv.studentName}</p>
                  </div>
                  <p className="text-title-md text-secondary">+{fmtSom(inv.paidAmount)}</p>
                </div>
              ))}
              {recentLeads.map((l) => (
                <div key={l.id} className="p-6 flex items-center gap-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center">
                    <Icon name="person_add" />
                  </div>
                  <div className="flex-1">
                    <p className="text-title-md">Yangi lid qo'shildi</p>
                    <p className="text-body-md text-on-surface-variant">{l.fullName} — {l.source}</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-primary-container/10 text-primary text-label-md">{l.status}</span>
                </div>
              ))}
              {recentSession.map((s) => (
                <div key={s.id} className="p-6 flex items-center gap-4 hover:bg-surface-container-lowest transition-colors">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                    <Icon name="school" />
                  </div>
                  <div className="flex-1">
                    <p className="text-title-md">Dars: {s.topic}</p>
                    <p className="text-body-md text-on-surface-variant">{s.groupName}</p>
                  </div>
                  <p className="text-label-md text-on-surface-variant">{new Date(s.date).toLocaleDateString()}</p>
                </div>
              ))}
              {recentPaid.length + recentLeads.length + recentSession.length === 0 && (
                <p className="p-6 text-on-surface-variant text-body-md">Hozircha harakatlar yo'q.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high overflow-hidden">
            <div className="p-6 border-b border-surface-container flex justify-between items-center bg-primary-container text-on-primary-container">
              <div className="flex items-center gap-2">
                <Icon name="campaign" />
                <h4 className="text-title-lg">Bildirishnomalar</h4>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="p-4 rounded-lg bg-tertiary-container/10 border border-tertiary-container/20 flex gap-4">
                <Icon name="pending_actions" className="text-tertiary shrink-0" />
                <div>
                  <p className="text-title-md text-tertiary">Qarzdorlik mavjud</p>
                  <p className="text-body-md text-on-surface-variant mt-1">
                    {debtors} nafar o'quvchida to'lov qarzdorligi bor ({fmtSom(outstanding)}).
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary-container/10 border border-secondary-container/20 flex gap-4">
                <Icon name="info" className="text-secondary shrink-0" />
                <div>
                  <p className="text-title-md text-secondary">Faol guruhlar</p>
                  <p className="text-body-md text-on-surface-variant mt-1">Hozirda {groups} ta faol guruh mavjud.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high">
            <h4 className="text-title-lg mb-4">Navbatdagi darslar</h4>
            <div className="space-y-4">
              {upcoming.length === 0 && <p className="text-on-surface-variant text-body-md">Rejalashtirilgan dars yo'q.</p>}
              {upcoming.map((s) => {
                const d = new Date(s.date);
                return (
                  <div key={s.id} className="flex gap-4 items-center">
                    <div className="bg-surface-container p-3 rounded-lg text-center min-w-[60px]">
                      <p className="font-bold text-headline-md leading-none">{d.getDate()}</p>
                      <p className="text-label-md uppercase">{monthNames[d.getMonth()]}</p>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-title-md truncate">{s.groupName}</p>
                      <p className="text-body-md text-on-surface-variant truncate">{s.topic}</p>
                    </div>
                    <Avatar name={s.groupName} className="w-8 h-8 text-label-md" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
