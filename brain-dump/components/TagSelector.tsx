"use client"

import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'

export type TagType = 'work' | 'personal' | 'idea' | 'follow-up'

interface TagSelectorProps {
  value: TagType
  onValueChange: (value: TagType) => void
}

const TAGS: TagType[] = ['work', 'personal', 'idea', 'follow-up']

export default function TagSelector({ value, onValueChange }: TagSelectorProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className="inline-flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        aria-label="Tag"
      >
        <Select.Value placeholder="Select tag" />
        <Select.Icon className="ml-2 text-gray-500">
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:bg-zinc-800 dark:border-zinc-700">
        <Select.Viewport className="p-1">
          {TAGS.map((tag) => (
            <Select.Item
              key={tag}
              value={tag}
              className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-gray-700 outline-none focus:bg-blue-100 dark:text-zinc-50 dark:focus:bg-zinc-700"
            >
              <Select.ItemText>{tag}</Select.ItemText>
              <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                <Check size={16} />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}