import { ReposModel } from "./repos.model";

export class UserModel {
  login!: string;
  avatar_url!: string;
  bio!: string;
  name!: string;
  repos_url!: ReposModel[];
  html_url!: string;

}
