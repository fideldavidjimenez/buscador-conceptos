import { Component, OnInit } from '@angular/core';
import { ConceptoJuridico } from 'src/app/model/concepto-juridico.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

conceptos: ConceptoJuridico[] = [];

  ngOnInit(): void {
    this.conceptos = [
      {
        anoRadicado: 2019,
        numeroRadicado: 123456,
        fecha: new Date(),
        area: "Desarrollo con Fidel",
        tema: "Uso de interface",
        subtema: "Iteración con interface"
      },
      {
        anoRadicado: 2019,
        numeroRadicado: 123456,
        fecha: new Date(),
        area: "Desarrollo con Fidel",
        tema: "Uso de interface",
        subtema: "Iteración con interface"
      },
      {
        anoRadicado: 2019,
        numeroRadicado: 123456,
        fecha: new Date(),
        area: "Desarrollo con Fidel",
        tema: "Uso de interface",
        subtema: "Iteración con interface"
      },
      {
        anoRadicado: 2019,
        numeroRadicado: 123456,
        fecha: new Date(),
        area: "Desarrollo con Fidel",
        tema: "Uso de interface",
        subtema: "Iteración con interface"
      }
    ];
  }

}
