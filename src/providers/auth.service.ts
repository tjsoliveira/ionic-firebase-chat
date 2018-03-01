import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { BaseService } from './base.service';


@Injectable()
export class AuthService extends BaseService {

  constructor(
    public fireAuth: AngularFireAuth) {
      super();
  }

  createAuthUser(email: string, password: string): Promise<User>{

    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(this.handlePromiseError);
  }

  signWithEmail(user: {email: string, password: string}): Promise<User>{
    return this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  logout(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }

  currentUser(): User {
    return this.fireAuth.auth.currentUser;
  }
}
