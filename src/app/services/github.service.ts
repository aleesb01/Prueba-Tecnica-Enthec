import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ReposModel } from '../models/repos.model';
import { stdout } from 'process';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUser(name: string): Observable<UserModel>{
    const url = `https://api.github.com/users/${name}`;
    return this.http.get<UserModel>(url);
  }

  getRepos(name: string): Observable<ReposModel>{
    const url = `https://api.github.com/users/${name}/repos`;
    return this.http.get<ReposModel>(url);
  }
}
