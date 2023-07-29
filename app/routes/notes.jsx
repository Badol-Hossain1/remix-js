import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "../data/notes";
import { json, redirect } from "@remix-run/node";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { useLoaderData } from "react-router";

export default function NotesPage() {
    // load the data from loader
  const notes = useLoaderData();
  return (
    <>
      <main>
        <NewNote />
        <NoteList notes={notes} />
      </main>
    </>
  );
}
export async function loader() {
  const notes = await getStoredNotes();
  return notes;
  // return new Response(JSON.stringify(notes),{headers:{'Content-Type':'application/json '}})
  //   return json(notes)
}
export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  //   add
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updateNotes = existingNotes.concat(noteData);
  await storeNotes(updateNotes);
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
