'use client'

import { EMOJI_MAPPINGS } from '@/lib/emoji-mappings'

type EmojiShortcutsProps = {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function EmojiShortcuts({ onSelect, disabled }: EmojiShortcutsProps) {
  const emojis = Object.keys(EMOJI_MAPPINGS)
  
  return (
    <div className="flex justify-center gap-2">
      {emojis.map(emoji => (
        <button
          key={emoji}
          onClick={() => onSelect(EMOJI_MAPPINGS[emoji as keyof typeof EMOJI_MAPPINGS])}
          disabled={disabled}
          className="text-2xl opacity-70 hover:opacity-100 transition-opacity disabled:opacity-30"
          title={EMOJI_MAPPINGS[emoji as keyof typeof EMOJI_MAPPINGS]}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}