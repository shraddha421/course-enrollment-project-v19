import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../../shared/shared-service';
import { Router } from '@angular/router';
import { SHARED_MODULES } from '../../shared/shared-imports';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SHARED_MODULES],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input() enrolledCount: number = 0;
  @Output() viewCoursesEvent = new EventEmitter<string>();
  public userName: string | null | undefined = '';
  public viewEnrolled = false;
  constructor(private _sharedService: SharedService, private router: Router) {}

  ngOnInit(): void {
    //Show loggged in user name at theb left of navigation bar
    const user = this._sharedService.registeredUsers.find(
      (user) => user.email === this._sharedService.getLoggedInUserName
    );
    if (user) {
      this.userName = user.name;
    }
  }
  //Send event to parent to show all courses/enrolled courses
  toggleErolledCourses(): void {
    this.viewEnrolled = !this.viewEnrolled;
    if (this.viewEnrolled) {
      this.viewCoursesEvent.emit('Enrolled');
    } else {
      this.viewCoursesEvent.emit('All');
    }
  }
  //Route directly to login page
  public logout(): void {
    this._sharedService.setIsUserLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
