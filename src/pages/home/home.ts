import { UserService } from './../../providers/user.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  constructor(
    public navCtrl: NavController,
    private userService: UserService
  ) {

  }

  ionViewDidLoad(){
    this.users = this.userService.getUsers();
  }

  onClick(): void {
    this.navCtrl.push(SignupPage)
  }

  onChatCreate(user: User){
    console.log(user);

  }

}
