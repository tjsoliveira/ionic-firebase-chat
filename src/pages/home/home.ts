import { AuthService } from './../../providers/auth.service';
import { AlertController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SigninPage } from '../signin/signin';
import { SignupPage } from './../signup/signup';
import { User } from '../../models/user.model';
import { UserService } from './../../providers/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: Observable<User[]>;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {

  }

  ionViewCanEnter(){

   if(this.authService.currentUser() === null){
      let alert = this.alertCtrl.create({
        title: 'Por favor, logue no App',
        subTitle: 'Você precisa logar no aplicativo para acessar essa página',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot(SigninPage)
    }

  }

  ionViewDidLoad(){
    this.users = this.userService.getUsers();
  }

  login() {

  }

  onSignup() {
    this.navCtrl.push(SignupPage)
  }

  onChatCreate() {
    console.log("Chat Created!");

  }

}
