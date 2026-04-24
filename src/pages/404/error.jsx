import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-background">
      <div className="flex h-svh flex-col items-center justify-center gap-10" data-aos="fade-up">
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-6xl poppins-extrabold text-muted-foreground">404</h1>
          <h2 className="text-6xl poppins-extrabold text-muted-foreground">Not Found</h2>
        </div>
        <div className="text-center">
          <p className="text-xl poppins-light text-muted-foreground">
            Your visited page was not found. you may go home page.
            <br />
            <br />
            <Link
              to="/"
              className="inline-flex rounded-md bg-primary px-10 py-2 text-foreground poppins-light"
            >
              Back to Home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
