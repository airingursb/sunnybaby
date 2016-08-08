import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {Page, Storage, Toast, Alert, SqlStorage, LocalStorage, Modal, Loading, Platform, NavController, ViewController} from "ionic-angular";
import {SQLite} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/city-list/city-list.html'
})

export class CityListPage {

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
		this.weather.id = 0;
		this.weather.city = "";
		this.weather.wea = "";
		this.weather.temp = "";
		this.weather.pic = "http://qiniu.ursb.me/image/city-1.png";

  	}

	itemSelected(item){


		let confirm = Alert.create({
      		title: '晴宝',
      		message: '你确定要取消关注该城市的天气信息吗？',
			buttons: [
				{
				  	text: '取消',
				},
				{
					text: '确定',
					handler: () => {
						var id = item.id;
						this.local.set('distrct' + id, "");
						this.local.set('weather' + id, "");
						this.local.set('temperature' + id, "");
						this.local.set('picture' + id, "");
						this.local.get('num').then((result) => {
							console.log('num => ' + result);
							this.local.set('num', result --);
							this.num = result;
							this.weathers = [];
							for (var i = 1; i <= result; i++) {

								var city = "";
								var wea = "";
								var temp = "";
								var pic = "";
								var id = 0;

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
									id ++;
									console.log("id => " + id);
									var obj = new Weather(id, city, wea, temp, pic);
									console.log(obj);
									this.weathers.push(obj);
								});
							}
						});

						let toastDelOk = Toast.create({
	                    	message: "删除成功！",
	                    	duration: 2000
	                	});
	                	this.navController.present(toastDelOk);
					}
				}
			]
		});
		this.navController.present(confirm);
	}

	onPageWillEnter() {

        this.weathers = [];

	   	this.local.get('num').then((result) => {
		console.log('num => ' + result);
		this.num = result;

		for (var i = 1; i <= result; i++) {

			var city = "";
			var wea = "";
			var temp = "";
			var pic = "";
			var id = 0;

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
				id ++;
				console.log("id => " + id);
				var obj = new Weather(id, city, wea, temp, pic);
				console.log(obj);
				this.weathers.push(obj);
			});
		}

		});
	}
	
    onPageDidEnter() {
		console.log('weathers => ' + JSON.stringify(this.weathers));
    }
}


class Weather {

	city;
	weather;
	temp;
	pic;
	id;

	constructor(id, city, weather, temp, pic) {
		this.id = id;
		this.city = city;
		this.weather = weather;
		this.temp = temp;
		this.pic = pic;
	}
}