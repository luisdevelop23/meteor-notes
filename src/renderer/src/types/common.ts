// * ─────────────────────────────────────────────────────────────────────────────
// * COMMON — tipos compartidos por todas las entidades
// * ─────────────────────────────────────────────────────────────────────────────

export interface Auditable {
  created_at: string 
  updated_at: string
}

// * Una entidad tiene ID + auditoría
export interface BaseEntity extends Auditable {
  id: string 
}

// * Colores disponibles para etiquetar notas, grupos, tarjetas scrum, etc.
export type ColorTag =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'

//* Estado de completado genérico (notas, tareas)
export type Status = 'active' | 'completed' | 'archived'
