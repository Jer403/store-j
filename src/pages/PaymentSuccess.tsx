import { CheckCircle, CircleDashed } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePreferences } from "../hooks/usePreferences";
import { BRANDNAME, LANGUAGE } from "../consts";
import { createDateTextFromLanguage, getUrlParam } from "../utils";
import { getPaymentRequest } from "../Api/payment.ts";
import { CartProduct } from "../types/index.ts";

export default function About() {
  const { preferences } = usePreferences();
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [cart, setCart] = useState<CartProduct[]>([] as CartProduct[]);
  const [order, setOrder] = useState<string | null>("");
  const [date, setDate] = useState<string | null>("");
  const [price, setPrice] = useState<string | null>("");
  const [payId, setPayId] = useState<string | null>("");
  const navigate = useNavigate();
  const orderCId = useId();
  const itemsCId = useId();

  useEffect(() => {
    const getPaymentInfo = async () => {
      const reference = getUrlParam("reference");
      const bankOrder = getUrlParam("bankOrderCode");
      if (reference == null) return navigate("/");
      if (bankOrder == null) return navigate("/");

      try {
        const res = await getPaymentRequest(reference);
        if (!res) return;
        if (res.status == 200) {
          setLoadingPayment(false);
          if (res.data.state == "0") {
            return navigate(
              `/payment/failed?bankOrderCode=${bankOrder}&reference=${reference}`
            );
          }
          setCart(res.data.cart);
          setOrder(bankOrder);
          setDate(res.data.created_at);
          setPrice(res.data.price);
          setPayId(reference);
          return;
        }
        console.log("Payment status not 200, going to home");
        console.log(res);
        return navigate("/");
      } catch (error) {
        console.log("Error fetching payment");
        console.log(error);
        return navigate("/");
      }
    };
    getPaymentInfo();
  }, []);

  return (
    <div className="min-h-screen-minus-64 bg-gray-950 py-12 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div
            className={`bg-gray-900 rounded-lg shadow-md p-8 ${
              loadingPayment && "py-11"
            }`}
          >
            <div
              className={`${
                loadingPayment ? "flex" : "hidden"
              } justify-center items-center gap-3`}
            >
              <CircleDashed className="h-16 w-16 loader text-white"></CircleDashed>
              <span className="text-4xl text-white">Loading...</span>
            </div>
            <div className={`${loadingPayment && "hidden"}`}>
              <p className="text-5xl font-bold text-center flex justify-center items-center gap-3 mb-10">
                <CheckCircle className="h-20 w-20 text-[--good]"></CheckCircle>
                <span className="text-white">
                  {LANGUAGE.PAY_SUCCESS.TITLE[preferences.language]}
                </span>
              </p>

              <p className="text-lg text-white mb-6">
                {LANGUAGE.PAY_SUCCESS.TEXT1[preferences.language]}
              </p>
              <p className="text-lg text-white mb-6">
                {LANGUAGE.PAY_SUCCESS.TEXT2[preferences.language]}
              </p>
              <p className="text-lg font-bold text-white mb-6">
                {LANGUAGE.PAY_SUCCESS.TEXT3[preferences.language]}
              </p>
              <p className="text-lg text-white">
                {LANGUAGE.PAY_SUCCESS.GREETINGS[preferences.language]}
              </p>
              <p className="text-lg font-bold text-white mb-10">{BRANDNAME}.</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/"
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  {LANGUAGE.PAY_SUCCESS.HOME[preferences.language]}
                </Link>
                <Link
                  to="/Dashboard"
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  {LANGUAGE.PAY_SUCCESS.DASHBOARD[preferences.language]}
                </Link>
              </div>

              <div className="bg-gray-950 p-5 rounded-md">
                <h2
                  key={orderCId}
                  className="text-xl text-white font-semibold mb-4"
                >
                  {LANGUAGE.PAY_SUCCESS.DETAILS[preferences.language]}
                </h2>
                <div
                  key={
                    "chr-0" +
                    "prod.id" +
                    itemsCId +
                    Math.floor(Math.random() * 100)
                  }
                >
                  <h3 className="text-lg font-medium text-white">
                    {LANGUAGE.PAY_SUCCESS.PRODUCTS[preferences.language]}
                  </h3>
                </div>
                <div key={itemsCId} className="border-t border-b py-4 mb-3">
                  {cart.map((prod) => {
                    return (
                      <>
                        <div
                          key={"chr-" + prod.id + itemsCId}
                          className="flex justify-between items-center"
                        >
                          <div key={"chrp-0" + prod.id + itemsCId}>
                            <h3 className="font-medium text-white">
                              {prod.title}
                            </h3>
                          </div>
                          <span
                            key={"chrp-1" + prod.id + itemsCId}
                            className="font-semibold text-white"
                          >
                            ${prod.price}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div
                  key={"chra-" + itemsCId}
                  className="flex justify-between items-center  mb-3"
                >
                  <div key={"chra-0" + itemsCId}>
                    <h3 className="text-lg font-medium text-white">
                      {LANGUAGE.PAY_SUCCESS.AMOUNT[preferences.language]}
                    </h3>
                  </div>
                  <span
                    key={"chra-1" + itemsCId}
                    className="font-semibold text-white"
                  >
                    ${price}
                  </span>
                </div>
                <div
                  key={"chro-" + itemsCId}
                  className="flex flex-col sm:flex-row items-start justify-between sm:items-center  mb-3"
                >
                  <div key={"chro-0" + +itemsCId}>
                    <h3 className="text-md sm:text-lg font-medium text-white">
                      {LANGUAGE.PAY_SUCCESS.ORDER[preferences.language]}
                    </h3>
                  </div>
                  <span
                    key={"chro-1" + itemsCId}
                    className="font-semibold text-sm sm:text-lg text-white"
                  >
                    {order}
                  </span>
                </div>
                <div
                  key={"chri-" + itemsCId}
                  className="flex flex-col sm:flex-row items-start justify-between sm:items-center  mb-3"
                >
                  <div key={"chri-0" + itemsCId}>
                    <h3 className="text-md sm:text-lg font-medium text-white">
                      {LANGUAGE.PAY_SUCCESS.PAY_ID[preferences.language]}
                    </h3>
                  </div>
                  <span
                    key={"chri-1" + itemsCId}
                    className="font-semibold text-sm sm:text-lg text-white"
                  >
                    {payId}
                  </span>
                </div>
                <div
                  key={"chrd-" + itemsCId}
                  className="flex flex-col sm:flex-row items-start justify-between sm:items-center  mb-3"
                >
                  <div key={"chrd-0" + itemsCId}>
                    <h3 className="text-md sm:text-lg font-medium text-white">
                      {LANGUAGE.PAY_SUCCESS.DATE[preferences.language]}
                    </h3>
                  </div>
                  <span
                    key={"chrd-1" + itemsCId}
                    className="font-semibold text-sm sm:text-lg text-white"
                  >
                    {createDateTextFromLanguage(
                      preferences.language,
                      new Date(`${date}`)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
