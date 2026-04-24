import { getHeaderOffsetClass } from "../../components/layout/headerOffset";

const Intro = () => {
  return (
    <div className={getHeaderOffsetClass("page", "bg-background hidden md:block")}>
      {/* intro */}
      <div>
        {/* Dynamics-URLS */}
        {/* <nav className="flex w-1/2 bg-background-100 rounded-lg px-7 ">
          <ol className="list-reset flex text-muted-foreground-600">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                <a
                  href={breadcrumb.href}
                  className={`text-xs lg:text-sm poppins-extralight ${
                    index === breadcrumbs.length - 1 ? "text-foreground" : ""
                  }`}
                >
                  {breadcrumb.name}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <FaChevronRight className="mx-2 text-muted-foreground-400" />
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
