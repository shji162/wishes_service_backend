import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, listSchema } from './models/list.model';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User, userSchema } from 'src/users/models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{name: List.name, schema: listSchema}]), MongooseModule.forFeature([{name: User.name, schema: userSchema}])],
  controllers: [ListsController],
  providers: [ListsService, AuthService, JwtService],
})
export class ListsModule {}
