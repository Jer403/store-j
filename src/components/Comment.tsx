export function Comment({ username, date, message }) {
  const date = new Date(date);
  const sinceDate = "asd";
  return (
    <>
      <div className="flex flex-col my-2 mx-1">
        <div className="flex items-center justify-between">
          <span className="text-[--text_light_0] text-xl font-medium">
            {username}
          </span>
          <span className="text-[--text_light_400] text-sm font-medium">{`since ${sinceDate}`}</span>
        </div>
        <p className="text-[--text_light_0]">{message}</p>
      </div>
    </>
  );
}
