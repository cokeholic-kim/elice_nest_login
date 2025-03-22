import {  BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from '../../common/base.entity';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { InternalServerErrorException } from "@nestjs/common";


@Entity()
export class User extends BaseEntity{
    // 유저이름 , 이메일 , 패스워드 , 프로필 이미지, 프로바이더(구글 ,네이버)
    @Column()
    public name:string;
    @Column({unique:true})
    public email:string;
    @Column()
    public password:string;
    @Column({ nullable: true })
    public profileImg?:string;

    @BeforeInsert()
    async beforeSaveFunction():Promise<void> {

        this.profileImg = gravatar.url(this.email, {
            s:"200",
            r:"pg",
            d:"mm",
            protocol: 'https'
        })

        if(this.password){
          const saltValue = await bcrypt.genSalt(10);
          this.password = await bcrypt.hash(this.password,saltValue)
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(aPassword,this.password);
        } catch (error) {
            throw new InternalServerErrorException();
        }       
    }
}
