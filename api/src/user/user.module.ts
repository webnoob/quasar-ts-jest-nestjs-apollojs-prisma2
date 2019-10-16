import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PhotonService } from '../photon/photon.service'

@Module({
  providers: [UserService, PhotonService],
  exports: [UserService]
})
export class UserModule {}
