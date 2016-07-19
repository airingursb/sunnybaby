import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {Page, Storage, SqlStorage, LocalStorage, Modal, Loading, Platform, NavController, ViewController} from "ionic-angular";
import {AddCityPage} from './add-city';
import {SQLite} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})

export class HelloIonicPage {

	num;
	weather;
	weathers;
	local: Storage;
	sqlStorage: SqlStorage;
	
  	constructor(private http: Http,
  		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform) {

  		this.local = new Storage(LocalStorage);

		this.weathers = [];
		this.weather = {};
		this.weather.city = "";
		this.weather.wea = "";
		this.weather.temp = "";
		this.weather.pic = "http://qiniu.ursb.me/image/city-1.png";
  	}

  	onPageWillEnter() {

		this.local.get('num').then((result) => {
			console.log('num => ' + result);
			this.num = result;
			
			for (var i = 1; i <= result; i++) {

				var city = "";
				var wea = "";
				var temp = "";
				var pic = "";

				this.local.get('distrct' + i).then((result) => {
					city = result;
					console.log(city);
				});
				this.local.get('weather' + i).then((result) => {
					console.log(result);
					wea = result;
				});
				this.local.get('temperature' + i).then((result) => {
					console.log(result);
					temp = result;
				});
				this.local.get('picture' + i).then((result) => {
					console.log(result);
					pic = result;
					var obj = new Weather(city, wea, temp, pic);
					console.log(obj);
					this.weathers.push(obj);
				});
			}
		
		});

	}


    onPageDidEnter() {
		console.log('weathers => ' + JSON.stringify(this.weathers));
    }


    addCity() {
     	this.navController.push(AddCityPage);
    }

}

class Weather {

	city;
	weather;
	temp;
	pic;

	constructor(city, weather, temp, pic) {
		this.city = city;
		this.weather = weather;
		this.temp = temp;
		this.pic = pic;
	}
}
