import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import { selectAuthToken } from '../../store/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.select(selectAuthToken).pipe(
      map((token: any) => !!token) 
    );
  }
}
 