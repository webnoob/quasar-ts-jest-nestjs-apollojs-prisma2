# Please Note
This repo is well out of date with changes I've been making to my main project. I'm thinking of making this a proper framework. It serves as an example (albeit very rough) for now.

# Quasar SAAS

The idea behind this is to provide a good starter for a SAAS application. It contains very basic examples.

**PLEASE NOTE: This readme is in no way complete - READ THE CODE**
You will need to read the code to get a proper understanding of what its doing

#### Using the following tech

* Typescript
* Quasar Framework
    * Including SSR
* NestJS
    * Auth with PassportJS
* ApolloClient
* Prisma2 (using SQLite for now)
* Inversify (Depedency Injection)
* Jest Testing
    * Quasar testing AE

#### Features

* API
* Frontend
* Shared code module between App / API
* User authentication
* Roles
* Permissions
* Mimic Users
* Guarded routes based on permissions / roles.
* Areas - Logged in Area, Not Logged In Area (allows front end site and back end)

#### Getting Started

You will need 4 terminals to get this running :)

**Globals**

1. `npm i -g @quasar/cli`
2. `npm i -g nestjs`
3. `npm i -g prisma2`

**App** (terminal 1)
1. `cd app`
2. `yarn`
3. `quasar dev -m ssr`

**Shared Module** (terminal 2)

Note: You only need to do step 3 if you plan on making any changes so they propagate to the APP and API
1. `cd shared/common`
2. `yarn`
3. `yarn dev`

**API**
1. `cd api`
2. `yarn`
3. Terminal 3: `primsma2 dev`
4. Terminal 4: `yarn start:dev`

#### Authentication / Roles / Permissions / Mimic Users

You can login with any user located in: `api/src/user/user.service.ts`.

Permissions / Roles can be found in `shared/common/src/auth/app.roles.ts`

User mimic is allowed via the `AppRolePermissions.CanMimicUsers` permission. The user must also have `user.canActAs` set
and the user being mimic'd needs `user.hasActingAs` set (see the current service for an example):

If you log in as user: `va` with pass: `123` you will be able to search for `webnoob` and mimic that users permissions.

#### Issues?

Whilst I'm not looking into making this a "go to" boilerplate, feel free to post any issues or PR's
and I'll look into addressing them.
