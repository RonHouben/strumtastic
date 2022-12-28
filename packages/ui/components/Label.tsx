import * as RadixLabel from '@radix-ui/react-label';

interface Props {
  children: string;
  htmlFor: string;
}

export default function Label({ children, htmlFor }: Props) {
  return (
    <RadixLabel.Root className="text-primary-50 select-none" htmlFor={htmlFor}>
      {children}
    </RadixLabel.Root>
  );
}
