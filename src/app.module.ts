import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExampleModule } from './example/example.module';
import { dataSourceOptions } from './db/data-source';

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		AuthModule,
		ExampleModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
