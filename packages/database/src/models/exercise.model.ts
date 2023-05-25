import { Collection } from "fireorm";

@Collection()
export class Exercise {
  id!: string;
  title!: string;
  key!: string;
  notesToPlay!: string[];

  isEnabled!: boolean;

  createdAt!: Date;
  updatedAt!: Date | null;
}