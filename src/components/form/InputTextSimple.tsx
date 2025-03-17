export function InputTextSimple({
  id,
  label,
  required,
  className,
  shake,
  value,
  setValue,
  labelClassName,
}: {
  id: string;
  label?: string;
  className?: string;
  required?: boolean;
  shake?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  labelClassName?: string;
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`${labelClassName} text-md text-[--text_light_300]`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value}
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`${
          shake && "shake !border-[--wrong]"
        } ${className} appearance-none text-md h-12 my-1 rounded-md relative block w-full px-3 py-2 border bg-[--bg_sec] border-[--border_light_300] text-[--text_light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
      />
    </div>
  );
}
