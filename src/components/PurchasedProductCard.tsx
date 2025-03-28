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
    <div className="border border-[--border_light_400] rounded-lg p-4">
      <img
        src={`${IMG_API_URL}${product.image}.webp`}
        alt={product.title}
        draggable={false}
        className="w-full h-72 object-cover rounded-lg aspect-auto text-[--text_light_0] bg-[--bg_prim]"
      />
      <h3 className="mt-4 text-lg font-semibold text-[--text_light_0]">
        {product.title}
      </h3>
      <p className="text-sm mt-1  text-[--text_light_0]">{`${
        LANGUAGE.DASHBOARD.PURCHASED_AT[preferences.language]
      } ${createDateTextFromLanguage(preferences.language, date)}`}</p>
      <button className="mt-4 w-full bg-[--button] text-[--text_light_900] py-2 rounded-lg hover:bg-[--button_hover]">
        {LANGUAGE.DASHBOARD.DOWNLOAD[preferences.language]}
      </button>
    </div>
  );
}
