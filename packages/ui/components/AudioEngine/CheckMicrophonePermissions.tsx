import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const CheckMicrophonePermissions = () => {
  const router = useRouter();

  useEffect(() => {
    const getMicrophonePermissionsAsync = async () => {
      const microphonePermissionStatus = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });

      if (microphonePermissionStatus.state === 'denied') {
        router.push('/connect-guitar');
      }
    };

    getMicrophonePermissionsAsync();
  }, [router]);

  return <></>;
}