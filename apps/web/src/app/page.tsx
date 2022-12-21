import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <article className="prose">
        <h1>Homepage</h1>
        <ul className="list-disc">
          <li>
            <Link href="/connect-guitar">Connect guitar</Link>
          </li>
          <li>
            <Link href="/tuner">Tuner</Link>
          </li>
        </ul>
      </article>
    </div>
  );
}
