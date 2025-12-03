export interface ConsoleCommand {
  cmd: string
  run: (options: string[]) => void
}
