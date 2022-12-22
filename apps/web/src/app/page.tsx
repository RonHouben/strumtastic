import Link from 'next/link';
import { Article } from 'ui/components/Typography';

export default function Page() {
  return (
    <div>
      <Article>
        <h1>Homepage</h1>
        <ul className="list-disc">
          <li>
            <Link href="/connect-guitar" className='no-underline'>Connect guitar</Link>
          </li>
          <li>
            <Link href="/tuner" className='no-underline'>Tuner</Link>
          </li>
          <li>
            <Link href="/exercise" className='no-underline'>Exercises</Link>
          </li>
        </ul>
      </Article>
    </div>
  );
}
