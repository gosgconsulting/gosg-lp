# Sparti Visual Editor — Deep Dive

This guide explains how Sparti's Visual Editor works in a point-and-click workflow, and how it maps on-screen elements to your content schema (collections, singletons, fields, objects, and components).

Use this as a reference when wiring your components to Sparti, debugging click targets, and training editors.

## What the Visual Editor Is

- The Visual Editor overlays your running site with interactive regions.
- Clicking any highlighted region opens the corresponding field(s) in the Sparti sidebar form.
- Edits in the sidebar immediately update the page (hot, inline preview), then persist back to Supabase on save.

---

## How Sparti Maps Clicks to Schema

Sparti builds a bi-directional link between:

- Your rendered UI (React components on the page)
- Your content data (documents defined by your Sparti schema in `sparti.config.ts`)

The mapping is powered by field annotations you add in your UI code. At runtime:

1. Sparti detects annotated DOM nodes.
2. When you click a node, Sparti resolves the exact path in the schema (document → field path → nested object or block template).
3. Sparti opens the matching field(s) in the sidebar for editing.

---

## The Annotation: `data-sparti-field`

The core mechanism is the `data-sparti-field` attribute. In React, you typically generate it via the `spartiField()` helper.

Example patterns:

```tsx
import { spartiField } from "@sparti/react";

// Simple scalar field (string, number, etc.)
<h1 data-sparti-field={spartiField(post, "title")}>{post.title}</h1>

// Nested object fields
<p data-sparti-field={spartiField(page, "hero.heading")}>{page.hero.heading}</p>

// Array items with index-aware targeting
<div data-sparti-field={spartiField(navbar, "links", index)}>
  <a data-sparti-field={spartiField(link, "text")}>{link.text}</a>
</div>
```

Rules of thumb:

- Add `data-sparti-field` to the smallest element that represents the field you want to click. This gives editors a precise click target.
- For objects and arrays, you can annotate a wrapper element (e.g., a `section`) so clicking anywhere inside selects the corresponding object/item.
- For lists/arrays, annotate each item's wrapper and/or specific fields inside it.

---

## From Click to Field: Selection Hierarchy

When you click, Sparti finds the nearest annotated node and resolves a path. Conceptually, selection can move up or down the following hierarchy:

- Element → Field (e.g., `title`)
- Field → Object (e.g., `hero` object with multiple fields)
- Object → Array Item (e.g., one item in a `buttons` array)
- Array Item → Collection/Singleton (the entire content document)

This allows:

- Clicking a heading to open a single string field.
- Clicking a card wrapper to open an object's fields.
- Clicking inside a section to select an array item and show its template form.
- Using the sidebar's context to navigate to the broader document if needed.

---

## How Schemas Drive the Sidebar

Your Sparti schema (defined in `sparti.config.ts` and imported modules) defines:

- Collections (groups of documents like blog posts)
- Singletons (single documents like home page, navbar, footer)
- Document fields (scalar types, objects, arrays)

The Visual Editor sidebar renders a form based entirely on this schema. For example:

- A `fields.text()` field becomes a text input.
- A `fields.markdoc()` field becomes a rich text editor.
- A `fields.image()` field uses the Media Manager.
- A `fields.object()` field collapses/expands its child fields.
- A `fields.array()` field lists array items; each item corresponds to its field definition.

If a field is nested (e.g., `hero.heading`), Sparti resolves the full path and shows the right control.

---

## Arrays and Conditional Fields — Point-and-Click Behavior

Arrays are typically used for repeatable content like navigation links, buttons, or page sections. A common schema uses a `fields.array()`:

- Each array item has its own field structure.
- The page renders array items in order.

In the Visual Editor:

- Clicking anywhere inside an array item that's annotated with `data-sparti-field={spartiField(doc, "buttons", index)}` selects the specific array item.
- The sidebar shows that item's fields.
- You can add, remove, duplicate, and reorder items from the sidebar.
- Within each item, you can also annotate specific fields for finer-grain clicking (e.g., the item's `label`, `link`, `style`).

Conditional fields (using `fields.conditional()`) work similarly:
- The sidebar shows different fields based on the condition value.
- Clicking annotated elements opens the appropriate conditional branch.

Tip:

- For reliable selection, wrap each rendered array item with an element that includes its index path. Many patterns do this automatically when you map over arrays.

---

## Objects and Nested Fields

Object fields group related fields. Example: a `hero` object with `heading`, `subheading`, `image`.

- Annotate the wrapper to let editors click the whole object area.
- Also annotate inner elements for direct field access.
- The sidebar shows the object's child fields with clear grouping.

Example:

```tsx
// Object wrapper - clicking anywhere in hero selects the hero object
<section data-sparti-field={spartiField(page, "hero")} className="hero">
  {/* Direct field access within the object */}
  <h1 data-sparti-field={spartiField(page, "hero.heading")}>
    {page.hero.heading}
  </h1>
  <p data-sparti-field={spartiField(page, "hero.subheading")}>
    {page.hero.subheading}
  </p>
  <img 
    data-sparti-field={spartiField(page, "hero.heroImage")}
    src={page.hero.heroImage} 
    alt={page.hero.heroImageAlt}
  />
</section>
```

---

## Rich Text and Inline Content

For rich text fields using `fields.markdoc()`:

- The sidebar opens a rich-text editor synchronized with the on-page preview.
- You can optionally render rich text with Sparti utilities so the preview faithfully matches formatting.
- If you need point-and-click to a specific rich-text field, annotate the wrapper that renders it.

Example:

```tsx
<div data-sparti-field={spartiField(post, "content")} className="prose">
  {/* Rendered Markdoc content */}
  <MarkdocRenderer content={post.content} />
</div>
```

---

## Images and Media

For fields of type `fields.image()`:

- Clicking the annotated image region opens the image field in the sidebar.
- Use the Media Manager to upload/select assets.
- The page updates live with the chosen image.

Best practice:

- When rendering responsive images, annotate the wrapper container to ensure a stable click target.

Example:

```tsx
<div data-sparti-field={spartiField(page, "hero.heroImage")} className="image-wrapper">
  <img 
    src={page.hero.heroImage} 
    alt={page.hero.heroImageAlt}
    className="responsive-image"
  />
</div>
```

---

## Navigation and Buttons — Array Examples

For navigation menus and button arrays:

```tsx
// Navigation links array
{navbar.links?.map((link, i) => (
  <div key={i} data-sparti-field={spartiField(navbar, `links.${i}`)}>
    {link.isDropdown ? (
      <div className="dropdown">
        <span data-sparti-field={spartiField(link, "text")}>{link.text}</span>
        <div className="dropdown-menu">
          {link.isDropdown.map((sublink, j) => (
            <a 
              key={j}
              data-sparti-field={spartiField(link, `isDropdown.${j}.link`)}
              href={sublink.link}
            >
              <span data-sparti-field={spartiField(sublink, "text")}>
                {sublink.text}
              </span>
            </a>
          ))}
        </div>
      </div>
    ) : (
      <a 
        data-sparti-field={spartiField(link, "isDropdown.link")}
        href={link.isDropdown.link}
      >
        <span data-sparti-field={spartiField(link, "text")}>{link.text}</span>
      </a>
    )}
  </div>
))}

// Buttons array
{page.hero.buttons?.map((button, i) => (
  <button 
    key={i}
    data-sparti-field={spartiField(page, `hero.buttons.${i}`)}
    className={`btn btn-${button.style} ${button.type} ${button.size}`}
  >
    <span data-sparti-field={spartiField(button, "label")}>{button.label}</span>
  </button>
))}
```

---

## Wiring Components for Visual Editing

Checklist to make any component "clickable" and editable:

1. Export/receive the data object that corresponds to the document or sub-tree you want to edit.
2. For each visual element bound to a field, add `data-sparti-field={spartiField(data, "path.to.field")}`.
3. For arrays, annotate the wrapper with the correct index path for each item.
4. Ensure your page is wrapped with Sparti's provider in edit mode so the overlay and sidebar are available.
5. Confirm your schema defines the fields in the same path you're annotating.

---

## Editor Workflow (Point-and-Click)

- Open the site in edit mode (via `/sparti` route or configured edit link).
- Hover to see click targets (highlighted regions).
- Click a component to open its field(s) in the sidebar.
- Edit values in the sidebar; watch the page update immediately.
- For arrays: add, remove, duplicate, and reorder from the array controls in the sidebar.
- Save to persist changes to Supabase.

---

## Saving and Persistence

With Supabase backend:

- Save writes changes to the appropriate Supabase tables (`blog_posts`, `cms_pages`, `cms_global_content`).
- If preview is enabled, edits are instantly reflected in the page before saving.
- Changes are immediately available across all instances due to Supabase's real-time capabilities.

---

## Integration with Current Sparti Architecture

The Visual Editor integrates with existing Sparti components:

### Collections (Blog Posts)
- **Schema**: Defined in `src/cms/collections/posts.ts`
- **Storage**: `blog_posts` table in Supabase
- **Fields**: `title`, `content`, `excerpt`, `featuredImage`, `publishedDate`

### Singletons (Pages & Settings)
- **Home Page**: `cms_pages` table, schema in `src/cms/singletons/home.ts`
- **Navigation**: `cms_global_content` table, schema in `src/cms/singletons/navbar.ts`
- **Footer**: `cms_global_content` table, schema in `src/cms/singletons/footer.ts`
- **Branding**: `cms_global_content` table, schema in `src/cms/singletons/branding.ts`
- **SEO**: `cms_global_content` table, schema in `src/cms/singletons/seo.ts`

### Reusable Fields
- **Buttons**: Defined in `src/cms/fields/buttons.ts`, used across multiple schemas
- **Links**: Defined in `src/cms/fields/links.ts` (available but not currently used)

---

## Troubleshooting Click Targets

- **Nothing highlights on hover**:
  - Ensure the page is in edit mode and Sparti is initialized.
  - Confirm your components render with `data-sparti-field` attributes at runtime.
- **Click opens the wrong field**:
  - Verify the path passed to `spartiField()` matches your schema exactly.
  - If multiple nested annotations exist, the innermost one is usually selected; adjust which element you annotate.
- **Array-level clicks not selecting the right item**:
  - Make sure each array item wrapper has the correct index-based path in `spartiField()`.
  - Confirm the array schema matches your rendered components.
- **Sidebar shows field but edits don't change the page**:
  - Check that rendered UI uses the edited data source (not a stale prop or a different variable).
  - Ensure hot data comes from your Sparti query result rather than a static import.

---

## Best Practices

- **Annotate precisely**: smaller, purposeful click targets lead to better UX.
- **Keep schema paths stable**: refactors that change paths require updating annotations.
- **Wrap each array item**: guarantee a predictable selection area.
- **Co-locate annotations with render code**: makes it easy to keep UI and schema in sync.
- **Document your field → UI mapping** in component comments or internal docs if your team is large.

---

## Quick Reference — What to Annotate

- **Headings, paragraphs, labels** → annotate with the corresponding scalar field path.
- **Cards, media objects, feature items** → annotate the object wrapper + its notable subfields.
- **Page sections (hero, posts)** → annotate the object wrapper for selection + annotate key inner fields for precision.
- **Arrays (navigation, buttons)** → annotate each item wrapper with index + annotate its inner fields.
- **Images** → annotate the image wrapper and/or the `img` itself.
- **Rich text** → annotate the rich-text wrapper; render with Sparti's utilities for faithful preview.

---

## Implementation Roadmap

### Phase 1: Basic Field Annotation
- Implement `spartiField()` helper function
- Add visual overlay system for highlighting editable regions
- Connect click events to open sidebar forms

### Phase 2: Schema Integration
- Integrate with existing `sparti.config.ts` schema definitions
- Map field types to appropriate sidebar controls
- Implement real-time preview updates

### Phase 3: Advanced Features
- Array item management (add, remove, reorder)
- Conditional field support
- Media management integration
- Undo/redo functionality

### Phase 4: Production Features
- Multi-user editing support
- Conflict resolution
- Performance optimization
- Mobile editing experience

---

## Glossary

- **Document**: A single content entry (e.g., a blog post, home page data) editing session.
- **Collection**: A group of documents that share a schema (e.g., blog posts).
- **Singleton**: A single document with unique schema (e.g., home page, navbar, footer).
- **Field**: A schema property (string, number, boolean, image, markdoc, etc.).
- **Object**: A field composed of multiple child fields.
- **Array**: A repeated set of items (scalars or objects).
- **Template**: A named schema structure for an object or array item.

---

## Current Schema Reference

Based on the existing Sparti configuration:

### Collections
- **posts**: Blog posts with title, content, excerpt, featured image, published date

### Singletons
- **home**: Home page with hero section, posts section
- **navbar**: Navigation with links array and buttons
- **footer**: Footer with menu items, copyright, social icons
- **branding**: Site branding with name, theme, favicon
- **seo**: SEO settings with meta data and social sharing

### Reusable Fields
- **buttons**: Button array with label, link, icon, style, type, size
- **links**: Link objects with text, description, internal/external URLs

---

## Next Steps

- Ensure all user-facing content has corresponding `data-sparti-field` annotations.
- Confirm your schema mirrors your UI structure where it matters.
- Train editors to click the smallest meaningful element for precise control, or the wrapper to edit the whole section.
- Implement the `spartiField()` helper and visual overlay system.
- Connect the visual editor to the existing Sparti admin panel for seamless editing experience.

---

## GOSG Consulting Implementation Notes

### Current Component Mapping for Visual Editor

Based on the existing GOSG Consulting website structure, here's how components should be annotated:

#### Hero Section (`src/components/Hero.tsx`)
```tsx
<section data-sparti-field={spartiField(page, "hero")} className="hero">
  <h1 data-sparti-field={spartiField(page, "hero.headline")}>
    {page.hero.headline}
  </h1>
  <p data-sparti-field={spartiField(page, "hero.subheadline")}>
    {page.hero.subheadline}
  </p>
  {page.hero.buttons?.map((button, i) => (
    <Button 
      key={i}
      data-sparti-field={spartiField(page, `hero.buttons.${i}`)}
    >
      <span data-sparti-field={spartiField(button, "label")}>
        {button.label}
      </span>
    </Button>
  ))}
</section>
```

#### Problem Section (`src/components/ProblemSection.tsx`)
```tsx
<section data-sparti-field={spartiField(page, "problemSection")}>
  <h2 data-sparti-field={spartiField(page, "problemSection.title")}>
    {page.problemSection.title}
  </h2>
  {page.problemSection.problems?.map((problem, i) => (
    <div 
      key={i}
      data-sparti-field={spartiField(page, `problemSection.problems.${i}`)}
    >
      <span data-sparti-field={spartiField(problem, "text")}>
        {problem.text}
      </span>
    </div>
  ))}
</section>
```

#### Features Section (`src/components/FeaturesSection.tsx`)
```tsx
<section data-sparti-field={spartiField(page, "featuresSection")}>
  <h2 data-sparti-field={spartiField(page, "featuresSection.title")}>
    {page.featuresSection.title}
  </h2>
  {page.featuresSection.features?.map((feature, i) => (
    <div 
      key={i}
      data-sparti-field={spartiField(page, `featuresSection.features.${i}`)}
    >
      <h3 data-sparti-field={spartiField(feature, "title")}>
        {feature.title}
      </h3>
      <p data-sparti-field={spartiField(feature, "description")}>
        {feature.description}
      </p>
    </div>
  ))}
</section>
```

### Integration with Existing Sparti CMS

The visual editor will integrate seamlessly with the current Sparti CMS structure:

1. **Admin Panel**: Access visual editor through existing `/admin` route
2. **Authentication**: Use current mock auth system (master account)
3. **Content Storage**: Initially localStorage, then DataFlow Analytics Supabase
4. **Real-time Updates**: Live preview of changes in the visual editor

### Development Priority

1. **Phase 1**: Implement basic `spartiField()` helper and overlay system
2. **Phase 2**: Add annotations to existing components (Hero, Features, etc.)
3. **Phase 3**: Integrate with Sparti CMS sidebar for form editing
4. **Phase 4**: Connect to DataFlow Analytics backend for persistence
