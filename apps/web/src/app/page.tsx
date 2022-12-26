import { PluginGuitarCard } from 'ui/components';
import { Card, CardContent, CardMedia } from 'ui/components/Card/';
import Link from 'ui/components/Link';
import Article from 'ui/components/Typography/Article';

export default function Page() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:pt-28 lg:grid-cols-4">
      <PluginGuitarCard />

      <Card className="h-[30rem]">
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

      <Card className="h-[30rem]">
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

      <Card className="h-[30rem]">
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
