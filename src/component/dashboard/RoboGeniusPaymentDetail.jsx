import LeftNav from "./leftNav";
import { useState } from "react";

const RoboGeniusPaymentDetail = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    companyName: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    phone: "",
    postalCode: "",
    deliveryInstruction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Add form submission logic here
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row bg-[#ebe5e2]  pt-44 md:pt-2 px-2 md:px-20 ">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <LeftNav />
      </div>

      {/* Invoice Section */}
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-12">Edit Payment Details</h1>
        <div className="flex flex-col space-y-4 sm:space-y-5 bg-white rounded-xl p-4 sm:p-5 shadow-lg w-full sm:w-[70vw] md:w-[50vw] lg:w-[35vw] xl:w-[25vw] mb-8 sm:mb-10 md:mb-14">
    <div className="space-y-6 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center gap-4 sm:gap-6">
        <p className="text-lg sm:text-xl md:text-xl font-medium tracking-wider sm:tracking-widest">
          **** **** **** 8976
        </p>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 text-base sm:text-lg text-gray-600">
        <span>VALID THRU</span>
        <span>01/29</span>
        <span>CVV</span>
        <span>**5</span>
      </div>
      <p className="font-semibold text-base sm:text-lg mt-3 sm:mt-4">Parent Name</p>
    </div>
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="ParentFirstName"
              className="block text-xl poppins-light text-gray-700 font-bold"
            >
              Name on Card
            </label>
            <input
              type="text"
              name="ParentFirstName"
              id="ParentFirstName"
              value={form.ParentFirstName}
              onChange={handleChange}
              className=" p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Name on Card"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              htmlFor="ParentLastName"
              className="block text-xl poppins-light text-gray-700 font-bold"
            >
              Card Number
            </label>
            <input
              type="text"
              name="ParentLastName"
              id="ParentLastName"
              value={form.ParentLastName}
              onChange={handleChange}
              className=" p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Card Number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ParentFirstName"
              className="block text-xl poppins-light text-gray-700 font-bold"
            >
              Card Expire
            </label>
            <input
              type="text"
              name="ParentFirstName"
              id="ParentFirstName"
              value={form.ParentFirstName}
              onChange={handleChange}
              className=" p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Card Expire"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ParentFirstName"
              className="block text-xl poppins-light text-gray-700 font-bold "
            >
              CVV
            </label>
            <input
              type="text"
              name="ParentFirstName"
              id="ParentFirstName"
              value={form.ParentFirstName}
              onChange={handleChange}
              className=" p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="CVV"
              required
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold my-8">Contact Information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="ParentFirstName"
              className="block text-xl poppins-light text-gray-700 font-bold"
            >
              Email
            </label>
            <input
              type="text"
              name="ParentFirstName"
              id="ParentFirstName"
              value={form.ParentFirstName}
              onChange={handleChange}
              className=" p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Email"
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              htmlFor="ParentLastName"
              className="block text-xl poppins-light text-gray-700 font-bold"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="ParentLastName"
              id="ParentLastName"
              value={form.ParentLastName}
              onChange={handleChange}
              className=" p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Phone Number"
              required
            />
          </div>
        </div>

        <div className="flex  justify-between my-6">
        <div className="flex space-x-4 my-6">
          {/* Cancel */}

          <button
            type="button"
            className="bg-white text-gray-700 py-2 px-4 poppins-light rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Delete
          </button>
        </div>
        <div className="flex space-x-4 my-6">
          {/* Cancel */}

          <button
            type="button"
            className="bg-white text-gray-700 py-2 px-4 poppins-light rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            className="bg-brown text-white py-2 px-4 poppins-light rounded-md shadow-sm hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown"
          >
            Save
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default RoboGeniusPaymentDetail;
