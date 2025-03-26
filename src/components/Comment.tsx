import { ReactNode } from "react";

export function Comment({
  username,
  date,
  message,
  icon,
}: {
  username: string;
  date: string;
  message: string;
  icon?: ReactNode;
}) {
  const dat = new Date(date);
  const sinceDate = "asd";
  return (
    <div className="flex flex-col p-4 pt-3 bg-[--bg_sec] shadow-md shadow-[--brand_color_800] rounded-3xl">
      <div className="flex items-center justify-between">
        <span className="text-[--text_light_0] text-xl font-medium">
          {username}
        </span>
        <div className="flex gap-2">
          <span className="text-[--text_light_400] text-sm font-medium">{`since ${sinceDate}`}</span>
          {icon}
        </div>
      </div>
      <p className="text-[--text_light_0] ml-2">{message}</p>
    </div>
  );
}
