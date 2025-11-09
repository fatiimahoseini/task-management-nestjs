import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enums/projectStatusEnum';
import express from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('/create-project')
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: express.Response,
  ) {
    const createProject = await this.projectsService.create(createProjectDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Project created successfully!',
      data: createProject,
    });
  }

  @Get('/get-projects')
  async findAll(
    @Res() res: express.Response,
    @Query('status') status?: ProjectStatusEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const projects = await this.projectsService.findAll(status, limit, page);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Projects found!',
      data: projects,
    });
  }

  @Get('/get-project/:id')
  async findOne(@Res() res: express.Response, @Param('id') id: string) {
    const project = await this.projectsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Project found!',
      data: project,
    });
  }

  @Put('/update-project/:id')
  async update(
    @Res() res: express.Response,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    await this.projectsService.update(+id, updateProjectDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Project updated successfully!',
      data: null,
    });
  }

  @Delete(':id')
  async remove(@Res() res: express.Response, @Param('id') id: string) {
    await this.projectsService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Project deleted successfully!',
      data: null,
    });
  }
}
