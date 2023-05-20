import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="title">
        <h1 className="text-white text-4xl font-bold py-4 text-center ">
          Student Login
        </h1>
      </div>

      <section className="w-3/4 mx-auto flex flex-col gap-10 py-4">
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${
              formik.errors.email && formik.touched.email
                ? "border-rose-600 "
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              {...formik.getFieldProps("email")}
            />
          </div>

          <div
            className={`${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className="input"
              {...formik.getFieldProps("password")}
            />
          </div>
          <div className="input-button">
            <button type="submit" className="bg-orange-600 h-8 w-24 text-white">Login</button>
          </div>
        </form>
        <p className="text-center text-gray-400 font-semibold">
          don't have an account yet?{" "}
          <Link href={"/register"}>
            <a className="text-orange-900 font-semibold">Sign Up</a>
          </Link>
        </p>
      </section>
      <span className="credit text-white ">Developed by<a href='https://github.com/abhinavsaxena2308' className='text-orange-700' target="next"> Abhinav Saxena</a></span>
        </>
  );
}
