import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BRANDNAME, LANGUAGE } from "../consts";
import { useAuth } from "../hooks/useAuth";
import { StoreTest } from "./StoreTest";
import { usePreferences } from "../hooks/usePreferences";

export default function Welcome() {
  const { logged } = useAuth();
  const { preferences } = usePreferences();

  const clickHandler = () => {
    if (logged) {
      const element = document.querySelector("#store");
      if (element) {
        window.scrollTo({ behavior: "smooth", top: element.clientHeight - 64 });
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br h-[calc(100vh-64px)] flex items-center justify-center from-amber-100 via-[--bg_prim] to-orange-100">
        {/* Hero Section */}
        <div className="max-w-7xl flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-[--text_light_0] sm:text-5xl md:text-6xl">
              <span className="block">
                {LANGUAGE.WELCOME.HERO_WELCOME[preferences.language]}
              </span>
              <span className="block text-indigo-600 mt-1">{BRANDNAME}</span>
            </h1>
            <p className="mt-6 text-xl text-[--text_light_300] max-w-2xl mx-auto">
              {LANGUAGE.WELCOME.HERO_DESCRIPTION[preferences.language]}
            </p>
            <div className="mt-10 flex justify-center gap-3">
              <div className="relative">
                <div
                  className={`${
                    logged
                      ? "hidden"
                      : "rounded-full w-full grow-2 h-full top-0 px-6 md:px-4 py-2 flex z-20 bg-[--button] absolute"
                  }`}
                ></div>
                <Link
                  to={logged ? "#store" : "/login"}
                  className={`${
                    !logged && "palpite-1"
                  } inline-flex items-center relative px-6 py-3 border z-40 border-transparent text-base font-medium rounded-full text-[--text_light_900] bg-[--button] hover:bg-[--button_hover] transition-colors duration-200`}
                  onClick={() => clickHandler()}
                >
                  {logged ? (
                    <>
                      {LANGUAGE.WELCOME.HERO_BUTTON_SEE[preferences.language]}
                      <ArrowDown className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      {LANGUAGE.WELCOME.HERO_BUTTON_START[preferences.language]}
                      <ArrowRight className="ml-2 h-5 w-5"></ArrowRight>
                    </>
                  )}
                </Link>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-[--border_light_300] text-base font-medium rounded-full text-[--text_light_100] bg-[--bg_light_900] hover:bg-[--bg_light_700] transition-colors duration-200"
              >
                {LANGUAGE.WELCOME.HERO_BUTTON_CONTACT[preferences.language]}
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="pb-24" style={{ display: "none" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[--bg_light_0] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure Transactions
                </h3>
                <p className="text-gray-600">
                  Your purchases are protected with industry-leading security
                  measures.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Instant Delivery
                </h3>
                <p className="text-gray-600">
                  Get immediate access to your digital purchases after payment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-600">
                  All products are verified and tested for quality assurance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StoreTest></StoreTest>
    </>
  );
}
