import { Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LocalAuthGuard } from './gaurds/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser';
import { ApiBody } from '@nestjs/swagger';
import { SendEmailDto } from 'src/user/dto/send-email.dto';
import { VertifyEmailDto } from 'src/user/dto/vertify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signupUser(@Body() createUserDto:CreateUserDto):Promise<User>{
    return await this.authService.signupUser(createUserDto);
  }

  // // 바디값이 노출되고 로직이 노출되는 위험이 존재함
  // @Post("/login")
  // async loggedIn(@Body() loginUserDto:LoginUserDto):Promise<User>{
  //   return await this.authService.getAuthedUser(loginUserDto);
  // }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  @ApiBody({type:LoginUserDto})
  async loggedIn(@Req() request:RequestWithUser){
    return request.user;
  }

  @Post("/send/email")
  async sendEmail(@Body() sendEmailDto:SendEmailDto):Promise<void>{
    return await this.authService.emailVertify(sendEmailDto.email);
  }

  @Post("/vertify/email")
  async vertifyEmail(@Body() vertifyEmailDto:VertifyEmailDto):Promise<boolean>{
    return await this.authService.confirmEmail(vertifyEmailDto);
  }


}
