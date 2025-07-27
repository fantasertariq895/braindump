"use client"

import { useEffect, useState } from 'react'
import NoteForm from '../components/NoteForm'
import NoteCard, { Note } from '../components/NoteCard'
import TagSelector, { TagType } from '../components/TagSelector'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'braindump-notes'

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filter, setFilter] = useState<TagType | 'all'>('all')

  // Load notes from localStorage
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (stored) {
      try {
        setNotes(JSON.parse(stored))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Persist when notes change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    }
  }, [notes])

  const addNote = (text: string, tag: TagType) => {
    const newNote: Note = {
      id: uuidv4(),
      text,
      tag,
      timestamp: Date.now(),
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const clearAll = () => {
    if (confirm('Clear all notes?')) {
      setNotes([])
    }
  }

  const displayedNotes = filter === 'all' ? notes : notes.filter((n) => n.tag === filter)

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-8 p-6">
      <h1 className="text-3xl font-bold">BrainDump</h1>
      <NoteForm onAdd={addNote} />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-zinc-400">Filter:</span>
          <TagSelector value={filter === 'all' ? ('work' as TagType) : (filter as TagType)} onValueChange={(v) => setFilter(v)} />
          <button
            onClick={() => setFilter('all')}
            className={`rounded px-2 py-1 text-xs ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-zinc-200'}`}
          >
            All
          </button>
        </div>
        {notes.length > 0 && (
          <button
            onClick={clearAll}
            className="rounded-md border border-red-500 px-3 py-1 text-xs text-red-500 hover:bg-red-500 hover:text-white"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4 pb-10">
        {displayedNotes.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-zinc-400">No notes yet.</p>
        ) : (
          displayedNotes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>
    </main>
  )
}
