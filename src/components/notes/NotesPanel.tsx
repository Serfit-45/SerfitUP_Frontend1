import type { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

/** Componente para mostrar el panel de notas de una tarea, que incluye un formulario para agregar nuevas notas y una lista de las notas existentes.
 * Permite a los usuarios ver las notas asociadas a una tarea específica, 
 * agregar nuevas notas utilizando el formulario proporcionado, y visualizar los detalles de cada nota, 
 * incluyendo su contenido, autor y fecha de creación. */

type NotesPanelProps = {
    notes: Task['notes']
}
export default function NotesPanel({ notes}: NotesPanelProps) {
  return (
    <>
        <AddNoteForm />

        <div className="mt-10 divide-y divide-gray-100">
            {notes.length ? (
              <>
                <p className="my-5 text-2xl font-bold text-slate-600">Notas</p>
                {notes.map(note => <NoteDetail key={note._id} note={note} />)}
              </>
            ) : <p className="pt-3 text-center text-gray-500">No hay notas para esta tarea</p>}
        </div>
    </>
  )
}
