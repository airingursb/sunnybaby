import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {Page, Storage, SqlStorage, LocalStorage, Loading, Modal, Platform, NavController, ViewController, Toast} from "ionic-angular";
import {SQLite} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/hello-ionic/add-city.html'
})

export class AddCityPage {

	city;
	num;
	local: Storage;

	constructor(private http: Http,
		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform) {

		this.local = new Storage(LocalStorage);
		
		this.city = {};
		this.city.cityname = "";
	}

	dismiss() {
		this.viewController.dismiss();
	}

	onPageWillEnter() {
		this.local.get('num').then((result) => {
     		console.log("num => " + result);
     		this.num = result;
     	});
	}

	register() {
		this.http.get("http://apicloud.mob.com/v1/weather/query?key=f1fb6815bbb6&city=" + this.city.cityname)
	    	.subscribe(data => {
	    		console.log(data.json());
	    		if (data.json().retCode == "200") {
	    			this.num++;
	    			var url = "http://qiniu.ursb.me/image/city-" + Math.floor(Math.random() * 4) + ".png";
	    			console.log('url => ' + url);
	    			this.local.set('num', this.num);
	    			this.local.set('distrct' + this.num, data.json().result[0].distrct);
	         		this.local.set('weather' + this.num, data.json().result[0].weather);
	         		this.local.set('temperature' + this.num, data.json().result[0].temperature);
	    			this.local.set('picture' + this.num, url);
	    			let toastAddOk = Toast.create({
                    	message: "添加成功！",
                    	duration: 2000
                	});
                	this.navController.present(toastAddOk);
	    		} else {
	    			let toastAddFailed = Toast.create({
                    	message: "对不起，没有该城市的数据。",
                    	duration: 2000
                	});
                	this.navController.present(toastAddFailed);
	    		}
	    	}, error => {
	      		console.log("400");
	    }); 
	}
}
