import {
  CircleDashed,
  Download,
  LucideCircleDollarSign,
  ShoppingCart,
} from "lucide-react";
import { License, Product } from "../types";
import { useCart } from "../hooks/useCart";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LANGUAGE } from "../consts";
import { useAuth } from "../hooks/useAuth";
import { usePreferences } from "../hooks/usePreferences";
import { formatDateString } from "../utils";

export function ProductLicenseSelector({ product }: { product: Product }) {
  const { state: cart, purchased, addToCart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInPurchased, setIsInPurchased] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [license, setLicense] = useState<License>("personal");
  const { logged } = useAuth();
  const { preferences } = usePreferences();

  const checkProductInCart = useCallback(
    (product: Product) => {
      return cart.some((item) => item.id == product.id);
    },
    [cart]
  );
  const checkProductInPurchased = useCallback(
    (product: Product) => {
      return purchased.some((item) => item.id == product.id);
    },
    [purchased]
  );

  useEffect(() => {
    if (!product) return;
    setIsInCart(checkProductInCart(product));
    setIsInPurchased(checkProductInPurchased(product));
  }, [cart, checkProductInCart, checkProductInPurchased, product]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInCart) {
      if (loadingSubmit) {
        setLoadingSubmit(false);
      }
    }
  }, [isInCart, loadingSubmit]);

  const handleProductAction = (
    id: string,
    isInCart: boolean,
    isInPurchased: boolean,
    setLoadingSubmit: (b: boolean) => void
  ) => {
    if (!logged) {
      navigate(`/login?path=-product-${product.id}`);
      return;
    }
    if (isInPurchased) {
      navigate("/dashboard");
      window.scrollTo({ top: 0 });
      return;
    }
    if (isInCart) {
      navigate("/cart");
      window.scrollTo({ top: 0 });
      return;
    }
    if (!license) return;
    addToCart(id, license);
    setLoadingSubmit(true);
  };

  return (
    <aside
      className={`bg-[--bg_sec] rounded-xl h-fit w-[--aside_width] [--aside_width:100%] lg:[--aside_width:340px] xl:[--aside_width:402px] 2xl:[--aside_width:464px] flex lg:sticky lg:top-[88px] flex-col aside`}
    >
      <div className="flex p-9 py-7 gap-3 flex-col items-start justify-between border-b border-[--bg_prim]">
        <h2 className="text-3xl font-bold text-[--text_light_50] mb-2">
          {product.title}
        </h2>

        <div className="relative w-full flex flex-col rounded-xl h-32 border border-[--brand_color]">
          <div className="w-full flex">
            <button
              className={`w-full h-12 ${
                license == "personal" ? "border-b-[3px]" : "border-b"
              }  border-[--brand_color] text-[--brand_color] text-lg font-medium rounded-tl-xl`}
              onClick={() => {
                setLicense("personal");
              }}
            >
              Personal
            </button>
            <button
              className={`w-full h-12 ${
                license == "professional" ? "border-b-[3px]" : "border-b"
              }  border-l border-[--brand_color] text-[--brand_color] text-lg font-medium rounded-tr-xl`}
              onClick={() => {
                setLicense("professional");
              }}
            >
              Professional
            </button>
          </div>
          <div className={`${license == "personal" ? "flex" : "hidden"}`}>
            <p>Personal</p>
          </div>
          <div className={`${license == "professional" ? "flex" : "hidden"}`}>
            <p>Professional</p>
          </div>
        </div>

        <button
          className={`flex items-center w-full justify-center gap-2 px-6 py-3 ${
            license == null
              ? "bg-[--button_not_allowed] cursor-not-allowed"
              : isInPurchased
              ? "bg-green-500 hover:bg-green-500"
              : isInCart
              ? "bg-blue-500 hover:bg-blue-500"
              : "bg-[--button] hover:bg-[--button_hover]"
          } text-[--text_light_900] rounded-xl  transition-colors`}
          disabled={license == null}
          onClick={() =>
            handleProductAction(
              product.id,
              isInCart,
              isInPurchased,
              setLoadingSubmit
            )
          }
        >
          {isInPurchased ? (
            <>
              <Download className="h-5 w-5" />{" "}
              {LANGUAGE.PRODUCT_BUTTON.DOWNLOAD[preferences.language]}
            </>
          ) : loadingSubmit ? (
            <>
              <CircleDashed className="h-5 w-5 loader" />
            </>
          ) : isInCart ? (
            <>
              <ShoppingCart className="h-5 w-5" />{" "}
              {LANGUAGE.PRODUCT_BUTTON.GO_TO_CART[preferences.language]}
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              {LANGUAGE.PRODUCT_BUTTON.ADD[preferences.language]}
            </>
          )}
        </button>
      </div>

      <div className="p-9 pt-7">
        <h2 className="text-2xl font-bold text-[--text_light_100] mb-3">
          Details
        </h2>
        <div className="flex flex-col gap-1">
          <div className="text-[--text_light_0] text-lg flex justify-between items-center">
            <span>Published date</span>
            <span>
              {formatDateString(product.created_at, preferences.language)}
            </span>
          </div>
          <div className="text-[--text_light_0] text-lg flex justify-between items-center">
            <span>Included formats</span>
            <div className="rounded-lg py-1">
              <LucideCircleDollarSign className="h-6 w-6"></LucideCircleDollarSign>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// const [personal, setPersonal] = useState<number>(0);
// const [professional, setProfessional] = useState<number>(0);
// const [currency, setCurrency] = useState<string>("€");
// useEffect(() => {
//   if (!product) return;
//   setCurrency(LANGUAGE.CURRENCIES[preferences.currency]);
//   const pers =
//     preferences.currency == "USD"
//       ? rate == 1
//         ? product.personal
//         : Math.floor((product.personal / rate) * 100) / 100
//       : product.personal;

//   const prof =
//     preferences.currency == "USD"
//       ? rate == 1
//         ? product.professional
//         : Math.floor((product.professional / rate) * 100) / 100
//       : product.professional;

//   setProfessional(prof);
//   setPersonal(pers);
// }, [preferences.currency, product, rate]);

// useEffect(() => {
//   if (!product) return;
//   setCurrency(LANGUAGE.CURRENCIES[preferences.currency]);
// }, [preferences.currency, product]);
