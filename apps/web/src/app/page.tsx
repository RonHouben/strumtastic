import { Card, CardContent, CardMedia } from 'ui/components/Card/';
import Link from 'ui/components/Link';
import { GuitarAmpSVG } from 'ui/components/SVG/GuitarAmpSVG';
import Article from 'ui/components/Typography/Article';

export default function Page() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-4">
      <Card>
        <Link href="/connect-guitar">
          <CardMedia
            svgComponent={
              <GuitarAmpSVG className="md:h-2/3 fill-primary-500 stroke-primary-500" />
            }
          />
          <CardContent>
            <Article>
              <h1 className="text-secondary-500">1. Plug In</h1>
              <p className="text-secondary-50">
                Connect your guitar so you&apos;ll instant feedback on your
                playing
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card>

      <Card>
        <Link href="/tuner">
          <CardMedia>[Tuner SVG Image]</CardMedia>
          <CardContent>
            <Article>
              <h1 className="text-secondary-500">2. Get in tune</h1>
              <p className="text-primary-50">
                Be sure to have your guitar in tune!
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card>

      <Card>
        <Link href="#">
          <CardMedia>[Pick your practice SVG Image]</CardMedia>
          <CardContent>
            <Article>
              <h1 className="text-secondary-500">3. Pick your practice</h1>
              <p className="text-secondary-50">
                We will guide you to make sure that you&apos;re practicing the
                right thing.
                <br />
                No matter what level!
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card>

      <Card>
        <Link href="/exercise">
          <CardMedia>[Rockstar SVG Image]</CardMedia>
          <CardContent>
            <Article>
              <h1 className="text-secondary-500">4. Become a Rockstar!</h1>
              <p className="text-primary-50">
                Measure yourself against other Rockstars by joining the
                leaderboards.
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
