import { Sections } from "../../types";

export function SectionButton({
  id,
  text,
  section,
  setSection,
}: {
  id: Sections;
  text: string;
  section: Sections;
  setSection: React.Dispatch<React.SetStateAction<Sections>>;
}) {
  return (
    <button
      className={`${
        section == id ? "bg-indigo-600" : ""
      } w-40 h-full rounded-lg text-lg  border border-indigo-600 text-white`}
      onClick={() => {
        setSection(id);
      }}
    >
      {text}
    </button>
  );
}
