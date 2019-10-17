import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser (username: string, password: string): Promise<any> {
    // Try and find a user
    const user = await this.userService.findOne(username)

    // Do we have a user with the password that matches?
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }

    // No user found, return null so passport knows auth failed.
    return null
  }

  async login (user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
