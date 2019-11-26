"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create some flags which we will use to determine what the user has access to.
 * We're using flags here as it allows us to scale permissions well, for instance
 * a VirtualAssistant is an Author user as well but we don't want to check for
 * "user.role === 'VirtualAssistant' || user.role === 'Author'"
 * instead we can do "user.roles & AppRoles.Author" as the VirtualAssistant users will have the flag for both
 * Author and VirtualAssistant by means of "user.roles = AppRoles.Author | AppRoles.VirtualAssistant" when the
 * user is created
 */
var AppRoles;
(function (AppRoles) {
    AppRoles[AppRoles["None"] = 0] = "None";
    AppRoles[AppRoles["Reviewer"] = 1] = "Reviewer";
    AppRoles[AppRoles["Author"] = 2] = "Author";
    AppRoles[AppRoles["VirtualAssistant"] = 16] = "VirtualAssistant";
    AppRoles[AppRoles["Admin"] = 31] = "Admin"; // All
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
/**
 * Get a list of flag names from the AppRoles.
 * @param roles: AppRoles - Flags of which roles we want the descriptions for
 * @returns string[] - i.e ['Standard','VirtualAssistant']
 */
exports.getAppRoleNames = function (roles) {
    var result = [];
    var i = 0;
    var perm;
    while (AppRoles[perm = 1 << i++]) {
        if (roles & perm) {
            result.push(AppRoles[perm]);
        }
    }
    return result.join(',');
};
