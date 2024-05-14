import { useForm } from "react-hook-form";
import services from "../../services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation as login } from "./validations/";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button, PasswordInput } from "@mantine/core";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(login),
    defaultValues: {
      email: "paketmutfak@gmail.com", // Varsayılan e-posta değeri
      password: "paketmutfak123", // Varsayılan şifre değeri
    },
  });
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { auth } = useStore();

  useEffect(() => {
    if (auth.isLogged) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (data) => {
    setDisabled(true);
    const decoded = {
      email: data.email,
      isLogged: true,
      access_token: "PKTMTFKRDMNGMNT",
    };
    try {
      toast.success(t("notifications.success.login-message"), {
        duration: 3000,
      });

      auth.login(decoded.access_token, decoded);
      auth.setUserGet(decoded);
      auth.setUserGetLoading(false);
      setDisabled(false);
      navigate("/");
    } catch (error) {
      setDisabled(false);
      toast.error(t("notifications.error.message"), {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto w-auto flex items-center justify-center">
          <h1 className="text-4xl text-red-600 font-bold cursor-pointer">
            Paket Mutfak
          </h1>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white text-slate-700">
          {t("auth.login.title")}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 dark:text-white text-slate-700"
            >
              {t("auth.login.email")}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="block w-full rounded-md border-0 dark:bg-gray-800 bg-gray-300/70 py-1.5 px-1.5 dark:text-white text-slate-700 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 dark:text-white text-slate-700"
              >
                {t("auth.login.password")}
              </label>
            </div>
            <div className="mt-2">
              <PasswordInput
                {...register("password")}
                id="password"
                name="password"
                classNames={{
                  input:
                    "dark:!bg-gray-800 !bg-gray-300/100  !ring-1 !border-none !rounded-md ring-inset !ring-white/5 dark:!text-white !text-slate-700 focus:!ring-2 focus:!ring-inset focus:!ring-red-500 sm:text-sm sm:leading-6",
                  wrapper: "!bg-gray-800 rounded-md !text-white",
                  dropdown:
                    "!bg-white/5 !bg-gray-300/100   !border-none !rounded-md ring-inset !ring-white/5 dark:!text-white !text-slate-700 focus:!ring-2 focus:!ring-inset focus:!ring-red-500 sm:text-sm sm:leading-6",
                  option: "hover:bg-gray-700",
                }}
                autoComplete="password"
              />
              <p className="mt-2 text-sm text-red-600" id="password-error">
                {errors.password?.message}
              </p>
            </div>
          </div>

          <div>
            <Button
              disabled={disabled}
              color="red"
              type="submit"
              loading={disabled}
              radius={"md"}
              className="flex !w-full justify-center rounded-md dark:bg-red-600 bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm dark:hover:bg-red-500 hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              {t("auth.login.signin")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
