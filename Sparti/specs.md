# specs.md — Sparti Schema Detection and Visual Editor Linking (Code-Driven)

This document explains ONLY how your Sparti schema is discovered ("detected") and how it is linked to the visual editor UI. It embeds the real code from this project so you can see the complete detector chain end-to-end.

## 1) Single Source of Truth: sparti.config.ts

The editor UI is generated from the default export of `sparti.config.ts`. This is the root object the visual editor reads to discover:
- Collections (multi-entry content)
- Singletons (single-entry content)
- UI navigation structure and branding
- Storage configuration (local in this project)

```ts
// file: sparti.config.ts
import { config } from '@sparti/core';
import { home, navbar, footer, branding, seo } from './src/cms/singletons';
import { posts } from './src/cms/collections';

export default config({
  storage: {
    kind: 'local',
  },

    ui: {
    brand: { name: 'Astrokeys' },
    navigation: {
      'Content': ['home',  'posts',  ],
      'Components': [ 'navbar', 'footer'],
      'Site Settings': [ 'branding', 'seo' ],
    },
  },

  collections: {
    posts,
  },

  singletons: {
    home,
    navbar,
    footer,
    branding,
    seo
  },
});
```

Detector facts:
- Whatever is exported under `collections` and `singletons` is what appears in the visual editor.
- The `ui.navigation` keys and arrays control editor sidebar groupings and order.
- Changing this file or any of the imported modules triggers a reload in the editor.


## 2) Editor Linking: makePage + page mount

The editor UI is produced by `@sparti/astro/ui` via `makePage(config)` and then mounted in the `/sparti` route page.

```ts
// file: sparti.page.ts
import { makePage } from "@sparti/astro/ui";
import spartiConfig from "./sparti.config";

export const Sparti = makePage(spartiConfig);
```

```astro
---
// file: src/pages/sparti.astro
import { Sparti as SpartiAdmin } from "../../sparti.page";
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sparti Admin</title>
  </head>
  <body>
    <div id="sparti-app">
      <SpartiAdmin client:only="react" />
    </div>
  </body>
</html>
```

Detector facts:
- The editor at `/sparti` renders exactly what is defined in `sparti.config.ts`.
- There are no additional routes or APIs needed for local storage mode.


## 3) Collections: how they are detected

Your collections are modularized under `src/cms/collections/` and aggregated through an index for clean imports.

```ts
// file: src/cms/collections/index.ts
export * from "./posts";
```

```ts
// file: src/cms/collections/posts.ts
import { fields, collection } from '@sparti/core';

export const posts = collection({
    label: 'Posts',
    slugField: 'title',
    path: 'src/content/posts/*',
    entryLayout: 'content',
    format: { contentField: 'content' },
    schema: {
      title: fields.slug({ name: { label: 'Title' } }),
      featuredImage: fields.image({
        label: "Featured Image",
        directory: "src/assets/images/posts",
        publicPath: "src/assets/images/posts/",
      }),
      imgAlt: fields.text({ label: 'Image Alt' }),
      content: fields.markdoc({
        label: "Content",
        options: {
          image: {
            directory: "src/assets/images/posts",
            publicPath: "@assets/images/posts/",
          },
        },
      }),
      excerpt: fields.text({ label: 'Excerpt', multiline: true, description: 'A brief description of this article' }),
      publishedDate: fields.date({ label: "Published date" }),
    },
  });
```

Detector facts:
- The `posts` symbol is exported and then included under `collections` in `sparti.config.ts`. That is the detection event.
- `path: 'src/content/posts/*'` tells the editor where to create and load entry files. `*` is replaced with the generated slug.
- `slugField: 'title'` makes the slug derive from `schema.title`.
- `format: { contentField: 'content' }` tells Sparti to store the Markdoc body in the `content` field.


## 4) Singletons: how they are detected

Singletons are defined under `src/cms/singletons/` and re-exported via an index file. Including them under `singletons` in `sparti.config.ts` makes them appear in the editor.

```ts
// file: src/cms/singletons/index.ts
export * from "./home";
export * from "./navbar";
export * from "./footer";
export * from "./branding";
export * from "./seo";
```

```ts
// file: src/cms/singletons/home.ts
import { fields, singleton } from '@sparti/core';
import { buttons } from '../fields';

export const home = singleton({
  label: 'Home Page',
  format: { data: 'json' },
  path: 'src/content/pages/home',
  schema: {
    title: fields.text({
      label: 'Page Title',
      description: 'The title of the page',
      defaultValue: 'Home',
    }),
    // Hero section
    hero: fields.object(
      {
        heroImage: fields.image({
          label: 'Hero Image',
          description: 'Hero image',
          directory: '/src/assets/images/pages/home',
          publicPath: '/src/assets/images/pages/home/',
        }),
        heroImageAlt: fields.text({ label: 'Hero Image Alt text' }),
        heading: fields.text({ label: 'Heading' }),
        subheading: fields.text({ label: 'Subheading' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        buttons,
      },
      {
        label: 'Hero Section',
        description: 'The intro section of home page',
      },
    ),
    // End Hero
    posts: fields.object(
      {
        heading: fields.text({ label: 'Posts Heading' }),
        subheading: fields.text({ label: 'Subheading', multiline: true }),
      },
      {
        label: 'Posts section',
      },
    ),
  },
})
```

```ts
// file: src/cms/singletons/navbar.ts
import { fields, singleton } from "@sparti/core";
import { buttons } from "../fields";

export const navbar = singleton({
  label: 'Main Nav',
  path: './src/settings/navbar',
  format: { data: 'json' },
  schema: {
    links: fields.array(
      fields.object({
        text: fields.text({ label: 'Link Text' }),

        isDropdown: fields.conditional(
          fields.checkbox({
            label: 'Check if this item is just a dropdown with sublinks',
            defaultValue: false,
          }),
          {
            true: fields.array(
              fields.object({
                text: fields.text({ label: 'Link Text' }),
                link: fields.url({ label: 'Link' }),
                description: fields.text({ label: 'Description of page' }),
              }),
              {
                label: 'Sub Links',
                itemLabel: (props) => props.fields.text.value || 'Nav Item',
              },
            ),
            false: fields.object({
              link: fields.url({ label: 'Link' }),
            }),
          },
        ),
      }),
      {
        label: 'Nav Items',
        itemLabel: (props) => props.fields.text.value || 'Nav Item',
      },
    ),
    buttons,
  },
})
```

```ts
// file: src/cms/singletons/footer.ts
import { fields, singleton } from "@sparti/core";

export const footer = singleton({
  label: 'Footer',
  path: './src/settings/footer',
  format: { data: 'json' },
  schema: {
    menuItems: fields.array(
      fields.object({
        text: fields.text({ label: 'Menu Item Text' }),
        link: fields.url({ label: 'Link' }),
      }),
      {
        label: 'Footer Menu Items',
        itemLabel: (props) => props.fields.text.value || 'Menu Item',
      },
    ),
    copyright: fields.text({ 
      label: 'Copyright Text',
      defaultValue: '© 2025 TheWebsiteGuy. All rights reserved.'
    }),
    socialIcons: fields.array(
      fields.object({
        name: fields.text({ label: 'Social Platform Name' }),
        url: fields.url({ label: 'Social Link' }),
        icon: fields.text({ 
          label: 'Icon', 
          description: 'Add SVG icon code or icon name here',
          multiline: true
        }),
      }),
      {
        label: 'Social Icons',
        itemLabel: (props) => props.fields.name.value || 'Social Icon',
      },
    ),
  },
})
```

```ts
// file: src/cms/singletons/branding.ts
import { fields, singleton } from '@sparti/core'

export const branding = singleton({
  label: 'Branding',
  format: { data: 'json' },
  path: 'src/settings/branding',
  schema: {
    site: fields.object({
      siteName: fields.text({ label: 'Site Name' }),
      theme: fields.select({
        label: 'Select a theme',
        description: "Themes available from DaisyUI",
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'Cupcake', value: 'cupcake' },
          { label: 'Bumblebee', value: 'bumblebee' },
          { label: 'Emerald', value: 'emerald' },
          { label: 'Corporate', value: 'corporate' },
          { label: 'Synthwave', value: 'synthwave' },
          { label: 'Retro', value: 'retro' },
          { label: 'Cyberpunk', value: 'cyberpunk' },
          { label: 'Valentine', value: 'valentine' },
          { label: 'Hallowen', value: 'hallowen' },
          { label: 'Garden', value: 'garden' },
          { label: 'Forest', value: 'forest' },
          { label: 'Aqua', value: 'aqua' },
          { label: 'Lofi', value: 'lofi' },
          { label: 'Pastel', value: 'pastel' },
          { label: 'Fantasy', value: 'fantasy' },
          { label: 'Wireframe', value: 'wireframe' },
        ],
        defaultValue: 'light',
      }), 
      favicon: fields.image({
        label: 'Favicon',
        description: 'Favicon for the site',
        directory: 'public/images',
        publicPath: '/images/',
      }),
    }),
  },
})
```

```ts
// file: src/cms/singletons/seo.ts
import { fields, singleton } from '@sparti/core'

export const seo = singleton({
  label: 'SEO',
  path: 'src/settings/seo',
  format: { data: 'json' },
  schema: {
    seo: fields.object({
      title: fields.text({ label: 'Title' }),
      description: fields.text({ label: 'Description', multiline: true }),
      keywords: fields.text({ label: 'Keywords' }),
      canonical: fields.text({ label: 'Canonical' }),
    }),
    opengraph: fields.object({
      Title: fields.text({ label: 'OG Title' }),
      Description: fields.text({ label: 'OG Description', multiline: true }),
      Image: fields.image({ 
        label: 'OG Image',
        directory: '/src/assets/images/seo/opengraph/',
        publicPath: '/src/assets/images/seo/opengraph/',
      }),
    },
    {
      label: 'Opengraph (Facebook)',
      description: 'Opengraph options',
    }),
    twitter: fields.object({
      Title: fields.text({ label: 'Twitter Title' }),
      Description: fields.text({ label: 'Twitter Description', multiline: true }),
      Image: fields.image({ 
        label: 'Twitter Image',
        directory: '/src/assets/images/seo/twitter/',
        publicPath: '/src/assets/images/seo/twitter/',
      }),
    },
    {
      label: 'Twitter',
      description: 'Twitter options'
    }
  )},
})
```

Detector facts:
- A singleton is recognized when its symbol is included in `singletons` in `sparti.config.ts`.
- The `path` points to a single JSON (or similar) data location (no `*`), since it is a single record.


## 5) Reusable fields: how they are assembled into schemas

Reusable fields are exported under `src/cms/fields/` and then imported into singletons/collections.

```ts
// file: src/cms/fields/index.ts
export * from "./buttons";
```

```ts
// file: src/cms/fields/buttons.ts
import { fields } from "@sparti/core";

export const buttons = fields.array(
    fields.object({
        label: fields.text({ label: 'Button label' }),
        link: fields.text({ label: 'Button link' }),
        icon: fields.text({ label: 'Icon', description: 'Add SVG icon here', multiline: true }),
        style: fields.select({
          label: 'Style',
          description: "Style based on DaisyUI.com",
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'neutral', value: 'neutral' },
            { label: 'Info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'error', value: 'error' },
          ],
          defaultValue: 'primary'
        }),
        type: fields.select({
          label: 'Button Type',
          description: "Button type",
          options: [
            { label: 'ghost', value: 'ghost' },
            { label: 'link', value: 'link' },
            { label: 'outline', value: 'outline' },
            { label: 'disabled', value: 'disabled' },
            { label: 'default', value: '' },
          ],
          defaultValue: ''
        }),
        size: fields.select({
            label: 'Size',
            description: "Button size",
            options: [
              { label: 'default', value: '' },
              { label: 'large', value: 'large' },
              { label: 'small', value: 'small' },
              { label: 'tiny', value: 'tiny' },
              { label: 'wide', value: 'wide' },
            ],
            defaultValue: ''
          })  
    }),
    {
        label: 'Buttons',
        itemLabel: props => props.fields.label.value,
    },
);
```

```ts
// file: src/cms/fields/links.ts (not imported by config currently, but available)
import { fields } from "@sparti/core";

// Single link
export const link = fields.object({
  linkText: fields.text({ label: "Link Text" }),
  linkAltText: fields.text({ label: "Link Alt Text" }),
  linkDescription: fields.text({ label: "Link Description" }),
  isExternal: fields.conditional(
    fields.checkbox({
      label: "Check if link is external or not",
      defaultValue: true,
    }),
    {
      true: fields.url({ label: "External Link" }),
      false: fields.url({
        label: "Internal Link",
      }),
    }
  ),
});

// Multiple links
export const links = fields.array(link, {
  label: "Links",
  itemLabel: (props) => "Link: " + props?.fields?.linkText?.value,
});
```

Detector facts:
- Any reusable field that is imported into a schema becomes part of the editor UI for that content type.
- If a reusable field is not imported, it has no effect on detection.


## 6) File output rules: how the editor writes content

- Collections: `path: 'src/content/posts/*'` means new entries are saved under `src/content/posts/` with filenames created from the slug (from `title`).
- Singletons: `path: 'src/content/pages/home'` or `path: 'src/settings/<name>'` means a single data file is maintained there (backed by `format: { data: 'json' }` in your setup).
- Media fields write to their configured `directory`; `publicPath` is what your frontend should use when referencing those assets.


## 7) Navigation wiring in the editor

The editor sidebar is controlled by `ui.navigation` in `sparti.config.ts`:

```ts
ui: {
  brand: { name: 'Astrokeys' },
  navigation: {
    'Content': ['home',  'posts',  ],
    'Components': [ 'navbar', 'footer'],
    'Site Settings': [ 'branding', 'seo' ],
  },
},
```

Detector facts:
- Keys ('Content', 'Components', 'Site Settings') are groups.
- Values are arrays of IDs that match the keys used in `collections` and `singletons` (e.g., `home`, `posts`, `navbar`, etc.).
- Reordering these arrays changes the editor UI order.


## 8) End-to-end detection workflows

- Add a new collection
  1) Define it under `src/cms/collections/<name>.ts` and export its symbol.
  2) Re-export from `src/cms/collections/index.ts` (optional but keeps imports clean).
  3) Import it in `sparti.config.ts` and add to `collections: { <name> }`.
  4) Optionally add its key to `ui.navigation`.
  5) Save and open `/sparti` to see it appear; create entries and verify files under the specified `path`.

- Add a new singleton
  1) Define it under `src/cms/singletons/<name>.ts` and export its symbol.
  2) Re-export from `src/cms/singletons/index.ts` (optional but keeps imports clean).
  3) Import it in `sparti.config.ts` and add to `singletons: { <name> }`.
  4) Optionally add its key to `ui.navigation`.
  5) Save and open `/sparti` to see it appear; edit content and verify file exists at its `path`.

- Compose reusable fields
  1) Define or update a field in `src/cms/fields/`.
  2) Import it into a collection/singleton schema and include it under `schema`.
  3) Save and open `/sparti` to see the field appear immediately.


## 9) Verification checklist (practical detector checks)

- [ ] The symbol is exported from its module (`export const myType = collection(...) | singleton(...)`).
- [ ] It is imported and included under `collections` or `singletons` in `sparti.config.ts`.
- [ ] `ui.navigation` includes its key if you want it grouped and visible as expected.
- [ ] `path` points to a real folder/file location in the repo.
- [ ] Media fields `directory` exists or is creatable by the editor.
- [ ] After saving, `/sparti` shows the new type and can read/write the content files.


## 10) Notes on paths and consistency

- In this project some singletons use paths like `'src/settings/...'` and others `'./src/settings/...'`. Prefer being consistent (both resolve under the repo) to avoid confusion.
- For images, some modules use absolute-like paths starting with `/src/...` versus relative `src/...`. Match what your build expects; `publicPath` should reflect how the frontend reads assets.


## 11) What actually causes the editor to update

- Any change to `sparti.config.ts` or any file it imports (collections, singletons, fields) triggers the editor to re-read the config and render the updated UI.
- Adding/removing a field in a schema immediately changes the corresponding form in the editor once saved.

---

# Sparti CMS Admin System

## Routes and Authentication

### Admin Routes
- `/auth` - Login page (email/password only, no sign-up)
- `/admin` - Post-login CMS dashboard and layout shell

### Authentication Flow
1. **Session Check**: On page load, check for valid Supabase session
2. **Login**: Email/password authentication via Supabase
3. **Session Persistence**: Sessions persist across browser reloads
4. **Logout**: Clear session and redirect to `/auth`

### Supabase Configuration
Required environment variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Supabase Dashboard Settings (manual configuration):
- Enable email/password authentication
- Disable sign-ups (email signups OFF)
- No OAuth providers enabled
- Optional: Configure domain allow-list

### Access Control
- Sign-ups are disabled in Supabase
- Admin accounts must be pre-provisioned via Supabase Dashboard
- Each user will be linked to a specific child/domain (future implementation)

## Post-Login Layout Structure

### Top Bar
- Sparti brand text
- Optional environment badge (e.g., "Dev")
- User menu: avatar/initials, email, "Log out" action

### Sidebar (collapsible on mobile)
Navigation groups:
- **Content**: home, posts
- **Components**: navbar, footer  
- **Site Settings**: branding, seo

### Main Content Area
- Default landing: Dashboard with welcome text and quick links
- Navigation: Clicking sidebar items shows placeholder panels
- No content editing implemented yet (layout shell only)

## Security Rules
- No sign-up mechanism exposed
- Generic error messages for auth failures
- Supabase handles all session management
- No manual token storage

## Acceptance Criteria
- [ ] `/auth` shows login form
- [ ] Valid credentials create session and redirect to `/admin`
- [ ] `/admin` with active session shows dashboard
- [ ] `/admin` without session redirects to `/auth`
- [ ] Post-login layout displays top bar, sidebar, and dashboard
- [ ] "Log out" clears session and redirects to `/auth`
- [ ] No sign-up UI exists anywhere
- [ ] Sidebar groups and items match specification

## Test Plan (Manual)
1. Provision test admin account via Supabase Dashboard
2. Test wrong credentials → generic error, stays on `/auth`
3. Test correct credentials → redirect to `/admin`, session persisted
4. Refresh `/admin` → remains authenticated
5. Click "Log out" → redirect to `/auth`, session cleared
6. Direct access to `/admin` without session → redirected to `/auth`
7. Confirm no sign-up UI present