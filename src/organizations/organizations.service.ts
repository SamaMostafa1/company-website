import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization  } from 'src/schemas/organization.schema'
import { CreateOrganizationData } from './dto/createOrganization.Dto';



@Injectable()
export class OrganizationService {
  constructor(@InjectModel(Organization.name) private organizationModel: Model<Organization>) {}

  async createOrg(createOrganizationData: CreateOrganizationData) {
    const newOrganizationData = {
      ...createOrganizationData,
    //   members: [{ user_id: userId, access_level: 'admin' }],
    };

    const createdOrganization = new this.organizationModel(newOrganizationData);
    const result = await createdOrganization.save();
    
    return { organization_id: result._id.toString() };
  }
  async findAll(): Promise<Organization[]> {
    return this.organizationModel.find();
  }
  async findOne(id: string): Promise<Organization> {
    const organization = await this.organizationModel.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }
  async update(id: string, updateOrgDto: CreateOrganizationData): Promise<Organization> {
    const updatedOrg = await this.organizationModel.findByIdAndUpdate(id, updateOrgDto, { new: true });
    if (!updatedOrg) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return updatedOrg;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedOrg = await this.organizationModel.findByIdAndDelete(id);
    if (!deletedOrg) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return { message: 'Organization deleted successfully' };
  }
}