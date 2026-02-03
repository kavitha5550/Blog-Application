import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import { ZustandStore } from "../Store/ZustandStore";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { InputField, form, ClearForm, loginUser } = ZustandStore();
  const navigate = useNavigate();

  useEffect(() => {
    ClearForm(); // reset old values
  }, []);

  const handleChange = (e) => {
    InputField(e.target.name, e.target.value);
  };

  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    const validUser = await loginUser(email, password);

    if (!validUser) {
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful! Redirecting...");

    setTimeout(() => {
      navigate("/layout");
    }, 3000);
    ClearForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <ToastContainer position="top-center" />
        <h1 className="flex items-center justify-between text-xl font-semibold mb-6">
          <div className="flex items-center gap-2">
            <User size={18} />
            Login
          </div>
          <ArrowLeft
            size={18}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={ClearForm}
            className="btn"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            className="btn"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <NavLink to="/" className="text-blue-500 underline">
            SignUp
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
