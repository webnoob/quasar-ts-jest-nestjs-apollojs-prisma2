/**
 * Create some flags which we will use to determine what the user has access to.
 * We're using flags here as it allows us to scale permissions well, for instance
 * a VirtualAssistant is an Author user as well but we don't want to check for
 * "user.role === 'VirtualAssistant' || user.role === 'Author'"
 * instead we can do "user.roles & AppRoles.Author" as the VirtualAssistant users will have the flag for both
 * Author and VirtualAssistant by means of "user.roles = AppRoles.Author | AppRoles.VirtualAssistant" when the
 * user is created
 */
export declare enum AppRoles {
    None = 0,
    Reviewer = 1,
    Author = 2,
    VirtualAssistant = 16,
    Admin = 31
}
/**
 * Get a list of flag names from the AppRoles.
 * @param roles: AppRoles - Flags of which roles we want the descriptions for
 * @returns string[] - i.e ['Standard','VirtualAssistant']
 */
export declare const getAppRoleNames: (roles: AppRoles) => string;
