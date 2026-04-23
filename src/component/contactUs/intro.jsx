import AppImage from "../AppImage";
import img from "../../assets/images/contactUsBG.webp";

const Intro = () => {
  return (
    <div className="contactUs bg-contactbg" >

        <div className="w-2/4 text-center lg:p-14 lg:py-14 py-5"data-aos="fade-up" >
            <p className="lg:text-6xl text-2xl poppins-extrabold text-[#f5ab34] mt-40" >CONTACT US</p>
        </div>
        <div className="px-44" >
            {/* image */}
            <AppImage
              src={img}
              alt="Contact_US"
              loading="eager"
              className=""
              data-aos="fade-up"


            />
        </div>
    </div>
  )
}

export default Intro
