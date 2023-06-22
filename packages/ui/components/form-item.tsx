import { Label } from '@ui/components/label';
import { Field, ErrorMessage } from 'formik';
import { HTMLInputTypeAttribute, useMemo } from 'react';

interface Props {
  as?: string | React.ComponentType | React.ForwardRefExoticComponent<any>;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
}

export function FormItem(props: Props) {
  const inputProps = useMemo(() => {
    const { value, ...rest } = props;
    return value ? { ...rest, value } : rest;
  }, [props]);


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputProps.onChange) {
      inputProps.onChange(event);
    }
  };

  return (
    <div className={props.className}>
      <Label htmlFor={props.name} required={props.required}>
        {props.label}
      </Label>
      <Field {...inputProps} onChange={handleOnChange} />
      <ErrorMessage name={props.name}>
        {(errorMessage: string) => (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </ErrorMessage>
    </div>
  );
}
