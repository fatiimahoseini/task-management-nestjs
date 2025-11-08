import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '12345',
      password: '12345',
      database: 'Task_management_nestjs',
      entities: [__dirname + '/**/entities/entity{.ts,.js}']
    }),
    ProjectsModule,
    TasksModule],
})
export class AppModule {}
