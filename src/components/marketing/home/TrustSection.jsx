import { Container } from "@/components/ui/container";
import { Stat } from "@/components/ui/stat";

const STATS = [
  { value: "150,000+", label: "Students learning today" },
  { value: "140+", label: "Schools partnered worldwide" },
  { value: "30+", label: "Future skills in one subscription" },
];

export const TrustSection = () => (
  <section className="bg-background py-16 md:py-20">
    <Container size="wide">
      <div className="grid grid-cols-1 gap-10 border-t border-border pt-16 md:grid-cols-3">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </Container>
  </section>
);
