import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hide from "../assets/images/hide.svg";
import facebook from "../assets/images/Facebooklogo.svg";
import google from "../assets/images/Googlelogo.svg";
import { useAuth } from "../contexts/AuthContext";

const REDIRECT_AFTER_LOGIN_STORAGE_KEY = "redirectAfterLogin";

const Login = () => {
  const { currentUser, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectFromState = location.state?.from
    ? `${location.state.from.pathname || ""}${location.state.from.search || ""}${location.state.from.hash || ""}`
    : null;

  useEffect(() => {
    if (location.state?.emailVerified) {
      toast.success('Your email has been verified! Please sign in to continue.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Clear the state
      window.history.replaceState({}, document.title);
    }

    if (currentUser) {
      const redirectPath = window.sessionStorage.getItem(REDIRECT_AFTER_LOGIN_STORAGE_KEY);
      if (redirectPath) {
        window.sessionStorage.removeItem(REDIRECT_AFTER_LOGIN_STORAGE_KEY);
        navigate(redirectPath, { replace: true });
        return;
      }

      navigate(redirectFromState || "/", { replace: true });
    }
  }, [location.state, currentUser, navigate, redirectFromState]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      toast.success('Password reset instructions sent to your email');
    } catch (err) {
      setError(err.message);
      console.error('Forgot password error:', err);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/${provider}`;
  };

  if (forgotPasswordMode) {
    return (
      <div className="bg-gray" id="forgot-password">
        <div className="flex flex-col items-center justify-center pt-44 pb-20">
          <p className="text-4xl poppins-bold text-brown">Forgot Password</p>
          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col items-center space-y-4"
          >
            <div>
              <p className="text-sm poppins-regular">Email address</p>
              <input
                className="border border-line rounded-xl py-3 lg:px-32 px-14 bg-gray"
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-brown border border-line text-white poppins-regular rounded-3xl py-3 lg:px-32 px-14"
            >
              Send Reset Instructions
            </button>
            <button
              type="button"
              onClick={() => setForgotPasswordMode(false)}
              className="text-brown underline mt-2"
            >
              Back to Login
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray" id="signin">
      <div>
        <div
          className="flex flex-col lg:space-y-4 space-y-1 items-center justify-center md:pt-36 py-5 pt-32"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="500"
        >
          <p className="text-center text-wrap justify-center lg:py-10 py-5 md:text-3xl text-2xl poppins-bold text-brown">
            Log in to your account
          </p>
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
        <div
          className="flex flex-row justify-center items-center"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="4000"
        >
          <div className="h-0 lg:w-52 w-44 border border-line"></div>
          <p className="text-xl font-bold p-2">OR</p>
          <div className="h-0 lg:w-52 w-44 border border-line"></div>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center space-y-3"
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay="2000"
        >
          <div className="lg:py-8 py-4">
            <p className="text-sm poppins-regular ">Email address</p>
            <input
              className="border border-line rounded-xl py-3 lg:px-32 px-14 bg-gray"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <p className="text-sm poppins-regular ">Password</p>
              <div className="flex flex-row">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={hide} alt="Toggle Password Visibility" />
                </button>
                <p className="text-sm">{showPassword ? "Hide" : "Show"}</p>
              </div>
            </div>
            <input
              className="border border-line rounded-xl py-3 lg:px-32 px-14 bg-gray"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setForgotPasswordMode(true)}
              className=" poppins-regular text-sm cursor-pointer font-bold underline underline-offset-4 text-right"
            >
              Forget your password
            </button>
          </div>
          <div className="flex items-left lg:py-5 py-2">
            <input
              id="keep-signed-in"
              type="checkbox"
              className="w-4 h-4 text-brown bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-brown"
            />
            <label
              htmlFor="keep-signed-in"
              className="ms-2 text-sm poppins-regular text-gray-900"
            >
              Keep me signed in until I sign out
            </label>
          </div>
          <button
            type="submit"
            className="bg-brown border border-line text-white poppins-regular rounded-3xl py-3 lg:px-32 px-14"
          >
            Log in
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex flex-row justify-center items-center">
            <div className="h-0 lg:w-56 w-44 border border-line"></div>
            <div className="h-0 lg:w-60 w-48 border border-line"></div>
          </div>
          <p className="text-center poppins-regular justify-center lg:py-10 py-5 lg:text-3xl text-xl text-brown">
            Don&apos;t have an account?
          </p>
          <div className="lg:pb-10 pb-4">
            <button 
              type="button"
              className="bg-gray border border-line text-brown poppins-regular rounded-3xl items-center justify-center py-3 lg:px-32 px-14"
              onClick={() => navigate('/Signup')}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
