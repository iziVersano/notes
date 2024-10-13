// src/features/notes/types.ts

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO date string
  shared?: boolean; // Made optional
}
