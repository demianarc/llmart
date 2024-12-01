'use client'

import { Button } from '@/components/ui/button'

const EMOJI_OPTIONS = [
  // Animals
  { emoji: '🐱', label: 'Cat' },
  { emoji: '🐶', label: 'Dog' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐰', label: 'Rabbit' },
  { emoji: '🦄', label: 'Unicorn' },
  { emoji: '🦋', label: 'Butterfly' },
  { emoji: '🐢', label: 'Turtle' },
  { emoji: '🦁', label: 'Lion' },
  
  // Nature
  { emoji: '🌸', label: 'Cherry Blossom' },
  { emoji: '🌳', label: 'Tree' },
  { emoji: '🌵', label: 'Cactus' },
  { emoji: '🌈', label: 'Rainbow' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🌙', label: 'Moon' },
  { emoji: '☀️', label: 'Sun' },
  { emoji: '🌍', label: 'Earth' },
  
  // Objects & Tech
  { emoji: '🚀', label: 'Rocket' },
  { emoji: '🤖', label: 'Robot' },
  { emoji: '💻', label: 'Computer' },
  { emoji: '📱', label: 'Phone' },
  { emoji: '⌚', label: 'Watch' },
  { emoji: '🎮', label: 'Game Controller' },
  
  // Food & Drinks
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '🍔', label: 'Burger' },
  { emoji: '🍦', label: 'Ice Cream' },
  { emoji: '🍪', label: 'Cookie' },
  { emoji: '☕', label: 'Coffee' },
  
  // Hearts & Symbols
  { emoji: '❤️', label: 'Heart' },
  { emoji: '⚡', label: 'Lightning' },
  { emoji: '🎵', label: 'Music Note' },
  { emoji: '💎', label: 'Diamond' },
  { emoji: '🎨', label: 'Art Palette' },
  
  // Transportation
  { emoji: '🚗', label: 'Car' },
  { emoji: '✈️', label: 'Airplane' },
  { emoji: '🚲', label: 'Bicycle' },
  { emoji: '⛵', label: 'Sailboat' }
]

interface EmojiShortcutsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function EmojiShortcuts({ onSelect, disabled }: EmojiShortcutsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {EMOJI_OPTIONS.map(({ emoji, label }) => (
        <Button
          key={emoji}
          variant="ghost"
          size="sm"
          onClick={() => onSelect(label)}
          disabled={disabled}
          className="text-lg hover:bg-neutral-800"
        >
          {emoji}
        </Button>
      ))}
    </div>
  )
}