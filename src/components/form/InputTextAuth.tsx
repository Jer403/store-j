interface InputInterface {
  label: string;
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  required: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  valValue: boolean | null;
  validateValue: (val: string) => void;
  shake: boolean;
  val_valid: string;
  val_not_valid: string;
}

export function InputText({
  label,
  id,
  name,
  type,
  autoComplete,
  required,
  value,
  setValue,
  valValue,
  validateValue,
  shake,
  val_valid,
  val_not_valid,
}: InputInterface) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <label htmlFor={id} className="text-md text-[--text_light_300]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={
          type == "email"
            ? autoComplete
              ? autoComplete
              : undefined
            : undefined
        }
        required={required}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          validateValue(e.target.value);
        }}
        className={`${
          shake && "shake !border-[--wrong]"
        } appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border bg-[--bg_sec] border-[--border_light_500] text-[--text_light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
      />
      <div
        className={`absolute w-6 h-6 check group ${
          valValue == null && "hidden"
        }`}
        style={{
          color: valValue ? "var(--good)" : "var(--wrong)",
        }}
      >
        {valValue ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
        )}
        <span className="tooltiptext group-hover:visible after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm shadow-[--shadow_light_600] text-[--text_light_0] bg-[--bg_thir] after:border-r-[--bg_thir]">
          {valValue ? <> {val_valid}</> : <>{val_not_valid}</>}
        </span>
      </div>
    </div>
  );
}
