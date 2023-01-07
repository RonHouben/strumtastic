import nodeFetch from 'node-fetch';
import { AppRouter } from '@server/routers/_app';

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
  const hostUrl = `http://localhost:${process.env.PORT || 3000}`;
  const trpcUri = '/api/trpc';
  const url =
    process.env.NODE_ENV === 'development'
      ? `${hostUrl}${trpcUri}`
      : `${process.env.VERCEL_URL || hostUrl}${trpcUri}`;

  const res = await nodeFetch(`${url}/${uri}`);
  const result = (await res.json()) as TrpcResult<R>;

  return result.result.data.json;
}
