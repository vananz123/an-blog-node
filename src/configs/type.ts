 
export interface ConfigAppType {
  app: { port: number | string };
  db: { host: string; port: number | string; name: string };
}
