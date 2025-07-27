"use client"

import { useState } from 'react'
import TagSelector, { TagType } from './TagSelector'

interface NoteFormProps {
  onAdd: (text: string, tag: TagType) => void
}

export default function NoteForm({ onAdd }: NoteFormProps) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState<TagType>('work')

  const handleSubmit = () => {
    if (!text.trim()) return
    onAdd(text.trim(), tag)
    setText('')
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea
        maxLength={200}
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 200))}
        placeholder="What's on your mind?"
        rows={3}
        className="w-full rounded-md border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
      />
      <div className="flex items-center justify-between gap-4">
        <TagSelector value={tag} onValueChange={setTag} />
        <button
          onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={!text.trim()}
        >
          Save
        </button>
      </div>
    </div>
  )
}