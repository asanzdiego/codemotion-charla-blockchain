import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from './services/service.module';

import { OrganizationsComponent } from './components/organizations/organizations.component';
import { OrganizationsTableComponent } from './components/organizations/organizations-table.component';
import { OrganizationAddComponent } from './components/organizations/organization-add.component';
import { OrganizationDonationComponent } from './components/organizations/organization-donation.component';
import { UserComponent } from './components/user/user.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationsComponent,
    OrganizationAddComponent,
    OrganizationDonationComponent,
    OrganizationsTableComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
