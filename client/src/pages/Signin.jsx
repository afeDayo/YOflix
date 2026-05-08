import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const Input = ({ type, placeholder, error, register, name }) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className={`relative w-full px-[15px] pt-0 pb-[18px] bg-[#161d2f] border-0 outline-0 text-[#ffffff] text-[15px] font-normal
          placeholder:text-[#5a698f] placeholder:text-[15px] placeholder:font-normal
          cursor-pointer
          focus:border-b-[#ffffff] focus:caret-[#fc4747]
          ${
            error
              ? "border-b-[1px] border-b-[#fc4747]"
              : "border-b-[1px] border-b-[#5a698f]"
          }`}
        {...register(name, { required: true })}
      />

      {error && error.type === "required" && (
        <span className="absolute text-[13px] font-light text-[#fc4747] top-[1px] right-[32px] mt-[5px]">
          Can't be empty
        </span>
      )}
    </div>
  );
};

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleLoginUser, authenticating } = useAuth();
  const btnText = authenticating ? "Loading" : "Login to your account";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleLoginUser(data);
  };

  return (
    <div className="mt-[83.99px]">
      <form
        className="relative bg-[#161d2f] mx-auto w-full max-w-[400px] p-[32px] rounded-[20px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="m-0 text-start text-[#ffffff] text-[32px] font-normal">
          Login
        </h1>

        <div className="mt-[40px] flex flex-col gap-[24px]">
          <Input
            type="text"
            placeholder="Email address"
            error={errors.email}
            register={register}
            name="email"
          />

          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              error={errors.password}
              register={register}
              name="password"
            />

            <button
              type="button"
              onClick={() => setPasswordVisible((v) => !v)}
              className="absolute right-[12px] top-[8px] text-[12px] text-[#5a698f] font-normal"
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={authenticating}
            className="w-full bg-[#fc4747] border-0 text-[#ffffff] text-[15px] font-normal py-[14.5px] rounded-[6px] hover:bg-[#ffffff] hover:text-[#10141e] disabled:opacity-60"
          >
            {btnText}
          </button>
        </div>

        <div className="mt-[24px] flex justify-center items-center gap-[8px]">
          <p className="m-0 text-[15px] font-normal text-[#ffffff]">
            Don't have an account?
          </p>
          <Link
            to="/signup"
            className="text-[15px] font-light text-[#fc4747] no-underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
