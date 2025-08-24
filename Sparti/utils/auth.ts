// Sparti CMS - Authentication Utilities

/**
 * Check if the current user is the master account
 * Master account has universal access to all sites/tenants
 */
export const isMasterAccount = (email?: string | null): boolean => {
  return email === 'contact@gosgconsulting.com'
}

/**
 * Check if master account flag is set in session storage
 */
export const isMasterAccountSession = (): boolean => {
  return sessionStorage.getItem('sparti_master_account') === 'true'
}

/**
 * Get master account credentials (for documentation purposes)
 * Note: In production, these should be managed through Supabase Dashboard
 */
export const MASTER_ACCOUNT = {
  email: 'contact@gosgconsulting.com',
  // Password: Gosg888! (managed in Supabase Dashboard)
} as const

/**
 * Master account permissions
 * - Universal access to all sites/tenants
 * - Bypass tenant-specific restrictions
 * - Administrative privileges across all instances
 */
export const getMasterAccountPermissions = () => {
  return {
    universalAccess: true,
    bypassTenantRestrictions: true,
    adminPrivileges: true,
    canAccessAllSites: true,
  }
}