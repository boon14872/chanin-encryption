"use client";
import { Email, Key } from "@styled-icons/material-twotone";
import { SHA256 } from "crypto-js";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type FormData = {
  email: string;
  password: string;
};

export default function Home() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const admin = {
    email: process.env.ADMIN_EMAIL || "admin@gmail.com",
    password: process.env.ADMIN_PASSWORD || "admin",
  };

  const hashAdmin = {
    email: admin.email,
    password: SHA256(
      admin.password + process.env.SALT || "admin" + "salt"
    ).toString(),
  };

  // validate email and password
  const validate = (data: FormData) => {
    if (!data.email || !data.password) return false;
    const password = SHA256(
      data.password + process.env.SALT || "password" + "salt"
    ).toString();
    if (data.email === hashAdmin.email && password === hashAdmin.password) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (validate(data)) {
      alert("success");
    } else {
      setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <main className="">
      <div className="relative sm:max-w-xl sm:mx-auto py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-300 to-violet-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-5xl font-semibold">
                ยินดีต้อนรับเข้าสู่ระบบการเข้ารหัสข้อมูล
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* email and password form using react hook form with label on top of input using flex*/}
                <form
                  method="post"
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="w-full">
                    <div className="relative w-full min-w-[200px] h-full">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div>
                          <Email size={30} />
                        </div>
                        <div className="relative w-full">
                          <input
                            className={
                              errors.email
                                ? `peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-red-400 focus:border-red-500`
                                : `peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900`
                            }
                            placeholder=" "
                            {...register("email", {
                              required: true,
                              pattern:
                                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            })}
                          />
                          <label
                            className={`flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-violet-900 after:border-blue-violet-200 peer-focus:after:!border-violet-900 `}
                          >
                            Email
                          </label>
                        </div>
                      </div>
                      {/* error */}
                      {errors.email && (
                        <span className="text-red-500 text-sm pl-10">
                          กรุณากรอกอีเมลให้ถูกต้อง
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="relative w-full min-w-[200px] h-full">
                      <div className="flex flex-row justify-start items-center gap-2">
                        <div>
                          <Key size={30} />
                        </div>
                        <div className="flex relative w-full">
                          <input
                            className={
                              errors.password
                                ? `peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-red-400 focus:border-red-500`
                                : `peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900`
                            }
                            placeholder=" "
                            type="password"
                            {...register("password", {
                              required: true,
                            })}
                          />
                          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-violet-900 after:border-blue-violet-200 peer-focus:after:!border-violet-900">
                            Password
                          </label>
                        </div>
                      </div>
                      {/* error */}
                      {errors.password && (
                        <span className="text-red-500 text-sm pl-10">
                          กรุณาระบุรหัสผ่าน
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative flex flex-col gap-3">
                    <button
                      className="bg-violet-500 text-white rounded-md py-1 mt-4 text-xl px-4
                          hover:bg-violet-900 transition-all
                          disabled:bg-gray-400 disabled:cursor-not-allowed
                          shadow-md disabled:shadow-none
                          border-2 border-transparent disabled:border-gray-400
                          focus:outline-none focus:ring-2 focus:ring-violet-900 focus:ring-offset-2 focus:ring-offset-violet-300
                          "
                      type="submit"
                    >
                      เข้าสู่ระบบ
                    </button>
                    {/* error message */}
                    {error && (
                      <span className="text-red-500 text-base">{error}</span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
