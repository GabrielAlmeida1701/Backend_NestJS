import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { AuthJwtGuard } from './auth-jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() user: User) {
        var dbUser = await this.authService.getUserByName(user.username)
        const isValid = dbUser?.password == user.password;

        if (isValid) {
            const { id } = dbUser
            const { refreshToken, accessToken } = await this.authService.generateTokens(dbUser);            

            return { accessToken, refreshToken, id };
        }

        return { error: true }
    }

    @Post('refresh')
    async refresh(@Body() { refreshToken }: { refreshToken: string }) {
        const userId = await this.authService.validateRefreshToken(refreshToken)
        if (userId !== undefined) {
            const user = await this.authService.getUserById(userId)
            const { refreshToken, accessToken } = await this.authService.generateTokens(user);

            return { accessToken, refreshToken, id: user.id };
        }

        return { error: true }
    }

    @Post('validate')
    @UseGuards(AuthJwtGuard)
    async validate(@Body() { refreshToken }: { refreshToken: string }) {
        const userId = await this.authService.validateRefreshToken(refreshToken)
        return { error: userId === undefined }
    }
}