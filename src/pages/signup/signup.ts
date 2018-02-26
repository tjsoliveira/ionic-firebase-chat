import { HomePage } from './../home/home';
import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  emailRegex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public userService: UserService,
    public loadingCtrl: LoadingController) {

      this.signupForm = formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        username: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        email: this.formBuilder.control('', [Validators.compose([
          Validators.required, Validators.pattern(this.emailRegex)
        ])]),
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)])
      })
  }

  onSubmit() {

    let loading: Loading = this.showLoading();

    this.authService.createAuthUser(
      this.signupForm.get('email').value,
      this.signupForm.get('password').value)
      .then( (authState) => {
        this.userService.create(new User(
          this.signupForm.get('name').value,
          this.signupForm.get('username').value,
          this.signupForm.get('email').value,
          authState.uid)
        )})
        .then(() => {
          // show alert after create account
          loading.dismiss();
          this.navCtrl.setRoot(HomePage)


        }).catch(error => {
          let alert = this.alertCtrl.create({
            title: 'Create Account Error',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

}
