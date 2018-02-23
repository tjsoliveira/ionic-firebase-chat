import { HomePage } from './../home/home';
import { UserProvider } from './../../providers/user/user.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/users.model';

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
    public userProvider: UserProvider) {

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
    this.userProvider.create(new User(
      this.signupForm.get('name').value,
      this.signupForm.get('username').value,
      this.signupForm.get('email').value,
      this.signupForm.get('password').value)).then(() => {

        // show alert after create account
        let alert = this.alertCtrl.create({
          title: 'Account Created',
          subTitle: 'The account was created. Please login!',
          buttons: [{
            text: 'OK',
            handler: data => {
              this.navCtrl.setRoot(HomePage)
            }
          }]
        });
        alert.present();

      }).catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Create Account Error',
          subTitle: error,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
