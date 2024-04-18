import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-etablissement',
  templateUrl: './home-etablissement.component.html',
  styleUrls: ['./home-etablissement.component.css']
})
export class HomeEtablissementComponent implements OnInit {



  constructor() {}

  mapSaved: boolean = false

  onMapSaved() {
    this.mapSaved = true
  }

  onMapUnSaved() {
    this.mapSaved = false
  }

  ngOnInit(): void {
    console.log('home etablissement');
    
  }

}
