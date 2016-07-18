import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav, Storage, SqlStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {CityListPage} from './pages/city-list/city-list';
import {ContactPage} from './pages/contact/contact';
import {ClausePage} from './pages/clause/clause';
@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  stroage: Storage;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '晴宝', component: HelloIonicPage },
      { title: '城市', component: CityListPage },
      { title: '反馈', component: ContactPage },
      { title: '许可条款', component: ClausePage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
/*      this.stroage = new Storage(SqlStorage, {name: 'sunnybaby'});
      this.stroage.query('CREATE TABLE IF NOT EXISTS sunnybaby (id INTEGER PRIMARY KRY AUTOINCREMENT, city TEXT, weather TEXT, temperature TEXT, pic TEXT)')
      .then((data) => {
        console.log('SUCCESS ->' + JSON.stringify(data.res));
      }, (error) => {
        console.log('ERROR1 ->' + JSON.stringify(error.err));
      });

      this.stroage.query('INSERT INTO sunnybaby (city, weather, temperature, pic) VALUES ("六安", "晴天","10℃", "http://qiniu.ursb.me/image/city-3.png")')
      .then((data) => {
        console.log('SUCCESS ->' + data.res);
      }, (error) => {
        console.log('ERROR1 ->' + JSON.stringify(error.err));
      });
    */
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
