import { useRef, useEffect } from 'preact/hooks'
import TypeWriterPlugin from '../third_party/Typewriter.ts'

export interface TypeWriterProps {
  // deno-lint-ignore no-explicit-any
  sequence: any[]
}

export default function TypeWriter (props: TypeWriterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) {
      return
    }

    const typewriter = new TypeWriterPlugin(ref.current, {
      loop: true,
      delay: 75,
      autoStart: true,
    })

    for (const [method, args] of props.sequence) {
      // @ts-expect-error type issue
      typewriter[method](args)
    }

    ref.current?.querySelector('.Typewriter__cursor')?.remove()
  })
  const cursorStyle = {
    '-webkit-animation': 'Typewriter-cursor 1s infinite',
    animation: 'Typewriter-cursor 1s infinite',
    'margin-left': '1px'
  }

  return (
    <>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#A38CF0] to-[#C83D79]" ref={ref}>Readme.md</span>
      <span style={cursorStyle}>|</span>
    </>
  )
}
