'use client';

import * as RadixSelect from '@radix-ui/react-select';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
export default function SelectItemGroup({ children }: Props) {
  return <RadixSelect.Group>{children}</RadixSelect.Group>;
}
