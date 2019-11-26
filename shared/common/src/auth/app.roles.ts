/**
 * These enums form the basis of our permissions, they are then grouped into Roles
 */
export enum AppRolePermissions {
  None = 0,
  CreateBooks = 1 << 0,
  ReadBooks = 1 << 1,
  UpdateBooks = 1 << 2,
  DeleteBooks = 1 << 3,
  CanMimicUsers = 1 << 4,
  All = ~(~0 << 5)
}

const
  arp = AppRolePermissions,
  arpReviewer = arp.ReadBooks,
  arpAuthor = arpReviewer | arp.CreateBooks | arp.UpdateBooks | arp.DeleteBooks,
  arpVirtualAssistant = arpReviewer | arp.CanMimicUsers,
  arpAdmin = arp.All

/**
 * Sets of permissions each AppRole will have access to.
 */
export const AppRolePermissionGroups = {
  Reviewer: arpReviewer,
  Author: arpAuthor,
  VirtualAssistant: arpVirtualAssistant,
  Admin: arpAdmin
}

/**
 * Create some flags which we will use to determine what the user has access to.
 * We're using flags here as it allows us to scale permissions well, for instance
 * a VirtualAssistant is an Author user as well but we don't want to check for
 * "user.role === 'VirtualAssistant' || user.role === 'Author'"
 * instead we can do "user.roles & AppRoles.Author" as the VirtualAssistant users will have the flag for both
 * Author and VirtualAssistant by means of "user.roles = AppRoles.Author | AppRoles.VirtualAssistant" when the
 * user is created
 */
export enum AppRoles {
  // Not logged in
  None = 0,
  Reviewer = 1 << 0, // Not strictly required but looks consistent
  Author = 1 << 1,
  VirtualAssistant = 1 << 2,
  Admin = ~(~0 << 3) // All
}

const
  Reviewer = AppRoles.Reviewer,
  Author = Reviewer | AppRoles.Author,
  VirtualAssistant = Reviewer | AppRoles.VirtualAssistant,
  Admin = AppRoles.Admin

/**
 * AppRole will simplify checking. Each user will only have ONE role but this role might inherit permissions
 * from multiple roles.
 * Note: Most of the work will be done with AppRoles but this is a handy shortcut to assign a role to a user.
 */
export const AppRole = {
  // Not logged in
  None: AppRoles.None,
  // Logged in
  Reviewer,
  Author,
  VirtualAssistant,
  Admin
}

/**
 * Get an AppRole (2) and convert it into a Name (Reviewer).
 * With that name, lookup the Permission Group (has to match based on key)
 * @param appRole - i.e 2 (Reviewer)
 * @returns AppRolePermissions - i.e 2 (ReadBooks)
 */
export const getAppRolePermissions = (appRole: any): AppRolePermissions => {
  // @ts-ignore
  const roleName: string = Object.keys(AppRole).find(k => AppRole[k] === appRole)
  // @ts-ignore
  return AppRolePermissionGroups[roleName]
}

/**
 * Go over an Enum and return the names based on the flags that have been set.
 * @param enumData
 * @param values
 */
const getEnumNames = (enumData: any, values: any) => {
  const result = []

  let i = 0
  let perm: number

  while (enumData[perm = 1 << i++]) {
    if (values & perm) {
      result.push(enumData[perm])
    }
  }

  return result.join(',')
}

/**
 * Get a list of flag names from the AppRoles.
 * @param roles: AppRoles - Flags of which roles we want the descriptions for
 * @returns string[] - i.e ['Standard','VirtualAssistant']
 */
export const getAppRoleNames = (roles: AppRoles): string => {
  return getEnumNames(AppRoles, roles)
}

/**
 * Get a list of flag names from the AppRolePermissions.
 * @param roles: AppRolePermissions - Flags of which roles we want the descriptions for
 * @returns string[] - i.e ['CreateBook','ReadBook']
 */
export const getAppRolePermissionNames = (appRole: any) => {
  const rolePermissions = getAppRolePermissions(appRole)
  return getEnumNames(AppRolePermissions, rolePermissions)
}

/**
 * Can the user passed in or the user being mimic'd access the required role
 * @param user
 * @param mimicUser
 * @param requiredRole
 */
export const canAccessByRole = (user: any, mimicUser: any, requiredRole: AppRoles) => {
  const combinedRoles = (user ? user.role : 0) | (mimicUser ? mimicUser.role : 0)
  // No role required OR we have a user with the correct role based on what's been passed in
  return requiredRole === AppRoles.None || (combinedRoles & requiredRole) === requiredRole
}

/**
 * * Can the user passed in or the user being mimic'd access the required permission
 * @param user
 * @param mimicUser
 * @param requiredPermissions
 */
export const canAccessByPermission = (user: any, mimicUser: any, requiredPermissions: AppRolePermissions) => {
  const combinedPermissions = getAppRolePermissions((user ? user.role : 0)) | getAppRolePermissions(mimicUser ? mimicUser.role : 0)
  // No perm required OR we have a user with permissions that match what's been passed in
  return requiredPermissions === AppRolePermissions.None || (combinedPermissions & requiredPermissions) === requiredPermissions
}
