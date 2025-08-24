# Template System Documentation

This folder contains template components and utilities for creating reusable, variable-driven website templates.

## Folder Structure

```
templates/
├── components/           # Template components with {{variables}}
│   ├── Hero.tsx
│   ├── ProblemSection.tsx
│   ├── FeaturesSection.tsx
│   └── ...
├── utils/               # Template processing utilities
│   └── templateEngine.ts
└── README.md

content/
├── gosg-consulting/     # Actual content for GOSG Consulting
│   └── content.json
└── [other-clients]/     # Content for other clients
    └── content.json
```

## Template Variables

Templates use `{{variableName}}` syntax for dynamic content replacement:

### Hero Section Variables
- `{{brandName}}` - Company/brand name
- `{{heroHeadline}}` - Main headline text
- `{{heroHighlight}}` - Highlighted portion of headline
- `{{heroSubtitle}}` - Secondary headline
- `{{heroDescription}}` - Hero description paragraph
- `{{trustIndicator1-3}}` - Trust indicator texts
- `{{primaryCTA}}` - Primary call-to-action button text
- `{{secondaryCTA}}` - Secondary call-to-action button text
- `{{trustText}}` - Bottom trust text

### Problem Section Variables
- `{{problemSectionTitle}}` - Section title
- `{{problemSectionHighlight}}` - Highlighted portion of title
- `{{problemSectionDescription}}` - Section description
- `{{problem1-5}}` - Individual problem statements
- `{{problemCTATitle}}` - Call-to-action title
- `{{problemCTADescription}}` - Call-to-action description

### Features Section Variables
- `{{featuresSectionTitle}}` - Section title
- `{{featuresSectionDescription}}` - Section description
- `{{feature1-5Title}}` - Feature titles
- `{{feature1-5Description}}` - Feature descriptions
- `{{feature1-5Benefit1-3}}` - Feature benefit points

## Usage

### 1. Template Components
Template components are located in `templates/components/` and contain `{{variable}}` placeholders:

```tsx
// templates/components/Hero.tsx
<span className="text-2xl lg:text-3xl font-bold text-white">{{brandName}}</span>
```

### 2. Content Files
Content files are JSON objects in `content/[client-name]/content.json`:

```json
{
  "brandName": "GO SG",
  "heroHeadline": "Grow your business with",
  "heroHighlight": "data-driven marketing"
}
```

### 3. Template Engine
Use the template engine utilities to process templates:

```tsx
import { useTemplateContent, replaceTemplateVariables } from '../templates/utils/templateEngine';

// In a component
const { content, loading, error } = useTemplateContent('/content/gosg-consulting/content.json');
```

## Creating New Templates

1. **Create Template Component**: Add component to `templates/components/` with `{{variables}}`
2. **Define Variables**: Add variable definitions to content JSON
3. **Process Template**: Use template engine to replace variables at runtime

## Creating New Client Content

1. **Create Client Folder**: Add folder under `content/[client-name]/`
2. **Create Content File**: Add `content.json` with all required variables
3. **Configure Build**: Update build process to use client-specific content

## Template Processing

The template engine provides several utilities:

- `replaceTemplateVariables()` - Replace variables in strings
- `loadContentData()` - Load content from JSON files
- `useTemplateContent()` - React hook for loading content
- `withTemplate()` - HOC for automatic template processing

## Best Practices

1. **Consistent Naming**: Use descriptive, consistent variable names
2. **Fallback Values**: Provide fallback values for missing variables
3. **Type Safety**: Define TypeScript interfaces for content structure
4. **Documentation**: Document all available variables for each template
5. **Validation**: Validate content structure before processing

## Integration with Sparti CMS

Templates integrate with the Sparti visual editor through:

1. **Field Mapping**: Variables map to Sparti field definitions
2. **Live Preview**: Changes in Sparti update template variables in real-time
3. **Content Storage**: Content stored in DataFlow Analytics backend
4. **Multi-Client**: Support for multiple client content sets

## Example Implementation

```tsx
// Using template with content
import Hero from '../templates/components/Hero';
import { withTemplate } from '../templates/utils/templateEngine';

// Wrap template component with content loader
const GosgHero = withTemplate(Hero, '/content/gosg-consulting/content.json');

// Use in page
export default function HomePage() {
  return (
    <div>
      <GosgHero />
      {/* Other components */}
    </div>
  );
}
```
