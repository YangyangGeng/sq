import { IWXResponse } from '@libs/db/interface/wx.respones.interface';
import { Customer, Login } from '@libs/db/schemas/customer.schema';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs';
import { WXBizDataCrypt } from '../utils/WXBizDataCrypt'
import { CustomerService } from '../modules/customer/customer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    private response: IWXResponse;
    private appid = 'wx2e636c8b3ae2b9df';
    private secret = 'f1fe41686df9f6a55487219833df63c9'
    private grant_type = 'authorization_code'
    constructor(
        @InjectModel('CUSTOMER_MODEL') private readonly customerModel: Model<Customer>,
        private jwtService: JwtService,
        private readonly httpService: HttpService,
        private readonly customerService: CustomerService,
    ) {}

    public async login(loginDTO: Login): Promise<any> {
        const { code, iv, encryptedData } = loginDTO;
        const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=${this.grant_type}&appid=${this.appid}&secret=${this.secret}&js_code=${code}`
        const wxInfo = await this.getInfo(url);
        let userInfo;
        return await this.customerService.findOneByOpenID(wxInfo.openid)
        .then(async res => {
            if (res) {
                return this.response = {
                    success: true,
                    msg: '登录成功',
                    data: {
                        _id: res._id,
                        token: res.token,
                        openid: res.openid,
                        nickName: res.nickName,
                        avatar: res.avatar,
                        gender: res.gender,
                    },
                }
            } else {
                try {
                    const pc = new WXBizDataCrypt(this.appid, wxInfo.session_key)
                    const data = pc.decryptData(encryptedData , iv);
                    const token = await this.getToken({
                        openid: wxInfo.openid
                    });
                    userInfo = {
                        openid: wxInfo.openid,
                        nickName: data.nickName,
                        appid: this.appid,
                        avatar: data.avatarUrl,
                        gender: data.gender,
                        token
                    }
                    const createCustomer = new this.customerModel(userInfo);
                    return await createCustomer.save().then(res => {
                        if (!res._id) {
                            throw res;
                        }
                        return this.response = {
                            success: true,
                            msg: '登录成功',
                            data: {
                                _id: res._id,
                                token: userInfo.token,
                                openid: wxInfo.openid,
                                nickName: userInfo.nickName,
                                avatar: userInfo.avatar,
                                gender: userInfo.gender,
                            },
                        }
                    }).catch((error) => {
                        this.response = {
                            success: false,
                            msg: error._message
                        }
                        return this.response
                    });;
                } catch (error) {
                    this.response = {
                        success: false,
                        msg: '登录失败' + error
                    }
                    throw this.response
                }
            }
        }).catch(err => {
            return err
        })
    }

    getInfo(url): Promise<any> {
        return this.httpService.post(url).pipe(map(response => response.data)).toPromise();
    }

    async getToken(customer: any) {
        return this.jwtService.sign({
            openid: customer.openid
        })
    }
}
