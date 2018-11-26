import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './components/organizations/organizations.component';
import { OrganizationAddComponent } from './components/organizations/organization-add.component';
import { OrganizationDonationComponent } from './components/organizations/organization-donation.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'organization-add', component: OrganizationAddComponent },
  { path: 'organization-donation/:organizationId', component: OrganizationDonationComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // nothing here
}
