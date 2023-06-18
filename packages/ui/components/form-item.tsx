import { Label } from '@ui/components/label';
import { Field, ErrorMessage } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

interface Props {
  as?: string | React.ComponentType | React.ForwardRefExoticComponent<any>;
  id: string;
  label?: string;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

export function FormItem({
  as,
  className,
  id,
  label,
  placeholder,
  type,
  required
}: Props) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Field id={id} name={id} as={as} placeholder={placeholder} type={type} />
      <ErrorMessage name={id}>
        {(errorMessage: string) => (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </ErrorMessage>
    </div>
  );
}
