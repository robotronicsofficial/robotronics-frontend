import CustomerProduct from "../../component/shop/customerProduct";

import img from "../../assets/images/customerProduct.svg";
import { MdModeEdit,MdDelete  } from "react-icons/md";


import { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
const CustomerInfomation = ({ onNext }) => {
  const { currentUser } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentUser);
    try {
      if (!currentUser) {
        throw new Error('You must be logged in to save an address');
      }
  
      const API_URL = 'http://localhost:8080/api/addresses';
      const response = await fetch(API_URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          userId: currentUser._id // Include user ID explicitly
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save address');
      }
  
      const data = await response.json();
      console.log('Address saved:', data);
      // Show success message
    } catch (error) {
      console.error('Error saving address:', error);
      // Display error to user
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const products = [
    {
      id: 1,
      title: "MORDERN BLACK STANDING LEGO",
      description:
        "High-quality wireless headphones with noise-cancelling technology.",
      image: "https://example.com/images/wireless-headphones.jpg",
      price: 79.99,
      item: 2,
      category: "Electronics",
    },
    {
      id: 2,
      title: "MORDERN BLACK STANDING LEGO",
      description:
        "Lightweight running shoes designed for maximum comfort and performance.",
      image: "https://example.com/images/running-shoes.jpg",
      price: 59.99,
      item: 1,
      category: "Footwear",
    },
    {
      id: 3,
      title: "MORDERN BLACK STANDING LEGO",
      description:
        "High-quality wireless headphones with noise-cancelling technology.",
      image: "https://example.com/images/wireless-headphones.jpg",
      price: 79.99,
      item: 1,
      category: "Electronics",
    },
  ];

  return (
    <div className="lg:flex flex-row mt-20 bg-gray ">
      {/* left */}
      <div className="flex flex-col lg:w-4/5 pr-10">
          {/*Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6 bg-background max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm poppins-light text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm poppins-light text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Parent Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm poppins-light text-gray-700">
                      Country / Region
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      value={form.country}
                      onChange={handleChange}
                      className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Country / Region"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm poppins-light text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Company (optional)"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="streetAddress" className="block text-sm poppins-light text-gray-700">
                      Residential Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      value={form.streetAddress}
                      onChange={handleChange}
                      className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="House number and street name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm poppins-light text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={form.city}
                      onChange={handleChange}
                      className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      placeholder="Town / City"
                      required
                    />
                  </div>

                  <div>
                <label
                  htmlFor="state"
                  className="block text-sm poppins-light text-gray-700"
                >
                  State*
                </label>
                <select
                  name="state"
                  id="state"
                  value={form.state}
                  onChange={handleChange}
                  className=" p-3 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-yellow focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                >
                  <option value="" className="poppins-light">Select state</option>
                  <option value="BAL" className="poppins-light">Balochistan</option>
                  <option value="KP" className="poppins-light">Khyber Pakhtunkhwa</option>
                  <option value="PUN" className="poppins-light">Punjab</option>
                  <option value="ICT" className="poppins-light">Islamabad Capital Territory</option>
                  <option value="SIN" className="poppins-light">Sindh</option>
                </select>
              </div>
                
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm poppins-light text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm poppins-light text-gray-700">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Postal Code"
                    required
                  />
                </div>
                {/* Delivery Instruction */}
                <div>
                  <label
                    htmlFor="deliveryInstruction"
                    className=" block text-sm poppins-light text-gray-700"
                  >
                    Delivery Instruction
                  </label>
                  <textarea
                    name="deliveryInstruction"
                    id="deliveryInstruction"
                    value={form.deliveryInstruction}
                    onChange={handleChange}
                    className=" p-7 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Delivery Instruction">
                  </textarea>
                </div>
              </div>
            </form>
          </div>

        </div>
      
      {/* line */}
      <div className="px-1"data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
        <div className="h-full w-0 border border-[#D4D4D4]"></div>
      </div>
      {/* right */}






      <div
            className="lg:px-14 px-5 lg:p-8 p-4 lg:space-y-20 space-y-8 "
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-delay="4000"
          >
            {/* text */}
            <div className="lg:space-y-8 space-y-4">
              <p className="lg:text-4xl text-2xl poppins-bold">YOUR ORDER</p>
              <p className="text-sm text-line poppins-regular">
                Review all the products you want to buy
              </p>
            </div>
      
            {/* map product */}
            <div className="lg:space-y-5 space-y-2 poppins-extralight">
              {products.map((product) => {
                return (
                  // <CustomerProduct onNext={handleOpenPopup}
                  //   key={product.id}
                  //   title={product.title}
                  //   description={product.description}
                  //   image={product.image}
                  //   price={product.price}
                  //   item={product.item}
                  //   category={product.category}
                  // />

                  <div className="flex flex-row space-x-3" key={product.id}>
                        <div>
                          <img className="lg:h-20 lg:w-24" src={img} alt="" />
                        </div>
                        <div className="lg:text-base text-wrap text-sm flex flex-col gap-1">
                          <p className="font-bold">{product.title}</p>
                          <div className="flex gap-2">
                          <span>No of Childrens :  </span>
                          <p className="text-line"> {product.item}</p>
                          </div>
                  
                          <div className="flex  items-center gap-3">
                          <p className="font-bold">Pkr  {product.image}</p>
                          <MdModeEdit className="cursor-pointer"/>
                          <MdDelete className="text-red-600 cursor-pointer"  onClick={onNext}/>
                          </div>
                        </div>
                    </div>
















                );
              })}
            </div>
      
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform scale-95 animate-fadeIn relative w-[30vw] py-10">
                  {/* Close Button (X) */}
                  <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={handleClosePopup}
                  >
                    &times;
                  </button>
      
                  {/* Heart Icon */}
                  <div className="flex flex-col  items-center">
                    {/* <FaRegHeart className="text-yellow text-[4vw]" /> */}
      
                    {/* Message */}
      
                    <p className="text-4xl font-medium-center my-6 text-wrap text-center">Are you sure you want to delete this product?</p>
      
                    <p className="text-xl text-[#807D7E] mt-4 mb-6 text-wrap text-center">
                    This will delete product from the cart
                    </p>
      
                    {/* Home Button */}
                    <div className="flex gap-16">
                    <button
                      className="mt-4 px-4 py-2 text-red-600 rounded hover:bg-red-200 transition duration-200 w-24"
                      onClick={handleClosePopup}
                    >
                      YES
                    </button>
                    <button
                      className="mt-4 px-4 py-2 text-green-600 rounded hover:bg-green-200 transition duration-200 w-24"
                      onClick={handleClosePopup}
                    >
                      CANCEL
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
      
            {/* line  */}
            <div className="flex flex-col lg:py-5 py-2 ">
              <div className=" h-0 border border-lightgray  "></div>
            </div>
      
            {/* total bills */}
            <div className="justify-between lg:space-y-5 space-y-2  ">
              <div className="flex flex-row justify-between">
                <p className="text-sm poppins-light">Shipping</p>
                <p className="lg:text-xl text-sm poppins-bold">Pkr 1,125.00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-sm poppins-light">Discount 10%</p>
                <p className="text-sm poppins-bold">_</p>
              </div>
              <div className="flex flex-row  justify-between">
                <p className="text-sm poppins-light">Price</p>
                <p className="text-xl poppins-bold">Pkr 1,225.00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-sm poppins-light">Total Price</p>
                <p className="text-xl text-yellow poppins-bold">Pkr 1,725.00</p>
              </div>
              {/* line */}
              <div className="lg:space-y-3 space-y-1 lg:py-4 py-2">
                <div className="h-0 border border-lightgray "></div>
              </div>
              {/* button */}
              <div className="flex justify-center lg:py-4 py-2">
                {/* form submit buttom */}
                <button
                  type="submit"
                  className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5"
                  onClick={onNext}
                >
                  CONTINUE TO SHIPPING
                </button>
              </div>
            </div>
          </div>








      {/* <CustomerOrder onNext={onNext} /> */}
    </div>
  );
};

export default CustomerInfomation;
