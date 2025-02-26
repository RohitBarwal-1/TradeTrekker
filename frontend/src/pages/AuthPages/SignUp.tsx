import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import GridShape from "../../components/common/GridShape";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Checkbox from "../../components/form/input/Checkbox";
import PageMeta from "../../components/common/PageMeta";
import { signup } from "../../services/api"; // Import API call function

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    contact: "",
    is_staff: true, // Boolean, not string
    is_active: true, // Boolean, not string
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    console.log(formData)
    setError("");
    try {
      // Send request to backend
      await signup(
        formData.username,
        formData.fname,
        formData.lname,
        formData.email,
        formData.contact,
        formData.is_staff,
        formData.is_active,
        formData.password
      );

      alert("Signup successful! Redirecting to login...");
      navigate("/"); // Redirect to Login Page
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Sign Up | TradeTrekker" description="Create an account on TradeTrekker" />
      <div className="relative flex w-full h-screen overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex flex-col flex-1 p-6 rounded-2xl sm:border-0 sm:p-8">
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                Sign Up
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enter your details to create an account!
              </p>
            </div>

            {/* SIGNUP FORM */}
            <form onSubmit={handleSignup}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <Label>First Name<span className="text-error-500">*</span></Label>
                    <Input type="text" name="fname" placeholder="First Name" onChange={handleChange} />
                  </div>
                  {/* Last Name */}
                  <div>
                    <Label>Last Name<span className="text-error-500">*</span></Label>
                    <Input type="text" name="lname" placeholder="Last Name" onChange={handleChange} />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <Label>Username<span className="text-error-500">*</span></Label>
                  <Input type="text" name="username" placeholder="Enter your username" onChange={handleChange} />
                </div>

                {/* Email */}
                <div>
                  <Label>Email<span className="text-error-500">*</span></Label>
                  <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                </div>

                {/* Contact */}
                <div>
                  <Label>Contact<span className="text-error-500">*</span></Label>
                  <Input type="number" name="contact" placeholder="Enter your contact" onChange={handleChange} />
                </div>

                {/* Password */}
                <div>
                  <Label>Password<span className="text-error-500">*</span></Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} name="password" placeholder="Enter password" onChange={handleChange} />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                      {showPassword ? <EyeIcon className="fill-gray-500" /> : <EyeCloseIcon className="fill-gray-500" />}
                    </span>
                  </div>
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox className="w-5 h-5" checked={isChecked} onChange={setIsChecked} />
                  <p className="text-gray-500">
                    I agree to the <span className="text-brand-500">Terms & Conditions</span> and <span className="text-brand-500">Privacy Policy</span>
                  </p>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Submit Button */}
                <div>
                  <button type="submit" className="w-full px-4 py-3 text-white bg-brand-500 rounded-lg hover:bg-brand-600" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>

            {/* Redirect to Sign In */}
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-700">
                Already have an account?{" "}
                <Link to="/" className="text-brand-500 hover:text-brand-600">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-brand-950 dark:bg-white/5">
          <GridShape />
          <div className="max-w-xs">
            <Link to="/">
              <img src="./images/logo/auth-logo.svg" alt="Logo" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
