declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'local' | 'production'
    POSTGRES_URL: string;
  }
}
