// Allow importing .astro files in TypeScript/VS Code
declare module '*.astro' {
  const Component: any;
  export default Component;
}
