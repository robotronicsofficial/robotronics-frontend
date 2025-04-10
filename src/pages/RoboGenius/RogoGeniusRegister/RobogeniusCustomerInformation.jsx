import CustomerOrder from "../../../component/shop/customerOrder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';

const RobogeniusCustomerInformation = ({ onNext }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [parentForm, setParentForm] = useState({
    firstName: "",
    lastName: "",
    email: "", 
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

  const [childrenForms, setChildrenForms] = useState([
    {
      firstName: "",
      lastName: "",
      email: "", 
      dateOfBirth: "", 
      country: "",
      schoolName: "",
      streetAddress: "",
      city: "",
      phone: "", 
      postalCode: "",
    }
  ]);

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    setChildrenForms(prevForms => {
      const updatedForms = [...prevForms];
      updatedForms[index] = {
        ...updatedForms[index],
        [name]: value
      };
      return updatedForms;
    });
  };

  const addChildForm = () => {
    setChildrenForms(prevForms => [
      ...prevForms,
      {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        country: "",
        schoolName: "",
        streetAddress: "",
        city: "",
        phone: "",
        postalCode: "",
      }
    ]);
  };

  const removeChildForm = (index) => {
    if (childrenForms.length > 1) {
      setChildrenForms(prevForms => prevForms.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      parent: parentForm,
      children: childrenForms
    });
    // Add form submission logic here
  };

  const handleSave = async () => {
    try {
      // Combine all data
      const allData = {
        parent: {
          ...parentForm,
          userId: currentUser.userId  // Add current user ID if available
        },
        children: childrenForms
      };
  
      console.log("Saving data:", allData);
  
      const response = await fetch('http://localhost:8080/api/parents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${await currentUser.getIdToken()}` // If using Firebase auth
        },
        body: JSON.stringify(allData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save information');
      }
  
      console.log("Save successful:", data);
      // alert('Information saved successfully!');
      // Optionally navigate somewhere after save
      // navigate('/success-page');
  
    } catch (error) {
      console.error("Save error:", error);
      alert(`Error saving information: ${error.message}`);
    }
  };

  const renderChildForm = (child, index) => {
    return (
      <div key={index} className="w-full">
        <div className="space-y-5 px-12 py-8">
          <h1 className="text-4xl poppins-bold text-brown">
            Child {index + 1} Information
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`firstName-${index}`} className="block text-sm poppins-light text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id={`firstName-${index}`}
                value={child.firstName}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label htmlFor={`lastName-${index}`} className="block text-sm poppins-light text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id={`lastName-${index}`}
                value={child.lastName}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`email-${index}`} className="block text-sm poppins-light text-gray-700">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                id={`email-${index}`}
                value={child.email}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Child's Email"
              />
            </div>
            <div>
              <label htmlFor={`dateOfBirth-${index}`} className="block text-sm poppins-light text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id={`dateOfBirth-${index}`}
                value={child.dateOfBirth}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`country-${index}`} className="block text-sm poppins-light text-gray-700">
                Country / Region
              </label>
              <input
                type="text"
                name="country"
                id={`country-${index}`}
                value={child.country}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Country / Region"
                required
              />
            </div>
            <div>
              <label htmlFor={`schoolName-${index}`} className="block text-sm poppins-light text-gray-700">
                School Name
              </label>
              <input
                type="text"
                name="schoolName"
                id={`schoolName-${index}`}
                value={child.schoolName}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="School Name (optional)"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`streetAddress-${index}`} className="block text-sm poppins-light text-gray-700">
                House Address
              </label>
              <input
                type="text"
                name="streetAddress"
                id={`streetAddress-${index}`}
                value={child.streetAddress}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="House Address"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`city-${index}`} className="block text-sm poppins-light text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                id={`city-${index}`}
                value={child.city}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Town / City"
                required
              />
            </div>
            <div>
              <label htmlFor={`phone-${index}`} className="block text-sm poppins-light text-gray-700">
                Phone (Optional)
              </label>
              <input
                type="text"
                name="phone"
                id={`phone-${index}`}
                value={child.phone}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`postalCode-${index}`} className="block text-sm poppins-light text-gray-700">
                Postal Code*
              </label>
              <input
                type="text"
                name="postalCode"
                id={`postalCode-${index}`}
                value={child.postalCode}
                onChange={(e) => handleChildChange(index, e)}
                className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Postal Code"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            {index === childrenForms.length - 1 && (
              <button
                type="button"
                className="text-center lg:text-xl text-sm poppins-bold text-gold bg-brown py-2 lg:px-20 px-5"
                onClick={addChildForm}
              >
                ADD ANOTHER CHILD
              </button>
            )}
            
            {index > 0 && (
              <button
                type="button"
                className="text-center lg:text-xl text-sm poppins-bold text-white bg-red-500 py-2 lg:px-20 px-5 hover:bg-red-600"
                onClick={() => removeChildForm(index)}
              >
                DELETE CHILD
              </button>
            )}
          </div>

          {index === childrenForms.length - 1 && (
            <div className="mt-4 flex space-x-4">
              <button
                type="button"
                onClick={() => navigate("/Robogeniushome")}
                className="text-center lg:text-xl text-sm poppins-bold text-gray-700 bg-white py-2 lg:px-20 px-5 border border-gray-300 hover:bg-gray-50"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="text-center lg:text-xl text-sm poppins-bold text-white bg-green-600 py-2 lg:px-20 px-5 hover:bg-green-700"
              >
                SAVE INFORMATION
              </button>
            </div>
          )}
        </form>
      </div>
    );
  };

  return (
    <div>
      <div className="lg:flex flex-row bg-gray">
        <div className="flex flex-col lg:w-4/5">
          {/* Parent Form */}
          <div className="w-full">
            <div className="space-y-5 px-12 py-8">
              <h1 className="text-4xl poppins-bold text-brown">
                Parent Information
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm poppins-light text-gray-700">
                    Parent First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={parentForm.firstName}
                    onChange={handleParentChange}
                    className="p-3 px-5 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Parent First Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm poppins-light text-gray-700">
                    Parent Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={parentForm.lastName}
                    onChange={handleParentChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Parent Last Name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm poppins-light text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={parentForm.email}
                    onChange={handleParentChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Parent Email"
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
                    value={parentForm.country}
                    onChange={handleParentChange}
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
                    value={parentForm.companyName}
                    onChange={handleParentChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Company (optional)"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="streetAddress" className="block text-sm poppins-light text-gray-700">
                    Residential / School Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    value={parentForm.streetAddress}
                    onChange={handleParentChange}
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
                    value={parentForm.city}
                    onChange={handleParentChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Town / City"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm poppins-light text-gray-700">
                    State*
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={parentForm.state}
                    onChange={handleParentChange}
                    className="p-3 mt-1 block w-full border-gray-300 poppins-light rounded-md shadow-sm focus:border-yellow focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your state"
                    required
                  />
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
                    value={parentForm.phone}
                    onChange={handleParentChange}
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
                    value={parentForm.postalCode}
                    onChange={handleParentChange}
                    className="p-3 px-5 mt-1 block w-full poppins-light border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Postal Code"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Render all child forms */}
          {childrenForms.map((child, index) => renderChildForm(child, index))}
        </div>

        {/* line */}
        <div className="px-1" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="4000">
          <div className="h-full w-0 border border-brown"></div>
        </div>
        
        {/* right */}
        <CustomerOrder onNext={onNext} />
      </div>
    </div>
  );
};

export default RobogeniusCustomerInformation;