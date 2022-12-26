'use client';
import { RequestMicrophoneAccess } from 'ui/components/AudioEngine';

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ConnectGuitarPage({ searchParams }: Props) {
  const navigatedFrom = searchParams?.navigatedFrom as string | undefined;

  return (
    <div className=" md:pt-28">
      <RequestMicrophoneAccess navigatedFrom={navigatedFrom} />
    </div>
  );
}
