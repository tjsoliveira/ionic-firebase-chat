import { User } from './../../models/users.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any[]>;

  constructor(
    public firestore: AngularFirestore
  ) {
    this.usersCollection = this.firestore.collection('users');
    this.users = this.usersCollection.valueChanges();
  }

  create(user: User): Promise<any> {
    let reg: any;
    reg = Object.assign({}, {
      "name": user.name,
      "username": user.username,
      "email": user.email,
      "password": user.password
    })
    return this.usersCollection.add(reg);
  }
}
