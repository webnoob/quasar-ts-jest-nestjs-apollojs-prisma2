import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PhotonService } from '../photon/photon.service'
import { UserResolver } from './user.resolver'

@Module({
  providers: [UserService, UserResolver, PhotonService],
  exports: [UserService]
})
export class UserModule {}
