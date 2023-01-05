'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useClassNames } from '../../hooks/useClassNames';

export type SelectOption = { id: string; disabled: boolean };

interface Props<T extends SelectOption> {
  options: T[];
  selected: T | undefined;
  placeHolder?: string;
  labelProperty: keyof T;
  disabled?: boolean;
  onChange: (value: T) => void;
  className?: string;
  isLoading?: boolean;
}

export default function Select<T extends SelectOption>({
  options,
  selected,
  placeHolder,
  labelProperty,
  disabled,
  onChange,
  className,
  isLoading
}: Props<T>) {
  const { classNames } = useClassNames();

  return (
    <Listbox value={selected || null} onChange={onChange} disabled={disabled}>
      <div className={classNames('relative mt-1 w-full', className || '')}>
        <Listbox.Button className="bg-primary-50 dark:text-primary-50 relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-700 sm:text-sm">
          <span className="block truncate">
            {isLoading && 'Loading...'}
            {!isLoading && selected
              ? (selected[labelProperty] as string)
              : !isLoading && placeHolder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="bg-primary-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm">
            {options.map((option, i) => (
              <Listbox.Option
                key={i}
                disabled={option.disabled}
                className={({ active, disabled }) =>
                  classNames(
                    `dark:text-primary-50 relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900`,
                    disabled ? '!cursor-default !text-slate-500' : '',
                    active
                      ? 'bg-primary-200 text-primary-50 dark:bg-slate-600'
                      : ''
                  )
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option[labelProperty] as string}
                    </span>
                    {selected ? (
                      <span className="text-secondary-500 absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
