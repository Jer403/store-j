import { useCart } from "../hooks/useCart";
import { Product } from "../types";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";

export function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const { rate } = useCart();
  const { preferences } = usePreferences();

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col justify-between group hover:scale-105 bg-[--bg_light_900] shadow-[--shadow_light_500] rounded-xl shadow-md hover:shadow-lg transition-[box-shadow,transform] duration-200 focus:outline-none focus:ring-2 focus:ring-[--brand_color] focus:ring-offset-2"
    >
      <div className="aspect-video bg-[--bg_sec] rounded-t-xl">
        <img
          src={`${IMG_API_URL}${product.image}.webp`}
          alt={product.title}
          className="w-full h-full object-contain transform rounded-t-xl transition-transform duration-200"
        />
      </div>
      <div className="p-3 h-full flex justify-between">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-[--text_light_0] group-hover:text-[--brand_color] transition-colors">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[--brand_color] flex justify-start items-end gap-1">
            <span className="font-semibold text-lg">From</span>{" "}
            <span className="font-semibold text-lg">
              {LANGUAGE.CURRENCIES[preferences.currency]}
              {preferences.currency == "USD"
                ? rate == 1
                  ? product.personal
                  : Math.floor((product.personal / rate) * 100) / 100
                : product.personal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
