import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization';
import { OrganizationsService } from '../../services/organizations.service';
import { StorageUtil } from '../../util/storage.util';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-add.component.html'
})
export class OrganizationAddComponent implements OnInit {

  organization = new Organization();
  isLoading = true;
  isCreating = false;
  error = '';
  message = '';

  constructor(private organizationsService: OrganizationsService) { }

  ngOnInit() {

    this._init().catch(error => this.error = error);
  }

  private async _init(): Promise<void> {

    const organization: Organization = await this.organizationsService.getCurrentUserOrganizationAsOwner();
    if (organization) {
      throw new Error('The user is already the owner of the organization with ID "' + organization.id + '".');
    }
    this.organization.ownerAddress = StorageUtil.getUserAddress();
    this.isLoading = false;
  }

  create() {

    this._create().catch(error => this.error = error);
  }

  private async _create(): Promise<void> {

    if (this.organization.ownerAddress && this.organization.name && !this.isCreating) {
      this.isCreating = true;
      this.organization = await this.organizationsService.add(this.organization);
      this.message = 'Created organization with ID "' + this.organization.id + '".';
      this.isCreating = false;
    }
  }
}
