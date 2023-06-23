/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'local' | 'production'
		NEXT_PUBLIC_VERCEL_URL: string;
  }
}
