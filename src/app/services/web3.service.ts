import { Injectable } from '@angular/core';
import { StorageUtil } from '../util/storage.util';
import { MessagesService } from './messages.service';

import * as contract from 'truffle-contract';
declare let require: any;
declare let window: any;
const Web3 = require('web3');
const artifacts = require('../../../build/contracts/NonGovernmentalOrganizations.json');

@Injectable()
export class Web3Service {
  
  web3: any;

  constructor(private messagesService: MessagesService) {

    if (typeof window.web3 === 'undefined') {
      return;
    }

    this.web3 = new Web3(window.web3.currentProvider);
  }

  init() {
    setInterval(() => this.getUserAddress(), 1000);
  }

  private getUserAddress() {

    if (!this.web3) {
      this.messagesService.sendErrorMessage('web3 server not found. Try MetaMask.');
      return;
    }
    this.web3.eth.getAccounts()
      .then(accounts => {
        if (!accounts || accounts.length === 0) {
          this.messagesService.sendErrorMessage('No user accounts retrieved.');
          return;
        }
        if (StorageUtil.getUserAddress() !== accounts[0].toLowerCase()) {
          StorageUtil.setUserAddress(accounts[0].toLowerCase());
          console.log('Web3Service->accounts[0]', StorageUtil.getUserAddress());
          this.messagesService.sendNewUserAddressMessage(StorageUtil.getUserAddress());
        }
        this.getContractInstance().then().catch(error => {
          this.messagesService.sendErrorMessage(error);
        });
      }).catch(error => {
        console.log(error);
        this.messagesService.sendErrorMessage('Ethereum accounts not found.');
      });
  }

  async getContractInstance(): Promise<any> {

    if (!this.web3) {
      throw new Error('web3 server not found. Try MetaMask.');
    }
    const ngoContract = contract(artifacts);
    ngoContract.setProvider(this.web3.currentProvider);
    try {
      const ngoInstance = await ngoContract.deployed();
      return ngoInstance;
    } catch (error) {
      console.log(error);
      throw new Error('Contract has not been deployed to detected network.');
    }
  }

  etherToWei(ether: string): string {

    return '' + this.web3.utils.toWei(ether, 'ether');
  }

  weiToEther(wei: string): string {

    return '' + this.web3.utils.fromWei(wei, 'ether');
  }

  isAddress(address: string): boolean {

    return this.web3.utils.isAddress(address);
  }
}
