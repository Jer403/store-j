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
      className={`${className} w-full bg-[--button] text-[--text_light_900] py-3 rounded-lg hover:bg-[--button_hover]  items-center justify-center ${
        (loading || disabled) && "cursor-not-allowed bg-[--button_not_allowed]"
      }`}
      disabled={disabled}
      onClick={onclick}
    >
      {text}
    </button>
  );
}
