// ─────────────────────────────────────────────────────────────────────────────
// INDEX — un solo lugar para importar todos los types de Meteor Notes
// ─────────────────────────────────────────────────────────────────────────────
// Uso en cualquier archivo del proyecto:
//   import type { Note, Task, ScrumCard, AppConfig } from '@/types'
// ─────────────────────────────────────────────────────────────────────────────

export type { Auditable, BaseEntity, ColorTag, Status } from "./common";
export type { Note, NoteFolder, NoteCreate, NoteUpdate } from "./note";
export type {
  Task,
  TaskFlat,
  TaskGroup,
  TaskGroupStats,
  TaskCreate,
  TaskUpdate,
  TaskPriority,
} from "./task";
export type {
  ScrumCard,
  ScrumCardCreate,
  ScrumCardUpdate,
  ScrumBoard,
  ScrumColumn,
  ScrumColumnId,
  ScrumChecklistItem,
  ScrumEffort,
  ScrumBoardStats,
} from "./scrum";
export { SCRUM_COLUMNS } from "./scrum";
export type {
  AppConfig,
  UserProfile,
  AppTheme,
  AppLanguage,
  DefaultView,
} from "./config";
export { DEFAULT_CONFIG } from "./config";
export type {
  UiState,
  ActiveView,
  ModalType,
  DeleteConfirmPayload,
} from "./ui";
export type {
  IpcResponse,
  IpcChannel,
  AllIpcChannels,
  NotesIpcChannels,
  TasksIpcChannels,
  ScrumIpcChannels,
  ConfigIpcChannels,
} from "./ipc";
