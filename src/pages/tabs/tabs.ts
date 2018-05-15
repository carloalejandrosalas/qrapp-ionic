import { Component } from '@angular/core';
import { HomePage, HistorialPage } from "../index.paginas";


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: any = HomePage;
  tab2: any = HistorialPage;
  
  constructor() {}
}
