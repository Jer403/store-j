interface ButtonSubmitInterface {
  hideInMoblie: boolean;
  loadingSubmit: boolean;
  type: "submit" | "reset" | "button" | undefined;
  form?: string;
  loading: boolean;
  onclick?: () => void;
  disabled: boolean;
  text: string;
}

export function ButtonSubmitCheckOut({
  hideInMoblie,
  loadingSubmit,
  type,
  form,
  onclick,
  loading,
  disabled,
  text,
}: ButtonSubmitInterface) {
  return (
    <button
      form={form}
      type={type}
      className={`w-full bg-indigo-600 ${
        hideInMoblie ? "hidden md:flex" : "flex md:!hidden"
      } text-white py-3 mt-3 rounded-lg hover:bg-indigo-700  items-center justify-center ${
        loading && "cursor-not-allowed bg-indigo-800"
      } ${loading && "cursor-not-allowed bg-indigo-800"}`}
      disabled={disabled}
      onClick={onclick}
    >
      {loadingSubmit ? (
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
          className="loader"
        >
          <path d="M10.1 2.182a10 10 0 0 1 3.8 0"></path>
          <path d="M13.9 21.818a10 10 0 0 1-3.8 0"></path>
          <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7"></path>
          <path d="M2.182 13.9a10 10 0 0 1 0-3.8"></path>
          <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69"></path>
          <path d="M21.818 10.1a10 10 0 0 1 0 3.8"></path>
          <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"></path>
          <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7"></path>
        </svg>
      ) : (
        <span className="flex row align-center">
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
            className="h-5 w-5 mr-2"
          >
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>

          {text}
        </span>
      )}
    </button>
  );
}
