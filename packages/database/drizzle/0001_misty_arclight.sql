CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"musicXml" text,
	"isEnabled" boolean DEFAULT false,
	"createdAt" date DEFAULT now(),
	"updatedAt" date
);
