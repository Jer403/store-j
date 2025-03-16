export function Comment({ username, date, message }) {
  const date = new Date(date);
  const sinceDate = "asd";
  return (
    <>
      <div className="flex flex-col my-2 mx-1">
        <div className="flex items-center justify-between">
          <span className="text-white text-xl font-medium">{username}</span>
          <span className="text-gray-400 text-sm font-medium">{`since ${sinceDate}`}</span>
        </div>
        <p className="text-white">{message}</p>
      </div>
    </>
  );
}
