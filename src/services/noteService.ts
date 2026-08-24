import axios from "axios";
import type { Note } from "../types/note";

const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";
axios.defaults.headers.common["accept"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;

interface FetchNotesProps {
  search: string;
  page: number;
  perPage: number;
}

interface FetchNotesData {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes({
  search,
  page,
  perPage,
}: FetchNotesProps): Promise<FetchNotesData> {
  const { data } = await axios.get<FetchNotesData>("/", {
    params: {
      search: search,
      page: page,
      perPage: perPage,
    },
  });
  return data;
}

interface FetchDeleteNote {
  id: string;
}

type returnFetchDeleteNote = { id: string };
export async function fetchDeleteNote({
  id,
}: FetchDeleteNote): Promise<returnFetchDeleteNote> {
  const { data } = await axios.delete<returnFetchDeleteNote>(`/${id}`);
  return data;
}

interface addNotesProps {
  title: string;
  content: string;
  tag: string;
}
export async function addNotes({
  title,
  content,
  tag,
}: addNotesProps): Promise<string> {
  const { data } = await axios.post<string>("", {
    title: title,
    content: content,
    tag: tag,
  });
  return data;
}
