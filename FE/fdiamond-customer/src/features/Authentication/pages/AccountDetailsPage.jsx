import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
// import { useLocation, useNavigate, Link } from "react-router-dom";
import { updateUserAPI, loginAPI, loginGoogleAPI, getUser } from "../api/APIs";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { TailSpin } from "react-loader-spinner";
import AppLayout from "src/layout/AppLayout";

const AccountDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isGoogleAccount, setIsGoogleAccount] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [errors, setErrors] = useState({});
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Lấy dữ liệu người dùng từ getUser trong API
    const fetchUserData = async () => {
      try {
        const response = await getUser();
        if (response && response.data) {
          const userData = response.data.result;
          setUser(userData);
          setFormData({
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address || "",
            phoneNumber: userData.phoneNumber || "",
            password: "",
            newPassword: "",
            confirmPassword: "",
          });
          setIsGoogleAccount(userData.isGoogleAccount);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const labelTags =
    "text-base absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform" +
    " cursor-text select-none bg-white px-2 text-gray-400 duration-300 peer-placeholder-shown:top-1/2" +
    " peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 " +
    " peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600";

  const inputTags =
    "border-1 peer block w-full appearance-none" +
    " rounded-sm border border-gray-400 bg-transparent" +
    " p-4 text-base text-gray-900" +
    " focus:border-blue-600 focus:outline-none focus:ring-0";

  const errorTags = "text-red-600 text-[14px] w-full mb-4 rounded-sm";

  const handleTogglePassword = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = {};

    if (!isGoogleAccount && showPasswordFields) {
      const newPassword = formData.newPassword;
      const NewPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{6,}$/;
      if (!NewPasswordRegex.test(newPassword)) {
        newErrors.newPassword = `Password
            must be at least 6 characters long,
            include at least one uppercase letter, one digit, and one special character,
            and must not contain spaces.`;
      }
      if (
        formData.newPassword &&
        formData.newPassword !== formData.confirmPassword
      ) {
        newErrors.confirmPassword = "Confirmation password does not match!";
      }
    }

    const phoneNumber = formData.phoneNumber;
    const phoneNumberRegex = /^0\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      newErrors.phoneNumber = `Phone number
            must be 10 digits long, start with 0,
            and contain no spaces.`;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    const firstName = formData.firstName.trim().replace(/\s+/g, " ");
    if (!nameRegex.test(firstName)) {
      newErrors.name = "Name can only contain alphabetic characters.";
    }

    const lastName = formData.lastName.trim().replace(/\s+/g, " ");
    if (!nameRegex.test(lastName)) {
      newErrors.name = "Name can only contain alphabetic characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Chuẩn bị dữ liệu để gửi đi
    const dataToSend = {
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
    };

    if (!isGoogleAccount && showPasswordFields) {
      if (formData.password) {
        dataToSend.password = formData.password;
      }
      if (formData.newPassword) {
        dataToSend.newPassword = formData.newPassword;
        dataToSend.confirmPassword = formData.confirmPassword;
      }
    }

    try {
      console.log("Data being sent to API:", dataToSend); // Thêm logging ở đây
      const response = await updateUserAPI(dataToSend);

      if (response.status === 204) {
        const updatedUser = response.data.result;
        // localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccessMessage("Updated account details successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 6000);
      } else {
        const errorData = response.data;
        console.log("Error response data:", errorData);
        // Assuming the server sends an `errorMessages` field with an array of errors
        setErrors({ serverError: errorData.errorMessages.join(", ") });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessages
      ) {
        console.error("Error updating account:", error.response.data);
        setErrors({
          serverError: error.response.data.errorMessages.join(", "),
        });
      } else {
        console.error("Error updating account:", error);
        setErrors({
          serverError: "An error occurred during the update. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-center items-start py-14">
        <div className="flex flex-col items-center justify-center w-[31vw]">
          <p className="font-gantari uppercase text-center text-5xl font-[600] tracking-wide mb-5">
            ACCOUNT DETAILS
          </p>
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="flex flex-row gap-2">
              <div className="flex-1">
                <div className="relative w-full mb-3 font-gantari">
                  <input
                    className={inputTags}
                    placeholder=" "
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="firstName" className={labelTags}>
                    First Name
                  </label>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative w-full mb-3 font-gantari">
                  <input
                    className={inputTags}
                    placeholder=" "
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="lastName" className={labelTags}>
                    Last Name
                  </label>
                </div>
              </div>
            </div>
            {errors.name && <div className={errorTags}>{errors.name}</div>}
            <div className="relative w-full mb-3 font-gantari">
              <input
                className={inputTags}
                placeholder=" "
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="address" className={labelTags}>
                Address
              </label>
            </div>
            <div className="relative w-full mb-3 font-gantari">
              <input
                className={inputTags}
                placeholder=" "
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="phoneNumber" className={labelTags}>
                Phone
              </label>
            </div>
            {errors.phoneNumber && (
              <div className={errorTags}>{errors.phoneNumber}</div>
            )}
            <div className="relative w-full mb-3 font-gantari">
              <input
                className={inputTags}
                placeholder=" "
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                readOnly
              />
              <label htmlFor="userName" className={labelTags}>
                Email
              </label>
            </div>
            {!isGoogleAccount && (
              <>
                <button
                  type="button"
                  className="w-full text-white font-[600] text-center text-2xl rounded-sm p-4
                                        hover:bg-[#26265c] bg-[#000035] transition duration-300 ease-in-out mb-3"
                  onClick={() => setShowPasswordFields(!showPasswordFields)}
                >
                  {showPasswordFields
                    ? "Cancel Change Password"
                    : "Change Password"}
                </button>
                {showPasswordFields && (
                  <>
                    <div className="relative w-full mb-3 font-gantari">
                      <input
                        className={inputTags}
                        placeholder=" "
                        type={type}
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="password" className={labelTags}>
                        Password
                      </label>
                      <span onClick={handleTogglePassword}>
                        <Icon
                          className="absolute top-4 right-7 cursor-pointer"
                          icon={icon}
                          size={24}
                        />
                      </span>
                    </div>
                    <div className="relative w-full mb-3 font-gantari">
                      <input
                        className={inputTags}
                        placeholder=" "
                        type={type}
                        id="newPassword"
                        name="newPassword"
                        required
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="newPassword" className={labelTags}>
                        New Password
                      </label>
                    </div>
                    {errors.newPassword && (
                      <div className={errorTags}>{errors.newPassword}</div>
                    )}
                    <div className="relative w-full mb-3 font-gantari">
                      <input
                        className={inputTags}
                        placeholder=" "
                        type={type}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        required
                        onChange={handleInputChange}
                      />
                      <label htmlFor="confirmPassword" className={labelTags}>
                        Confirm Password
                      </label>
                    </div>
                    {errors.confirmPassword && (
                      <div className={errorTags}>{errors.confirmPassword}</div>
                    )}
                    {errors.serverError && (
                      <div className={errorTags}>{errors.serverError}</div>
                    )}
                    {/* {Object.keys(errors).length > 0 && (
                      <div className={errorTags}>
                        {Object.values(errors).map((error, index) => (
                          <div key={index}>{error}</div>
                        ))}
                      </div>
                    )} */}
                  </>
                )}
              </>
            )}

            {isLoading ? (
              <button
                type="submit"
                className="w-full text-center text-2xl rounded-sm p-4 
                                    bg-[#26265c] text-white transition duration-300 ease-in-out"
                disabled
              >
                <TailSpin
                  visible={true}
                  height="30"
                  color="#f8fafc"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperClass="flex flex-row justify-center"
                />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full text-white font-[600] text-center text-2xl rounded-sm p-4
                                    hover:bg-[#26265c] bg-[#000035] transition duration-300 ease-in-out "
              >
                Save Account Detail
              </button>
            )}
          </form>
          {successMessage && (
            <div className="mt-4 text-green-600 text-lg">{successMessage}</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AccountDetailsPage;
