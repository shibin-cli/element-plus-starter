declare module '*.svg' {
  const CONTENT: string
  export default CONTENT
}
declare module '*?component' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
