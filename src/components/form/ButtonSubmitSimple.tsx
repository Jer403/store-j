interface ButtonSubmitInterface {
  type: "submit" | "reset" | "button" | undefined;
  form?: string;
  loading?: boolean;
  className?: string;
  onclick?: () => void;
  disabled?: boolean;
  text: string;
}

export function ButtonSubmitSimple({
  type,
  form,
  onclick,
  className,
  loading,
  disabled,
  text,
}: ButtonSubmitInterface) {
  return (
    <button
      form={form}
      type={type}
      className={`${className} w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700  items-center justify-center ${
        loading && "cursor-not-allowed bg-indigo-800"
      } ${loading && "cursor-not-allowed bg-indigo-800"}`}
      disabled={disabled}
      onClick={onclick}
    >
      {text}
    </button>
  );
}
