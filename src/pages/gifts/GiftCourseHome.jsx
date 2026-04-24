import GiftCourseBody from "./GiftCourseBody";
import { getHeaderOffsetClass } from "../../components/layout/headerOffset";

const GiftCourseHome = () => (
  <div>
    <div className={getHeaderOffsetClass("compact", "w-full bg-[#ebe5e2] py-10 text-center text-brown")}>
      <h1 className="poppins-bold text-3xl md:text-5xl">Gift a Course</h1>
    </div>
    <GiftCourseBody />
  </div>
);

export default GiftCourseHome;
