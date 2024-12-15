'use client'

type EmojiShortcutsProps = {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function EmojiShortcuts({ onSelect, disabled }: EmojiShortcutsProps) {
  const emojis = ['🌳', '🌊', '🌙', '🎮', '🎨', '🎭', '🎪', '🎡']
  
  return (
    <div className="flex justify-center gap-2">
      {emojis.map(emoji => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          disabled={disabled}
          className="text-2xl opacity-70 hover:opacity-100 transition-opacity disabled:opacity-30"
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}