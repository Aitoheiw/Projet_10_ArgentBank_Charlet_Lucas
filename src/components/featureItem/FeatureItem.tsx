type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
  alt: string;
};

export default function FeatureItem({
  icon,
  title,
  alt,
  description,
}: FeatureItemProps) {
  return (
    <div className="feature-item">
      <img src={icon} alt={`${alt} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
