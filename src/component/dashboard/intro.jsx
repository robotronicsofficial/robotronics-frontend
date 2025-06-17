import { FaChevronRight } from "react-icons/fa";

const Intro = () => {
  const breadcrumbs = [
    { name: "Home", href: "/Dashboard/userInfo" },
    { name: "profile", href: "/Dashboard/userInfo" },
    { name: "Product", href: "/International/myRobot" },
    { name: "Wishlist", href: "/Dashboard/WishList" },
  ];

  return (
    <div className="bg-background pt-44 hidden md:block">
      {/* intro */}
      <div>
        {/* Dynamics-URLS */}
        {/* <nav className="flex w-1/2 bg-gray-100 rounded-lg px-7 ">
          <ol className="list-reset flex text-gray-600">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                <a
                  href={breadcrumb.href}
                  className={`text-xs lg:text-sm poppins-extralight ${
                    index === breadcrumbs.length - 1 ? "text-black" : ""
                  }`}
                >
                  {breadcrumb.name}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <FaChevronRight className="mx-2 text-gray-400" />
                )}
              </li>
            ))}
          </ol>
        </nav> */}
      </div>
    </div>
    // <></>
  );
};

export default Intro;
