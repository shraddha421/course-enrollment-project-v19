import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_MODULES } from './shared/shared-imports';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet,SHARED_MODULES],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'course-enrollment-platform';
}
