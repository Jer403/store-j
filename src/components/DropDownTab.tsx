import { ChevronDownIcon, ChevronUp } from "lucide-react";

export function DropDownTab({
  id,
  question,
  answer,
  currentQuestion,
  setCurrentQuestion,
}: {
  id: string;
  question: string;
  answer: string;
  currentQuestion: string;
  setCurrentQuestion: (id: string) => void;
}) {
  return (
    <div
      className={`w-full flex ${
        currentQuestion == id ? "gap-2 " : "gap-0"
      } flex-col p-3 border border-gray-300 rounded-lg`}
    >
      <div
        className="w-full flex justify-between items-center gap-1"
        onClick={() =>
          currentQuestion == id
            ? setCurrentQuestion("")
            : setCurrentQuestion(id)
        }
      >
        <p className="text-md">{question}</p>
        {currentQuestion == id ? (
          <ChevronUp className="text-gray-700" />
        ) : (
          <ChevronDownIcon className="text-gray-700" />
        )}
      </div>
      <div
        className={`${
          currentQuestion == id ? "h-fit " : "h-0 "
        } transition-[height] duration-1000 overflow-hidden`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
