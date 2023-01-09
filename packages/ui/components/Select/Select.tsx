'use client';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useClassNames } from '../../hooks/useClassNames';
import { SelectOption } from '../../types';

interface Props<T extends SelectOption> {
  options: T[];
  selected: T | undefined;
  placeHolder?: string;
  labelProperty: keyof T;
  isDisabled?: boolean;
  onChange: (value: T) => void;
  className?: string;
  isLoading?: boolean;
}

export default function Select<T extends SelectOption>({
  options,
  selected,
  placeHolder,
  labelProperty,
  isDisabled,
  onChange,
  className,
  isLoading
}: Props<T>) {
  const { classNames } = useClassNames();

  return (
    <Listbox value={selected || null} onChange={onChange} disabled={isDisabled}>
      <div className={classNames('relative mt-1 w-full', className || '')}>
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-primary-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-700 dark:text-primary-50 sm:text-sm">
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
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm">
            {options.map((option, i) => (
              <Listbox.Option
                key={i}
                disabled={option.isDisabled}
                className={({ active, disabled }) =>
                  classNames(
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 dark:text-primary-50`,
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary-500">
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
