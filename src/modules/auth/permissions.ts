export type Permission = (typeof permissions)[keyof typeof permissions]
export const permissions = {
  // High-level access
  accessOrganizationPortal: 'access:organization-portal',
  accessEdgeOperations: 'access:edge-operations',
  accessScanner: 'access:scanner',
} as const

export type PredefinedRoleKey = keyof typeof predefinedRoles
export type PredefinedRoleName = (typeof predefinedRoles)[PredefinedRoleKey]
export const predefinedRoles = {
  Admin: 'Admin',
  SystemAdmin: 'SystemAdmin',
  Scanner: 'Scanner',
} as const

export const predefinedPermissions = {
  [predefinedRoles.Admin]: [permissions.accessOrganizationPortal],
  [predefinedRoles.SystemAdmin]: [permissions.accessEdgeOperations],
  [predefinedRoles.Scanner]: [permissions.accessScanner],
}
