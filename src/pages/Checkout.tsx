import { useEffect, useId, useState } from "react";
import { useCart } from "../hooks/useCart";
import { COUNTRIES, LANGUAGE } from "../consts";
import { usePreferences } from "../hooks/usePreferences";
import { InputTextCheckOut } from "../components/form/InputTextCheckOut";
import { InputSelectPhone } from "../components/form/InputSelectPhone";
import { InputCountry } from "../components/form/InputCountry";
import { ButtonSubmitCheckOut } from "../components/form/ButtonSubmitCheckOut";
import { ProductItemCheckOut } from "../components/form/ProductItemCheckOut";
import { TropipayLogo } from "../components/Elements/TropipayLogo";
import { VisaLogo } from "../components/Elements/VisaLogo";
import { MasterCardLogo } from "../components/Elements/MasterCardLogo";
import { QvaPayLogo } from "../components/Elements/QvaPayLogo";
import { BitcoinLogo } from "../components/Elements/BitcoinLogo";
import { EthereumLogo } from "../components/Elements/EthereumLogo";
import { LitecoinLogo } from "../components/Elements/LitecoinLogo";
import { PaymentSelectorCard } from "../components/PaymentSelectorCard";
import { PayMethods } from "../types";
import { paymentLinkRequest as qvapayPaymentLinkRequest } from "../Api/qvapay";
import { paymentLinkRequest as tppPaymentLinkRequest } from "../Api/tpp";

export default function Checkout() {
  const { state: cart, loadingCart } = useCart();
  const [payMethod, setPayMethod] = useState<PayMethods | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [requestErrors, setRequestErrors] = useState<string[]>([]);
  const { preferences } = usePreferences();

  const [name, setName] = useState("Jose");
  const [lastName, setLastName] = useState("Jhonson");
  const [address, setAddress] = useState(
    "Ave. Guadí 232, Barcelona, Barcelona"
  );
  const [country, setCountry] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("645553333");
  const [callingCode, setCallingCode] = useState("34");
  const [city, setCity] = useState("Barcelona");
  const [postalCode, setPostalCode] = useState("78622");

  const handleTppSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("starting to submit tropipay");
    if (!loadingSubmit) {
      console.log("All is fine");
      setLoadingSubmit(true);
      try {
        const res = await tppPaymentLinkRequest({
          name,
          lastName,
          phoneNumber: `+${callingCode}${phoneNumber}`,
          address,
          city,
          country,
          postalCode,
        });
        if (!res) throw new Error("Error while creating payment");
        if (res.data.error) throw new Error(res.data.error[0]);
        if (res.status == 200) {
          location.href = res.data.paymentlink;
          return;
        }
      } catch (error) {
        setRequestErrors(["Something went wrong"]);
        console.log(error);
      } finally {
        setLoadingSubmit(false);
      }
    }
  };

  const handleQvaPaySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("starting to submit qvapay");
    if (!loadingSubmit) {
      console.log("All is fine");
      setLoadingSubmit(true);
      try {
        const res = await qvapayPaymentLinkRequest();
        if (!res) throw new Error("Error while creating payment");
        if (res.data.error) throw new Error(res.data.error[0]);
        if (res.status == 200) {
          console.log(res.data.paymentlink);
          setTimeout(() => {
            location.href = res.data.paymentlink;
          }, 10000);
          return;
        }
      } catch (error) {
        setRequestErrors(["Something went wrong"]);
        console.log(error);
      } finally {
        setLoadingSubmit(false);
      }
    }
  };

  const [total, setTotal] = useState(0);

  const orderCId = useId();
  const itemsCId = useId();

  useEffect(() => {
    const total = cart.reduce((sum = 0, item) => sum + item.price, 0);
    setTotal(total);
  }, [cart]);

  return (
    <div className="min-h-screen-minus-64 dottedBackground py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-full mx-auto mb-10 ">
          <div className="bg-white dark:bg-gray-900 md:dark:bg-transparent md:bg-transparent rounded-lg">
            <div className=" flex flex-col md:flex-row-reverse md:justify-center md:gap-3 shadow-md md:shadow-none p-6 md:p-0">
              <div className="w-full flex flex-col md:flex-row-reverse md:justify-center md:gap-3 ">
                <div className="md:dark:bg-gray-900 md:bg-white md:p-6 md:rounded-lg md:shadow-md w-full md:max-w-80 lg:max-w-[360px] flex flex-col max-h-full h-fit mb-6 md:!mb-0">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    {LANGUAGE.CHECKOUT.TITLE[preferences.language]}
                  </h1>

                  <div>
                    <h2
                      key={orderCId}
                      className="text-xl font-bold dark:text-gray-100 mb-4"
                    >
                      {LANGUAGE.CHECKOUT.SUMMARY[preferences.language]}
                    </h2>
                    <div
                      key={itemsCId}
                      className="border-t border-b dark:border-gray-600 py-4"
                    >
                      <div className="max-h-full px-1 overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-thumb]:rounded-md">
                        {cart.length != 0 ? (
                          <>
                            {cart.map((prod) => (
                              <ProductItemCheckOut
                                product={prod}
                                CId={itemsCId}
                              />
                            ))}
                          </>
                        ) : (
                          <p className="text-xl dark:text-gray-100">
                            {LANGUAGE.CHECKOUT.ANY[preferences.language]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <span className="font-bold text-lg flex justify-between dark:text-gray-100">
                        {LANGUAGE.CHECKOUT.TOTAL[preferences.language]}
                        <span>
                          <span className="font-bold text-xl dark:text-gray-100">
                            ${total}
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>

                  {requestErrors.length > 0 && (
                    <div className="hidden md:flex flex-col items-start justify-center mt-2">
                      {requestErrors.map((er) => {
                        return (
                          <span className="text-xl text-red-500">{er}</span>
                        );
                      })}
                    </div>
                  )}
                  <ButtonSubmitCheckOut
                    hideInMoblie
                    type="submit"
                    form={payMethod != null ? payMethod : undefined}
                    loadingSubmit={loadingSubmit}
                    loading={
                      loadingCart ||
                      loadingSubmit ||
                      cart.length == 0 ||
                      payMethod == null
                    }
                    disabled={
                      loadingCart ||
                      loadingSubmit ||
                      cart.length == 0 ||
                      payMethod == null
                    }
                    text={LANGUAGE.CHECKOUT.PAY[preferences.language]}
                  />
                </div>
                <div className="md:dark:bg-gray-900 md:bg-white md:p-6 md:rounded-lg md:shadow-md w-full max-w-2xl flex flex-col gap-3 ">
                  <span className="dark:text-white text-xl font-bold">
                    {LANGUAGE.CHECKOUT.PAYMENT_METHODS[preferences.language]}
                  </span>

                  <PaymentSelectorCard
                    id="tpp"
                    title="Pay With Tropipay"
                    payMethod={payMethod}
                    setPayMethod={setPayMethod}
                    icon={<TropipayLogo className="h-9 w-9"></TropipayLogo>}
                    childrenIcon={
                      <>
                        <VisaLogo className="h-9 w-9"></VisaLogo>
                        <MasterCardLogo className="h-9 w-9"></MasterCardLogo>
                      </>
                    }
                    gap={"10px"}
                    formHidden={false}
                    formLabelTitle={
                      LANGUAGE.CHECKOUT.PAYMENT_INFORMATION[
                        preferences.language
                      ]
                    }
                    formChildren={
                      <>
                        <InputTextCheckOut
                          label={LANGUAGE.CHECKOUT.NAME[preferences.language]}
                          id="name"
                          name="name"
                          required
                          type="text"
                          value={name}
                          setValue={setName}
                          disabled={loadingSubmit || cart.length == 0}
                        />
                        <InputTextCheckOut
                          label={
                            LANGUAGE.CHECKOUT.LASTNAME[preferences.language]
                          }
                          id="lastname"
                          name="lastname"
                          required={true}
                          type="text"
                          value={lastName}
                          setValue={setLastName}
                          disabled={loadingSubmit || cart.length == 0}
                        />
                        <InputSelectPhone
                          label={LANGUAGE.CHECKOUT.PHONE[preferences.language]}
                          id="phone"
                          name="phone"
                          required
                          value={phoneNumber}
                          setValue={setPhoneNumber}
                          setCallingCode={setCallingCode}
                          disabled={loadingSubmit || cart.length == 0}
                          countries={
                            COUNTRIES as {
                              id: number;
                              slug: string;
                              callingCode: number;
                            }[]
                          }
                        />
                        <InputTextCheckOut
                          label={
                            LANGUAGE.CHECKOUT.ADDRESS[preferences.language]
                          }
                          id="address"
                          name="address"
                          required
                          type="text"
                          value={address}
                          setValue={setAddress}
                          disabled={loadingSubmit || cart.length == 0}
                        />
                        <InputCountry
                          label={
                            LANGUAGE.CHECKOUT.COUNTRY[preferences.language]
                          }
                          id="country"
                          name="country"
                          required
                          value={country}
                          setValue={setCountry}
                          disabled={loadingSubmit || cart.length == 0}
                          countries={
                            COUNTRIES as {
                              id: number;
                              name: string;
                            }[]
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <InputTextCheckOut
                            label={LANGUAGE.CHECKOUT.CITY[preferences.language]}
                            id="city"
                            name="city"
                            required
                            type="text"
                            value={city}
                            setValue={setCity}
                            disabled={loadingSubmit || cart.length == 0}
                          />
                          <InputTextCheckOut
                            label={
                              LANGUAGE.CHECKOUT.POSTALCODE[preferences.language]
                            }
                            id="postalCode"
                            name="postalCode"
                            required
                            type="number"
                            value={postalCode}
                            setValue={setPostalCode}
                            disabled={loadingSubmit || cart.length == 0}
                          />
                        </div>
                      </>
                    }
                    handleSubmit={handleTppSubmit}
                  />

                  <PaymentSelectorCard
                    id="qvapay"
                    title="Pay with QvaPay"
                    payMethod={payMethod}
                    setPayMethod={setPayMethod}
                    icon={<QvaPayLogo className="h-9 w-9" />}
                    formHidden
                    childrenIcon={
                      <>
                        <BitcoinLogo className="h-5 md:h-7 -mr-3 z-50" />
                        <EthereumLogo className="h-5 md:h-7 -mr-3 z-40" />
                        <LitecoinLogo className="h-5 md:h-7 -mr-3 z-30" />
                        <div className="h-5 md:h-7 w-7 md:w-10 rounded-full bg-gray-700 flex items-center justify-center gap-1">
                          <div className="h-1 w-[4px] rounded-full bg-gray-800"></div>
                          <div className="h-1 w-[4px] rounded-full bg-gray-800"></div>
                          <div className="h-1 w-[4px] rounded-full bg-gray-800"></div>
                        </div>
                      </>
                    }
                    gap={"2px"}
                    formChildren={<></>}
                    handleSubmit={handleQvaPaySubmit}
                  />
                  {requestErrors.length > 0 && (
                    <div className="flex md:!hidden flex-col items-start justify-center mt-2">
                      {requestErrors.map((er) => {
                        return (
                          <span className="text-xl text-red-500">{er}</span>
                        );
                      })}
                    </div>
                  )}

                  <ButtonSubmitCheckOut
                    hideInMoblie={false}
                    type="submit"
                    form={payMethod != null ? payMethod : undefined}
                    loadingSubmit={loadingSubmit}
                    loading={
                      loadingCart ||
                      loadingSubmit ||
                      cart.length == 0 ||
                      payMethod == null
                    }
                    disabled={
                      loadingCart ||
                      loadingSubmit ||
                      cart.length == 0 ||
                      payMethod == null
                    }
                    text={LANGUAGE.CHECKOUT.PAY[preferences.language]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-4 items-center justify-center">
            <p className="text-sm text-gray-600 px-3">
              {LANGUAGE.CHECKOUT.TERMS_AND_CONDITIONS[preferences.language]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// client: {
//   name: "John",
//   lastName: "McClane",
//   address: "Ave. Guadí 232, Barcelona, Barcelona",
//   phone: "+34645553333",
//   email: "client@email.com",
//   countryId: 1,
//   termsAndConditions: "true",
//   "city": "Barcelona",
//   "postCode": "78622"
// },
