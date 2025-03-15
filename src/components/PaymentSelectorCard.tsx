import { ReactNode } from "react";
import { PayMethods } from "../types";

export function PaymentSelectorCard({
  id,
  payMethod,
  setPayMethod,
  handleSubmit,
  icon,
  title,
  formChildren,
  formLabelTitle,
  formHidden,
  childrenIcon,
  gap,
}: {
  id: PayMethods;
  payMethod: PayMethods | null;
  setPayMethod: React.Dispatch<React.SetStateAction<PayMethods | null>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  icon: ReactNode;
  title: string;
  formHidden: boolean;
  formLabelTitle?: string;
  formChildren: ReactNode;
  childrenIcon: ReactNode;
  gap: string;
}) {
  return (
    <>
      {formHidden ? (
        <>
          <div
            className={`w-full h-14 bg-gray-800 border hover:cursor-pointer ${
              payMethod == id
                ? "border-indigo-500"
                : "border-gray-600 hover:border-gray-500"
            }  gap-3 rounded-xl flex items-center justify-between p-3`}
            onClick={() => setPayMethod(id)}
          >
            <div className="flex items-center justify-start gap-3">
              {icon}
              <span className="dark:text-white text-sm sm:text-md md:text-lg">
                {title}
              </span>
            </div>
            <div className={`flex items-center justify-end`} style={{ gap }}>
              {childrenIcon}
            </div>
          </div>
          <form id={id} onSubmit={handleSubmit} className={`hidden`}>
            {formChildren}
          </form>
        </>
      ) : (
        <div
          className={`overflow-hidden border transition-[max-height] duration-500 ${
            payMethod == id
              ? "border-indigo-500 pt-14 max-h-[745px]"
              : "border-gray-600 hover:border-gray-500 pt-[55px] max-h-0 cursor-pointer"
          } border-gray-600 rounded-xl relative`}
        >
          <div
            className={`w-full h-14 bg-gray-800 border-b hover:border-indigo-500 ${
              payMethod == id ? "border-indigo-500" : "border-gray-600"
            }  absolute top-0 left-0 gap-3 rounded-xl flex items-center justify-between p-3`}
            onClick={() => setPayMethod(id)}
          >
            <div className="flex items-center justify-start gap-3">
              {icon}
              <span className="dark:text-white text-sm sm:text-md md:text-lg">
                {title}
              </span>
            </div>
            <div className={`flex items-center justify-end`} style={{ gap }}>
              {childrenIcon}
            </div>
          </div>
          <div className="p-3">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-50">
              {formLabelTitle}
            </h2>

            <form
              id={id}
              onSubmit={handleSubmit}
              className={`${formHidden && "hidden"}`}
            >
              {formChildren}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
