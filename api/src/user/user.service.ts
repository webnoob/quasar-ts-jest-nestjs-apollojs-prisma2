import { Injectable } from '@nestjs/common'

import { PhotonService } from '../photon/photon.service'
import { User } from './model/user'
import { AppRole } from 'saas-common/dist/app.roles'

@Injectable()
export class UserService {
  constructor (private readonly photonService: PhotonService) { }

  private users: User[] = [
    {
      id: 'userid0',
      username: 'admin',
      emailAddress: 'admin@dev.com',
      password: '123',
      role: AppRole.Admin
    },
    {
      id: 'userid1',
      username: 'webnoob',
      emailAddress: 'me@allangaunt.dev',
      password: 'changeme',
      role: AppRole.Author,
      hasActingAs: ['userid2']
    },
    {
      id: 'userid2',
      username: 'va',
      emailAddress: 'va@dev.com',
      password: '123',
      role: AppRole.VirtualAssistant,
      canActAs: ['userid1']
    }
  ]

  async getById (id: string): Promise<User | null> {
    return this.users.find(f => f.id === id)
  }

  async getByUsername (username: string): Promise<User | null> {
    const user = await this.photonService
      .users
      .findMany({
        where: {
          username
        }
      })

    // return user[0]

    // Demo data at the moment
    return this.users.find(f => f.username === username)
  }

  /**
   * Get a list of users an authenticated user is allowed to mimic.
   * For a user to be returned, they must:
   *  a) Be included in the auth'd users canActAs
   *  b) Auth'd user must be included in the users hasActingAs (this ensures no tampering client side - although that's not possible with JWT)
   *  c) Needle must match
   * OR
   *  a) User is an admin - they can mimic anyone
   * AND
   *  a) User must not be an admin - no point allowing admins to mimic admins
   * @param user
   * @param needle
   */
  async getUsersToMimic (user: User, needle: string): Promise<User[]> {
    return this.users.filter(f => {
      const hasCorrectPerms =
        user.role === AppRole.Admin ||
        (user.canActAs.includes(f.id) && f.hasActingAs.includes(user.id))
      const isNotAdminUser = f.role !== AppRole.Admin

      return hasCorrectPerms && isNotAdminUser && f.username.toLowerCase().indexOf(needle) > -1
    })
  }
}
