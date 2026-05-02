import GiftCourseBody from "./GiftCourseBody";
import { getHeaderOffsetClass } from "@/components/layout/headerOffset";

const GiftCourseHome = () => (
  <div>
    <div className={getHeaderOffsetClass("w-full bg-background py-10 text-center text-foreground")}>
      <h1 className="text-3xl md:text-5xl">Gift a Course</h1>
    </div>
    <GiftCourseBody />
  </div>
);

export default GiftCourseHome;
