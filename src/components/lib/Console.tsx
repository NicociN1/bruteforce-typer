import { ConsoleCharacter } from "@/types/ConsoleCharacter";
import { twMerge } from "tailwind-merge";
import { ChevronRight } from 'lucide-react'
import { RefObject, useEffect, useRef, useState } from "react";

interface ConsoleProps {
  characters: ConsoleCharacter[]
  onPromptSubmitRef: RefObject<(prompt: string) => void>
  isPromptDisabled?: boolean
}

export function Console(props: ConsoleProps) {
  const [prompt, setPrompt] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight
    })
  }, [props.characters])

  return (
    <div
      className="bg-black text-green-500 flex flex-col p-4 text-xl"
      style={{
        width: '1024px',
        height: '576px'
      }}
    >
      <div
        className="grow overflow-scroll w-full select-none"
        ref={containerRef}
      >
        {props.characters.map((c, i) => (
          <div
            key={i}
            className={twMerge(
              c.bold && 'font-bold',
              c.italic && 'italic',
              c.underline && 'underline'
            )}
            style={{
              color: c.color
            }}
          >
            {c.text.split('\n').map((t, i) => (
              <p
                className="h-6"
                key={i}
              >
                {t}
              </p>
            ))}
          </div>
        ))}
      </div>
      
      <div
        className="w-full flex border-2 border-white px-1 py-1"
        style={{
          opacity: props.isPromptDisabled ? 0.5 : undefined
        }}
      >
        <ChevronRight
          className="w-8 h-8 text-white"
        />

        <input
          ref={inputRef}
          className="border-none outline-none w-full"
          value={prompt}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter' || props.isPromptDisabled || isComposing) return
            props.onPromptSubmitRef.current(prompt)
            setPrompt('')
          }}
        />
      </div>
    </div>
  )
}
