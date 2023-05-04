import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  years: number[] = [];
  temas: string[] = [];
  areas: string[] = [];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder){

    this.form = this.formBuilder.group({
      ano: ['', [Validators.required]],
      numero: [''],
      tema: [''],
      area: [''],
      subtema: [''],
      fechaInicial: [''],
      fechaFinal: ['']
    });

  }

  ngOnInit(): void {

    this.years = [
      2010, 2011, 2012
    ];

    this.areas = [
      'Area 1','Area 2','Area 3','Area 4','Area 5','Area 6' 
    ];
    
    this.temas = [
      'Tema 1','Tema 2','Tema 3','Tema 4','Tema 5','Tema 6' 
    ];

  }

  public prueba(x : any){
    console.log(this.form.value);
    console.log(this.form.valid);
    console.log(x);
  }

}
