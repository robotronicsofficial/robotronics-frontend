import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import logo from "../assets/logo/Robotrinic.svg";
import robot from "../assets/images/robot-1.png";
import circleg from "../assets/logo/goldencircle.svg";
import circleb from "../assets/logo/browncircle.svg";
import AppImage from "./AppImage";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Subcomponents
const Header = () => (
  <div className="flex gap-x-5 text-center bg-background mt-8">
    <div className="md:ml-20 p-5 hidden sm:block ">
      <AppImage
        className="w-40 h-60"
        src={logo}
        alt="Logo"
        aria-label="Company Logo"
      />
    </div>
    <div className="" data-aos="fade-up">
      <p className="md:text-6xl text-xl text-wrap text-left poppins-bold text-foreground px-8 leading-snug">
        Through{" "}
        <span className="md:text-6xl text-xl text-wrap text-left poppins-bold text-primary mr-2">
          Robotics & STEM, 
        </span>
        <span className="md:text-6xl text-xl text-wrap text-left poppins-bold text-foreground">
            we empower <br></br> young minds to think critically, solve problems
          and turn imagination into innovation.
        </span>
      </p>
    </div>
  </div>
);

const InfoSection = () => (
  <div
    className=" md:mt-8 p-5  px-14 md:px-10  md:ml-20 w-full"
    data-aos="fade-up"
  >
    <div className="md:text-3xl text-xl text-wrap text-left poppins-regular text-foreground">
      By 2025,
      <span className="md:text-5xl text-2xl text-wrap text-left poppins-semibold text-foreground">
        {" "}
        ROBOTRONICS
      </span>
      <div className="md:text-3xl text-xl text-wrap text-left poppins-regular text-foreground">
        holds 70% of the market in Pakistan’s Robotics Education Sector.
      </div>
      <div className="md:text-3xl text-xl text-wrap text-left poppins-regular text-foreground"></div>
    </div>

    <div className="relative flex  w-full">
      <div className="hidden md:flex flex-col w-56 mt-36">
        <div className="flex items-center">
          <AppImage
            src={circleg}
            alt="Progress"
            className="mr-2"
            aria-label="Progress Circle"
          />
          <span>No. of Students</span>
        </div>
        <div className="flex items-center">
          <AppImage
            src={circleb}
            alt="Target"
            className="mr-2"
            aria-label="Target Circle"
          />
          <span>No. of Schools</span>
        </div>
      </div>
      <div className="w-80 ">
        <AppImage
          data-aos="fade-up"
          src={robot}
          alt="Robot illustration"
          aria-label="Robot Illustration"
        />
      </div>
    </div>
  </div>
);

const ChartSection = ({ data, options }) => (
  <div className="w-[30%] md:w-[65%] m-20 hidden lg:block">
    <Line data={data} options={options} aria-label="Line Chart" />
  </div>
);

ChartSection.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

const getThemeColor = (name) => {
  if (typeof window === "undefined") {
    return `var(${name})`;
  }

  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim() || `var(${name})`;
};

const withAlpha = (hex, alpha) => {
  const value = hex.replace("#", "");

  if (value.length !== 6) {
    return hex;
  }

  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);

  return `rgb(${red} ${green} ${blue} / ${alpha})`;
};

// Main Component
const Graph = () => {
  const secondary = getThemeColor("--secondary");
  const foreground = getThemeColor("--foreground");

  // Chart data
  const data = {
    labels: ["2000", "2010", "2020", "2023", "2024"], // X-axis labels
    datasets: [
      {
        label: "",
        data: [60, 40, 70, 80, 100], // Adjusted data points for Line 1
        borderColor: secondary,
        backgroundColor: withAlpha(secondary, 0.2),
        tension: 0.4, // Smoothness of the line
      },
      {
        label: "",
        data: [30, 50, 60, 90, 110], // Adjusted data points for Line 2
        borderColor: foreground,
        backgroundColor: foreground,
        tension: 0.4, // Smoothness of the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: false, // Hide y-axis ticks
        },
        grid: {
          display: false, // Hide y-axis grid lines
        },
        title: {
          display: false, // Hide y-axis title
        },
      },
      x: {
        title: {
          display: true, // Show x-axis title
        },
      },
    },
  };

  return (
    <div className="bg-background">
      <Header />
      <div className="flex w-full justify-between bg-background">
        <InfoSection />
        <ChartSection data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
