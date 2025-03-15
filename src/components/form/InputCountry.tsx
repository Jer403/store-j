interface InputInterface {
  label: string;
  id: string;
  name: string;
  disabled: boolean;
  required: boolean;
  value: number;
  loadingSubmit?: boolean;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  countries: { id: number; name: string }[];
}

export function InputCountry({
  label,
  id,
  name,
  required,
  disabled,
  value,
  setValue,
  countries,
  loadingSubmit,
}: InputInterface) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium :text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(Number(e.target.value))}
        className={`w-full px-3 py-2 border bg-gray-900 border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          loadingSubmit ? "appearance-none" : ""
        }`}
      >
        {countries
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((country) => (
            <option key={"sc-chr-" + country.id} value={country.id}>
              {country.name}
            </option>
          ))}
      </select>
    </div>
  );
}
