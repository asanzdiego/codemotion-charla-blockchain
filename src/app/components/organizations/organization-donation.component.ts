import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from '../../models/organization';
import { OrganizationsService } from '../../services/organizations.service';
import { Donation } from 'src/app/models/donation';

@Component({
  selector: 'app-organization-donation',
  templateUrl: './organization-donation.component.html'
})
export class OrganizationDonationComponent implements OnInit {

  organization = new Organization();
  isLoading = true;
  isUpdating = false;
  error = '';
  message = '';
  value: number;
  donation: Donation;

  constructor(
    private route: ActivatedRoute,
    private organizationsService: OrganizationsService) {

  }

  ngOnInit() {

    this._init().catch(error => this.error = error);
  }

  private async _init(): Promise<void> {

    const organizationId: number = +this.route.snapshot.paramMap.get('organizationId');
    this.organization = await this.organizationsService.getOne(organizationId);
    if (!this.organization) {
      throw new Error('Organization with ID "' + organizationId + '" not found.');
    }
    this.isLoading = false;
  }

  donate() {

    this._donate().catch(error => {
      this.error = error;
    });
  }

  private async _donate(): Promise<void> {

    if (this.value && !this.isUpdating) {
      this.isUpdating = true;
      this.donation = await this.organizationsService.donation(this.organization.id, this.value);
      this.message = 'Donation of "' + this.donation.value + '" ETH submitted to the organization with ID "' + this.organization.id + '".';
      this.isUpdating = false;
    }
  }
}
