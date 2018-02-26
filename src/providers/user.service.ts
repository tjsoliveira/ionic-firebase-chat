import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

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
      "uid": user.uid
    })
    return this.usersCollection.add(reg);
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }
}
