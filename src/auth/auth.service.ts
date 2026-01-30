import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { CreateUserDto } from './DTO/createUserDto.dto';
import { ConfigService } from '@nestjs/config';
import { Roles } from 'src/users/enums/user.enum';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService){}

    async validate(password: string, email: string) { 
        const user = await this.userService.findByEmail(email)
        if(!user){
            return new UnauthorizedException("") // create errors texts
        }
        const compare = bcrypt.compare(password, user.password)
        if(!compare){
            return new BadRequestException("") // create errors texts
        }
        return user
    }

    async validateToken(token: string) {
        const validate = this.jwtService.verify(token, {
            secret: this.configService.get<string>("JWT_SECRET")
        })

        return validate
    }

    async login(user: any){ // create user type
        const candidate = await this.userService.findByEmail(user.email)
        if(!candidate){
            return new BadRequestException('user not exist')
        }
        const payload = { email: user.email, id: user.id, role: user.role };
        return { accessToken: this.jwtService.sign(payload), user: candidate};
    }

    async register(user: CreateUserDto) {
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) {
            throw new BadRequestException('email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser: CreateUserDto = { ...user, password: hashedPassword }; // create userType
        await this.userService.create(newUser);
        return this.login(newUser);
  }
}
