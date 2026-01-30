import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wish, wishSchema } from './models/wish.model';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, userSchema } from 'src/users/models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Wish.name, schema: wishSchema}]), MongooseModule.forFeature([{name: User.name, schema: userSchema}])],
  controllers: [WishesController],
  providers: [WishesService, AuthService, JwtService, UsersService],
})
export class WishesModule {}
