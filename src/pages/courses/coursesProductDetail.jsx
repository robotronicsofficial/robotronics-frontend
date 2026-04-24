import YtVideos from "../../component/course/courseDetailPage/ytVideos";
import Decription from "../../component/shop/productDetail/decription";
import CourseIntro from "../../component/course/courseDetailPage/courseIntro";
import MoreProduct from "../../component/shop/productDetail/moreProduct";
import { COMMERCE_ITEM_TYPES } from "../../lib/commerceItems";
import { useParams } from "react-router-dom";

import { useCourse } from "../../hooks/useCourses";
const CoursesProductDetail = () => {
  const { id } = useParams();
  const {
    data: course,
    isLoading: loading,
    error,
  } = useCourse(id);

  if (loading) {
    return <div className="pt-[9rem] bg-muted text-center p-10">Loading course...</div>;
  }

  if (!id || error) {
    return <div className="pt-[9rem] bg-muted text-center p-10 text-red-500">We couldn&apos;t load this course right now.</div>;
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
