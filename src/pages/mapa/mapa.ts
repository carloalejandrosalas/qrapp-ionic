import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  lat: number;
  lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    let coordenadas = this.navParams.get('coords').split(",");
  
    this.lat = parseFloat(coordenadas[0].replace('geo:',""));
    this.lng = parseFloat(coordenadas[1]);
  }
}
