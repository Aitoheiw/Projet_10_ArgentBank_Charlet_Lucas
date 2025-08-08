type HeroSectionProps = {
  highlights: string[];
  footer: string;
};

export default function HeroSection({ highlights, footer }: HeroSectionProps) {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        {highlights.map((text, index) => (
          <p key={index} className="subtitle">
            {text}
          </p>
        ))}
        <p className="text">{footer}</p>
      </section>
    </div>
  );
}
