import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { Stat } from "@/components/ui/stat";
import { Eyebrow } from "@/components/ui/typography";

import logo1 from "@/assets/imagesContent/schoollogos/logo1.jpg";
import logo2 from "@/assets/imagesContent/schoollogos/logo2.png";
import logo3 from "@/assets/imagesContent/schoollogos/logo3.png";
import logo5 from "@/assets/imagesContent/schoollogos/logo5.png";
import logo6 from "@/assets/imagesContent/schoollogos/logo6.jpg";
import logo7 from "@/assets/imagesContent/schoollogos/logo7.png";
import logo8 from "@/assets/imagesContent/schoollogos/logo8.jpg";
import logo9 from "@/assets/imagesContent/schoollogos/logo9.jpg";
import logo10 from "@/assets/imagesContent/schoollogos/logo10.jpg";
import logo11 from "@/assets/imagesContent/schoollogos/logo11.png";

/* Same school assets as the main-branch marquee — just rendered as a quiet
   monochrome strip with edge fades and on-hover color, so the inconsistent
   jpg/png artwork reads as one row instead of a wall of mismatched tiles. */
const SCHOOL_LOGOS = [
  { src: logo1, alt: "Partner school" },
  { src: logo2, alt: "Partner school" },
  { src: logo3, alt: "Partner school" },
  { src: logo5, alt: "Partner school" },
  { src: logo6, alt: "Partner school" },
  { src: logo7, alt: "Partner school" },
  { src: logo8, alt: "Partner school" },
  { src: logo9, alt: "Partner school" },
  { src: logo10, alt: "Partner school" },
  { src: logo11, alt: "Partner school" },
];

const STATS = [
  {
    value: <CountUp to={150000} suffix="+" />,
    label: "Students learning today",
  },
  {
    value: <CountUp to={140} suffix="+" />,
    label: "Schools partnered worldwide",
  },
  {
    value: <CountUp to={30} suffix="+" />,
    label: "Future skills in one subscription",
  },
];

export const TrustSection = () => (
  <section className="bg-background py-16 md:py-20">
    <Container size="wide">
      <div className="flex flex-col items-center gap-3 text-center">
        <Eyebrow>Trusted by schools across the region</Eyebrow>
      </div>
      <div className="mt-8">
        <LogoMarquee logos={SCHOOL_LOGOS} />
      </div>
      <div className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-16 md:grid-cols-3">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </Container>
  </section>
);
