import { Component, OnInit, ViewChild } from '@angular/core';
import { Organization } from '../../models/organization';
import { OrganizationsService } from '../../services/organizations.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html'
})
export class OrganizationsComponent implements OnInit {

  organization: Organization;
  organizations: Organization[] = [];
  canCreate = false;
  isLoadingOrganization = true;
  isLoadingOrganizations = true;
  error = '';

  constructor(
    private organizationsService: OrganizationsService) {

  }

  ngOnInit() {

    this._init().catch(error => this.error = error);
  }

  private async _init(): Promise<void> {

    this.organization = await this.organizationsService.getCurrentUserOrganizationAsOwner();
    if (!this.organization) {
      this.canCreate = true;
    }
    this.isLoadingOrganization = false;

    const organizations = await this.organizationsService.getAll();
    for (let index = 0; index < organizations.length; index++) {
      if (!this.organization || this.organization.id.toString() !== organizations[index].id.toString()) {
        this.organizations.push(organizations[index]);
      }
    }
    this.isLoadingOrganizations = false;
  }
}
