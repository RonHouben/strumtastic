# Musician

The idea of this repository is to create a web application that will help guitarist with their exercises
by recognizing the notes they're playing via the microphone using the Web Audio API.
The goal is to give exercises like playing a C Major scale and the application will visualize the notes the guitarist is playing on a virtual fretboard. 

## Progress tracking & roadmap

For the progress tracking & roadmap I use the following Notion board:
https://held-glass-d7b.notion.site/Musician-2cb160b74d704b1db41f150db0cf203c

## Monorepo setup

This project is setup as a monorepo using Turborepo and npm as a pacakge manager.
It includes the following packages/apps:

### Apps and Packages

- `/apps/web`: the NextJS 13 web application.
- `/apps/database`: a PostgreSQL database running in Docker.
- `/packages/ui`: a custom React component library used by the `web` application.
- `/packages/audio-engine`: a custom made audio engine that uses the Web Audio API.
- `/packages/music-notes`: a custom made controller to handle everything that has to do with Musical Notation (i.e. translating frequency to a Note name).
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.

Everything is developed using TypeScript.

### Utilities

This turborepo has some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [TailwindCSS](https://tailwindcss.com) for styling
- [xState](https://xstate.com) for state management
- [trpc](https://trpc.io) as E2E typesafe API library

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
- [NextJS 13](https://beta.nextjs.org/docs/)
- [TypeScript](https://typescriptlang.org)
