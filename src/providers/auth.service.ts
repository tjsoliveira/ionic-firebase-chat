import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';


@Injectable()
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth) {

  }

  createAuthUser(email: string, password: string): Promise<User>{

    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
