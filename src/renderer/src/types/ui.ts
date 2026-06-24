// * ─────────────────────────────────────────────────────────────────────────────
// * UI — tipos del estado visual (no se persisten en disco, viven en Zustand)
// * ─────────────────────────────────────────────────────────────────────────────

// * Vistas principales del sidebar
export type ActiveView =
  | "home"
  | "notes"
  | "tasks"
  | "scrum"
  | "search"
  | "settings";

// * Estado global de la UI
export interface UiState {
  active_view: ActiveView;
  sidebar_collapsed: boolean;

  // * Nota activa en el panel de edición
  active_note_id: string | null;

  // * Grupo de tareas activo en el panel de tareas
  active_task_group_id: string | null;

  // * Tablero scrum activo
  active_scrum_board_id: string | null;

  // * Modal/panel abierto en este momento (solo uno a la vez)
  open_modal: ModalType | null;

  // * Término de búsqueda global
  search_query: string;

  // * Si la app está cargando datos al inicio
  is_loading: boolean;

  // * Mensaje de error global (null si no hay error)
  error_message: string | null;
}

// * Modales disponibles en la app
export type ModalType =
  | "create_note"
  | "create_task"
  | "create_task_group"
  | "create_scrum_card"
  | "create_scrum_board"
  | "settings_user"
  | "confirm_delete";

// * Payload del modal de confirmación de borrado
export interface DeleteConfirmPayload {
  entity_type: "note" | "task" | "task_group" | "scrum_card" | "scrum_board";
  entity_id: string;
  entity_name: string; // * para mostrar en el texto "¿Eliminar 'Mi nota'?"
}
