import { useState } from "react";
import css from "./SearchBox.module.css";
interface SearchBoxProps {
  onChange: (text: string) => void;
}
export default function SearchBox({ onChange }: SearchBoxProps) {
  const [searchText, setSearchText] = useState<string>("");

  function handleOnChange(text: string) {
    setSearchText(text);
    onChange(text);
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
