/// <reference types="vite/client" />

declare module '*.html?raw' {
  const content: string
  export default content
}

declare module '*.json' {
  const value: Record<string, unknown>
  export default value
}
