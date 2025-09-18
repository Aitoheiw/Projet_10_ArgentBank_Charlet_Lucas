import FeatureItem from "../components/featureItem/FeatureItem";
import HeroSection from "../components/heroSection/HeroSection";

const features = [
  {
    icon: "../../img/icon-chat.png",
    title: "You are our #1 priority",
    alt: "Chat Icon",
    description:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    icon: "../../img/icon-money.png",
    title: "More savings means higher rates",
    alt: "Money Icon",
    description:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    icon: "../../img/icon-security.png",
    title: "Security you can trust",
    alt: "Security Icon",
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

/**
 * The homepage of the Argent Bank website, containing a hero section and a
 * features section.
 *
 * @returns A `main` element containing a hero section and a features section.
 */

export default function Home() {
  return (
    <main>
      <HeroSection
        highlights={["No fees.", "No minimum deposit.", "High interest rates."]}
        footer="Open a savings account with Argent Bank today!"
      />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            alt={feature.alt}
            description={feature.description}
          />
        ))}
       
      </section>
    </main>
  );
}
