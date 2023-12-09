import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { AuthJwtGuard } from 'src/auth/auth-jwt.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
          secret: 'pogchamp2',
          signOptions: {
            expiresIn: '1m',
          },
        }),
    ],
    controllers: [ExampleController],
    providers: [AuthJwtGuard]
})
export class ExampleModule {}
