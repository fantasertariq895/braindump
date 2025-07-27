"use client"

import { motion } from 'framer-motion'
import { TagType } from './TagSelector'

export interface Note {
  id: string
  text: string
  tag: TagType
  timestamp: number
}

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const date = new Date(note.timestamp)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:bg-zinc-800 dark:border-zinc-700"
    >
      <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-zinc-400">
        <span>{date.toLocaleString()}</span>
        <span className="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 capitalize dark:bg-blue-900 dark:text-blue-300">
          {note.tag}
        </span>
      </div>
      <p className="text-sm text-gray-800 whitespace-pre-wrap dark:text-zinc-100">
        {note.text}
      </p>
    </motion.div>
  )
}