import { BiensService } from './../services/biens.service';
import { Biens } from './../models/biens';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '../services/compte.service';
import Stepper from 'bs-stepper'
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import axios from 'axios';
declare var $;

@Component({
  selector: 'app-ajouter-etablissement',
  templateUrl: './ajouter-etablissement.component.html',
  styleUrls: ['./ajouter-etablissement.component.css']
})
export class AjouterEtablissementComponent implements OnInit {

  medias: FormGroup;
  biens: FormGroup;
  stepper;
  selectedFile: File;
  submitted = false;
  submit = false;
  bien: Biens;
  tableauCompte: [];
  tableauNomCompte;

  bienObj = {
    titre: 'titre',
    coordonnee: null,
    ville: 'lome',
    quartier: 'tokoin',
    liaison: 'r',
    dimension: 44,
    description: 'description',
    prix: 20000,
    type: 'V',
    categorie: 'L',
    agence: 1,
    typeTmg: '',
    etat: null,
    estvalide: true
  }
  baseUrl = environment.apiUrl;


  mediaObj: {
    Titre: string,
    Type: any,
    Fichier: string
    Bien_decrit: any
  }

  headersOption: any;


  constructor(
    private bienS: BiensService,
    private compteS: CompteService,
    private fb: FormBuilder,
    private http: HttpClient,
    // private axios: AxiosInstance
  ) {
    this.getCompte();
  }
  //  ${JSON.parse(localStorage.getItem('currentUser')).token}
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.headersOption = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token 1edf79927e04a1d016a303aae85a2571dd0abe65`
      });
    }
    $(document).ready(() => {
      this.stepper = new Stepper($('.bs-stepper')[0], {
        linear: true,
        animation: false,
        selectors: {
          steps: '.step',
          trigger: '.step-trigger',
          stepper: '.bs-stepper'
        }
      })
      document.getElementById('stepper')
        .addEventListener('show.bs-stepper', (event: any) => {
          this.submit = 2 === event.detail.indexStep;
        })
    })

    this.controle();
    this.controleBien();
    this.sendMedias();
    this.sendBien();
  }

  controleBien() {
    this.biens = this.fb.group({
      titre: ['', Validators.required],
      coordonnee: ['', Validators.required],
      ville: ['', Validators.required],
      quartier: ['', Validators.required],
      liaison: ['', Validators.required],
      dimension: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      type: ['', Validators.required],
      categorie: ['', Validators.required],
      agence: ['', Validators.required],
    });
  }
  controle() {
    this.medias = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      liaison: ['', Validators.required]
    });
  }

  get fc() {
    return this.medias.controls;
  }
  processFile(event) {
    const file = event.target.files[0];
    console.log(file)
    // console.log('Les infos avant', this.selectedFile);
    this.addGallery(file)
    //   _id:'',
    //   imageUrl: 'string',
    //   imageTitle: 'string',
    //   imageDesc: 'string',
    //   uploaded: new Date(),
    // }, this.selectedFile[0],)
  }

  sendMedias() {
    this.submitted = true;
    const titre = this.medias.get('titre').value;
    const type = this.medias.get('type').value;
    const liaison = this.medias.get('liaison').value;
    console.log('Les infos aprés', this.selectedFile);
  }
  sendBien() {
    const titre = this.biens.get('titre').value;
    const coordonnee = this.biens.get('coordonnee').value;
    const ville = this.biens.get('ville').value;
    const quartier = this.biens.get('quartier').value;
    const dimension = this.biens.get('dimension').value;
    const description = this.biens.get('description').value;
    const prix = this.biens.get('prix').value;
    const type = this.biens.get('type').value;
    const categorie = this.biens.get('categorie').value;
    const agence = this.biens.get('agence').value;
    const etat = null;
    const estvalide = true;
    console.log(titre, coordonnee, ville, quartier, dimension, description, prix, type, categorie, etat, estvalide, agence);

    const bien = new Biens(titre, coordonnee, ville, quartier, dimension, description, prix, type, categorie, etat, estvalide, agence);

    this.bienS.createBien(bien).then((res) => {
      // console.log('Bien enrégistré avec succe', res)
    }, (err) => {
      // console.log('Enregistrement erroné', err)
    });



  }

  getCompte() {
    this.compteS.getAllcompte().subscribe(res => {
      console.log('compte :', res);
      this.tableauCompte = Object.values(res)[3];
      // console.log('compte tableau:', this.tableauCompte);
      for (res in this.tableauCompte) {
        this.tableauNomCompte = this.tableauCompte[res];
        // console.log('compte tableau for:', this.tableauNomCompte.nom);
      }
    });
  }

  onNext() {
    this.stepper.next();
  }
  onPrevious() {
    this.stepper.previous();
  }
  onSubmit() {
    // console.log('submit', this.bienObj);
    // creation de bien
    // this.bienS.createBien(this.bienObj).then((res) => {
    //   console.log('Bien enrégistré avec succe', res)
    // }, (err) => {
    //   console.log('Enregistrement erroné', err)
    // });
    const bien = new Biens(
      this.bienObj.titre,
      parseInt(this.bienObj.coordonnee, 10),
      this.bienObj.ville,
      this.bienObj.quartier,
      this.bienObj.dimension,
      this.bienObj.description,
      this.bienObj.prix,
      this.bienObj.type,
      this.bienObj.categorie,
      this.bienObj.etat,
      this.bienObj.estvalide,
      this.bienObj.agence);


    const bienObj = {
      "titre": this.bienObj.titre,
      "localisation": null,
      "ville": this.bienObj.ville,
      "quartier": this.bienObj.quartier,
      "dimensions": this.bienObj.dimension,
      "description": this.bienObj.description,
      "prix": this.bienObj.prix,
      "type": this.bienObj.type,
      "categorie": this.bienObj.categorie,
      "etat": this.bienObj.etat,
      "est_valide": true,
      "agence": this.bienObj.agence
      // "agence": "19",
      // "categorie": "L",
      // "description": "description",
      // "dimensions": 44,
      // "est_valide": true,
      // "etat": null,
      // "localisation": null,
      // "prix": 20000,
      // "quartier": "tokoin",
      // "titre": "titre",
      // "type": "V",
      // "ville": "lome"
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token 1edf79927e04a1d016a303aae85a2571dd0abe65'
    })

    // console.log('bien obj', bienObj);
    // ${this.baseUrl}bien
    this.http.post(`https://flatnyeapi.nunyalabprojets.com/api/bien/`, JSON.stringify({
      "agence": "19",
      "categorie": "L",
      "description": "description",
      "dimensions": 44,
      "est_valide": true,
      "etat": null,
      "localisation": null,
      "prix": 20000,
      "quartier": "tokoin",
      "titre": "titre",
      "type": "V",
      "ville": "lome"
    })).toPromise()
      .then((obj: any) => {
        console.log('obj bien save', obj);
      }).catch(err => console.log('err bien', err))
  }

  saveBien() {
    // var axios = require('axios');
    var data = JSON.stringify({
      "titre": this.bienObj.titre,
      "localisation": null,
      "ville": this.bienObj.ville,
      "quartier": this.bienObj.quartier,
      "dimensions": this.bienObj.dimension,
      "description": this.bienObj.description,
      "prix": this.bienObj.prix,
      "type": this.bienObj.type,
      "categorie": this.bienObj.categorie,
      "etat": this.bienObj.etat,
      "est_valide": true,
      "agence": this.bienObj.agence
    })
    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 1edf79927e04a1d016a303aae85a2571dd0abe65'
      },
    };

    this.http.post('https://flatnyeapi.nunyalabprojets.com/api/bien/', data, config)
      .toPromise()
      .then(res => {
        console.log('nez new ', res)
      }).catch(err => {
        console.log('error new', err)
      })
  }

  addGallery(file: File): Promise<any> {
    const header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Token 1edf79927e04a1d016a303aae85a2571dd0abe65'
      },
    );
    const params = new HttpParams();

    const options = {
      params,
      reportProgress: true,
      headers: header
    };
    const req = new HttpRequest('POST', 'https://flatnyeapi.nunyalabprojets.com/api/media/', {
      "titre": "",
      "type": 'P',
      "fichier": file, // JSON.stringify(file),
      "bien_decrit": null,
      "article_media": null
  }
    , options);
    return this.http.request(req).toPromise().then(
      res => {
        console.log('uploaded', res)
      }).catch(err => {
        console.log('err upload', err);
      })
  }

}

export class Gallery {
  _id: string;
  imageUrl: string;
  imageTitle: string;
  imageDesc: string;
  uploaded: Date;
}