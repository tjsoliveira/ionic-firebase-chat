import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthService } from './../providers/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { UserService } from './../providers/user.service';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCTvjyX4u4Nfy88Culd0TuvcOfc_QxENCU",
  authDomain: "ionic-firebase-chat-c437c.firebaseapp.com",
  databaseURL: "https://ionic-firebase-chat-c437c.firebaseio.com",
  projectId: "ionic-firebase-chat-c437c",
  storageBucket: "ionic-firebase-chat-c437c.appspot.com",
  messagingSenderId: "430819761059"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFirestore,
    AuthService,
    UserService
  ]
})
export class AppModule {}
