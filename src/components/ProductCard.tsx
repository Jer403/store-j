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
      className="relative flex flex-col justify-between group hover:scale-105 bg-gray-900 shadow-gray-800 rounded-xl shadow-md hover:shadow-lg transition-[box-shadow,transform] duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div className="aspect-video bg-gray-900 rounded-t-xl">
        <img
          src={`${IMG_API_URL}${product.image}.webp`}
          alt={product.title}
          className="w-full h-full object-contain transform rounded-t-xl transition-transform duration-200"
        />
      </div>
      <div className="p-3 h-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-white group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-indigo-600 flex justify-start items-end gap-1">
            <span className="font-semibold">From</span>
            <span className="font-semibold">
              {LANGUAGE.CURRENCIES[preferences.currency]}
              {preferences.currency == "USD"
                ? rate == 1
                  ? product.price
                  : Math.floor((product.price / rate) * 100) / 100
                : product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
