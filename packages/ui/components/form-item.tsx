import { Label } from 'ui/components/label';
import { Field, ErrorMessage } from 'formik';
import { HTMLInputTypeAttribute, useMemo } from 'react';

interface Props {
  as?: string | React.ComponentType | React.ForwardRefExoticComponent<any>;
  id?: string;
  name?: string;
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
    const { onChange, ...rest } = props;

    return onChange ? { ...rest, onChange } : rest;
  }, [props]);

  return (
    <div className={inputProps.className}>
      <Label htmlFor={inputProps.name} required={inputProps.required}>
        {inputProps.label}
      </Label>
      <Field {...inputProps} />
      <ErrorMessage name={inputProps.name}>
        {(errorMessage: string) => (
          <div className="text-sm text-red-500">{errorMessage}</div>
        )}
      </ErrorMessage>
    </div>
  );
}
