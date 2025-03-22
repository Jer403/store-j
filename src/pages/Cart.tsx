import { useCart } from "../hooks/useCart";

import { CircleDashed, CreditCard, Trash2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { CartProduct, Preferences } from "../types";
import { usePreferences } from "../hooks/usePreferences";

export function CartProductItem({
  product,
  preferences,
  handleRemoveElement,
}: {
  product: CartProduct;
  preferences: Preferences;
  handleRemoveElement: (id: string) => void;
}) {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    console.log("Product from cart item: ", product[product.license]);
  }, [product]);

  return (
    <div className="w-full flex flex-row shadow-md p-4 bg-[--bg_sec] rounded-lg">
      <div>
        <img
          src={`${IMG_API_URL}${product.image}.webp`}
          alt={product.title}
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 text-[8px] aspect-video object-cover rounded-md border-2 border-[--border_light_500] text-[--text_light_900]"
        />
      </div>
      <div className="w-full ml-4 flex flex-row justify-between">
        <p className="w-full text-lg md:text-2xl flex items-start text-[--text_light_50]">
          {product.title}
        </p>
        <div className="flex flex-col-reverse justify-between items-end">
          <button
            className="w-20 h-7 px-1 flex flex-row items-center justify-center gap-1 text-sm font-medium rounded-md text-[--text_light_400] border border-[--border_light_400] hover:text-[--text_light_200] hover:border-[--border_light_200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            onClick={() => {
              handleRemoveElement(product.id);
              setLoadingSubmit(true);
            }}
          >
            {loadingSubmit ? (
              <CircleDashed className="h-4 w-4 loader text-[--text_light_100]" />
            ) : (
              <>
                <Trash2 className="h-4 w-4"></Trash2>
                {LANGUAGE.CART.DELETE[preferences.language]}
              </>
            )}
          </button>
          <p className="text-lg font-bold flex items-center text-[--text_light_200]">
            ${product[product.license]}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { state: cart, loadCart, removeFromCart, loadingCart } = useCart();
  const { preferences } = usePreferences();
  const itemsCId = useId();
  const titleCId = useId();
  const checkCId = useId();
  const cartCId = useId();
  const anyCId = useId();

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemoveElement = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="min-h-screen-minus-64 dottedBackground py-12">
      <div className="max-w-[1396px] mx-auto px-4">
        <div className="w-full">
          <h1
            key={titleCId}
            className="text-4xl font-bold text-center mb-8 text-[--text_light_0]"
          >
            {LANGUAGE.CART.TITLE[preferences.language]}
          </h1>
          <div
            key={cartCId}
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-2"
          >
            <div
              key={itemsCId}
              className={`w-full min-w-80 bg-[--bg_secs] rounded-lg shadow-mds px-4 flex flex-col gap-4 items-center relative`}
            >
              {loadingCart && cart.length == 0 ? (
                <p className="text-2xl text-[--text_light_0] flex justify-center">
                  {LANGUAGE.CART.LOADING[preferences.language]}
                </p>
              ) : cart.length > 0 ? (
                cart.map((product) => {
                  return (
                    <>
                      <CartProductItem
                        preferences={preferences}
                        key={"cr-" + product.id + checkCId}
                        product={product}
                        handleRemoveElement={handleRemoveElement}
                      ></CartProductItem>
                    </>
                  );
                })
              ) : (
                <>
                  <div
                    key={anyCId}
                    className="flex flex-col items-center justify-center"
                  >
                    <p className="text-xl text-[--text_light_50]">
                      {LANGUAGE.CART.ANY_PRODUCT[preferences.language]}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div
              key={checkCId}
              className="w-full min-w-80 md:max-w-72 lg:max-w-sm bg-[--bg_sec] rounded-lg shadow-md p-4 flex flex-col gap-1 max-h-[288px] md:sticky top-[88px]"
            >
              {loadingCart && (
                <CircleDashed className="loader h-6 w-6 absolute right-3 top-3 text-[--text_light_0]"></CircleDashed>
              )}
              <p className="text-2xl font-bold text-[--text_light_0]">
                {LANGUAGE.CART.SUMMARY[preferences.language]}
              </p>
              <p className="text-xl mb-2 flex justify-between text-[--text_light_200]">
                {LANGUAGE.CART.PRODUCT[preferences.language]}{" "}
                <span>{cart.length}</span>
              </p>
              <p className="text-xl border-t border-[--border_light_400] py-2 flex justify-between items-end text-[--text_light_100]">
                {LANGUAGE.CART.TOTAL[preferences.language]}{" "}
                <span className="font-bold">
                  ${cart.reduce((sum = 0, item) => sum + item[item.license], 0)}
                  .00
                </span>
              </p>

              <Link
                to={"/checkout"}
                className="text-[--text_light_700] hover:text-[--brand_color] mt-2"
              >
                <button
                  type="button"
                  disabled={cart.length == 0}
                  className={`px-4 py-2 w-full flex flex-row ${
                    cart.length == 0 &&
                    "cursor-not-allowed bg-[--button_not_allowed]"
                  } items-center justify-center gap-2 border border-transparent text-lg font-medium rounded-md text-[--text_light_900] bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--brand_color]`}
                >
                  <CreditCard></CreditCard>{" "}
                  {LANGUAGE.CART.PAY[preferences.language]}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// [&>*:nth-child(n+2)]:border-t [&>*:nth-child(n+2)]:border-gray-900
