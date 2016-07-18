import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {Page, Storage, Toast, Alert, SqlStorage, LocalStorage, Modal, Loading, Platform, NavController, ViewController} from "ionic-angular";
import {SQLite} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/clause/clause.html'
})

export class ClausePage {

  	constructor(private http: Http,
  		private navController: NavController,
  		private viewController: ViewController,
  		private platform: Platform) {
  	}

}