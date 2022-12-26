import Link from 'ui/components/Link';
import Article from 'ui/components/Typography/Article';

export default function Page() {
  return (
    <div>
      <Article>
        <h1 className="text-secondary-500">Strumtastic</h1>
        <ul className="list-disc">
          <li>
            <Link href="/connect-guitar">Connect guitar</Link>
          </li>
          <li>
            <Link href="/tuner">Tuner</Link>
          </li>
          <li>
            <Link href="/exercise">Exercises</Link>
          </li>
        </ul>
      </Article>
    </div>
  );
}
