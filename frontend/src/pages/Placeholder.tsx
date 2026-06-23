import Icon from '../components/Icon';

interface PlaceholderProps {
  title: string;
  subtitle: string;
  icon: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ title, subtitle, icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="w-20 h-20 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center mb-6">
      <Icon name={icon} className="text-[40px]" fill />
    </div>
    <h2 className="text-headline-md text-on-surface">{title}</h2>
    <p className="text-on-surface-variant text-body-lg mt-2 max-w-md">{subtitle}</p>
  </div>
);

export default Placeholder;
