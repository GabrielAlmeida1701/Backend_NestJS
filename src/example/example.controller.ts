import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from 'src/auth/auth-jwt.guard';

@Controller('example')
export class ExampleController {
    @Get()
    @UseGuards(AuthJwtGuard)
    protectedAction() {
        return { message: 'Congrats you are still logged in' }
    }
}
