import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "../hooks/useCart";
import { License, Product as ProductI, Sections } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Download,
  LucideCircleDollarSign,
  ShoppingCart,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useProduct } from "../hooks/useProduct";
import { InputTextSimple } from "../components/form/InputTextSimple";
import { ButtonSubmitSimple } from "../components/form/ButtonSubmitSimple";
import { SectionButton } from "../components/form/SectionButton";

export default function Product() {
  const { state: cart, purchased, addToCart, rate } = useCart();
  const { products } = useProduct();
  const { logged } = useAuth();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [section, setSection] = useState<Sections>("info");
  const [isInPurchased, setIsInPurchased] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [licenseOpen, setLicenseOpen] = useState<boolean>(false);
  const [license, setLicense] = useState<License | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("€");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const galleryScroll = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { preferences } = usePreferences();

  const [product, setProduct] = useState<ProductI | null | undefined>(null);
  const location = useLocation();

  const checkProductInCart = useCallback(
    (product: ProductI) => {
      return cart.some((item) => item.id == product.id);
    },
    [cart]
  );
  const checkProductInPurchased = useCallback(
    (product: ProductI) => {
      return purchased.some((item) => item.id == product.id);
    },
    [purchased]
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    if (currentImage != e.currentTarget.src) {
      setCurrentImage(e.currentTarget.src);
    }
  };

  useEffect(() => {
    if (!product) return;
    setIsInCart(checkProductInCart(product));
    setIsInPurchased(checkProductInPurchased(product));
  }, [cart, checkProductInCart, checkProductInPurchased, product]);

  useEffect(() => {
    const handleClickWindow = () => {
      if (licenseOpen) {
        setLicenseOpen(false);
      }
    };
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, [licenseOpen]);

  useEffect(() => {
    const id = location.pathname.slice(9);
    if (!products) return;
    const prods = products.find((el) => el.id == id) as ProductI;
    const prod = prods ? prods : undefined;
    setProduct(prod);
    if (prods) {
      setCurrentImage(`${IMG_API_URL}${prods.image}.webp`);
    }
  }, [location.pathname, products]);

  useEffect(() => {
    if (!product) return;
    setCurrency(LANGUAGE.CURRENCIES[preferences.currency]);
    const pr =
      preferences.currency == "USD"
        ? rate == 1
          ? product.price
          : Math.floor((product.price / rate) * 100) / 100
        : product.price;

    setPrice(pr);
  }, [preferences.currency, product, rate]);

  useEffect(() => {
    if (isInCart) {
      if (loadingSubmit) {
        setLoadingSubmit(false);
      }
    }
  }, [isInCart, loadingSubmit]);

  const handleGalleryScrollLeft = () => {
    if (galleryScroll.current == null) return;
    galleryScroll.current.scrollLeft -= 173;
  };

  const handleGalleryScrollRight = () => {
    if (galleryScroll.current == null) return;
    galleryScroll.current.scrollLeft += 173;
  };

  const handleProductAction = (
    id: string,
    isInCart: boolean,
    isInPurchased: boolean,
    setLoadingSubmit: (b: boolean) => void
  ) => {
    if (!logged) {
      navigate(`/login`);
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
    <div
      className={`relative w-full shadow-xl flex justify-center items-center`}
    >
      <div className="h-full w-full max-w-[1600px]">
        {product ? (
          <div className="p-8 flex w-full gap-2">
            <div className="w-full grid grid-dis gap-6 grid-cols-1 lg:grid-cols-[1fr,var(--aside_width)]">
              <div className="w-full medias">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                  <img
                    src={product.gallery ? `${currentImage}` : ""}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex">
                  <button
                    className="flex justify-center items-center p-2"
                    onClick={handleGalleryScrollLeft}
                  >
                    <ChevronLeft className="w-9 h-9 p-1 text-white hover:bg-gray-600 transition-colors rounded-full"></ChevronLeft>
                  </button>
                  <div
                    ref={galleryScroll}
                    style={{ scrollBehavior: "smooth" }}
                    className="w-full flex flex-row overflow-hidden max-w-full gap-2 mt-2"
                  >
                    <div className="h-24 aspect-video">
                      <img
                        key={"main-image"}
                        src={`${IMG_API_URL}${product.image}.webp`}
                        alt={`Preview main-image`}
                        onMouseEnter={handleMouseEnter}
                        className="object-contain aspect-video rounded-md border-2 border-gray-300"
                      />
                    </div>

                    {product.gallery ? (
                      product.gallery.map((image, index) => (
                        <div className="h-24 aspect-video">
                          <img
                            key={index}
                            src={`${IMG_API_URL}${image}.webp`}
                            alt={`Preview ${index + 1}`}
                            onMouseEnter={handleMouseEnter}
                            className="w-full h-full object-contain aspect-video rounded-md border-2 border-gray-300"
                          />
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                  <button
                    className="flex justify-center items-center p-2"
                    onClick={handleGalleryScrollRight}
                  >
                    <ChevronRight className="w-9 h-9 p-1 text-white transition-colors hover:bg-gray-600 rounded-full"></ChevronRight>
                  </button>
                </div>
              </div>

              <div className="infos">
                <div className="w-full rounded-xl h-16 flex p-2 gap-2 bg-gray-90">
                  <SectionButton
                    id="info"
                    text="Information"
                    section={section}
                    setSection={setSection}
                  ></SectionButton>
                  <SectionButton
                    id="comments"
                    text="Comments (1)"
                    section={section}
                    setSection={setSection}
                  ></SectionButton>
                </div>

                <div
                  className={`${
                    section == "info" ? "flex" : "hidden"
                  } max-w-none flex-col p-4 mb-8`}
                >
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">
                    Description
                  </h3>
                  <p className="whitespace-pre-line text-lg font-medium text-gray-200">
                    {product.description}
                  </p>
                </div>

                <div
                  className={`${
                    section == "comments" ? "flex" : "hidden"
                  } flex-col gap-4 w-full h-fit p-4 rounded-xl`}
                >
                  <div className="">
                    <h3 className="text-2xl font-bold text-gray-100">
                      1 Comments
                    </h3>
                  </div>
                  <div>
                    <form className="flex flex-col">
                      <label className="text-md text-gray-100">
                        Add a Comment
                      </label>
                      <div className="flex flex-col md:flex-row items-end md:items-center justify-center gap-2">
                        <InputTextSimple
                          className="rounded-xl"
                          id="comment"
                          value="asd"
                          setValue={() => {}}
                        ></InputTextSimple>
                        <ButtonSubmitSimple
                          text="Comment"
                          type="submit"
                          className="w-full md:w-64 rounded-xl"
                        ></ButtonSubmitSimple>
                      </div>
                    </form>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col p-4 pt-3 bg-gray-900 border border-gray-600 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-2xl font-medium">
                          Jose
                        </span>
                        <span className="text-gray-400 text-base font-medium">
                          hace 1 dia
                        </span>
                      </div>
                      <p className="text-white">Mu bueno paisa</p>
                    </div>
                  </div>
                </div>
              </div>

              <aside
                className={`bg-gray-900 rounded-xl h-fit w-[--aside_width] [--aside_width:100%] lg:[--aside_width:340px] xl:[--aside_width:402px] flex lg:sticky lg:top-[88px] flex-col aside`}
              >
                <div className="flex p-9 py-7 gap-3 flex-col items-start justify-between border-y border-gray-950">
                  <h2 className="text-3xl font-bold text-gray-50 mb-2">
                    {product.title}
                  </h2>
                  <span className="text-gray-200 text-lg font-medium">
                    License
                  </span>
                  <div className="relative w-full flex">
                    <button
                      className={`relative w-full flex justify-between items-center p-4 border ${
                        license == null
                          ? licenseOpen
                            ? "border-indigo-500"
                            : "border-gray-500 hover:border-gray-400"
                          : "border-indigo-500"
                      } rounded-xl`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLicenseOpen(!licenseOpen);
                      }}
                    >
                      <div className="flex flex-col justify-center items-start">
                        <span
                          className={`${
                            license == null
                              ? "text-normal font-bold text-gray-300"
                              : "text-normal font-medium text-gray-300"
                          } `}
                        >
                          {license == null
                            ? "Select a License"
                            : license == "personal"
                            ? "Personal"
                            : "Professional"}
                        </span>
                        <span
                          className={`${
                            license == null
                              ? "text-normal font-medium text-gray-400"
                              : "text-xl font-bold text-gray-100"
                          }`}
                        >
                          {license == null
                            ? `(From ${currency + price} to ${
                                currency + price
                              })`
                            : license == "personal"
                            ? currency + price
                            : currency + price}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-7 w-7 text-gray-500 transition-transform duration-300 ${
                          licenseOpen && "rotate-180"
                        }`}
                      ></ChevronDown>
                    </button>
                    <div
                      className={`absolute p-2 ${
                        licenseOpen ? "flex" : "hidden"
                      } flex-col gap-2 text-white top-[110%] h-fit left-0 border border-gray-600 rounded-xl w-full bg-[#101625e8]`}
                    >
                      <button
                        className="flex gap-2 p-2 pr-4 items-start justify-center rounded-xl hover:bg-[#374151b0] cursor-pointer"
                        onClick={() => {
                          setLicenseOpen(false);
                          setLicense("personal");
                        }}
                      >
                        <div className="relative mt-[3px] w-5 h-5 flex rounded-full items-center justify-center bg-gray-700">
                          <i
                            className={`absolute w-[8px] h-2 ${
                              license == "personal" && "bg-indigo-500"
                            } rounded-full flex`}
                          ></i>
                        </div>
                        <div className="w-full rounded-xl flex flex-col items-start">
                          <span className="text-normal font-medium text-gray-100">
                            Personal
                          </span>
                          <p className="text-sm font-medium text-gray-400 text-start">
                            For an individual creator or a small team with no
                            more than 100k of revenue or funding in the past 12
                            months
                          </p>
                          <span className="text-lg font-bold">$69.99</span>
                        </div>
                      </button>
                      <button
                        className="flex gap-2 p-2 pr-4 items-start justify-center rounded-xl hover:bg-[#374151b0] cursor-pointer"
                        onClick={() => {
                          setLicenseOpen(false);
                          setLicense("professional");
                        }}
                      >
                        <div className="relative mt-[3px] w-5 h-5 flex rounded-full items-center justify-center bg-gray-700">
                          <i
                            className={`absolute w-[8px] h-2 ${
                              license == "professional" && "bg-indigo-500"
                            } rounded-full flex`}
                          ></i>
                        </div>
                        <div className="w-full rounded-xl flex flex-col items-start">
                          <span className="text-normal font-medium text-gray-100">
                            Professional
                          </span>
                          <p className="text-sm font-medium text-gray-400 text-start">
                            For studios or other entities with over 100k of
                            revenue or funding in the past 12 months
                          </p>
                          <span className="text-lg font-bold">$99.99</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    className={`flex items-center w-full justify-center gap-2 px-6 py-3 ${
                      license == null
                        ? "bg-indigo-600 hover:bg-indigo-700 cursor-not-allowed"
                        : isInPurchased
                        ? "bg-green-500 hover:bg-green-500"
                        : isInCart
                        ? "bg-blue-500 hover:bg-blue-500"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } text-white rounded-xl  transition-colors`}
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
                        {
                          LANGUAGE.PRODUCT_BUTTON.GO_TO_CART[
                            preferences.language
                          ]
                        }
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
                  <h2 className="text-2xl font-bold text-gray-100 mb-3">
                    Details
                  </h2>
                  <div className="flex flex-col gap-1">
                    <div className="text-white text-lg flex justify-between items-center">
                      <span>Published date</span>
                      <span>12 March, 2232</span>
                    </div>
                    <div className="text-white text-lg flex justify-between items-center">
                      <span>Included formats</span>
                      <div className="rounded-lg py-1">
                        <LucideCircleDollarSign className="h-6 w-6"></LucideCircleDollarSign>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <p>No se ha encontrado ese producto</p>
        )}
      </div>
    </div>
  );
}

/* <span className="text-2xl w-full flex justify-start items-center p-2 border border-gray-500 rounded-xl font-bold text-indigo-600">
                    {LANGUAGE.CURRENCIES[preferences.currency]}
                    {preferences.currency == "USD"
                      ? rate == 1
                        ? product.price
                        : Math.floor((product.price / rate) * 100) / 100
                      : product.price}
                  </span> */
