import { IResponse } from '@libs/db/interface/respones.interface';
import { User } from '@libs/db/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../modules/user/user.service';
import { encript } from '../utils/encription';

@Injectable()
export class AuthService {
    private response: IResponse;
    constructor(
        @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    public async login(user: User) {
        return await this.validateUser(user)
        .then((res: IResponse) => {
            if (!res.success) {
                this.response = res;
                throw this.response;
            }
            this.response = {
                success: true,
                msg: { token: this.jwtService.sign({ uid: user._id }), uid: res.msg }
            }
            return this.response;
        })
        .catch(err => {
            return err
        })
    }

    public async register(user: User) {
        return this.userService.findOneByPhone(user.phone)
            .then(res => {
                if (res.length !== 0) {
                    this.response = {
                        success: false,
                        msg: '当前手机号已注册'
                    }
                    throw this.response
                }
            })
            .then(async () => {
                try {
                    const createUser = new this.userModel(user)
                    createUser.save()
                    this.response = {
                        success: true,
                        msg: '注册成功！' 
                    }
                    return this.response;
                } catch (error) {
                    this.response = {
                        success: false,
                        msg: '用户注册失败，请联系相关人员' + error
                    }
                    throw this.response
                }
            })
            .catch(err => {
                console.log(err.msg);
                return this.response
            })
    }
    
    private async validateUser(user: User) {
        const phone: string = user.phone;
        const password: string = user.password;

        return await this.userService.findOneByPhone(phone)
        .then(res => {
            if (res.length === 0) {
                this.response = { success: false, msg: '用户尚未注册' }
                throw this.response
            }
            return res[0];
        })
        .then((dbUser: User) => {
            const pass = encript(password, dbUser.salt);
            if (pass === dbUser.password) {
               return this.response = { success: true, msg: dbUser._id }
            } else {
                this.response = { success: false, msg: '用户名密码错误' }
                throw this.response
            }
        })
        .catch(err => {
            return err
        })
    }
}
