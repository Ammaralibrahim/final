import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthToken } from '../../store/auth.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isLoggedIn$ = this.store.select(selectAuthToken).pipe(
      map((token: any) => !!token)
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
