import { Link, useParams } from "@tanstack/react-router";
import Careerintro from "@/components/site/careers/CareerDetailPage/Careerintro";
import CareerJobDetail from "@/components/site/careers/CareerDetailPage/careerJobDetail";
import PageState from "@/components/layout/PageState";
import { getJobsErrorMessage } from "../../lib/jobs";
import { useJob } from "../../hooks/useJobs";

const CareerDetailPage = () => {
  const { id } = useParams({ strict: false });
  const {
    data: job,
    isLoading: loading,
    error,
  } = useJob(id);

  if (loading) {
    return <PageState message="Loading job details..." />;
  }

  if (error && !job) {
    return (
      <PageState>
        <p className="text-destructive">{getJobsErrorMessage(error, { detail: true })}</p>
        <Link
          to="/CareerJob"
          className="mt-6 inline-flex rounded-full bg-foreground px-5 py-3 text-background transition hover:opacity-90"
        >
          Back to careers
        </Link>
      </PageState>
    );
  }

  if (!job) {
    return <PageState message="No job selected." />;
  }

  return (
    <div>
      <Careerintro job={job} />
      <CareerJobDetail job={job} />
    </div>
  );
};

export default CareerDetailPage;
