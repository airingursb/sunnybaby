import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {Page, Storage, Toast, Alert, SqlStorage, LocalStorage, Modal, Loading, Platform, NavController, ViewController} from "ionic-angular";
import {SQLite} from 'ionic-native';
import {EmailComposer} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/contact/contact.html'
})

export class ContactPage {

  	constructor(private http: Http,
  		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform) {
  	}

  	sendMail() {
  		EmailComposer.isAvailable().then((available) =>{
			if(available) {
			   //Now we know we can send
			}
		});

		let email = {
			to: 'airing@ursb.me',
			// cc: 'erika@mustermann.de',
			// bcc: ['john@doe.com', 'jane@doe.com'],
			attachments: [
			// 'file://img/logo.png',
			// 'res://icon.png',
			// 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
			// 'file://README.pdf'
			],
			subject: 'Sunnybaby晴宝 反馈',
			body: '请在正文输入您的反馈！谢谢。',
			isHtml: true
		};

		// Send a text message using default options
		EmailComposer.open(email);
  	}

}