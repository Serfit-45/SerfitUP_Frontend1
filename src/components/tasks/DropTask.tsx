import { useDroppable } from "@dnd-kit/core"

/** Componente que representa un área donde se pueden soltar tareas. 
 * Utiliza el hook useDroppable de la biblioteca @dnd-kit/core para manejar la lógica de arrastrar y soltar. 
 * El componente cambia su opacidad cuando una tarea está siendo arrastrada sobre él, 
 * indicando visualmente al usuario que puede soltar la tarea en esa área. */

type DropTaskProps = {
    status: string
}

export default function DropTask({ status }: DropTaskProps) {
  
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };
  
    return (
    <div
        style={style}
        ref={setNodeRef}
        className="grid p-2 mt-5 text-xs font-semibold uppercase border border-dashed border-slate-500 place-content-center text-slate-500"
    >
      Soltar tarea aquí
    </div>
  )
}
