'use client';

import React, { createContext } from 'react';
import type { IOSMDOptions } from 'opensheetmusicdisplay';
import { useInterpret } from '@xstate/react';
import { opensheetMusicDisplayMachine } from '../machines/opensheet-music-display.machine';
import { InterpreterFrom } from 'xstate';
import '../reset-img.css';

export interface IOpenSheetMusicDisplayContext {
  osmdService: InterpreterFrom<typeof opensheetMusicDisplayMachine>;
}

export const OpenSheetMusicDisplayContext =
  createContext<IOpenSheetMusicDisplayContext>(
    {} as IOpenSheetMusicDisplayContext
  );

interface Props {
  children: React.ReactNode;
  options: IOSMDOptions;
}

export const OpenSheetMusicDisplayProvider = ({
  children,
  options,
}: Props) => {
  const containerId = 'opensheet-music-display';

  const osmdService = useInterpret(opensheetMusicDisplayMachine, {
    context: {
      containerId,
      options
    }
  });

  return (
    <OpenSheetMusicDisplayContext.Provider value={{ osmdService }}>
      {children}
      <div id={containerId} className='reset-img' />
    </OpenSheetMusicDisplayContext.Provider>
  );
};
