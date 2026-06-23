interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, className = '', fill = false, style }) => (
  <span className={`material-symbols-outlined ${fill ? 'icon-fill' : ''} ${className}`} style={style}>
    {name}
  </span>
);

export default Icon;
