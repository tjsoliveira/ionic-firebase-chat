import { AuthService } from './../../providers/auth.service';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninPage } from '../signin/signin';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;
  view: string = 'chats';

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService
  ) {

  }

  ionViewCanEnter(): Promise<boolean>{
    return this.authService.authenticated;
  }

  ionViewDidLoad(){
    this.users = this.userService.getUsers();
    console.log(this.authService.currentUser());

  }

  onLogout(){
    this.authService.logout();
    this.navCtrl.setRoot(SigninPage);
  }

  onChatCreate() {
    console.log("Chat Created!");

  }

}
