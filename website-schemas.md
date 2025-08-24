# Website Page Schemas

This document defines the content schemas for each page of the GOSG Consulting website.

## 1. Homepage (Index.tsx)

### Schema Structure:
```typescript
interface HomepageSchema {
  hero: {
    logo: {
      icon: string // Sparkles icon
      brandName: string // "GO SG"
    }
    headline: {
      primary: string // "Grow your business with data-driven marketing"
      secondary: string // "Digital Marketing Agency"
    }
    subheadline: string
    trustIndicators: Array<{
      icon: string
      text: string
    }>
    ctaButtons: Array<{
      text: string
      variant: "primary" | "secondary"
      action: string
    }>
    trustText: string
  }
  problemSection: {
    title: string
    subtitle: string
    problems: Array<{
      icon: string
      text: string
    }>
    callToAction: {
      title: string
      description: string
    }
  }
  solutionOverview: {
    title: string
    description: string
    features: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  featuresSection: {
    title: string
    features: Array<{
      icon: string
      title: string
      description: string
      benefits: string[]
    }>
  }
  tokenSystem: {
    title: string
    description: string
    tokenTypes: Array<{
      name: string
      description: string
      value: number
      features: string[]
    }>
  }
  socialProof: {
    title: string
    testimonials: Array<{
      name: string
      company: string
      role: string
      content: string
      rating: number
    }>
    stats: Array<{
      value: string
      label: string
    }>
  }
  pricingSection: {
    title: string
    subtitle: string
    plans: Array<{
      name: string
      price: number
      period: string
      features: string[]
      highlighted: boolean
      ctaText: string
    }>
  }
  faq: {
    title: string
    questions: Array<{
      question: string
      answer: string
    }>
  }
  footer: {
    company: {
      name: string
      description: string
    }
    links: {
      services: string[]
      company: string[]
      legal: string[]
    }
    contact: {
      email: string
      phone: string
      address: string
    }
    social: Array<{
      platform: string
      url: string
      icon: string
    }>
  }
}
```

### Current Content Values:
- **Brand**: GO SG (Digital Marketing Agency)
- **Primary Value Prop**: Data-driven marketing growth
- **Trust Indicators**: Proven Results, Expert Team, Free Consultation
- **Main Problems Addressed**: Declining traffic, time-consuming tasks, poor conversions, limited expertise, low ROAS
- **CTA**: Schedule a Consultation, View Our Services

## 2. Admin Dashboard (Sparti CMS)

### Schema Structure:
```typescript
interface AdminDashboardSchema {
  authentication: {
    loginForm: {
      title: string
      subtitle: string
      fields: Array<{
        name: string
        type: string
        label: string
        required: boolean
      }>
      submitButton: string
      errorMessages: string[]
    }
    masterAccount: {
      email: string
      permissions: string[]
    }
  }
  navigation: {
    brand: string
    menuItems: Array<{
      id: string
      label: string
      icon: string
      route: string
    }>
  }
  dashboard: {
    widgets: Array<{
      type: string
      title: string
      data: any
    }>
  }
  contentManagement: {
    posts: {
      fields: Array<{
        name: string
        type: string
        required: boolean
      }>
      actions: string[]
    }
    pages: {
      editablePages: string[]
      sections: Array<{
        name: string
        fields: any[]
      }>
    }
  }
}
```

### Current Content Values:
- **CMS Brand**: Sparti CMS
- **Master Account**: contact@gosgconsulting.com
- **Navigation Items**: Dashboard, Home Page, Posts, Main Nav, Footer, Branding, SEO
- **Authentication**: Mock system (replaced Supabase)

## 3. Auth Page

### Schema Structure:
```typescript
interface AuthPageSchema {
  loginComponent: {
    title: string
    subtitle: string
    form: {
      fields: Array<{
        name: string
        type: string
        placeholder: string
        validation: string[]
      }>
      submitButton: string
    }
    redirects: {
      onSuccess: string
      onFailure: string
    }
  }
}
```

### Current Content Values:
- **Purpose**: Gateway to Sparti CMS
- **Credentials**: Master account only
- **Redirect**: /admin on success

## Content Management Strategy

### Editable Content Areas:
1. **Hero Section**: Headlines, subheadlines, CTAs, trust indicators
2. **Problem Section**: Problem statements, call-to-action text
3. **Features**: Service descriptions, benefits, icons
4. **Pricing**: Plans, features, pricing tiers
5. **Social Proof**: Testimonials, statistics, case studies
6. **FAQ**: Questions and answers
7. **Footer**: Contact info, links, social media

### Static Elements:
1. **Layout Structure**: Grid systems, responsive breakpoints
2. **Design System**: Colors, typography, spacing
3. **Navigation**: Menu structure, routing
4. **Authentication**: Login flow, permissions

### Content Types:
- **Text**: Headlines, descriptions, body copy
- **Media**: Icons, images, videos
- **Data**: Statistics, pricing, contact info
- **Interactive**: Buttons, forms, links
- **Structured**: Lists, grids, cards
