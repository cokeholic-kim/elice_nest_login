import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from './../auth.service';
import { User } from "src/user/entities/user.entity";

@Injectable()
export class LocalhostStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService:AuthService
    ){
        super({
            usernameField:"email"
        });
    }

    async validate(email:string,password:string):Promise<User>{
        return await this.authService.getAuthedUser({email,password})
    }
}