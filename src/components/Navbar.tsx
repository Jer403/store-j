import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "./UserButton.tsx";
import { HLine } from "./Elements/HLine.tsx";
import { useEffect, useRef, useState } from "react";
import { useUtils } from "../hooks/useUtils.tsx";
import { BRANDNAME, LANGUAGE, POSITIONS } from "../consts.ts";
import { useAuth } from "../hooks/useAuth.tsx";
import { usePreferences } from "../hooks/usePreferences.tsx";

const PlacesUser: string[] = ["/login", "/register", "/cart", "/checkout"];

// function Divisor() {
//   return <div className="border-l border-gray-400 h-5 mx-4"></div>;
// }

export function Navbar() {
  const { lineLeft, setLineLeftProperties } = useUtils();
  const { logged, loadingLog } = useAuth();
  const location = useLocation();
  const { preferences } = usePreferences();
  const [mobileLinksShown, setMobileLinksShown] = useState(false);
  const HomeRef = useRef<HTMLAnchorElement | null>(null);
  const AboutRef = useRef<HTMLAnchorElement | null>(null);
  const ContactRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (location.pathname == "/") {
      setLineLeftProperties({
        left: `${HomeRef.current?.offsetLeft}`,
        width: `${HomeRef.current?.offsetWidth}`,
      });
    } else if (PlacesUser.includes(location.pathname))
      setLineLeftProperties(POSITIONS.User);
    else if (location.pathname == "/about") {
      setLineLeftProperties({
        left: `${AboutRef.current?.offsetLeft}`,
        width: `${AboutRef.current?.offsetWidth}`,
      });
    } else if (location.pathname == "/contact")
      setLineLeftProperties({
        left: `${ContactRef.current?.offsetLeft}`,
        width: `${ContactRef.current?.offsetWidth}`,
      });
    else setLineLeftProperties(POSITIONS.User);
  }, [location]);

  return (
    <nav className="bg-white fixed top-0 z-[400] w-full dark:bg-gray-900">
      <div className="mx-auto px-4 bg-white dark:bg-gray-900 w-full relative z-20">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="font-bold text-xl text-indigo-600"
            onClick={() => setMobileLinksShown(false)}
          >
            <span>{BRANDNAME}</span>
          </Link>

          <div className="flex items-center justify-end gap-6 -ml-5">
            <div className="hidden md:flex items-center relative space-x-7">
              <Link
                to="/"
                className="text-gray-700 dark:text-white font-medium hover:text-indigo-600"
                onClick={() => {
                  setLineLeftProperties(POSITIONS.Home);
                  setMobileLinksShown(false);
                }}
              >
                <span ref={HomeRef}>
                  {LANGUAGE.NAVBAR.HOME[preferences.language]}
                </span>
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-white font-medium hover:text-indigo-600"
                onClick={() => {
                  setLineLeftProperties(POSITIONS.About);
                  setMobileLinksShown(false);
                }}
              >
                <span ref={AboutRef}>
                  {LANGUAGE.NAVBAR.ABOUT[preferences.language]}
                </span>
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-white font-medium hover:text-indigo-600"
                onClick={() => {
                  setLineLeftProperties(POSITIONS.Contact);
                  setMobileLinksShown(false);
                }}
              >
                <span ref={ContactRef}>
                  {LANGUAGE.NAVBAR.CONTACT[preferences.language]}
                </span>
              </Link>
              <HLine style={lineLeft} />
            </div>
            <UserButton
              logged={logged}
              loading={loadingLog}
              preferences={preferences}
              onClickEvent={() => {
                setLineLeftProperties(POSITIONS.User);
                setMobileLinksShown(false);
              }}
            />
            <button className="md:hidden dark:text-white">
              <div
                className="flex justify-center items-center"
                onClick={() => setMobileLinksShown(!mobileLinksShown)}
              >
                {mobileLinksShown ? (
                  <X className="h-8 w-8"></X>
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          mobileLinksShown ? "translate-y-0" : "-translate-y-full"
        } w-full absolute bg-white dark:bg-gray-900 h-auto p-4 z-0 transition-transform duration-300`}
      >
        <div className="flex flex-col justify-center md:hidden gap-1 items-end relative space-x-8">
          <Link
            to="/"
            className="text-gray-700 dark:text-white hover:text-indigo-600 text-xl"
            onClick={() => setMobileLinksShown(!mobileLinksShown)}
          >
            <>{LANGUAGE.NAVBAR.HOME[preferences.language]}</>
          </Link>
          <Link
            to="/about"
            className="text-gray-700 dark:text-white hover:text-indigo-600 text-xl"
            onClick={() => setMobileLinksShown(!mobileLinksShown)}
          >
            <>{LANGUAGE.NAVBAR.ABOUT[preferences.language]}</>
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-white hover:text-indigo-600 text-xl"
            onClick={() => setMobileLinksShown(!mobileLinksShown)}
          >
            <>{LANGUAGE.NAVBAR.CONTACT[preferences.language]}</>
          </Link>
        </div>
      </div>
    </nav>
  );
}
