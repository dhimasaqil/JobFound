import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    profile_image: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    if (name === "name") {
      setInput({ ...input, name: value });
    } else if (name === "image") {
      setInput({ ...input, image: value });
    } else if (name === "email") {
      setInput({ ...input, email: value });
    } else {
      setInput({ ...input, password: value });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(input);
    let { name, image, email, password } = input;
    axios
      .post("https://dev-example.sanbercloud.com/api/register", {
        name,
        image,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate("/Login");
        // setFetchStatus(true);
      });
    setInput({
      name: "",
      image: "",
      email: "",
      password: "",
    });
    //
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900">
              Job
              <span className="mt-6 text-center font-normal text-5xl tracking-tight text-gray-900">
                Found
              </span>
            </h2>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label className="sr-only">Name</label>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={input.name}
                  required
                  className="relative block w-full appearance-none  mb-3 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="sr-only">Profile Image</label>
                <input
                  onChange={handleChange}
                  value={input.image}
                  name="image"
                  type="text"
                  required
                  placeholder="Link Profile Image"
                  className="relative block w-full appearance-none mb-3 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={input.email}
                  required
                  className="relative block w-full appearance-none mb-3  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  onChange={handleChange}
                  value={input.password}
                  name="password"
                  type="password"
                  required
                  className="relative block w-full appearance-none mb-3 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* Heroicon name: mini/lock-closed */}
                </span>
                Register
              </button>
            </div>
          </form>
          <button
            type="submit"
            className="group relative mt-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Link to={"/Login"}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Heroicon name: mini/lock-closed */}
              </span>
              Sign in
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
