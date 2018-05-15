import { Injectable } from '@angular/core';
import { ScannData } from "../../models/scan-data.model";
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ModalController, Platform, ToastController } from "ionic-angular"
import { MapaPage } from "../../pages/index.paginas";

//plugins
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class HistoricoProvider {
  private _historial: ScannData[] = [];

  constructor(private iab: InAppBrowser, private modalCtrl: ModalController, private contacts: Contacts,
  private platform: Platform, private toastCtrl: ToastController,
  private emailComposer: EmailComposer) {}

  agregarHistorial(texto:string){
    let data = new ScannData(texto);
    this._historial.unshift(data);

    console.log(this._historial);
    
    this.abrirScan(0);
  }

  abrirScan(index:number){
    let scannData  = this._historial[index];
    console.log(scannData);

    switch( scannData.tipo){
      case "http":
        this.iab.create(scannData.info, "_system");
        break;
      case 'mapa':
        this.modalCtrl.create(MapaPage, {coords: scannData.info}).present();
        break;
      case 'contacto':
        this.crearContacto(scannData.info);
        break;
      case 'email':
        this.enviarCorreo(scannData.info);
        break;
      default:
        console.error("tipo no soportado");
          
    }
  }

  cargarHistorial(){ 
    return this._historial;
  }

  crearContacto(texto:string){
    if(!this.platform.is('cordova')){
      console.warn("Estoy en computadora, no puedo crear el contacto");
      return;
    }

    let contacto:any = this.parse_vcard(texto);
    let nombre = contacto['fn'];
    let telefono = contacto.tel[0].value[0];
    
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', telefono)];
    

    contact.save().then(
      () => this.toastCtrl.create({message:'Se registro el contacto exitosamente!',duration:3000}).present(),
      (error: any) => this.toastCtrl.create({message:'Error al registrar el contacto!',duration:3000}).present()
    );
  }

  enviarCorreo(input:string){
    let email_object:EMAIL = this.parse_email(input);
    
    let email = {
      to: email_object.email,
      subject: email_object.subject,
      body: email_object.body,
      isHtml: true,
    };
    
    this.emailComposer.open(email);


  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  };

  private parse_email( input:string):EMAIL{
    let email =  input.substring(1, input.indexOf(';SUB:')).replace('ATMSG:TO:',"");
    let subject = input.substring(input.indexOf(';SUB:'), input.indexOf(";BODY:")).replace(';SUB:',"");
    let body = input.substring(input.indexOf(';BODY:'), input.indexOf(";;")).replace(';BODY:',"");    
    console.log(email, subject, body);
    
    let email_object: EMAIL = {
      email: email,
      subject: subject,
      body: body
    }

    return email_object;
  }

}

interface EMAIL{
  email: string,
  subject: string,
  body: string
}
