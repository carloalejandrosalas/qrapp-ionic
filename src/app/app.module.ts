import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//Paginas
import { HomePage, MapaPage, TabsPage, HistorialPage } from '../pages/index.paginas';

//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AgmCoreModule } from '@agm/core';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';


//providers
import { HistoricoProvider } from '../providers/historico/historico';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapaPage,
    TabsPage,
    HistorialPage,
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKUixr9DxMQ27RvRp0nA_yqTq8ADUEgtM'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapaPage,
    TabsPage,
    HistorialPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    HistoricoProvider,
    InAppBrowser,
    Contacts,
    EmailComposer
  ]
})
export class AppModule {}
