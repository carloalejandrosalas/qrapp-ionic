import { Component } from '@angular/core';
import { HistoricoProvider } from "../../providers/historico/historico";
import { ScannData } from "../../models/scan-data.model";

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {
  private _historial:ScannData[] = [];
  
  constructor(private _historicoService: HistoricoProvider) {
    this.cargarHistorial();
  }

  cargarHistorial(){
    this._historial = this._historicoService.cargarHistorial();
  }

  abrirBusqueda(index:number){
    this._historicoService.abrirScan(index);
  }

}
