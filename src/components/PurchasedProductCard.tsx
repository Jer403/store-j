import type { Preferences, PurchasedProduct } from "../types";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { createDateTextFromLanguage } from "../utils";

interface ProductCardProps {
  product: PurchasedProduct;
  preferences: Preferences;
}

export function PurchasedProductCard({
  product,
  preferences,
}: ProductCardProps) {
  const date = new Date(product.purchased_at);
  return (
    <div className="border dark:border-gray-700 rounded-lg p-4">
      <img
        src={`${IMG_API_URL}${product.image}.webp`}
        alt={product.title}
        draggable={false}
        className="w-full h-72 object-cover rounded-lg aspect-auto text-white bg-gray-950"
      />
      <h3 className="mt-4 text-lg font-semibold text-white">{product.title}</h3>
      <p className="text-sm mt-1  text-gray-200">{`${
        LANGUAGE.DASHBOARD.PURCHASED_AT[preferences.language]
      } ${createDateTextFromLanguage(preferences.language, date)}`}</p>
      <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        {LANGUAGE.DASHBOARD.DOWNLOAD[preferences.language]}
      </button>
    </div>
  );
}
