import { Injectable } from '@angular/core';
import { Organization } from '../models/organization';
import { Web3Service } from './web3.service';
import { StorageUtil } from '../util/storage.util';
import { Donation } from '../models/donation';

@Injectable()
export class OrganizationsService {

  private organizations: Organization[] = [];
  private senderAddress: string;

  constructor(
    private web3Service: Web3Service) {

    this.senderAddress = StorageUtil.getUserAddress();
  }

  async getCurrentUserOrganizationAsOwner(): Promise<Organization> {

    return await this.getUserOrganizationAsOwner(this.senderAddress);
  }

  async getUserOrganizationAsOwner(userAddress: string): Promise<Organization> {

    const contractInstance = await this.web3Service.getContractInstance();
    const organizationId = await contractInstance.ownerToOrganizationId.call(userAddress);
    if (!organizationId || organizationId.toString() === '0') {
      console.log('OrganizationService->getUserOrganizationAsOwner->organizationId', organizationId);
      return;
    }
    const organization = await this.getOne(organizationId);
    console.log('OrganizationService->getUserOrganizationAsOwner', organization);
    return organization;
  }

  async getAll(): Promise<Organization[]> {

    const contractInstance = await this.web3Service.getContractInstance();
    const lengthBigNumber = await contractInstance.getOrganizationsLength();
    const organizationLength = lengthBigNumber.toString() * 1;
    if (this.organizations.length + 1 === organizationLength) {
      console.log('OrganizationService->getAll->old', this.organizations);
      return this.organizations;
    }
    const organizations = [];
    for (let index = 1; index < organizationLength; index++) {
      const organization = await this.getOne(index);
      organizations.push(organization);
    }
    this.organizations = organizations;
    console.log('OrganizationService->getAll->new', this.organizations);
    return this.organizations;
  }

  async getOne(id: number): Promise<Organization> {

    const oldElement = this.organizations[id - 1];
    if (oldElement) {
      return oldElement;
    }
    const contractInstance = await this.web3Service.getContractInstance();
    const organizationArray = await contractInstance.organizations.call(id);
    const organization = this._getOrganizationFromArray(organizationArray);
    if (!organization.id
      || organization.id.toString() === '0'
      || organization.id.toString() !== id.toString()) {
      throw new Error('The organization ID is not correct.');
    }
    return organization;
  }

  async add(organization: Organization): Promise<Organization> {

    const contractInstance = await this.web3Service.getContractInstance();
    const oldOrganization = await this.getCurrentUserOrganizationAsOwner();
    if (oldOrganization) {
      throw new Error('The user is already the owner of the organization with ID "' + oldOrganization.id + '".');
    }
    const transaction = await contractInstance.addOrganization(organization.name, { from: this.senderAddress });
    const newOrganization = this._getOrganizationFromTransaction(transaction);
    if (!newOrganization.id
      || newOrganization.id.toString() === '0') {
      throw new Error('The organization ID is not correct.');
    }
    this.organizations.push(newOrganization);
    console.log('OrganizationService->add', newOrganization);
    return newOrganization;
  }

  async donation(id: number, ethValue: number): Promise<Donation> {

    const organization = await this.getOne(id);
    const contractInstance = await this.web3Service.getContractInstance();
    const weiValue = this.web3Service.etherToWei(ethValue.toString());
    const transaction = await contractInstance.donation(organization.id, 
        { value: weiValue, from: this.senderAddress });
    const donation = await this._getDonationFromTransaction(transaction);
    if (donation.organizationId.toString() !== id.toString()
      || donation.ownerAddress !== organization.ownerAddress
      || donation.senderAddress !== this.senderAddress
      || donation.value.toString() !== ethValue.toString()) {
      throw new Error('Some error found donating.');
    }
    console.log('OrganizationService->donation', donation);
    return donation;
  }

  private _getOrganizationFromArray(array: any): Organization {

    const organization = new Organization();
    organization.id = array[0];
    organization.ownerAddress = array[1];
    organization.name = array[2];
    organization.setString();
    return organization;
  }

  private _getOrganizationFromTransaction(transaction: any): Organization {

    const organization = new Organization();
    organization.id = transaction.logs[0].args.id;
    organization.ownerAddress = transaction.logs[0].args.owner;
    organization.name = transaction.logs[0].args.name;
    organization.setString();
    return organization;
  }

  private _getDonationFromTransaction(transaction: any): Donation {

    const organization = new Donation();
    organization.organizationId = transaction.logs[0].args.id;
    organization.ownerAddress = transaction.logs[0].args.owner;
    organization.senderAddress = transaction.logs[0].args.sender;
    const weiValue = transaction.logs[0].args.value;
    const ethValue = this.web3Service.weiToEther(weiValue.toString());
    organization.value = ethValue;
    organization.setString();
    return organization;
  }
}
