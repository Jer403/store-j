import { useCart } from "../hooks/useCart";
import { PurchasedProductCard } from "../components/PurchasedProductCard";
import { LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";

export default function PurchasedProducts() {
  const { purchased } = useCart();
  const { preferences } = usePreferences();

  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          {LANGUAGE.DASHBOARD.PURCHASED[preferences.language]}
        </h2>
        {purchased.length == 0 ? (
          <p className="text-xl flex dark:text-gray-200 justify-center">
            {LANGUAGE.DASHBOARD.ANYITEMS[preferences.language]}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchased.map((product) => (
              <PurchasedProductCard
                key={product.id}
                product={product}
                preferences={preferences}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
