import GiftCourseBody from "./GiftCourseBody";
import { getHeaderOffsetClass } from "@/components/layout/headerOffset";

const GiftCourseHome = () => (
  <div>
    <div className={getHeaderOffsetClass("compact", "w-full bg-background py-10 text-center text-foreground")}>
      <h1 className="poppins-bold text-3xl md:text-5xl">Gift a Course</h1>
    </div>
    <GiftCourseBody />
  </div>
);

export default GiftCourseHome;
