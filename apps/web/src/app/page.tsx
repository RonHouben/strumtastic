import Link from 'next/link';
import { Article } from 'ui/components/Typography';

export default function Page() {
  return (
    <div>
      <Article>
        <h1>Homepage</h1>
        <ul className="list-disc">
          <li>
            <Link href="/connect-guitar">Connect guitar</Link>
          </li>
          <li>
            <Link href="/tuner">Tuner</Link>
          </li>
        </ul>
      </Article>
    </div>
  );
}
