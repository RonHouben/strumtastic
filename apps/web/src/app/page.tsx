'use client';

import { useCallback, useRef} from 'react';
import { PluginGuitarCard } from '@ui/components';
import { useStateMachines } from '@ui/hooks/useStateMachines';
import { useScrollIntoView } from '@ui/hooks/useScrollIntoView';
import { Container } from '@ui/components/container';

export default function Page() {
  const { onboardUser } = useStateMachines();
  const scrollIntoView = useScrollIntoView();
  const tunerCardRef = useRef<HTMLDivElement>(null);

  const handlePluginGuitarDone = useCallback(() => {
    onboardUser.send('TUNE_GUITAR');

    scrollIntoView(tunerCardRef);
  }, [onboardUser, scrollIntoView]);

  return (
    <Container className="pt-10 pb-10">
      <PluginGuitarCard
        disabled={!onboardUser.state.matches('pluggingInGuitar')}
        onDone={handlePluginGuitarDone}
      />
    </Container>
  );
}
