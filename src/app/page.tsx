"use client"

import { Console } from "@/components/lib/Console";
import { useConsole } from "@/hooks/useConsole";
import { useGame } from "@/hooks/useGame";
import { sleep } from "@/utils/sleep";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const {
    characters,
    writeToConsole,
    typeToConsole,
    isCharacterDrawing,
    resetCharacters
  } = useConsole()

  const {
    isPromptDisabled,
    onPromptSubmitRef
  } = useGame({
    writeToConsole,
    typeToConsole,
    resetCharacters
  })

  return (
    <div
      className="min-h-screen bg-gray-800 text-white flex justify-center items-center"
    >
      <Console
        characters={characters}
        onPromptSubmitRef={onPromptSubmitRef}
        isPromptDisabled={isPromptDisabled || isCharacterDrawing}
      />
    </div>
  );
}
