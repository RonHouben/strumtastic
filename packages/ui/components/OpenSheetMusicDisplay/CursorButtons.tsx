'use client';

import { useStateMachines } from '@ui/hooks/useStateMachines';
import { ButtonGroup } from '@ui/components/ButtonGroup';
import { Button } from '@ui/components/button';
import { Input } from '../input';
import { useMemo, useState } from 'react';

export function CursorButtons() {
  const { osmdMachine } = useStateMachines();
  const [goToMeasure, setGoToMeasure] = useState(1);

  const isDisabled = useMemo(
    () =>
      osmdMachine.state.matches('error') ||
      osmdMachine.state.matches('uninitialized') ||
      osmdMachine.state.matches('initializing'),
    [osmdMachine.state]
  );

  return (
    <ButtonGroup disabled={isDisabled}>
      <Button variant="outline" onClick={() => osmdMachine.send('cursor.show')}>
        Show
      </Button>
      <Button variant="outline" onClick={() => osmdMachine.send('cursor.prev')}>
        Previous
      </Button>
      <Button variant="outline" onClick={() => osmdMachine.send('cursor.next')}>
        Next
      </Button>
      <div className="flex gap-1">
        <Input
          type="number"
          min={1}
          placeholder="Go to measure"
          onChange={(e) => setGoToMeasure(Number(e.target.value))}
        />
        <Button
          variant="outline"
          onClick={() =>
            osmdMachine.send({
              type: 'cursor.moveToMeasure',
              payload: { measureIndex: goToMeasure - 1 }
            })
          }
        >
          Go
        </Button>
      </div>
      <Button variant="outline" onClick={() => osmdMachine.send('cursor.data')}>
        Get cursor data
      </Button>
    </ButtonGroup>
  );
}
