import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleHomeNavigate = () => {
    navigate("/");
  };
  return (
    <div className="h-screen max-h-full  p-2">
      <main className="grid min-h-full place-items-center rounded-lg bg-white dark:bg-slate-700/90 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("titles.not-found")}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-100">
            {t("descriptions.not-found")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleHomeNavigate}
              className="rounded-md bg-red-600 dark:bg-red-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {t("actions.go-back-home")}
            </button>
            <button className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Contact support <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
