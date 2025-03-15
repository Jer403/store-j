import { LogOut, Package, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import PurchasedProducts from "./PurchasedProducts.tsx";
import { LANGUAGE } from "../consts.ts";
import { usePreferences } from "../hooks/usePreferences.tsx";
import { useChat } from "../hooks/useChat.tsx";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { clearCart, clearPurchased } = useCart();
  const { preferences } = usePreferences();
  const { setIsChatOpen, clearChat } = useChat();

  const handleLogOutClick = () => {
    signOut();
    clearCart();
    clearPurchased();
    setIsChatOpen(false);
    clearChat();
  };

  return (
    <div className="min-h-screen-minus-64 dottedBackground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <h2
                  className={`mt-4 ${
                    user
                      ? user.username.length > 10
                        ? user.username.length > 18
                          ? "text-lg"
                          : "text-xl"
                        : "text-3xl"
                      : "text-3xl"
                  } font-semibold dark:text-white`}
                >
                  {user?.username}
                </h2>
                <p className="text-gray-600 dark:text-gray-200 text-xl">
                  {user?.email}
                </p>
              </div>
              <nav className="mt-8">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 rounded-lg`}
                >
                  <Package className="h-5 w-5 mr-3" />
                  <>{LANGUAGE.DASHBOARD.MYITEMS[preferences.language]}</>
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg mt-2"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  <>{LANGUAGE.DASHBOARD.SETTINGS[preferences.language]}</>
                </Link>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg mt-2"
                  onClick={handleLogOutClick}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <>{LANGUAGE.DASHBOARD.LOGOUT[preferences.language]}</>
                </Link>
              </nav>
            </div>
          </div>
          <PurchasedProducts />
        </div>
      </div>
    </div>
  );
}
