import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type StartAgainModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function StartAgainModal({ isOpen, onClose, onConfirm }: StartAgainModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-neutral-200">Start New Challenge?</DialogTitle>
          <DialogDescription className="text-neutral-400">
            This will clear the current results and let you start a new challenge.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Start Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}