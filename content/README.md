# Content Directory

This directory contains actual content data for different clients/brands, separate from the template structure.

## Structure

```
content/
├── gosg-consulting/     # GOSG Consulting content
│   └── content.json
├── [client-name]/       # Other client content folders
│   └── content.json
└── README.md
```

## Content Files

Each client has their own folder containing:

- `content.json` - Main content data with all template variables
- `assets/` - Client-specific images, logos, etc. (future)
- `config.json` - Client-specific configuration (future)

## GOSG Consulting Content

The current content for GOSG Consulting includes:

### Brand Identity
- Brand name: "GO SG"
- Industry: Digital Marketing Agency
- Focus: Data-driven marketing solutions

### Hero Section Content
- Headline emphasizing business growth
- Highlight on "data-driven marketing"
- Trust indicators: Proven Results, Expert Team, Free Consultation
- CTAs: Schedule consultation and view services

### Problem Section Content
- Focus on marketing challenges businesses face
- 5 key problems: traffic decline, time consumption, poor conversions, limited expertise, low ROAS
- Solution positioning as comprehensive agency

### Features Section Content
- 5 main service areas:
  1. SEO Optimization
  2. Paid Advertising  
  3. Social Media Marketing
  4. Analytics & Reporting
  5. Marketing Strategy

## Adding New Clients

1. Create new folder: `content/[client-name]/`
2. Copy `gosg-consulting/content.json` as template
3. Update all variables with client-specific content
4. Configure build system to use appropriate content

## Content Management

Content can be managed through:

1. **Direct JSON editing** - Manual updates to content.json files
2. **Sparti CMS** - Visual editor interface (future integration)
3. **DataFlow Analytics** - Backend content management (future)

## Variable Reference

See `templates/README.md` for complete list of available template variables and their usage.
