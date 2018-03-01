import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from './base.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService extends BaseService{

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private firestore: AngularFirestore,
    private af: AngularFireModule
  ) {
    super();
    this.usersCollection = this.firestore.collection('users');
    this.users = this.usersCollection.valueChanges();
  }

  create(user: User): Promise<any> {
    let reg: any;
    reg = Object.assign({}, {
      "name": user.name,
      "username": user.username,
      "email": user.email,
      "uid": user.uid
    })
    return this.usersCollection.add(reg);
  }

  getUsers(): Observable<User[]> {
    return this.users.catch(this.handleObservableError);
  }

  userExists(username: string): Promise<any> {

    let retorno = new Promise((resolve, reject) => {

      this.users.subscribe(user => {
        user.map(key => {

          let name: string = key.username;
          if (name === username){
            resolve(true);
          }
        })
      });
    })
   return retorno;
  }
}
