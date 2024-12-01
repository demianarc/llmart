'use client'

import { CREATIVE_TYPES, CreativeType } from '@/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CreativeTypeSelectorProps {
  selected: CreativeType
  onChange: (type: CreativeType) => void
  disabled?: boolean
}

export function CreativeTypeSelector({ selected, onChange, disabled }: CreativeTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CREATIVE_TYPES.map((type) => (
        <Button
          key={type}
          variant={selected === type ? 'default' : 'outline'}
          onClick={() => onChange(type)}
          disabled={disabled}
          className={cn(
            'capitalize',
            selected === type && 'bg-emerald-600 hover:bg-emerald-700'
          )}
        >
          {type}
        </Button>
      ))}
    </div>
  )
}