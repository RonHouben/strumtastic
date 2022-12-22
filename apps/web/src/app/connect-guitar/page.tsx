'use client';
import { RequestMicrophoneAccess } from 'ui/components/AudioEngine';

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ConnectGuitarPage({ searchParams }: Props) {
  const navigatedFrom = searchParams?.navigatedFrom as string | undefined;
  console.log('********')
  console.log(navigatedFrom)
  console.log('********')
  // TODO: figure out how to get either:
  // - history path from router
  // - get query param
  return (
    <div className="flex h-screen items-center justify-center">
      <RequestMicrophoneAccess navigatedFrom={navigatedFrom} />
    </div>
  );
}
