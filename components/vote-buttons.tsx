import { Button } from '@/components/ui/button'

type VoteButtonsProps = {
    onVote: (side: 'left' | 'right') => void
    disabled?: boolean
  }

export function VoteButtons({ onVote, disabled }: VoteButtonsProps) {
    return (
      <div className="col-span-2 flex justify-center gap-4 mt-4">
        <Button
          onClick={() => onVote('left')}
          disabled={disabled}
          variant="outline"
          className="w-32"
        >
          Vote Left
        </Button>
        <Button
          onClick={() => onVote('right')}
          disabled={disabled}
          variant="outline"
          className="w-32"
        >
          Vote Right
        </Button>
      </div>
    )
  }