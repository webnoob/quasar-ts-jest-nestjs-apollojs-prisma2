import { Injectable } from '@nestjs/common'

import { PhotonService } from '../photon/photon.service'
import { User } from './model/user'

@Injectable()
export class UserService {
  constructor (private readonly photonService: PhotonService) { }

  async findOne (username: string): Promise<User | undefined> {
    const user = await this.photonService
      .users
      .findMany({
        where: {
          username
        }
      })

    // return user[0]

    // Demo data at the moment
    return {
      id: '1',
      username: 'webnoob',
      emailAddress: 'me@allangaunt.dev',
      password: 'changeme'
    }
  }
}
