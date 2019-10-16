import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { LocalStrategy } from './local.strategy'
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
