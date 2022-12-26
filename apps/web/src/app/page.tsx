import { Typography } from 'ui/components';
import { Card } from 'ui/components/Card/';
import Link from 'ui/components/Link';

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <Link href="/connect-guitar">Connect guitar</Link>
        </Card>

        <Card>
          <Link href="/tuner">Tuner</Link>
        </Card>

        <Card>
          <Link href="/exercise">Exercises</Link>
        </Card>

        <Card>
          <Link href="/">Rockstar!</Link>
        </Card>
      </div>
    </div>
  );
}
