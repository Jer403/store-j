import { CircleDashed, LogIn, ShoppingCart, User } from "lucide-react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { Preferences } from "../types";
import { LANGUAGE } from "../consts";

interface UserButtonProps {
  logged: boolean;
  onClickEvent: MouseEventHandler;
  loading: boolean;
  preferences: Preferences;
}

export function UserButton({
  logged,
  preferences,
  loading,
  onClickEvent,
}: UserButtonProps) {
  return (
    <>
      {logged && (
        <Link
          to="/cart"
          className="text-gray-700 -mr-6 hover:text-indigo-600"
          onClick={onClickEvent}
        >
          <button
            type="button"
            className="rounded-full rounded-r-none px-6 md:px-4 py-2 sm:w-auto flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <>
              <ShoppingCart className="h-5 w-5"></ShoppingCart>{" "}
              <span className="hidden sm:block ">
                <>{LANGUAGE.NAVBAR.CART[preferences.language]}</>
              </span>
            </>
          </button>
        </Link>
      )}
      <Link
        to={loading ? "/" : logged ? "/dashboard" : "/login"}
        className="text-gray-700 hover:text-indigo-600"
        onClick={onClickEvent}
      >
        <button
          type="button"
          className={`${
            logged
              ? "rounded-full rounded-l-none border-l border-l-indigo-400"
              : "rounded-full"
          } px-6 md:px-4 py-2 w-auto flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? (
            <CircleDashed className="h-6 w-6 loader"></CircleDashed>
          ) : logged ? (
            <>
              <User className="h-5 w-5"></User>{" "}
              <span className="hidden sm:block ">
                <>{LANGUAGE.NAVBAR.DASHBOARD[preferences.language]}</>
              </span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5"></LogIn>
              <span className="hidden sm:block ">
                <>{LANGUAGE.NAVBAR.LOGIN[preferences.language]}</>
              </span>
            </>
          )}
        </button>
      </Link>
    </>
  );
}

// export function UserButton({ logged, onClickEvent }: UserButtonProps) {
//   return (
//     <>
//       {logged && (
//         <Link
//           to="/cart"
//           className="text-gray-700 hover:text-indigo-600"
//           onClick={onClickEvent}
//         >
//           <button
//             type="button"
//             className="px-4 py-2 w-14 flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-indigo-600   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <>
//               <ShoppingCart></ShoppingCart>
//             </>
//           </button>
//         </Link>
//       )}
//       <Link
//         to={logged ? "/dashboard" : "/login"}
//         className="text-gray-700 hover:text-indigo-600"
//         onClick={onClickEvent}
//       >
//         <button
//           type="button"
//           className="px-4 py-2 w-14 flex flex-row items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-indigo-600   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           {logged ? (
//             <>
//               <User></User>
//             </>
//           ) : (
//             <>
//               <LogIn width={18} height={24}></LogIn>Login
//             </>
//           )}
//         </button>
//       </Link>
//     </>
//   );
// }
