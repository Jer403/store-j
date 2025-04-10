import { ChevronDown, CircleDashed, ShoppingCart } from "lucide-react";
import { CircleQuestion } from "./Elements/CircleQuestion";
import { LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";
import { License, Product } from "../types";
import { useState } from "react";
import { useCart } from "../hooks/useCart";

function AddButton({
  isInCart,
  loadingSubmit,
  handleAction,
}: {
  isInCart: boolean;
  loadingSubmit: boolean;
  handleAction: () => void;
}) {
  const { preferences } = usePreferences();
  return (
    <button
      className={`bg-[--button] hover:bg-[--button_hover] mt-2 items-center w-full justify-center gap-2 px-6 py-3 ${
        isInCart ? "hidden" : "flex"
      } text-[--text_light_900] rounded-xl  transition-colors`}
      onClick={handleAction}
      disabled={loadingSubmit}
    >
      {loadingSubmit ? (
        <CircleDashed className="h6- w-6 loader"></CircleDashed>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {LANGUAGE.PRODUCT_BUTTON.ADD[preferences.language]}
        </>
      )}
    </button>
  );
}

interface Props {
  isInCart: boolean;
  isInPurchased: boolean;
  loadingSubmit: boolean;
  product: Product;
  license: License;
  cartLicenseSelected: string | undefined | null;
  handleAction: () => void;
}

export function LicenseSelector({
  isInCart,
  isInPurchased,
  loadingSubmit,
  product,
  license,
  cartLicenseSelected,
  handleAction,
}: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { preferences } = usePreferences();
  const { rate } = useCart();
  return (
    <div
      className={`relative w-full flex-col p-4 rounded-xl h-fit bg-[--brand_color_900] border border-[--brand_color] ${
        isInPurchased
          ? "hidden"
          : cartLicenseSelected
          ? cartLicenseSelected == license
            ? "flex shadow-md"
            : "hidden"
          : "flex"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[--text_light_50]">
          {license == "personal" ? "Standard License" : "Commercial License"}
        </h2>
        <p className="text-[--text_light_50] font-bold text-xl">
          {LANGUAGE.CURRENCIES[preferences.currency]}
          {preferences.currency == "USD"
            ? rate == 1
              ? product[license]
              : Math.floor((product.personal / rate) * 100) / 100
            : product[license]}
        </p>
      </div>
      <div className="flex gap-2 mt-1 items-center">
        <p className="font-medium text-[--text_light_100]">License: </p>
        <span className="font-bold text-[--text_light_100]">Standard</span>
        <CircleQuestion className="h-5 w-5"></CircleQuestion>
      </div>
      <div>
        <h2
          className="cursor-pointer flex items-center justify-between font-medium text-[--text_light_100]"
          onClick={() => {
            setDetailsOpen(!detailsOpen);
          }}
        >
          Files{" "}
          <ChevronDown
            className={`h-5 w-5 ${
              detailsOpen ? "rotate-180" : "rotate-0"
            } transition-transform duration-500`}
          ></ChevronDown>
        </h2>
        <p
          className={`${
            detailsOpen ? "max-h-8" : "max-h-0"
          } transition-[max-height] pl-2 flex w-full font-bold text-[--text_light_100] justify-between duration-500 overflow-hidden`}
        >
          <span>modeltest</span>
          <span>.zip / 2.4MB</span>
        </p>
      </div>
      <AddButton
        loadingSubmit={loadingSubmit}
        isInCart={isInCart}
        handleAction={() => handleAction()}
      />
    </div>
  );
}
