import Icon from './Icon';

/* ---------- Modal ---------- */
interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, title, onClose, children, footer }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/40 sticky top-0 bg-surface-container-lowest">
          <h3 className="text-title-lg text-on-surface">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-outline-variant/40 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};

/* ---------- Stat card ---------- */
type Tone = 'primary' | 'secondary' | 'tertiary' | 'error';

const toneMap: Record<Tone, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-container/10', text: 'text-primary' },
  secondary: { bg: 'bg-secondary-container/20', text: 'text-secondary' },
  tertiary: { bg: 'bg-tertiary-container/10', text: 'text-tertiary' },
  error: { bg: 'bg-error-container/30', text: 'text-error' },
};

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  tone?: Tone;
  trend?: { value: string; up?: boolean; neutral?: boolean };
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, tone = 'primary', trend }) => {
  const t = toneMap[tone];
  return (
    <div className="bg-surface p-6 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-surface-container-high hover:border-primary-container transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 ${t.bg} ${t.text} rounded-xl flex items-center justify-center`}>
          <Icon name={icon} fill />
        </div>
        {trend && (
          <span
            className={`flex items-center gap-1 text-label-md px-2 py-1 rounded-full ${
              trend.neutral
                ? 'text-secondary bg-secondary-container/20'
                : trend.up
                ? 'text-secondary bg-secondary-container/20'
                : 'text-error bg-error-container/30'
            }`}
          >
            <Icon
              name={trend.neutral ? 'check_circle' : trend.up ? 'trending_up' : 'trending_down'}
              className="text-[16px]"
            />
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-label-md text-on-surface-variant uppercase tracking-wider">{label}</p>
      <h3 className="text-headline-lg mt-1">{value}</h3>
    </div>
  );
};

/* ---------- Badge ---------- */
export const Badge: React.FC<{ tone: Tone | 'neutral'; children: React.ReactNode }> = ({ tone, children }) => {
  const styles: Record<string, string> = {
    primary: 'bg-primary-container/10 text-primary',
    secondary: 'bg-secondary-container/30 text-on-secondary-container',
    tertiary: 'bg-tertiary-container/10 text-tertiary',
    error: 'bg-error-container text-on-error-container',
    neutral: 'bg-surface-container-high text-on-surface-variant',
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-label-md font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
};

/* ---------- Avatar ---------- */
const avatarColors = [
  'bg-primary-container text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-tertiary-container text-on-tertiary-container',
  'bg-primary text-on-primary',
];

export const Avatar: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const color = avatarColors[name.charCodeAt(0) % avatarColors.length];
  return (
    <div className={`rounded-full flex items-center justify-center font-semibold ${color} ${className || 'w-10 h-10 text-body-md'}`}>
      {initials}
    </div>
  );
};

/* ---------- Page header ---------- */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => (
  <div className="flex justify-between items-end flex-wrap gap-4">
    <div>
      <h2 className="text-headline-lg text-on-surface">{title}</h2>
      {subtitle && <p className="text-on-surface-variant text-body-lg mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex gap-3">{actions}</div>}
  </div>
);

/* ---------- Form helpers ---------- */
export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-label-md text-on-surface-variant block ml-1">{label}</label>
    {children}
  </div>
);

export const inputClass =
  'w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-body-md text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all';
