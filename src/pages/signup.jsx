import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import PropTypes from "prop-types";
import hide from "../assets/images/hide.svg";
import robot from "../assets/images/SignupRobot.svg";
import facebook from "../assets/images/Facebooklogo.svg";
import google from "../assets/images/Googlelogo.svg";
import { sendJson, resolveBackendUrl } from "../lib/api";
import {
  getPasswordValidationState,
  hasValidPasswordRequirements,
  PASSWORD_POLICY_MESSAGE,
} from "../utils/passwordPolicy";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const phoneInputRef = useRef(null);
  const passwordErrors = getPasswordValidationState(
    formData.password,
    formData.confirmPassword,
  );
  useEffect(() => {
    // This effect will run after the component mounts
    if (phoneInputRef.current) {
      // Find the input element within the phone input component
      const inputElement = phoneInputRef.current.querySelector('input');

      if (inputElement) {
        // Apply your custom classes
        inputElement.classList.add(
          'border', 'border-line', 'rounded-xl', 'p-2',
          'bg-gray', 'w-full', 'focus:outline-none',
          'focus:ring-0', 'focus:border-line'
        );

        // Remove any unwanted classes
        inputElement.classList.remove('PhoneInputInput');
      }
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value
    }));
  };

  const validateForm = () => {
    if (!hasValidPasswordRequirements(passwordErrors)) {
      toast.error(PASSWORD_POLICY_MESSAGE);
      return false;
    }

    if (!passwordErrors.match) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!isCheckboxChecked) {
      toast.error("Please agree to the Terms of Use and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true); // Start loading
    try {
      await sendJson('/auth/register', {
        method: 'POST',
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          password: formData.password
        },
      });

      toast.success("Email sent successfully! Please verify your email.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success/error
    }

  };

  const handleSocialLogin = (provider) => {
    window.location.assign(resolveBackendUrl(`/auth/${provider}`));
  };

  return (
    <div className="signin" id="signin">
      <div className="lg:flex flex-row justify-between lg:p-14 lg:py-40 p-5">
        <div className="hidden lg:block">
          <div className="items-center p-5 space-y-5 ">
            <p
              className="text-6xl text-white text-wrap poppins-bold"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="4000"
            >
              Robotics
            </p>
            <p
              className="text-2xl poppins-light text-white"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="4000"
            >
              Access to courses and <br /> Products
            </p>
          </div>
          <div className="flex items-end">
            <img
              className=" w-full items-end"
              src={robot}
              alt=""
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="4000"
            />
          </div>
          <div
            className="w-full border border-line"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="4000"
          ></div>
        </div>
        <div
          className="flex flex-col bg-gray rounded-lg lg:p-14 p-5 mt-32 md:mt-0"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          <div className="lg:space-y-3 space-y-1">
            <p className="md:text-3xl text-2xl font-bold lg:pb-5 pb-2 poppins-bold ">
              Sign Up Now
            </p>
            <div className="lg:flex flex-row lg:space-x-2 ">
              <div className="flex flex-col">
                <p className="text-sm poppins-light ">First name</p>
                <input
                  className="border border-line rounded-xl p-2 lg:px-8 bg-gray"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm poppins-light ">Last name</p>
                <input
                  className="border border-line rounded-xl p-2 lg:px-8 bg-gray"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm poppins-light ">Email address</p>
              <input
                className="border border-line rounded-xl p-2 bg-gray"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>


            <div className="flex flex-col">
              <p className="text-sm poppins-light">Phone number</p>
              <div className="relative" ref={phoneInputRef}>
  <PhoneInput
    international
    defaultCountry="PK"
    value={formData.phoneNumber}
    onChange={handlePhoneChange}
    inputProps={{
      className: "border border-line rounded-xl p-2 pl-14 bg-gray w-full focus:outline-none focus:ring-0 focus:border-line text-base",
      autoComplete: "tel",
      type: "tel"
    }}
    countrySelectProps={{
      className: "absolute left-0 top-0 h-full flex items-center pl-2 touch-manipulation",
      dropdownClass: "absolute z-50 max-h-60 overflow-y-auto bg-white shadow-lg border border-gray-200 rounded-md w-60 max-w-full mt-1",
      buttonClass: "flex items-center justify-center h-full px-2 focus:outline-none"
    }}
    containerClass="relative w-full"
    style={{
      '--PhoneInputCountryFlag-height': '1.25rem',
      '--PhoneInputCountryFlag-width': 'auto',
      '--PhoneInputCountryFlag-borderColor': 'transparent',
      '--PhoneInputCountrySelectArrow-color': '#555555',
      '--PhoneInputCountrySelectArrow-opacity': '1',
      '--PhoneInputCountrySelectArrow-width': '0.5em',
      '--PhoneInputCountrySelectArrow-marginLeft': '0.5em',
    }}
  />
</div>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm poppins-light">Password</p>
                <button
                  className="flex items-center justify-center space-x-2 w-20"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {showPassword ? (
                    <>
                      <img className="h-5 w-5" src={hide} alt="Hide password" />
                      <p className="text-sm poppins-light">Hide</p>
                    </>
                  ) : (
                    <p className="text-sm poppins-light">Show</p>
                  )}
                </button>
              </div>
              <input
                className={`border rounded-xl p-2 bg-gray ${formData.password ?
                  (passwordErrors.length && passwordErrors.number && passwordErrors.symbol) ?
                    'border-green-500' : 'border-red-500'
                  : 'border-line'
                  }`}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <RequirementCheck
                  isValid={passwordErrors.length}
                  text="8+ characters"
                />
                <RequirementCheck
                  isValid={passwordErrors.number}
                  text="Contain at least one Number"
                />
                <RequirementCheck
                  isValid={passwordErrors.symbol}
                  text="Contain at least one symbol"
                />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm poppins-light">Confirm Password</p>
                <button
                  className="flex items-center justify-center space-x-2 w-20"
                  onClick={toggleConfirmPasswordVisibility}
                  type="button"
                >
                  {showConfirmPassword ? (
                    <>
                      <img className="h-5 w-5" src={hide} alt="Hide password" />
                      <p className="text-sm poppins-light">Hide</p>
                    </>
                  ) : (
                    <p className="text-sm poppins-light">Show</p>
                  )}
                </button>
              </div>
              <input
                className={`border rounded-xl p-2 bg-gray ${formData.confirmPassword ?
                  passwordErrors.match ? 'border-green-500' : 'border-red-500'
                  : 'border-line'
                  }`}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {formData.confirmPassword && (
                <p className={`text-xs mt-1 ${passwordErrors.match ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {passwordErrors.match ? 'Passwords match!' : 'Passwords do not match'}
                </p>
              )}
            </div>

            <div className="lg:space-y-3 space-y-1">
              <div className="flex items-center py-5">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-brown bg-gray-100 border-gray-300 rounded focus:ring-2"
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                />
                <label
                  htmlFor="terms-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 text-wrap"
                >
                  By creating an account, I agree to our{" "}
                  <Link to="/TermsConditions" className="underline underline-offset-4">
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link to="/PrivacyPolicy" className="underline underline-offset-4">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <button
                className={`bg-brown text-gold rounded-3xl px-5 py-2 w-full flex items-center justify-center ${!isCheckboxChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleSignUp}
                disabled={!isCheckboxChecked || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="cursor-pointer underline underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
          <div className="flex flex-col lg:py-10 py-5">
            <div className="flex flex-row justify-center items-center ">
              <div className="h-0 w-52 border border-line "></div>
              <p className=" text-xl poppins-semibold p-2">OR</p>
              <div className="h-0 w-52 border border-line"></div>
            </div>
            <div className="flex flex-col lg:space-y-4 space-y-2 items-center justify-center lg:py-20 py-10 ">
              <button
                type="button"
                className="poppins-regular flex flex-row bg-gray border border-line text-black font-bold rounded-3xl py-3 lg:px-28 px-12"
                onClick={() => handleSocialLogin('facebook')}
              >
                <img className="h-6 w-8" src={facebook} alt="Facebook" />
                Continue with Facebook
              </button>
              <button
                type="button"
                className="poppins-regular flex flex-row bg-gray border border-line text-black font-bold rounded-3xl py-3 lg:px-32 px-14"
                onClick={() => handleSocialLogin('google')}
              >
                <img className="h-6 w-8" src={google} alt="Google" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequirementCheck = ({ isValid, text }) => (
  <div className="flex items-center">
    <span
      className={`inline-block w-4 h-4 rounded-full mr-2 ${
        isValid ? "bg-green-500" : "bg-red-500"
      }`}
    ></span>
    <span className={`text-xs ${isValid ? "text-green-500" : "text-red-500"}`}>
      {text}
    </span>
  </div>
);

RequirementCheck.propTypes = {
  isValid: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Signup;
