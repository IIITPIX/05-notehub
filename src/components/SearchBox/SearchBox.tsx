import { useState } from "react";
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";
interface SearchBoxProps {
  onChange: (text: string) => void;
}
export default function SearchBox({ onChange }: SearchBoxProps) {
  const [searchText, setSearchText] = useState<string>("");

  const debaunce = useDebouncedCallback(onChange, 300);

  function handleOnChange(text: string) {
    setSearchText(text);
    debaunce(text);
  }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={searchText}
      onChange={(e) => handleOnChange(e.target.value)}
    />
  );
}
