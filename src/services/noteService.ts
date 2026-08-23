import axios from "axios";
import type { Note } from "../types/note";

const url = "https://notehub-public.goit.study/api/";
const apiKey = import.meta.env.VITE_NOTEHUB_TOKEN;

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
  const { data } = await axios.get<FetchNotesData>(`${url}notes`, {
    params: {
      search: search,
      page: page,
      perPage: perPage,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  return data;
}
