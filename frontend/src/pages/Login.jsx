import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeState = () => {
    if (state === "Sign Up") {
      setState("Login");
    } else {
      setState("Sign Up");
    }
  };

  const SignUpHandler = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/v1/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("auth_token", responseData.token);
        window.location.replace("/");
      } else {
        const errorMessage = responseData.message || "An error occurred";
        toast.error(errorMessage);
        alert(errorMessage);

        if (responseData.errors) {
          toast.error(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const LoginHandler = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/v1/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("auth_token", responseData.token);
        window.location.replace("/");
      } else {
        const errorMessage = responseData.message || "An error occurred";
        toast.error(errorMessage);
        alert(errorMessage);

        if (responseData.errors) {
          toast.error(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer autoClose={1200} />
      <section className="mx-auto px-6 lg:px-20; flexCenter flex-col pt-32 dark:bg-[#1E201E]">
        <div className="max-w-[555px] h-[600px] rounded-md bg-white m-auto px-14 py-10 dark:bg-[#1E201E] dark:text-white dark:shadow dark:shadow-white">
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <h3 className="h3">{state}</h3>
            <div className="flex flex-col gap-4 mt-7">
              {state === "Sign Up" ? (
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Your Name"
                  className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl dark:ring-1 ring-slate-500"
                />
              ) : (
                ""
              )}
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Email Address"
                className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl dark:ring-1 ring-slate-500"
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Password"
                className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl dark:ring-1 ring-slate-500"
              />
            </div>
            <button
              onClick={() => {
                state === "Sign Up" ? SignUpHandler() : LoginHandler();
              }}
              className="btn_dark_rounded my-5 w-full dark:bg-white dark:text-black"
            >
              Continue
            </button>
            <p className="text-black font-bold dark:text-white">
              {state === "Sign Up"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                onClick={changeState}
                className="text-secondary underline cursor-pointer"
              >
                {state === "Sign Up" ? "Login" : "Sign Up"}
              </span>
            </p>
            <div className="flexCenter mt-6 gap-3">
              <input type="checkbox" className="w-6 h-4" />
              <p>
                By continuing, I agree to Shoptopia's Terms of Service & Privacy
                Policy.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
