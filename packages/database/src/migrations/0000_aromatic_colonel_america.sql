CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"key" text NOT NULL,
	"musicXml" text NOT NULL,
	"isEnabled" boolean NOT NULL,
	"createdAt" date DEFAULT now(),
	"updatedAt" date
);
