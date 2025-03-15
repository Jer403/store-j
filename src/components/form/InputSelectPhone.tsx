interface InputInterface {
  label: string;
  id: string;
  name: string;
  disabled: boolean;
  required: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setCallingCode: React.Dispatch<React.SetStateAction<string>>;
  countries: { id: number; slug: string; callingCode: number }[];
}

export function InputSelectPhone({
  label,
  id,
  name,
  required,
  disabled,
  value,
  setValue,
  setCallingCode,
  countries,
}: InputInterface) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-row">
        <select
          id={id}
          name={name}
          className="w-1/6 min-w-[92px] px-3 py-2 border-t border-l border-b dark:bg-gray-900 dark:border-gray-500 dark:text-white appearance-none border-gray-300 rounded-tl-md rounded-bl-md focus:z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={value}
          disabled={disabled}
          onChange={(e) => setCallingCode(e.target.value)}
        >
          {countries
            .sort((a, b) => a.slug.localeCompare(b.slug))
            .map((country) => (
              <option
                key={"spnc-chr-" + country.id}
                value={`${country.callingCode}`}
                className="flex justify-between"
              >
                {country.slug} +{country.callingCode}
              </option>
            ))}
        </select>
        <input
          type="number"
          value={value}
          disabled={disabled}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={`w-full px-3 py-2 dark:bg-gray-900 dark:border-gray-500 dark:text-white  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield] border border-gray-300 rounded-tr-md rounded-br-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 `}
          placeholder="2125844128"
        />
      </div>
    </div>
  );
}
