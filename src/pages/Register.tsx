import { CheckCircle2, CircleDashed } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../hooks/useAuth";
import { LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";
import { ODivisor } from "../components/ODivisor";
import { GoogleButton } from "../components/GoogleButton";
import { InputText } from "../components/form/InputTextAuth";
import { InputPasswordRepeat } from "../components/form/InputPasswordRepeat";

interface SubmitClickProps {
  e: MouseEvent;
}

interface AxiosResult {
  status: number;
  response: { data: [] };
}

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const [valUsername, setValUsername] = useState<boolean | null>(null);
  const [valEmail, setValEmail] = useState<boolean | null>(null);
  const [valPassword, setValpassword] = useState<boolean | null>(null);

  const [requestErrors, setRequestErrors] = useState<[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const [nameShake, setNameShake] = useState<boolean>(false);
  const [emailShake, setEmailShake] = useState<boolean>(false);
  const [passShake, setPassShake] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [remeberme, setRemeberme] = useState<boolean>(false);

  const { signUp, logged, user } = useAuth();
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  let idCount = 0;

  const submitClickHandler = async ({ e }: SubmitClickProps) => {
    e.preventDefault();
    if (valUsername == true && valEmail == true && valPassword == true) {
      setLoadingSubmit(true);

      const res = (await signUp({
        username,
        email,
        password,
        remember: remeberme,
      })) as AxiosResult;

      if (res.status == 200) {
        setSuccess(true);
        setDataToDefault();
      } else {
        setRequestErrors(res.response.data);
      }
      setLoadingSubmit(false);
    } else {
      if (valUsername != true) {
        setNameShake(true);
        setTimeout(() => {
          setNameShake(false);
        }, 500);
        setValUsername(false);
      }
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
  };

  useEffect(() => {
    if (logged) navigate("/");
  }, [logged, navigate]);

  const validateUsername = (value: string) => {
    if (value.length >= 3) {
      setValUsername(true);
    } else {
      setValUsername(false);
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValEmail(emailRegex.test(value));
  };

  const validatePassword = (value: string, value2: string) => {
    if (value.length >= 6 && value2.length >= 6 && value == value2) {
      setValpassword(true);
    } else {
      setValpassword(false);
    }
  };

  const setDataToDefault = () => {
    setValUsername(null);
    setValEmail(null);
    setValpassword(null);
    setEmail("");
    setUsername("");
    setPassword("");
    setPassword2("");
  };

  return (
    <div className="min-h-screen-minus-64 dottedBackground flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {LANGUAGE.REGISTER.TITLE[preferences.language]}
          </h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-7 dark:bg-gray-900">
          <form className="space-y-7">
            <div className={`rounded-md shadow-sm -space-y-px `}>
              <InputText
                label={LANGUAGE.REGISTER.USERNAME[preferences.language]}
                id="username"
                name="username"
                type="text"
                required
                value={username}
                setValue={setUsername}
                validateValue={validateUsername}
                shake={nameShake}
                valValue={valUsername}
                val_valid={
                  LANGUAGE.REGISTER.USERNAME_VALID[preferences.language]
                }
                val_not_valid={
                  LANGUAGE.REGISTER.USERNAME_NOT_VALID[preferences.language]
                }
              />
              <InputText
                label={LANGUAGE.REGISTER.EMAIL[preferences.language]}
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                setValue={setEmail}
                validateValue={validateEmail}
                shake={emailShake}
                valValue={valEmail}
                val_valid={LANGUAGE.REGISTER.EMAIL_VALID[preferences.language]}
                val_not_valid={
                  LANGUAGE.REGISTER.EMAIL_NOT_VALID[preferences.language]
                }
              />

              <InputPasswordRepeat
                label1={LANGUAGE.REGISTER.PASS[preferences.language]}
                id1="password"
                name1="password"
                password1={password}
                label2={LANGUAGE.REGISTER.REPEAT_PASS[preferences.language]}
                id2="password2"
                name2="password2"
                password2={password2}
                setPassword1={setPassword}
                setPassword2={setPassword2}
                validatePassword={validatePassword}
                shake={passShake}
                valPassword={valPassword}
                pass_valid={LANGUAGE.REGISTER.PASS_VALID[preferences.language]}
                pass_not_valid={
                  LANGUAGE.REGISTER.PASS_NOT_VALID[preferences.language]
                }
                pass_not_match={
                  LANGUAGE.REGISTER.PASS_NOT_MATCH[preferences.language]
                }
              />
            </div>

            <div
              className="flex items-center justify-between"
              style={{ display: requestErrors.length == 0 ? "none" : "block" }}
            >
              <div className="flex items-center flex-col justify-start">
                {requestErrors.map((item) => (
                  <p
                    key={"r-" + (idCount += 1)}
                    className="block text-sm w-full"
                    style={{ color: "var(--wrong)" }}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  onChange={() => setRemeberme(!remeberme)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-md text-gray-900 dark:text-gray-100"
                >
                  {LANGUAGE.REGISTER.REMEMBERME[preferences.language]}
                </label>
              </div>

              <div className="text-md">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {user
                    ? LANGUAGE.REGISTER.ALREADY_ACCOUNT[
                        user.preferences.language
                      ]
                    : LANGUAGE.REGISTER.ALREADY_ACCOUNT.en}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={success || loadingSubmit}
                className={`${
                  (success ||
                    loadingSubmit ||
                    !valUsername ||
                    !valEmail ||
                    !valPassword) &&
                  "cursor-not-allowed"
                } group relative h-12 w-full items-center flex justify-center gap-2 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={(e) => {
                  submitClickHandler({ e });
                }}
              >
                {loadingSubmit ? (
                  <CircleDashed className="loader" />
                ) : (
                  <span>{LANGUAGE.REGISTER.SIGNUP[preferences.language]}</span>
                )}
                {success && <CheckCircle2 className="text-white" />}
              </button>
            </div>
          </form>

          <ODivisor></ODivisor>

          <GoogleButton
            text={LANGUAGE.LOGIN.SIGNIN_GOOGLE[preferences.language]}
            url={`https://3dcute.up.railway.app/app/auth/google`}
            disabled={loadingSubmit}
          ></GoogleButton>
        </div>
      </div>
    </div>
  );
}
