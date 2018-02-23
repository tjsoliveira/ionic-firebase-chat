import { UserProvider } from './../../providers/user/user.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { User } from '../../models/users.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  constructor(
    public navCtrl: NavController,
    private userProvider: UserProvider
  ) {

  }

  ionViewDidLoad(){
    this.users = this.userProvider.getUsers();
  }

  onClick(): void {
    this.navCtrl.push(SignupPage)
  }

  onChatCreate(user: User){
    console.log(user);

  }

}
