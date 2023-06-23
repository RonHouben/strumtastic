import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from 'ui/components/alert';

interface Props {
  error: Error;
}

export function AlertError({ error }: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{error.name}</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
