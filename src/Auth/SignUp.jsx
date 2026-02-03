import React from "react";
import { Regex, UserPlus, ArrowLeft } from 'lucide-react';
import { ZustandStore } from "../Store/ZustandStore"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


const SignUp = () => {

  const { form, InputField, ClearForm, registerUser, loading } = ZustandStore();
  const navigate = useNavigate()

  const handleChange = (e) => {
    InputField(e.target.name, e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (form.email === "") {
      toast.error("Please enter email");
      return;
    }

    if (form.password === "") {
      toast.error("Please enter password");
      return;
    }



    try {
      await registerUser({
        email: form.email,
        password: String(form.password),
        username: form.email.split("@")[0] + Math.floor(Math.random() * 1000)
      });

      toast.success("Signup successful");
      ClearForm();
      navigate("/login");
    } catch (err) {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="flex items-center justify-between text-xl font-semibold mb-6">
          <div className="flex items-center gap-2">
            <UserPlus size={18} strokeWidth={2.5} />
            Sign Up
          </div>

          <ArrowLeft
            size={18}
            className="cursor-pointer text-gray-600 hover:text-black transition"
            onClick={() => navigate(-1)}
          />
        </h1>

        <form onSubmit={handleSignUp}>
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">
              Enter Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              placeholder="mock@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <label className="text-sm font-medium">
              Enter Your Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input"
              placeholder="mock@123"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={ClearForm}
              className="btn"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn"
              disabled={loading}
            >
              {loading ? (
                <div className="loader-container">
                  <span className="spinner"></span>
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <NavLink to="/login">
            Already have an account?{" "}
            <span className="underline text-blue-500">Login</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



