import YtVideos from "../../component/course/courseDetailPage/ytVideos";
import Decription from "../../component/shop/productDetail/decription";
import CourseIntro from "../../component/course/courseDetailPage/courseIntro";
import MoreProduct from "../../component/shop/productDetail/moreProduct";
import { COMMERCE_ITEM_TYPES } from "../../lib/commerceItems";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoursesProductDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/coursesById/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    } else {
      setError("Course ID not found");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="pt-[9rem] bg-lightgray text-center p-10">Loading course...</div>;
  }

  if (error) {
    return <div className="pt-[9rem] bg-lightgray text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <CourseIntro
        id={course?._id}
        title={course?.title}
        image={course?.thumbnail}
        price={course?.price}
        category={course?.category}
      />
      <Decription
        description={course?.description}
        category={course?.category}
        duration={course?.month}
      />
      <MoreProduct itemType={COMMERCE_ITEM_TYPES.course} />
      <YtVideos />
    </div>
  );
};

export default CoursesProductDetail;
