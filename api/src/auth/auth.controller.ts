import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
import MimicUserDto from './dto/mimicUser.dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login (@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout (@Request() req) {
    return req.logout()
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('setMimicUser')
  setMimicUser (@Request() req, @Body() mimicUserDto: MimicUserDto) {
    return this.authService.setMimicUser(req.user, mimicUserDto.id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile (@Request() req) {
    return req.user
  }
}
