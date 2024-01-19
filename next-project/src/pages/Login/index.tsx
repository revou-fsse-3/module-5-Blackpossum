import Image from "next/image";
import COVER_IMAGE from "../../assets/markus-spiske-2G8mnFvH8xk-unsplash.jpg";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

interface LoginProps {}

const validationSchema = yup.object({
  email: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});


const Loginpage = () => {
  const navigate = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      const res = await axios.post(
        "https://mock-api.arikmpt.com/api/user/login",
        values
      );
      localStorage.setItem("token", res.data.data.token);
      navigate.push("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[25%] left-[10%] flex flex-col">
          <h1 className="text-4xl font-bold leading-7 text-white border-black sm:truncate sm:text-6xl sm:tracking-tight]">
            Your News App Portal
          </h1>
          <p className="text-2xl font-bold leading-7 text-white border-black sm:truncate sm:text-3xl sm:tracking-tight]">
            world trend and event in your pocket
          </p>
        </div>
        <Image
          src={COVER_IMAGE}
          alt="login-cover-page"
          className="my-2 mx-2 h-full rounded-xl border-4 object-cover"
        />
      </div>
        <div className="my-20 w-[800px] h-[400px] mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-4">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="border rounded p-2"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="border rounded p-2"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white py-2 rounded"
                  >
                    Login
                  </button>

                  <p className="text-center my-4">OR</p>

                  <button
                    type="submit"
                    onClick={() => navigate.push("/signup")}
                    className="border border-blue-500 text-blue-500 py-2 rounded"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default Loginpage;
