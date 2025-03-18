export function Comment({
  username,
  date,
  message,
}: {
  username: string;
  date: string;
  message: string;
}) {
  const dat = new Date(date);
  const sinceDate = "asd";
  return (
    <div className="flex flex-col p-4 pt-3 bg-[--bg_sec] shadow-md shadow-[--brand_color_400] rounded-3xl">
      <div className="flex items-center justify-between">
        <span className="text-[--text_light_0] text-xl font-medium">
          {username}
        </span>
        <span className="text-[--text_light_400] text-sm font-medium">{`since ${sinceDate}`}</span>
      </div>
      <p className="text-[--text_light_0]">{message}</p>
    </div>
  );
}
