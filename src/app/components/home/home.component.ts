import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { UserModel } from 'src/app/models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReposModel } from 'src/app/models/repos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource();
  columnas: string[] = ['Nombre de repositorio', 'Descripcion', 'Enlace al repo', 'Estrellas', 'Lenguajes de programación'];

  searchUserControl = new FormControl();
  user: UserModel = null as any;
  repos: any;
  
  @ViewChild(MatPaginator, {read: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private gitHubService: GithubService, private _liveAnnouncer: LiveAnnouncer) {}
  
  // Nuevo formulario para introducir el usuario //
  userForm = new FormGroup({
    userName: new FormControl('')
  });

 // Metodos para buscar usuario y repos

  searchUser(user: any) {
    this.gitHubService.getUser(user).subscribe(res => this.user = res);
    console.log("resultadoUser", this.user);
  }

  searchRepos(user: any) {
    this.gitHubService.getRepos(user).subscribe(
      res => {
    this.repos = res;
    this.dataSource.data = this.repos;
    setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    console.log(this.dataSource.sort);
      });
  
    }


  ngOnInit(): void {

  }

  filterRepo(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

  // Recibirá el value del input y lo enviará a ambos métodos para hacer llamada a la API //

  onSubmit() {
    this.searchUser(this.userForm.get('userName')?.value);
    this.searchRepos(this.userForm.get('userName')?.value);  
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
