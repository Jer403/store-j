interface InputInterface {
  label: string;
  id: string;
  name: string;
  type: string;
  disabled: boolean;
  required: boolean;
  value: string;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  pattern?: string;
  setValue: (values: string) => void;
}

export function InputTextCheckOut({
  label,
  id,
  name,
  type,
  required,
  disabled,
  inputMode,
  pattern,
  value,
  setValue,
}: InputInterface) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[--text_light_200]"
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
        inputMode={inputMode}
        pattern={pattern}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`w-full px-3 py-2 border bg-[--bg_prim] border-[--border_light_500] text-[--text_light_0] rounded-md focus:outline-none focus:ring-2 focus:ring-[--brand_color]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]`}
      />
    </div>
  );
}
