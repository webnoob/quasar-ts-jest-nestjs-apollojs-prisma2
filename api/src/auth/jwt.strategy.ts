import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from './constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate (payload: any) {
    return {
      // re-assigning to id here so this object "looks" like a User
      // and it makes sense we'd try and access user.id
      id: payload.sub,
      username: payload.username,
      tokenExpires: payload.exp,
      role: payload.role,
      canActAs: payload.canActAs,
      hasActingAs: payload.hasActingAs,
      mimicUsername: payload.mimicUsername,
      mimicId: payload.mimicSub,
      mimicRole: payload.mimicRole
    }
  }
}
