import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
export interface courseType {
  title: string;
  author: string;
  description: string;
  topics: string[];
  rating: number;
  showTopics: boolean;
  enrolled: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class SharedService {
   private isUserLoggedIn:boolean=false;
  private loggedInUserName:string='';
  public  registeredUsers:{name:string| null | undefined, email:string| null | undefined}[]=[];
  constructor(private http:HttpClient) { }

  public set setLoggedInUserName(username:string){
    this.isUserLoggedIn=true;
    this.loggedInUserName=username;
  }
  public get getLoggedInUserName():string{
    return this.loggedInUserName;
  }
 public set setIsUserLoggedIn(isUserLoggedIn:boolean){
     this.isUserLoggedIn=isUserLoggedIn;
  }
  public get getIsUserLoggedIn():boolean{
    return this.isUserLoggedIn;
  }
  //Return courses by adding 'enrolled' state
   getCourses(): Observable<courseType[]> {
    return this.http.get<courseType[]>('assets/data/courses.json').pipe(map(courses => courses.map(course => ({ ...course, enrolled: false }))));
  }
}
