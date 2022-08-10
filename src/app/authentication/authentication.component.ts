import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { ApiService } from '../service/api.service';
import {MatButtonModule} from '@angular/material/button';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private http: HttpClient, private api: AuthenticationService) {}

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'MakeAuthentication'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: any = [];
  ngOnInit(): void {
    this.getUsers();

  }

  makeAuthorize(id){
    console.log(id, "test1")
    // problem
    this.api.makeAuthorized(id).subscribe({
      next: (res) => {
        console.log(res, "test2")
        if( res.status === 404){
          alert("Not authorized yet")
        }
      }
    })
  }

  getUsers() {
    // console.log('called');
    this.api.getUserData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
