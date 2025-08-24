# Visual Editor Mapping for Website Schemas

This document maps the content schemas to the visual editor components in Sparti CMS.

## Current Visual Editor Structure

### 1. Dashboard Overview
- **Location**: `MainContent.tsx` - dashboard section
- **Purpose**: Central hub with quick stats and actions
- **Editable Elements**: None (static dashboard)

### 2. Home Page Editor
- **Location**: `MainContent.tsx` - home section
- **Current State**: Basic page list with edit button
- **Schema Mapping Needed**: Complete homepage schema integration

### 3. Posts Editor
- **Location**: `PostEditor.tsx` + `MainContent.tsx` - posts section
- **Current State**: Functional post creation/editing
- **Schema Mapping**: Blog post content structure

### 4. Navigation Editor
- **Location**: `MainContent.tsx` - renderNavbarForm()
- **Current State**: Basic nav item management
- **Schema Mapping**: Navigation structure with items and buttons

### 5. Branding Editor
- **Location**: `MainContent.tsx` - renderBrandingForm()
- **Current State**: Site name, theme, favicon
- **Schema Mapping**: Brand identity elements

### 6. SEO Editor
- **Location**: `MainContent.tsx` - renderSEOForm()
- **Current State**: Meta tags, OpenGraph settings
- **Schema Mapping**: SEO metadata structure

## Required Visual Editor Enhancements

### 1. Homepage Content Editor

```typescript
interface HomePageEditorMapping {
  hero: {
    visual: "HeroSectionEditor"
    fields: [
      { name: "brandName", type: "text", label: "Brand Name" },
      { name: "primaryHeadline", type: "text", label: "Main Headline" },
      { name: "secondaryHeadline", type: "text", label: "Secondary Headline" },
      { name: "subheadline", type: "textarea", label: "Subheadline" },
      { name: "trustIndicators", type: "repeater", label: "Trust Indicators" },
      { name: "ctaButtons", type: "repeater", label: "CTA Buttons" }
    ]
  }
  problemSection: {
    visual: "ProblemSectionEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "subtitle", type: "textarea", label: "Section Subtitle" },
      { name: "problems", type: "repeater", label: "Problem Items" },
      { name: "ctaTitle", type: "text", label: "CTA Title" },
      { name: "ctaDescription", type: "textarea", label: "CTA Description" }
    ]
  }
  solutionOverview: {
    visual: "SolutionSectionEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "features", type: "repeater", label: "Solution Features" }
    ]
  }
  featuresSection: {
    visual: "FeaturesSectionEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "features", type: "repeater", label: "Feature Items" }
    ]
  }
  tokenSystem: {
    visual: "TokenSystemEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "tokenTypes", type: "repeater", label: "Token Types" }
    ]
  }
  socialProof: {
    visual: "SocialProofEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "testimonials", type: "repeater", label: "Testimonials" },
      { name: "stats", type: "repeater", label: "Statistics" }
    ]
  }
  pricingSection: {
    visual: "PricingSectionEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "subtitle", type: "textarea", label: "Section Subtitle" },
      { name: "plans", type: "repeater", label: "Pricing Plans" }
    ]
  }
  faq: {
    visual: "FAQSectionEditor"
    fields: [
      { name: "title", type: "text", label: "Section Title" },
      { name: "questions", type: "repeater", label: "FAQ Items" }
    ]
  }
  footer: {
    visual: "FooterSectionEditor"
    fields: [
      { name: "companyName", type: "text", label: "Company Name" },
      { name: "companyDescription", type: "textarea", label: "Company Description" },
      { name: "serviceLinks", type: "repeater", label: "Service Links" },
      { name: "companyLinks", type: "repeater", label: "Company Links" },
      { name: "legalLinks", type: "repeater", label: "Legal Links" },
      { name: "contactInfo", type: "group", label: "Contact Information" },
      { name: "socialLinks", type: "repeater", label: "Social Media Links" }
    ]
  }
}
```

### 2. Visual Editor Component Structure

```typescript
// Base editor component interface
interface SectionEditor {
  sectionId: string
  schema: SectionSchema
  currentData: any
  onSave: (data: any) => void
  onCancel: () => void
}

// Field types for the visual editor
type FieldType = 
  | "text"           // Single line text input
  | "textarea"       // Multi-line text input
  | "rich-text"      // WYSIWYG editor
  | "number"         // Number input
  | "select"         // Dropdown selection
  | "checkbox"       // Boolean checkbox
  | "image"          // Image upload
  | "icon"           // Icon picker
  | "color"          // Color picker
  | "repeater"       // Dynamic list of items
  | "group"          // Grouped fields
  | "url"            // URL input with validation

// Repeater field configuration
interface RepeaterField {
  type: "repeater"
  label: string
  itemSchema: Field[]
  minItems?: number
  maxItems?: number
  defaultItem?: any
}
```

### 3. Implementation Plan for Visual Editors

#### Phase 1: Core Infrastructure
1. **Create base editor components**
   - `SectionEditor` base class
   - `FieldRenderer` component
   - `RepeaterField` component
   - Form validation system

#### Phase 2: Section-Specific Editors
1. **Hero Section Editor**
   - Brand name and headlines
   - Trust indicators repeater
   - CTA buttons repeater
   - Live preview integration

2. **Problem Section Editor**
   - Problem items with icons
   - CTA configuration
   - Visual problem grid preview

3. **Features Section Editor**
   - Feature items repeater
   - Icon selection
   - Benefit lists management

#### Phase 3: Advanced Editors
1. **Pricing Section Editor**
   - Plan configuration
   - Feature lists per plan
   - Pricing tiers management

2. **Social Proof Editor**
   - Testimonial management
   - Statistics configuration
   - Rating systems

3. **FAQ Editor**
   - Question/answer pairs
   - Expandable sections
   - Search functionality

### 4. Data Flow Architecture

```typescript
// Content storage structure
interface ContentStore {
  homepage: HomepageSchema
  navigation: NavigationSchema
  branding: BrandingSchema
  seo: SEOSchema
  posts: PostSchema[]
}

// Editor state management
interface EditorState {
  activeSection: string | null
  editingData: any
  isDirty: boolean
  validationErrors: ValidationError[]
}

// Save/load operations
interface ContentAPI {
  loadContent: (section: string) => Promise<any>
  saveContent: (section: string, data: any) => Promise<void>
  validateContent: (section: string, data: any) => ValidationError[]
  previewContent: (section: string, data: any) => string
}
```

### 5. Integration Points

#### Current Sparti CMS Integration:
- **Navigation**: Sidebar menu items map to editor sections
- **TopBar**: Context-aware actions (Add button for posts)
- **MainContent**: Route-based editor rendering
- **Authentication**: Mock auth system (no Supabase)

#### Required Enhancements:
1. **Section-based routing**: `/admin/home/hero`, `/admin/home/features`
2. **Live preview**: Real-time preview of changes
3. **Content validation**: Schema-based validation
4. **Auto-save**: Periodic content saving
5. **Version control**: Content history and rollback

### 6. Content Persistence Strategy

Since Supabase has been removed, content will be stored using:

1. **Local Storage**: For development and demo purposes
2. **JSON Files**: Static content files for production
3. **Future Integration**: Ready for child brand Supabase connection

```typescript
// Content persistence interface
interface ContentPersistence {
  storage: "localStorage" | "jsonFiles" | "database"
  save: (key: string, data: any) => Promise<void>
  load: (key: string) => Promise<any>
  list: () => Promise<string[]>
  delete: (key: string) => Promise<void>
}
```

This mapping provides a clear path from the current basic CMS to a full visual editor system that can manage all website content through intuitive interfaces.
