import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Index',
      url: '/folder/Index',
      icon: 'mail'
    }
  ];
  public labels = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const options: PushOptions = {
        android: {},
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      }

      //var obj = { name: "John", age: 30, city: "New York" };
      //this.alert( "hola", JSON.stringify(obj) );

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => {
        this.alert( 'hola', JSON.stringify(notification) );
      });

      pushObject.on('registration').subscribe((registration: any) => {
        this.alert( 'registration', JSON.stringify(registration) );
      });

      pushObject.on('error').subscribe((error: any) => {
        this.alert( 'error', JSON.stringify(error) );
      });

      // pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
      // pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
      // pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async alert(title: string, message: string) {
    const alert = await
    this.alertCtrl.create({
      header: '' + title,
      message: '' + message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //
          }
        }
      ],
    });
    await
    alert.present();
    let result = await
    alert.onDidDismiss();
  }

}
