import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalhostStrategy } from './strategies/local-auth.strategy';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[UserModule,EmailModule],
  controllers: [AuthController],
  providers: [AuthService,LocalhostStrategy],
})
export class AuthModule {}
