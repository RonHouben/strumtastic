'use client';

import {
  Disclosure as HeadlessDisclosure,
  Transition
} from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Button from '../Button';

interface Props {
  title: string;
  isOpen?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

export default function Disclosure({ children, isOpen, title, icon }: Props) {
  return (
    <HeadlessDisclosure
      as="div"
      defaultOpen={isOpen}
      className="rounded-md"
    >
      {({ open }) => (
        <>
          <HeadlessDisclosure.Button
            size="md"
            variant="text"
            icon={icon}
            fullWidth
            refName='disclosure-button'
            color="secondary"
            as={Button}
            className="justify-between"
            selected={open}
          >
            <span>{title}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-primary-50 dark:text-secondary-500 hover:text-primary-50`}
            />
          </HeadlessDisclosure.Button>
          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <HeadlessDisclosure.Panel
              static
              className="rounded-md pl-5 py-2 text-sm"
            >
              {children}
            </HeadlessDisclosure.Panel>
          </Transition>
        </>
      )}
    </HeadlessDisclosure>
  );
}
