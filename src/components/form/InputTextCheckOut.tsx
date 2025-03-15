interface InputInterface {
  label: string;
  id: string;
  name: string;
  type: string;
  disabled: boolean;
  required: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function InputTextCheckOut({
  label,
  id,
  name,
  type,
  required,
  disabled,
  value,
  setValue,
}: InputInterface) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`w-full px-3 py-2 border dark:bg-gray-900 dark:border-gray-500 dark:text-white  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]`}
      />
    </div>
  );
}
