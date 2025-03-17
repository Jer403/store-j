import {
  CheckCircle2,
  CircleDashed,
  LucideCheckCircle2,
  XCircle,
  EyeIcon,
  EyeOff,
} from "lucide-react";
import { MouseEvent, useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../App.css";
import { getUrlParam, replaceString } from "../utils";
import { useCart } from "../hooks/useCart";
import { LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";
import { useChat } from "../hooks/useChat";
import { useSocket } from "../hooks/useSocket";
import { UserInterface } from "../types";
import { GoogleButton } from "../components/GoogleButton";
import { ODivisor } from "../components/ODivisor";

interface SubmitClickProps {
  e: MouseEvent;
}

interface AxiosResult {
  status: number;
  response: { data: [] };
}

export default function Login() {
  const [eyeVisible, setEyeVisible] = useState<boolean>(false);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [requestErrors, setRequestErrors] = useState<string[]>([]);

  const [valEmail, setValEmail] = useState<boolean | null>(null);
  const [valPassword, setValpassword] = useState<boolean | null>(null);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [passShake, setPassShake] = useState<boolean>(false);
  const [emailShake, setEmailShake] = useState<boolean>(false);

  const [remeberme, setRemeberme] = useState<boolean>(false);

  const { signIn, logged } = useAuth();
  const { preferences } = usePreferences();
  const { loadCart, loadPurchased } = useCart();
  const { loadMessages } = useChat();
  const navigate = useNavigate();
  const errorIdKey = useId();
  const { connectUserToMessageChannel } = useSocket();

  const submitClickHandler = async ({ e }: SubmitClickProps) => {
    e.preventDefault();
    console.log("Starting auth request");

    if (valEmail == true && valPassword == true) {
      setLoadingSubmit(true);
      console.log("All fine for auth");
      try {
        const res = (await signIn({
          email,
          password,
          remember: remeberme,
        })) as AxiosResult;
        console.log(res);

        if (res.status == 200) {
          const userInfo = res.response.data as unknown as UserInterface;
          setDataToDefault();
          setSuccess(true);
          connectUserToMessageChannel(userInfo);
        } else {
          setRequestErrors(res.response.data);
        }
      } catch (error) {
        console.log(error);
        setRequestErrors(["Something went wrong"]);
      } finally {
        setLoadingSubmit(false);
      }
    } else {
      if (valEmail != true) {
        setEmailShake(true);
        setTimeout(() => {
          setEmailShake(false);
        }, 500);
        setValEmail(false);
      }
      if (valPassword != true) {
        setPassShake(true);
        setTimeout(() => {
          setPassShake(false);
        }, 500);
        setValpassword(false);
      }
    }
    setLoadingSubmit(false);
  };

  useEffect(() => {
    const error = getUrlParam("error");
    if (error) {
      setRequestErrors([error]);
    }
  }, []);

  useEffect(() => {
    if (logged) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let path = replaceString(urlParams.get("path"), "-", "/");
      if (path == "") path = "/";
      loadCart();
      loadPurchased();
      loadMessages();
      navigate(`${path}`);
    }
  }, [loadCart, loadMessages, loadPurchased, logged, navigate]);

  const setDataToDefault = () => {
    setEmail("");
    setPassword("");
    setRequestErrors([]);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValEmail(emailRegex.test(value));
  };

  const validatePassword = (value: string) => {
    if (value.length >= 6) {
      setValpassword(true);
    } else {
      setValpassword(false);
    }
  };

  return (
    <div className="min-h-screen-minus-64 dottedBackground flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[--text_light_0]">
            {LANGUAGE.LOGIN.TITLE[preferences.language]}
          </h2>
        </div>
        <div className="bg-[--bg_sec] rounded-lg shadow-md p-7">
          <form className=" space-y-7">
            <div className="rounded-md shadow-sm -space-y-px gap-3 flex flex-col">
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  {LANGUAGE.LOGIN.EMAIL[preferences.language]}
                </label>
                <label
                  htmlFor="email-address"
                  className="text-md text-[--text_light_300]"
                >
                  {LANGUAGE.LOGIN.EMAIL[preferences.language]}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  className={`${
                    emailShake && "shake !border-[--wrong]"
                  } appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border bg-[--bg_sec] text-[--text_light_0] border-[--border_light_500] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
                />
                <div
                  className={`absolute group w-6 h-6 check ${
                    valEmail == null && "hidden"
                  }`}
                  style={{
                    color: valEmail ? "var(--good)" : "var(--wrong)",
                  }}
                >
                  {valEmail ? (
                    <LucideCheckCircle2></LucideCheckCircle2>
                  ) : (
                    <XCircle></XCircle>
                  )}

                  <span className="tooltiptext group-hover:visible max-w-[80vw] after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm shadow-[--shadow_light_600] text-[--text_light_0] bg-[--bg_light_800] after:border-r-[--bg_light_800]">
                    {valEmail
                      ? LANGUAGE.LOGIN.EMAIL_VALID[preferences.language]
                      : LANGUAGE.LOGIN.EMAIL_NOT_VALID[preferences.language]}
                  </span>
                </div>
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  {LANGUAGE.LOGIN.PASS[preferences.language]}
                </label>
                <label
                  htmlFor="password"
                  className="text-md text-[--text_light_300]"
                >
                  {LANGUAGE.LOGIN.PASS[preferences.language]}
                </label>
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onMouseEnter={() => setEyeVisible(true)}
                  onMouseLeave={() => setEyeVisible(false)}
                  className={`${
                    passShake && "shake !border-[--wrong]"
                  } appearance-non text-md h-12 mt-1 rounded-md relative block w-full px-3 py-2 border bg-[--bg_sec] border-[--border_light_500] text-[--text_light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
                />
                <div className="absolute w-6 h-6 eye" style={{ color: "#111" }}>
                  <button
                    className="flex justify-center items-center"
                    onMouseEnter={() => setEyeVisible(true)}
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    {passwordVisible ? (
                      <EyeOff
                        className={`text-white ${
                          eyeVisible ? "sm:block" : "sm:hidden"
                        }`}
                      ></EyeOff>
                    ) : (
                      <EyeIcon
                        className={`text-white block ${
                          eyeVisible ? "sm:block" : "sm:hidden"
                        }`}
                      ></EyeIcon>
                    )}
                  </button>
                </div>

                <div
                  className={`absolute group w-6 h-6 check ${
                    valPassword == null && "hidden"
                  }`}
                  style={{
                    color: valPassword ? "var(--good)" : "var(--wrong)",
                  }}
                >
                  {valPassword ? (
                    <LucideCheckCircle2></LucideCheckCircle2>
                  ) : (
                    <XCircle></XCircle>
                  )}

                  <span className="tooltiptext group-hover:visible max-w-[80vw] after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm  shadow-[--shadow_light_600] text-[--text_light_0] bg-[--bg_light_800] after:border-r-[--bg_light_800]">
                    {valPassword
                      ? LANGUAGE.LOGIN.PASS_VALID[preferences.language]
                      : LANGUAGE.LOGIN.PASS_NOT_VALID[preferences.language]}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-between"
              style={{ display: requestErrors.length == 0 ? "none" : "block" }}
            >
              <div className="flex items-center">
                {requestErrors.map((item) => (
                  <p
                    key={errorIdKey}
                    className="block text-sm"
                    style={{ color: "var(--wrong)" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-col">
              <div className="flex flex-col md:flex-row items-start gap-2 md:items-center justify-between w-full">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    onChange={() => setRemeberme(!remeberme)}
                    className="h-4 w-4 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm md:text-base text-[--text_light_300]"
                  >
                    {LANGUAGE.LOGIN.REMEMBERME[preferences.language]}
                  </label>
                </div>

                <div className="hidden">
                  <a
                    href="#"
                    className="font-medium text-sm md:text:base text-[--button] hover:text-[--button_hover]"
                  >
                    {LANGUAGE.LOGIN.FORGOT[preferences.language]}
                  </a>
                </div>
                <div className="text-sm md:text:base">
                  <Link
                    to="/register"
                    className="font-medium text-sm md:text-base text-[--button] hover:text-[--button_hover]"
                  >
                    {LANGUAGE.LOGIN.DONT_HAVE_ACCOUNT[preferences.language]}
                  </Link>
                </div>
              </div>
              <div className="hidden items-center justify-end w-full"></div>
            </div>

            <div>
              <button
                type="submit"
                className={`${
                  !valEmail || !valPassword
                    ? "cursor-not-allowed bg-[--button_not_allowed]"
                    : "bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--button]"
                } group h-12 relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-[--text_light_0]`}
                onClick={(e) => {
                  submitClickHandler({ e });
                }}
              >
                {loadingSubmit ? (
                  <CircleDashed className="loader" />
                ) : (
                  <span>{LANGUAGE.LOGIN.SIGNIN[preferences.language]}</span>
                )}
                {success && <CheckCircle2 style={{ color: "white" }} />}
              </button>
            </div>
          </form>

          <ODivisor></ODivisor>

          <GoogleButton
            text={LANGUAGE.LOGIN.SIGNIN_GOOGLE[preferences.language]}
            url={`https://modelfantasy.up.railway.app/app/auth/google`}
            disabled={loadingSubmit}
          ></GoogleButton>
        </div>
      </div>
    </div>
  );
}
