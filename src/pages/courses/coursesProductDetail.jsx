import YtVideos from "@/components/site/course/courseDetailPage/ytVideos";
import Decription from "@/components/site/shop/productDetail/decription";
import CourseIntro from "@/components/site/course/courseDetailPage/courseIntro";
import MoreProduct from "@/components/site/shop/productDetail/moreProduct";
import { COMMERCE_ITEM_TYPES } from "../../lib/commerceItems";
import { useParams } from "@tanstack/react-router";

import { useCourse } from "../../hooks/useCourses";
const CoursesProductDetail = () => {
  const { id } = useParams({ strict: false });
  const {
    data: course,
    isLoading: loading,
    error,
  } = useCourse(id);

  if (loading) {
    return <div className="pt-header-auth-md bg-muted text-center p-10">Loading course...</div>;
  }

  if (!id || error) {
    return <div className="pt-header-auth-md bg-muted text-center p-10 text-destructive">We couldn&apos;t load this course right now.</div>;
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
