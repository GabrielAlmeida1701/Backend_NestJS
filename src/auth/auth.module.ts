import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { RefreshToken } from 'src/entities/refresh-token.entity';
import { AuthJwtGuard } from './auth-jwt.guard';

@Module({
	imports: [
		JwtModule.register({
			secret: 'pogchamp2',
			signOptions: {
				expiresIn: '1m'
			},
		}),
		TypeOrmModule.forFeature([User, RefreshToken]),
	],
	controllers: [AuthController],
	providers: [AuthJwtGuard, AuthService],
})
export class AuthModule { }
