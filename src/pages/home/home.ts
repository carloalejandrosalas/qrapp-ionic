import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';

//plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//servicios
import { HistoricoProvider } from "../../providers/historico/historico";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner,
  private toastCtrl: ToastController,private platform: Platform,
  private _historicoService: HistoricoProvider) {

  }

  scan(){
    if(!this.platform.is('cordova')){
      //this._historicoService.agregarHistorial("http://google.com");
      //this._historicoService.agregarHistorial("geo:29.090642,-111.006797");
      /*this._historicoService.agregarHistorial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/
      this._historicoService.agregarHistorial("MATMSG:TO:carlosalas2@gmail.com;SUB:Perro;BODY:Ahh perro traes el omnitrix;;");
      return;
    }

    this.barcodeScanner.scan()
    .then(barcodeData => {
      console.log("result:"+ barcodeData.text);
      console.log("format:"+ barcodeData.format);
      console.log("cancelled:"+ barcodeData.cancelled);

      if(!barcodeData.cancelled && barcodeData.text){
        this._historicoService.agregarHistorial(barcodeData.text);
      }

    })
    .catch(err => {
      this.mostrarToast('Error: '+err);
      console.log('Error', err);
    });

  }


  mostrarToast(mensaje:string){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).present();
  }
}
