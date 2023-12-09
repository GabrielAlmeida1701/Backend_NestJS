import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { RefreshToken } from 'src/entities/refresh-token.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    public async generateTokens(user: User) {
        let expireDate = this.getTokenExpiration();
        let expiresIn = Math.floor(expireDate.getTime() / 1000);

        let refreshPayload = { userId: user.id, expiresIn };
        let refreshToken = btoa(JSON.stringify(refreshPayload));

        let userData = { username: user.username, sub: user.id, lastLogin: new Date() }
        let accessPayload = { sub: JSON.stringify(userData) };
        let accessToken = this.jwtService.sign(accessPayload);

        await this.saveRefreshToken(user, refreshToken);

        return { refreshToken, accessToken }
    }

    public async getUserByName(username: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { username }
        })

        return user;
    }

    public async getUserById(id: number): Promise<User> {
        const userdb = await this.userRepository.findOne({
            where: { id }
        })

        if (!userdb)
            throw new Error('No user found')

        return userdb
    }

    public async validateRefreshToken(refreshToken: string): Promise<number | undefined> {
        let { userId } = JSON.parse(atob(refreshToken))
        const userToken = await this.refreshTokenRepository.findOne({
            where: { userId }
        })
        
        if (!userToken || userToken?.token != refreshToken || userToken?.expires < new Date())
            return

        return userId
    }

    private async saveRefreshToken(user: User, refreshToken: string): Promise<void> {
        const existingToken = await this.refreshTokenRepository.findOne({
            where: { userId: user.id },
        });

        if (existingToken) {
            this.updateToken(existingToken, refreshToken);
            return
        }
        
        let userdb = await this.getUserById(user.id);
        const newToken = this.refreshTokenRepository.create({
            token: refreshToken,
            expires: this.getTokenExpiration(),
            userId: userdb.id,
        });
        await this.refreshTokenRepository.save(newToken);
    }

    private async updateToken(refreshToken: RefreshToken, newToken: string) {
        refreshToken.token = newToken;
        refreshToken.expires = this.getTokenExpiration();

        await this.refreshTokenRepository.save(refreshToken);
    }

    private getTokenExpiration() : Date {
        let expiresIn = new Date();
        expiresIn.setMinutes(expiresIn.getMinutes() + 3); // +3 minutes

        return expiresIn
    }
}