import { CircleDashed } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import { LANGUAGE } from "../consts";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { usePreferences } from "../hooks/usePreferences";

export function StoreTest() {
  const { products, loadingProducts } = useProduct();
  const { preferences } = usePreferences();
  const navigate = useNavigate();

  //  bg-gray-50 dark:bg-gray-950 bg-radial
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 relative"
      id="store"
    >
      <div className="max-w-[115rem] mx-auto px-4 lg:px-3 2xl:px-2">
        <h1
          className={`text-4xl font-bold text-gray-900 mb-8 transition-[padding] dark:text-gray-50 text-center`}
        >
          {LANGUAGE.STORE.TITLE[preferences.language]}
        </h1>

        <div className="flex">
          <div className={`flex-1 transition-all duration-300`}>
            {products != null ? (
              products.length > 0 ? (
                <div
                  className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6`}
                >
                  {products.map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          window.scrollTo({ top: 0 });
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-2xl sm:text-3xl md:text-4xl mt-12 flex items-center justify-center dark:text-white">
                  {LANGUAGE.STORE.NO_PRODUCTS[preferences.language]}
                </p>
              )
            ) : loadingProducts ? (
              <div className=" mt-12 flex items-center justify-center gap-2">
                <CircleDashed className="loader h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 dark:text-white"></CircleDashed>
                <span className="text-2xl sm:text-4xl lg:text-4xl dark:text-white">
                  {LANGUAGE.STORE.LOADING[preferences.language]}
                </span>
              </div>
            ) : (
              <p className="text-2xl sm:text-3xl md:text-4xl mt-12 flex items-center justify-center dark:text-white">
                {LANGUAGE.STORE.WRONG[preferences.language]}
                <a className="ml-4 underline dark:text-white" href="/">
                  {LANGUAGE.STORE.RELOAD[preferences.language]}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
