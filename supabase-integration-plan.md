# Supabase Integration Plan - Child Brand Implementation

This document outlines the strategy for manually connecting Supabase under a child brand name after the visual editor mapping is complete.

## Child Brand Architecture

### Brand Structure
```
GOSG Consulting (Parent Brand)
├── Sparti CMS (Content Management System)
├── DataFlow Analytics (Child Brand - Future Supabase Integration)
└── Other Child Brands (Future Expansion)
```

### Integration Strategy

#### 1. Child Brand Identity: "DataFlow Analytics"
- **Purpose**: Data management and analytics backend
- **Branding**: Separate visual identity from GOSG Consulting
- **Domain**: dataflow.gosgconsulting.com (subdomain approach)
- **Database**: Dedicated Supabase project for data operations

#### 2. Supabase Project Configuration

```typescript
// Future Supabase configuration for DataFlow Analytics
interface DataFlowSupabaseConfig {
  projectName: "DataFlow Analytics"
  organization: "GOSG Consulting"
  region: "us-east-1" // or closest to primary users
  tier: "Pro" // For production features
  
  // Database schema
  tables: {
    content_sections: {
      id: "uuid primary key"
      section_type: "text" // hero, features, pricing, etc.
      content_data: "jsonb"
      page_id: "uuid references pages(id)"
      created_at: "timestamp"
      updated_at: "timestamp"
      version: "integer"
    }
    
    pages: {
      id: "uuid primary key"
      slug: "text unique"
      title: "text"
      meta_description: "text"
      published: "boolean"
      created_at: "timestamp"
      updated_at: "timestamp"
    }
    
    site_settings: {
      id: "uuid primary key"
      setting_key: "text unique"
      setting_value: "jsonb"
      updated_at: "timestamp"
    }
    
    content_versions: {
      id: "uuid primary key"
      content_section_id: "uuid references content_sections(id)"
      version_data: "jsonb"
      created_at: "timestamp"
      created_by: "uuid references auth.users(id)"
    }
  }
}
```

#### 3. Authentication Integration

```typescript
// DataFlow auth configuration
interface DataFlowAuthConfig {
  // Master account integration
  masterAccount: {
    email: "admin@dataflow.gosgconsulting.com"
    role: "super_admin"
    permissions: ["all"]
  }
  
  // Client account structure
  clientAccounts: {
    role: "client_admin"
    permissions: ["edit_content", "view_analytics", "manage_settings"]
    domain_restrictions: true // Limit to specific domains
  }
  
  // Row Level Security policies
  rls_policies: {
    content_sections: "Users can only access content for their assigned sites"
    pages: "Users can only manage pages they have permission for"
    site_settings: "Only super_admin can modify global settings"
  }
}
```

#### 4. API Integration Layer

```typescript
// DataFlow API service
class DataFlowService {
  private supabase: SupabaseClient
  
  constructor(config: DataFlowSupabaseConfig) {
    this.supabase = createClient(
      config.url, 
      config.anonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        }
      }
    )
  }
  
  // Content management methods
  async saveContent(sectionType: string, data: any): Promise<void> {
    const { error } = await this.supabase
      .from('content_sections')
      .upsert({
        section_type: sectionType,
        content_data: data,
        updated_at: new Date().toISOString()
      })
    
    if (error) throw error
  }
  
  async loadContent(sectionType: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('content_sections')
      .select('content_data')
      .eq('section_type', sectionType)
      .single()
    
    if (error) throw error
    return data?.content_data
  }
  
  // Version control methods
  async createVersion(sectionId: string, data: any): Promise<void> {
    const { error } = await this.supabase
      .from('content_versions')
      .insert({
        content_section_id: sectionId,
        version_data: data,
        created_at: new Date().toISOString()
      })
    
    if (error) throw error
  }
  
  // Analytics methods
  async trackContentChange(sectionType: string, changeType: string): Promise<void> {
    // Implementation for content change tracking
  }
}
```

#### 5. Migration Strategy

##### Phase 1: Setup DataFlow Brand
1. Create Supabase project under "DataFlow Analytics" brand
2. Configure database schema and RLS policies
3. Set up authentication with master account
4. Create API service layer

##### Phase 2: Integrate with Sparti CMS
1. Replace mock auth system with DataFlow auth
2. Update content persistence to use Supabase
3. Implement real-time content sync
4. Add version control features

##### Phase 3: Enhanced Features
1. Content analytics and tracking
2. Multi-site management
3. User role management
4. Backup and restore functionality

#### 6. Environment Configuration

```typescript
// Environment variables for DataFlow integration
interface DataFlowEnvConfig {
  // DataFlow Supabase credentials
  VITE_DATAFLOW_SUPABASE_URL: string
  VITE_DATAFLOW_SUPABASE_ANON_KEY: string
  VITE_DATAFLOW_SERVICE_ROLE_KEY: string // Server-side only
  
  // Brand configuration
  VITE_DATAFLOW_BRAND_NAME: "DataFlow Analytics"
  VITE_DATAFLOW_BRAND_LOGO: "/dataflow-logo.svg"
  VITE_DATAFLOW_BRAND_COLOR: "#2563eb"
  
  // Integration settings
  VITE_ENABLE_DATAFLOW: "true" // Feature flag
  VITE_DATAFLOW_API_URL: "https://api.dataflow.gosgconsulting.com"
}
```

#### 7. Security Considerations

##### Data Protection
- All content data encrypted at rest
- API keys stored securely (not in client code)
- Row Level Security enforced for multi-tenant access
- Regular security audits and updates

##### Access Control
- Master account has universal access
- Client accounts restricted to their content only
- API rate limiting to prevent abuse
- Audit logging for all content changes

#### 8. Cost Management

##### Supabase Pricing Optimization
- Start with Pro tier for production features
- Monitor database usage and optimize queries
- Implement content caching to reduce API calls
- Use edge functions for heavy operations

##### Resource Allocation
- Separate billing for DataFlow project
- Monitor and alert on usage thresholds
- Implement content archiving for old versions
- Optimize image storage and delivery

## Implementation Timeline

### Week 1-2: DataFlow Brand Setup
- [ ] Create Supabase project
- [ ] Configure database schema
- [ ] Set up authentication
- [ ] Create brand assets

### Week 3-4: API Integration
- [ ] Build DataFlow service layer
- [ ] Replace mock auth in Sparti CMS
- [ ] Implement content persistence
- [ ] Add error handling and validation

### Week 5-6: Testing and Optimization
- [ ] Comprehensive testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Documentation completion

### Week 7-8: Production Deployment
- [ ] Production environment setup
- [ ] Data migration from mock system
- [ ] User training and documentation
- [ ] Go-live and monitoring

## Success Metrics

1. **Technical Metrics**
   - 99.9% uptime for DataFlow services
   - <200ms API response times
   - Zero data loss incidents
   - Successful content migrations

2. **User Experience Metrics**
   - Seamless transition from mock to real system
   - No disruption to content editing workflows
   - Improved performance and reliability
   - Positive user feedback

3. **Business Metrics**
   - Cost-effective Supabase usage
   - Scalable architecture for future growth
   - Clear separation of brand identities
   - Foundation for additional child brands

This plan ensures a smooth transition from the current mock system to a production-ready Supabase integration under the DataFlow Analytics child brand, maintaining the separation from the main GOSG Consulting brand while providing robust content management capabilities.
