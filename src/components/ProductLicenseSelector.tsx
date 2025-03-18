export function ProductLicenseSelector({
  product,
  license,
  licenseOpen,
  setLicense,
  setLicenseOpen,
}) {
  return (
    <aside
      className={`bg-[--bg_sec] rounded-xl h-fit w-[--aside_width] [--aside_width:100%] lg:[--aside_width:340px] xl:[--aside_width:402px] flex lg:sticky lg:top-[88px] flex-col aside`}
    >
      <div className="flex p-9 py-7 gap-3 flex-col items-start justify-between border-b border-[--bg_prim]">
        <h2 className="text-3xl font-bold text-[--text_light_50] mb-2">
          {product.title}
        </h2>
        <span className="text-[--text_light_200] text-lg font-medium">
          License
        </span>
        <div className="relative w-full flex">
          <button
            className={`relative w-full flex justify-between items-center p-4 border ${
              license == null
                ? licenseOpen
                  ? "border-[--brand_color]"
                  : "border-[--border_light_400] hover:border-[--border_light_300]"
                : "border-[--brand_color]"
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
                    ? "text-normal font-bold text-[--text_light_200]"
                    : "text-normal font-medium text-[--text_light_200]"
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
                    ? "text-normal font-medium text-[--text_light_300]"
                    : "text-xl font-bold text-[--text_light_100]"
                }`}
              >
                {license == null
                  ? `(From ${currency + personal} to ${
                      currency + professional
                    })`
                  : license == "personal"
                  ? currency + personal
                  : currency + professional}
              </span>
            </div>
            <ChevronDown
              className={`h-7 w-7 text-[--text_light_200] transition-transform duration-300 ${
                licenseOpen && "rotate-180"
              }`}
            ></ChevronDown>
          </button>
          <div
            className={`absolute p-2 ${
              licenseOpen ? "flex" : "hidden"
            } flex-col gap-2 text-[--text_light_0] top-[110%] h-fit left-0 border border-[--border_light_600] rounded-xl w-full bg-[#101625e8]`}
          >
            <button
              className="flex gap-2 p-2 pr-4 items-start justify-center rounded-xl hover:bg-[#374151b0] cursor-pointer"
              onClick={() => {
                setLicenseOpen(false);
                setLicense("personal");
              }}
            >
              <div className="relative mt-[3px] w-5 h-5 flex rounded-full items-center justify-center bg-[--bg_light_700]">
                <i
                  className={`absolute w-[8px] h-2 ${
                    license == "personal" && "bg-[--brand_color]"
                  } rounded-full flex`}
                ></i>
              </div>
              <div className="w-full rounded-xl flex flex-col items-start">
                <span className="text-normal font-medium text-[--text_light_100]">
                  Personal
                </span>
                <p className="text-sm font-medium text-[--text_light_400] text-start">
                  For an individual creator or a small team with no more than
                  100k of revenue or funding in the past 12 months
                </p>
                <span className="text-lg font-bold">{currency + personal}</span>
              </div>
            </button>
            <button
              className="flex gap-2 p-2 pr-4 items-start justify-center rounded-xl hover:bg-[#374151b0] cursor-pointer"
              onClick={() => {
                setLicenseOpen(false);
                setLicense("professional");
              }}
            >
              <div className="relative mt-[3px] w-5 h-5 flex rounded-full items-center justify-center bg-[--bg_light_700]">
                <i
                  className={`absolute w-[8px] h-2 ${
                    license == "professional" && "bg-[--brand_color]"
                  } rounded-full flex`}
                ></i>
              </div>
              <div className="w-full rounded-xl flex flex-col items-start">
                <span className="text-normal font-medium text-[--text_light_100]">
                  Professional
                </span>
                <p className="text-sm font-medium text-[--text_light_400] text-start">
                  For studios or other entities with over 100k of revenue or
                  funding in the past 12 months
                </p>
                <span className="text-lg font-bold">
                  {currency + professional}
                </span>
              </div>
            </button>
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
