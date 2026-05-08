import { Link, useLocation, useParams } from "@tanstack/react-router";
import PropTypes from "prop-types";

import PageState from "@/components/layout/PageState";
import { SectionInverse } from "@/components/layout/SectionInverse";
import QuickContact from "@/components/site/international/services/quickContact";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { useService } from "@/hooks/useServices";
import { CONTACT_PATH } from "@/router/paths";

import ServiceBody from "./ServiceBody";
import ServiceInto from "./ServiceInto";

const FinalCta = ({ service }) => (
  <SectionInverse className="py-20 md:py-28">
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Heading level={2} tone="inverted" className="text-display-md">
          Ready to start{service?.name ? ` ${service.name}` : ""}?
        </Heading>
        <Text size="lg" className="text-background/75">
          Pick a plan in under a minute, or talk to our team about rolling this program out across classrooms.
        </Text>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="marketingLg">
            <Link to="/subscriptions">Start Learning</Link>
          </Button>
          <Button
            asChild
            size="marketingLg"
            variant="ghost"
            className="text-background hover:bg-background/10"
          >
            <Link to={CONTACT_PATH}>Talk to us</Link>
          </Button>
        </div>
      </div>
    </Container>
  </SectionInverse>
);

FinalCta.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const ServiceDetail = () => {
  const { id } = useParams({ strict: false });
  const location = useLocation();
  const routeService = location.state?.service;
  const {
    data: service,
    isLoading: loading,
    error,
  } = useService(id, routeService);

  if (!id || loading) {
    return <PageState message="Loading service details..." />;
  }

  if (error || !service) {
    return (
      <PageState>
        <Text tone="default" className="text-destructive">
          {error?.message || "Service not found"}
        </Text>
      </PageState>
    );
  }

  return (
    <>
      <ServiceInto service={service} />
      <ServiceBody service={service} />
      <FinalCta service={service} />
      <QuickContact />
    </>
  );
};

export default ServiceDetail;
