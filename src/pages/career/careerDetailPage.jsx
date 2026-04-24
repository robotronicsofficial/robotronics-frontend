import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Careerintro from "../../component/careers/CareerDetailPage/Careerintro";
import CareerJobDetail from "../../component/careers/CareerDetailPage/careerJobDetail";
import PageState from "../../components/layout/PageState";
import { fetchJobById, getJobsErrorMessage } from "../../lib/jobs";

const CareerDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadJob = async () => {
      try {
        setLoading(true);
        setError("");

        if (id) {
          const data = await fetchJobById(id);

          if (active) {
            setJob(data);
          }
          return;
        }
      } catch (fetchError) {
        if (active) {
          setJob(null);
          setError(getJobsErrorMessage(fetchError, { detail: true }));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadJob();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <PageState message="Loading job details..." />;
  }

  if (error && !job) {
    return (
      <PageState>
        <p className="text-red-500">{error}</p>
        <Link
          to="/CareerJob"
          className="mt-6 inline-flex rounded-full bg-brown px-5 py-3 text-white transition hover:opacity-90"
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
