import PropTypes from "prop-types";

import AppImage from "@/components/site/AppImage";
import { Container } from "@/components/ui/container";
import { Display, Eyebrow, Highlight, Text } from "@/components/ui/typography";
import { resolveBackendAssetUrl } from "@/utils/mediaUrl";

const ServiceInto = ({ service }) => {
  const bannerImage = resolveBackendAssetUrl(service?.bannerImage);
  const name = service?.name || "Service";
  const title = service?.title || "Service details";
  const overview = service?.overview;

  return (
    <section className="relative isolate overflow-hidden bg-background pt-header pb-20 md:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full opacity-25 blur-2xl"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-2xl"
          style={{ background: "radial-gradient(closest-side, var(--color-primary-soft), transparent 70%)" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex max-w-2xl flex-col gap-5">
            <Eyebrow>{name}</Eyebrow>
            <Display size="lg">
              <Highlight>{title}</Highlight>
            </Display>
            {overview ? (
              <Text size="lg" tone="muted" className="max-w-xl">
                {overview}
              </Text>
            ) : null}
          </div>

          {bannerImage ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-muted/40">
              <AppImage
                src={bannerImage}
                alt={`${name} program banner`}
                className="h-full w-full object-cover"
                fetchPriority="high"
                loading="eager"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

ServiceInto.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    overview: PropTypes.string,
    bannerImage: PropTypes.string,
  }),
};

export default ServiceInto;
