import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../user/user.service'
import { User } from '../user/model/user'
import { jwtConstants } from './constants'
import { LoginResult } from './auth'
import { UnauthorizedError } from 'type-graphql'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private makeUserResult (user: User): any {
    const { password, ...result } = user
    return result
  }

  private getLoginResult (user: User, mimicUser: User): LoginResult {
    let payload: any = {
      username: user.username,
      sub: user.id,
      role: user.role,
      canActAs: user.canActAs,
      hasActingAs: user.hasActingAs
    }

    if (mimicUser) {
      payload = {
        ...payload,
        mimicUsername: mimicUser.username,
        mimicSub: mimicUser.id,
        mimicRole: mimicUser.role
      }
    }

    const token: string = this.jwtService.sign(payload)
    const decodedToken: any = this.jwtService.decode(token, {
      // @ts-ignore
      secret: jwtConstants.secret
    })

    return {
      user: this.makeUserResult(user),
      token: {
        data: token,
        expires: decodedToken.exp
      },
      mimicUser: mimicUser ? this.makeUserResult(mimicUser) : null
    }
  }

  async validateUser (username: string, password: string): Promise<any> {
    // Try and find a user
    const user = await this.userService.getByUsername(username)

    // Do we have a user with the password that matches?
    if (user && user.password === password) {
      return this.makeUserResult(user)
    }

    // No user found, return null so passport knows auth failed.
    return null
  }

  async login (user: any): Promise<LoginResult> {
    return this.getLoginResult(user, null)
  }

  async setMimicUser (user: any, mimicUserId: string): Promise<LoginResult> {
    // Send a login token down with the mimic user cleared.
    if (mimicUserId === null) {
      return this.getLoginResult(user, null)
    }

    return this.userService.getById(mimicUserId).then((mimicUser: User) => {
      if (
        mimicUser === null || // No user for that id (they've interfered
        !mimicUser.hasActingAs.includes(user.id) // Don't have permission to act as this user
      ) {
        // Throw UnauthorizedError here so we're not giving any hints away as
        // to whether a user exists or not (in case they fake an id)
        throw new UnauthorizedError()
      }

      // If we're here, there is a mimic user and the user is allowed to act as them.
      return this.getLoginResult(user, mimicUser)
    })
  }
}
