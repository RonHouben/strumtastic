import { appConfig } from '@config/app';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/components/card';
import { Container } from '@ui/components/container';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = appConfig.metadata.admin;

export default function AdminPage() {
  return (
    <Container title={metadata.title} description={metadata.description}>
      <Card>
        <CardHeader>
          <CardTitle>Exercises</CardTitle>
          <CardDescription>Manage exercises</CardDescription>
          <CardContent className="flex flex-col">
            <ul className='list-disc'>
              <li>
                <Link href="/admin/exercises">Show all</Link>
              </li>
              <li>
                <Link href="/admin/exercises/create">Create</Link>
              </li>
            </ul>
          </CardContent>
        </CardHeader>
      </Card>
    </Container>
  );
}
