import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { EmailService } from './../email/email.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly emailService:EmailService
  ){}
  // 회원 가입 로직
  async signupUser(createUserDto:CreateUserDto):Promise<User>{
    return await this.userService.createUser(createUserDto);
  }

  // 로그인로직
  async getAuthedUser(loginUserDto:LoginUserDto):Promise<User>{
    //데이터베이스에서 이메일이 포함된 유저를 찾고 -> 비밀번호를 매칭 -> 패스워드 디코딩 -> 유저 리턴
    const {email, password} = loginUserDto;
    const user = await this.userService.getUserByEmail(email);
    const isPassWordMatched = await user.checkPassword(password);
    if(!isPassWordMatched){
      throw new HttpException("Password do not matched",HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  //send email (email vertification)
  async emailVertify(email:string):Promise<void>{
    await this.emailService.sendEmail({
      to:email,
      subject:'Elice lab oneday class - Kim',
      html:'<h1>Welcome to Elice</h1>'
    })
  }
}
