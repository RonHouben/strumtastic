'use client';

import * as Select from '@radix-ui/react-select';

interface Props {
  children: string;
}

export default function SelectItemGroupLabel({ children }: Props) {
  return <Select.Label className="p-6 text-primary-500">{children}</Select.Label>;
}
