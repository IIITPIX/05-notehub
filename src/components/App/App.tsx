import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchText],
    queryFn: () =>
      fetchNotes({ search: searchText, page: currentPage, perPage: 10 }),
    placeholderData: keepPreviousData,
  });

  const handleSearchText = useDebouncedCallback((text: string) => {
    setSearchText(text);
    setCurrentPage(1);
  }, 500);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchText} />
        {data && (
          <Pagination
            currentPage={currentPage}
            totalPage={data?.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal
          children={<NoteForm closeModal={closeModal} />}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
