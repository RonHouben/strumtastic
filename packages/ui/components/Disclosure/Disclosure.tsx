'use client';

import { Disclosure as HeadlessDisclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';

export interface DisclosureItem {
  title: string;
  content: React.ReactNode | string;
  isOpen?: boolean;
}

interface Props {
  items: DisclosureItem[];
}

export default function Disclosure({ items }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <HeadlessDisclosure
          key={item.title}
          as="div"
          defaultOpen={item.isOpen}
          className="rounded-md bg-secondary-500 dark:bg-secondary-900 shadow-md"
        >
          {({ open }) => (
            <>
              <HeadlessDisclosure.Button className="flex w-full justify-between rounded-md bg-primary-500 dark:bg-primary-900 px-4 py-2 text-left text-sm font-medium text-primary-50 focus:outline-none focus-visible:ring focus-visible:ring-secondary-900 focus-visible:ring-opacity-75">
                <span>{item.title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-primary-50`}
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
                  className="rounded-md px-4 pt-2 pb-2 text-sm"
                >
                  {item.content}
                </HeadlessDisclosure.Panel>
              </Transition>
            </>
          )}
        </HeadlessDisclosure>
      ))}
    </div>
  );
}
