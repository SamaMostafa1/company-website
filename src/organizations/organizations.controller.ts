// src/organization/organization.controller.ts
import { Body, Controller, Post, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';

import { OrganizationService } from './organizations.service';
import { CreateOrganizationData } from './dto/createOrganization.Dto';
import { AuthGuard } from 'src/gaurd/auth.gaurd';

@Controller()
@UseGuards(AuthGuard )
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('organization')
  async createOrg(
    @Body() createOrganizationData: CreateOrganizationData,
    @Request() req: any, 
  ) {
    // const userId = req.user._id; 
    return this.organizationService.createOrg(createOrganizationData);
  }
  @Get('organization')
  findAll() {
    return this.organizationService.findAll();
  }
  @Get('organization/:id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Put('organization/:id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: CreateOrganizationData) {
    return this.organizationService.update(id, updateOrganizationDto);
  }
  @Delete('organization/:id')
  delete(@Param('id') id: string) {
    return this.organizationService.delete(id);
  }
}
