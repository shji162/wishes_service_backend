import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, listSchema } from './models/list.model';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User, userSchema } from 'src/users/models/user.model';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{name: List.name, schema: listSchema}]), MongooseModule.forFeature([{name: User.name, schema: userSchema}]), UsersModule, JwtModule],
  controllers: [ListsController],
  providers: [ListsService, AuthService, JwtService],
})
export class ListsModule {}
