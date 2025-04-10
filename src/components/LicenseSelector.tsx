import { ShoppingCart } from "lucide-react";
import { CircleQuestion } from "./Elements/CircleQuestion";
import { LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";
import { License, Product } from "../types";

function AddButton({
  isInCart,
  handleAction,
}: {
  isInCart: boolean;
  handleAction: () => void;
}) {
  const { preferences } = usePreferences();
  return (
    <button
      className={`bg-[--button] hover:bg-[--button_hover] items-center w-full justify-center gap-2 px-6 py-3 ${
        isInCart ? "hidden" : "flex"
      } text-[--text_light_900] rounded-xl  transition-colors`}
      onClick={handleAction}
    >
      <ShoppingCart className="h-5 w-5" />
      {LANGUAGE.PRODUCT_BUTTON.ADD[preferences.language]}
    </button>
  );
}

interface Props {
  isInCart: boolean;
  isInPurchased: boolean;
  product: Product;
  license: License;
  cartLicenseSelected: string | undefined | null;
  handleAction: () => void;
}

export function LicenseSelector({
  isInCart,
  isInPurchased,
  product,
  license,
  cartLicenseSelected,
  handleAction,
}: Props) {
  return (
    <div
      className={`relative w-full flex-col p-4 rounded-xl h-fit border border-[--brand_color] ${
        isInPurchased
          ? "hidden"
          : cartLicenseSelected && cartLicenseSelected == license
          ? "flex shadow-md"
          : "hidden"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Personal</h2>
        <p>{product[license]}</p>
      </div>
      <div className="flex gap-2">
        <p>License: </p>
        <span>Standard</span>
        <CircleQuestion></CircleQuestion>
      </div>
      <AddButton isInCart={isInCart} handleAction={() => handleAction()} />
    </div>
  );
}
