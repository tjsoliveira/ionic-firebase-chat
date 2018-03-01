import { UserService } from './../../providers/user.service';
import { HomePage } from './../home/home';
import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import * as regex from '../../shared/regex';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private userService: UserService) {

      this.loginForm = formBuilder.group({
        email: this.formBuilder.control('', [Validators.compose([
          Validators.required, Validators.pattern(regex.emailRegex)
        ])]),
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
      })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  login() {

    let loading: Loading = this.showLoading();

    this.auth.signWithEmail(this.loginForm.value)
      .then(user => {
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }).catch(error => {

        loading.dismiss();
        let errorMessage: string;

        if ((error.code === 'auth/user-not-found') || (error.code === 'auth/wrong-password')){
          errorMessage = 'User/Password Invalid, please try again'
        }else {
          errorMessage = error.message;
        }

        let alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: errorMessage,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

}
