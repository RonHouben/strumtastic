import { Article, GuitarAmpSVG, Typography } from 'ui/components';
import { Card } from 'ui/components/Card/';
import Link from 'ui/components/Link';

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-4 pt-28">
      <Card>
        <Link href="/connect-guitar">
          <div className="h-1/2 w-full rounded-t-md bg-secondary-500 p-2">
            <GuitarAmpSVG className="h-2/3 fill-primary-500 stroke-primary-500" />
          </div>
          <div className="mx-3 my-2 h-1/2">
            <Article>
              <h1 className="text-secondary-500">1. Plug In</h1>
              <p className="text-secondary-50">
                Connect your guitar so you&apos;ll instant feedback on your
                playing
              </p>
            </Article>
          </div>
        </Link>
      </Card>

      <Card>
        <Link href="/tuner">
          <div className="mx-3 h-1/3">
            <Article>
              <h1 className="pt-2 text-secondary-500">2. Get in tune</h1>
              <p className="text-primary-50">
                Be sure to have your guitar in tune!
              </p>
            </Article>
          </div>
          <div className="h-2/3 w-full rounded-b-md bg-secondary-500 text-primary-500">
            [Tuner SVG Image]
          </div>
        </Link>
      </Card>

      <Card>
        <div className="h-1/2 w-full rounded-t-md bg-secondary-500 p-2 text-primary-500">
          [Pick your practice SVG Image]
        </div>
        <div className="mx-3 my-2 h-1/2">
          <Article>
            <h1 className="text-secondary-500">3. Pick your practice</h1>
            <p className="text-secondary-50">
              We will guide you to make sure that you&apos;re practicing the
              right thing.
              <br />
              No matter what level!
            </p>
          </Article>
        </div>
      </Card>

      <Card>
        <Link href="/exercise">
          <div className="mx-3 h-2/3">
            <Article>
              <h1 className="pt-2 text-secondary-500">4. Become a Rockstar!</h1>
              <p className="text-primary-50">
                Measure yourself against other Rockstars by joining the
                leaderboards.
              </p>
            </Article>
          </div>
          <div className="h-1/3 w-full rounded-b-md bg-secondary-500 text-primary-500">
            [Rockstar SVG Image]
          </div>
        </Link>
      </Card>
    </div>
  );
}
