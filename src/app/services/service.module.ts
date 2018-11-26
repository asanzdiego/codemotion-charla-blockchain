import { NgModule } from '@angular/core';
import { MessagesService } from './messages.service';
import { OrganizationsService } from './organizations.service';
import { Web3Service } from './web3.service';

@NgModule({
    providers: [
        MessagesService,
        OrganizationsService,
        Web3Service,
    ]
})
export class ServicesModule {
    // nothing here
}
