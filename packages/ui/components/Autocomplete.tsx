'use client';

import React, { Fragment, useState, FocusEvent } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SelectOption } from '../types';
import { useClassNames } from '../hooks/useClassNames';
import { useFormikContext } from 'formik';

interface Props<T extends SelectOption> {
  name: string;
  options: T[];
  selected?: T;
  labelProperty: keyof T;
  placeholder?: string;
  onChange?: (selectedOption: T) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function AutoComplete<T extends SelectOption>({
  name,
  options,
  selected,
  labelProperty,
  placeholder,
  onChange,
  onBlur
}: Props<T>) {
  const { classNames } = useClassNames();
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const [selectedOption, setSelectedOption] = useState<T | undefined>(selected);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          (option[labelProperty] as string)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
    setIsOpen(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name);
    setIsOpen(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleOnChange = (option: T) => {
    setSelectedOption(option);
    setFieldValue(name, option);

    if (onChange) {
      onChange(option);
    }

    setIsOpen(false);
  };

  return (
    <Combobox value={selectedOption} onChange={handleOnChange}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-md text-left shadow-sm">
          <Combobox.Input
            name={name}
            className={classNames(
              'relative w-full cursor-default rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-700 dark:text-primary-50 sm:text-sm'
            )}
            displayValue={(option: T) =>
              option ? (option[labelProperty] as string) : placeholder || ''
            }
            onFocus={handleFocus}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={handleBlur}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 m-2 flex cursor-pointer items-center rounded-md dark:bg-slate-700 dark:text-primary-50 sm:text-sm">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          show={isOpen}
          as={Fragment}
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            static
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 py-1 text-base shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm"
          >
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
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
                  {({ selected, active }) => (
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
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
