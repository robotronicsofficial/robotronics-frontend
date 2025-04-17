import { useEffect, useState } from "react";
import LeftNav from "./leftNav";
import Intro from "../dashboard/intro";

const UserInfoIntro = () => {
  const [user, setUser] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const userData = sessionStorage.getItem("id");

  useEffect(() => {
    if (userData) {
      fetch(`http://localhost:8080/find/${userData}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data.data);
          setUpdatedData({
            name: data.data.username || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            password: data.data.password || "",
          });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userData]);

  const handleFieldEdit = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdateField = (field) => {
    const fieldValue = updatedData[field];
    fetch("http://localhost:8080/patchMe", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: userData,
        [field]: fieldValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.updatedUser) {
          setUser(data.updatedUser);
          setEditingField(null);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="bg-background min-h-screen  px-4 md:px-20">
      <Intro />
      <div className="flex flex-col lg:flex-row pt-40 md:pt-4" data-aos="fade-up" data-aos-duration="2000">
        <div className="w-full lg:w-1/3 ">
          <LeftNav />
        </div>

        <div className="w-full px-6 py-6 md:px-10">
          <div>
            <p className="text-xl lg:text-2xl poppins-bold mb-2">My Info</p>
            <p className="text-base lg:text-xl poppins-light">Contact Details</p>
          </div>

          <form>
            <ol className="flex flex-col space-y-6 mt-6 text-gray-600">
              {["name", "email", "phone", "password"].map((field, idx) => (
                <div key={idx}>
                  <p className="text-lightblack poppins-bold capitalize">Your {field}</p>
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    {editingField !== field ? (
                      <>
                        <p className="text-lightblack poppins-regular break-all">
                          {user[field === "name" ? "username" : field]}
                        </p>
                        <button
                          type="button"
                          className="text-brown hover:text-yellow poppins-bold"
                          onClick={() => handleFieldEdit(field)}
                        >
                          {field === "password" ? "Change" : "Edit"}
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={updatedData[field]}
                          onChange={handleInputChange}
                          className="border border-gray-300 px-3 py-2 rounded w-full max-w-sm"
                        />
                        <button
                          type="button"
                          className="px-4 py-2 bg-yellow-500 text-white rounded"
                          onClick={() => handleUpdateField(field)}
                        >
                          Save
                        </button>
                      </>
                    )}
                  </div>
                  <div className="w-full border border-lin mt-4"></div>
                </div>
              ))}
            </ol>
          </form>

          <div className="flex justify-between items-center mt-8">
            <p className="text-base lg:text-xl poppins-bold text-brown">Parent</p>
          </div>

          <div className="flex flex-wrap p-2 lg:p-5">
            <div key={user._id} className="w-full md:w-1/2 p-3">
              <div className="flex flex-col space-y-4 bg-white rounded-xl p-5 shadow-lg w-full">
                <p className="text-lightblack poppins-bold">{user.username}</p>
                <p className="text-lightblack poppins-bold">{user.email}</p>
                <p className="text-lightblack poppins-bold">{user.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoIntro;
