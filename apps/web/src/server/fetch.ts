import nodeFetch from 'node-fetch';
import { appRouter, AppRouter } from '@server/routers/_app';

type TrpcResult<T> = {
  result: {
    data: {
      json: T;
    };
  };
};

type OmittedProperties = '_def' | 'createCaller' | 'getErrorShape';
type PartialRouter = keyof Omit<AppRouter, OmittedProperties>;
type Uri = `${PartialRouter}.${keyof Omit<
  AppRouter['exercises'],
  OmittedProperties
>}`;

export async function fetch<R>(uri: Uri) {
  const trpcUri = '/api/trpc';
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.PORT || 3000}${trpcUri}`
      : `${process.env.VERCEL_URL}${trpcUri}`;

  const res = await nodeFetch(`${baseUrl}/${uri}`);
  const result = (await res.json()) as TrpcResult<R>;

  return result.result.data.json;
}
