## Project Memory (READ FIRST)

Before any task on this site, read `docs/memoria.md`. It preserves decisions, implemented/deployed work, technical notes, pending phases, and the copy provided by the creator. Update it after finishing each work session.

## Project Workflow

This project has two clear roles:

- **Technical implementation** (this session): Build the site structure, components, routing, styling, SEO, performance. Code only.
- **Creative content** (the creator): Copy, text, descriptions, philosophy, brand voice, visual direction. Content only.

**Rule:** Do NOT write final copy, creative text, or brand messaging. When content is needed in a component or page, use placeholder text or ask the user to provide it. The creator provides the content; this session implements it.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Deployment

When deploying, run these commands in sequence:

```
npm run build
npx firebase-tools deploy
git add -A && git commit -m "deploy: update" && git push
```

If any step fails, stop and report the error. Do not proceed to the next step.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
