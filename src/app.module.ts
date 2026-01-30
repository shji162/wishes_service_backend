import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ListsModule } from './lists/lists.module';
import { WishesModule } from './wishes/wishes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/nest'), AuthModule, ListsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    WishesModule,
    CommentsModule
  ],
  controllers: [AppController],
  providers: [AppService, ]
})
export class AppModule {}
