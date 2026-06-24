// * ─────────────────────────────────────────────────────────────────────────────
// * IPC — contrato de canales entre proceso main (Node) y renderer (React)
// * ─────────────────────────────────────────────────────────────────────────────
// * Este archivo es la "API" interna de la app. Si un canal está aquí,
// * existe en preload/index.ts y en main/ipc/*.ts. Si no está aquí, no existe.
// * ─────────────────────────────────────────────────────────────────────────────

import type { Note, NoteCreate, NoteUpdate, NoteFolder } from './note'
import type { Task, TaskCreate, TaskUpdate, TaskGroup } from './task'
import type { ScrumCard, ScrumCardCreate, ScrumCardUpdate, ScrumBoard } from './scrum'
import type { AppConfig } from './config'

// * ─── Respuesta genérica de todos los canales IPC ─────────────────────────────

export interface IpcResponse<T = void> {
  ok: boolean
  data?: T
  error?: string
}

// ─── Canales de Notas ─────────────────────────────────────────────────────────

export interface NotesIpcChannels {
  'notes:get-all':    () => IpcResponse<Note[]>
  'notes:get-by-id':  (id: string) => IpcResponse<Note>
  'notes:create':     (payload: NoteCreate) => IpcResponse<Note>
  'notes:update':     (id: string, payload: NoteUpdate) => IpcResponse<Note>
  'notes:delete':     (id: string) => IpcResponse<void>
  'notes:folders:get-all':   () => IpcResponse<NoteFolder[]>
  'notes:folders:create':    (name: string) => IpcResponse<NoteFolder>
  'notes:folders:delete':    (id: string) => IpcResponse<void>
}

// ─── Canales de Tareas ────────────────────────────────────────────────────────

export interface TasksIpcChannels {
  'tasks:groups:get-all':  () => IpcResponse<TaskGroup[]>
  'tasks:groups:create':   (name: string) => IpcResponse<TaskGroup>
  'tasks:groups:update':   (id: string, name: string) => IpcResponse<TaskGroup>
  'tasks:groups:delete':   (id: string) => IpcResponse<void>
  'tasks:get-by-group':    (group_id: string) => IpcResponse<Task[]>
  'tasks:create':          (payload: TaskCreate) => IpcResponse<Task>
  'tasks:update':          (id: string, payload: TaskUpdate) => IpcResponse<Task>
  'tasks:delete':          (id: string) => IpcResponse<void>
  'tasks:reorder':         (group_id: string, ordered_ids: string[]) => IpcResponse<void>
}

// ─── Canales de Scrum ─────────────────────────────────────────────────────────

export interface ScrumIpcChannels {
  'scrum:boards:get-all':  () => IpcResponse<ScrumBoard[]>
  'scrum:boards:create':   (name: string) => IpcResponse<ScrumBoard>
  'scrum:boards:update':   (id: string, name: string) => IpcResponse<ScrumBoard>
  'scrum:boards:delete':   (id: string) => IpcResponse<void>
  'scrum:cards:get-by-board': (board_id: string) => IpcResponse<ScrumCard[]>
  'scrum:cards:create':    (payload: ScrumCardCreate) => IpcResponse<ScrumCard>
  'scrum:cards:update':    (id: string, payload: ScrumCardUpdate) => IpcResponse<ScrumCard>
  'scrum:cards:delete':    (id: string) => IpcResponse<void>
  'scrum:cards:move':      (id: string, column_id: string, order: number) => IpcResponse<void>
}

// ─── Canales de Config ────────────────────────────────────────────────────────

export interface ConfigIpcChannels {
  'config:get':    () => IpcResponse<AppConfig>
  'config:update': (payload: Partial<AppConfig>) => IpcResponse<AppConfig>
}

// ─── Unión de todos los canales (útil para tipar el contextBridge) ────────────

export type AllIpcChannels =
  & NotesIpcChannels
  & TasksIpcChannels
  & ScrumIpcChannels
  & ConfigIpcChannels

/** Nombres de todos los canales como string union */
export type IpcChannel = keyof AllIpcChannels
