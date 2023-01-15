'use client';

import { Field, useFormikContext } from 'formik';
import { FocusEvent, HTMLInputTypeAttribute } from 'react';
import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function InputField({
  name,
  type,
  className,
  placeholder,
  autoFocus,
  onBlur,
  onFocus
}: Props) {
  const { setFieldTouched } = useFormikContext();
  const { classNames } = useClassNames();

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFieldTouched(name);

    if (onBlur){
      onBlur(e);
    }
  }

  return (
    <Field
      id={name}
      name={name}
      type={type}
      className={classNames(
        'relative w-full cursor-default rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-700 dark:text-primary-50 sm:text-sm',
        className || ''
      )}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onBlur={handleBlur}
      onFocus={onFocus}
    />
  );
}
