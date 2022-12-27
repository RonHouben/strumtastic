'use client';

import { Card, CardMedia, CardContent } from './Card';
import { GuitarTuner } from './GuitarTuner';
import { Article } from './Typography';

export default function TunerCard() {
  const handleStopTuner = () => {
    console.log('IMPLEMENT');
  };

  return (
    <Card className="h-[30rem]">
      <CardMedia>
        <GuitarTuner onStopTuner={handleStopTuner} />
      </CardMedia>
      <CardContent>
        <Article>
          <h1 className="text-secondary-100">2. Get in tune</h1>
          <p className="text-primary-100">
            Be sure to have your guitar in tune!
          </p>
        </Article>
      </CardContent>
    </Card>
  );
}
