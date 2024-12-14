import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <div className="text-neutral-400">
            Open source models supported by{' '}
            <Link 
              href="https://studio.nebius.ai"
              target="_blank"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Nebius AI Studio
            </Link>
          </div>
          <div className="text-neutral-400">
            developed by{' '}
            <Link 
              href="https://x.com/demian_ai"
              target="_blank"
              className="text-emerald-400 hover:text-emerald-300 transition-colors group"
            >
              dylan{' '}
              <span className="group-hover:animate-bounce inline-block">ツ</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}