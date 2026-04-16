import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Careerintro from "../../component/careers/CareerDetailPage/Careerintro";
import CareerJobDetail from "../../component/careers/CareerDetailPage/careerJobDetail";

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
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to load job details");
          }

          if (active) {
            setJob(data);
          }
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load jobs");
        }

        if (active) {
          setJob(Array.isArray(data) && data.length > 0 ? data[0] : null);
          if (!Array.isArray(data) || data.length === 0) {
            setError("No open roles are available right now.");
          }
        }
      } catch (fetchError) {
        if (active) {
          setJob(null);
          setError(fetchError.message || "Failed to load job details");
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
    return <div className="bg-background pt-44 pb-20 text-center">Loading job details...</div>;
  }

  if (error && !job) {
    return <div className="bg-background pt-44 pb-20 text-center text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="bg-background pt-44 pb-20 text-center">No job selected.</div>;
  }

  return (
    <div>
      <Careerintro job={job} />
      <CareerJobDetail job={job} />
    </div>
  );
};

export default CareerDetailPage;
