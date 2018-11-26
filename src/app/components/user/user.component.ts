import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageUtil } from '../../util/storage.util';
import { Organization } from '../../models/organization';
import { OrganizationsService } from '../../services/organizations.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  userAddress = '';
  organizationOwner: Organization;
  isLoadingOwner = true;
  error = '';

  constructor(
    private organizationsService: OrganizationsService) {

  }

  ngOnInit() {

    this.userAddress = StorageUtil.getUserAddress();

    this._init().catch(error => this.error = error);
  }

  private async _init(): Promise<void> {

    this.organizationOwner = await this.organizationsService.getCurrentUserOrganizationAsOwner();
    this.isLoadingOwner = false;
  }
}
