import { useState } from "react";

interface InputPasswordRepeatInterface {
  label1: string;
  label2: string;
  id1: string;
  id2: string;
  name1: string;
  name2: string;
  password1: string;
  password2: string;
  setPassword1: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  valPassword: boolean | null;
  validatePassword: (val1: string, val2: string) => void;
  shake: boolean;
  pass_valid: string;
  pass_not_valid: string;
  pass_not_match: string;
}

export function InputPasswordRepeat({
  label1,
  label2,
  id1,
  id2,
  name1,
  name2,
  password1,
  password2,
  setPassword1,
  setPassword2,
  valPassword,
  validatePassword,
  shake,
  pass_valid,
  pass_not_valid,
  pass_not_match,
}: InputPasswordRepeatInterface) {
  const [eyeVisible, setEyeVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      <div className="relative">
        <label htmlFor={id1} className="sr-only">
          {label1}
        </label>
        <label
          htmlFor={id1}
          className="text-md text-gray-500 dark:text-gray-300"
        >
          {label1}
        </label>
        <input
          id={id1}
          name={name1}
          type={passwordVisible ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password1}
          onChange={(e) => {
            setPassword1(e.target.value);
            validatePassword(e.target.value, password2);
          }}
          onMouseEnter={() => setEyeVisible(true)}
          onMouseLeave={() => setEyeVisible(false)}
          className={`${
            shake && "shake !border-[--wrong]"
          } appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border autofill:bg-gray-900 dark:bg-gray-900 dark:border-gray-500 dark:text-white border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
        />
        <div className="absolute w-6 h-6 eye">
          <button
            className="flex justify-center items-center"
            onMouseEnter={() => setEyeVisible(true)}
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`dark:text-white ${
                  eyeVisible ? "sm:block" : "sm:hidden"
                }`}
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`dark:text-white block ${
                  eyeVisible ? "sm:block" : "sm:hidden"
                }`}
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        <div
          className={`absolute w-6 h-6 pass-check ${
            valPassword == null && "hidden"
          } ${
            valPassword != null
              ? password1.length < 6
                ? "[&::before]:text-[--wrong]"
                : "[&::before]:text-[--good]"
              : "text-transparent"
          } ${
            valPassword != null
              ? password2.length < 6
                ? "[&::after]:text-[--wrong]"
                : "[&::after]:text-[--good]"
              : "text-transparent"
          } ${
            valPassword != null &&
            (valPassword ? "text-[--good]" : "text-[--wrong]")
          } group`}
        >
          {valPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m15 9-6 6"></path>
              <path d="m9 9 6 6"></path>
            </svg>
          )}

          <span className="tooltiptext group-hover:visible max-w-[80vw] after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm shadow-gray-300 dark:shadow-gray-600 text-gray-800 bg-gray-50 after:border-r-gray-50 dark:text-white dark:bg-gray-800 dark:after:border-r-gray-800">
            {valPassword
              ? pass_valid
              : password2.length < 6 || password2.length < 6
              ? pass_not_valid
              : pass_not_match}
          </span>
        </div>
      </div>
      <div className="relative">
        <label htmlFor={id2} className="sr-only">
          {label2}
        </label>
        <label
          htmlFor={id2}
          className="text-md text-gray-500 dark:text-gray-300"
        >
          {label2}
        </label>
        <input
          id={id2}
          name={name2}
          type={passwordVisible ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
            validatePassword(e.target.value, password1);
          }}
          onMouseEnter={() => setEyeVisible(true)}
          onMouseLeave={() => setEyeVisible(false)}
          className={`${
            shake && "shake !border-[--wrong]"
          } appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border autofill:bg-gray-900 dark:bg-gray-900 dark:border-gray-500 dark:text-white border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
        />
        <div className="absolute w-6 h-6 eye">
          <button
            className="flex justify-center items-center"
            onMouseEnter={() => setEyeVisible(true)}
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`dark:text-white ${
                  eyeVisible ? "sm:block" : "sm:hidden"
                }`}
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line x1="2" x2="22" y1="2" y2="22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`dark:text-white block ${
                  eyeVisible ? "sm:block" : "sm:hidden"
                }`}
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
