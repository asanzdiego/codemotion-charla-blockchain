import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Organization } from '../../models/organization';

@Component({
  selector: 'app-organizations-table',
  templateUrl: './organizations-table.component.html'
})
export class OrganizationsTableComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  @Input() organizations: Organization[];
  @Input() organization: Organization;

  dataSource: MatTableDataSource<Organization>;
  displayedColumns: string[] = ['id', 'ownerAddress', 'name', 'donation'];

  constructor() { }

  ngOnInit() {
    if (this.organization) {
      this.organizations = [];
      this.organizations.push(this.organization);
    }
    this.dataSource = new MatTableDataSource(this.organizations);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
