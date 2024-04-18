import { Biens } from './../models/biens';
import { BiensService } from './../services/biens.service';
import { Component, OnInit } from '@angular/core';
import { MediasService } from '../services/medias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tabBien: any = [];
  tabMedias: any = [];
  tableau: any;
  tablem: any;
  image: any;
  myid: any;
  contenu: any;
  constructor(private serviceB: BiensService, private serviceM: MediasService) {
    this.getAllBie();
    // this.getBienById(5)
  }

  ngOnInit(): void {
    console.log('home component');

  }


  getAllBie() {
    this.serviceB.getAllBien().subscribe((res: any) => {
      this.tabBien = res && res.results ? res.results : [];
      // console.log('tabbien', this.tabBien)
      // this.tabBien = Object.values(res)[3];
      // tslint:disable-next-line: prefer-for-of
      for (let _i = 0; _i < this.tabBien.length; _i++) {
        this.tableau = this.tabBien[_i].id;
      }      
    });

    this.serviceM.getAllMedias().subscribe((donne: any) => {
      // console.log(' donnée du medias objet :', donne);
      this.tabMedias = donne && donne.results ? [donne.results[0]] : [];
      // this.tabMedias = Object.values(donne)[3];
      console.log('données du tableau media :', this.tabMedias);
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.tabMedias.length; i++) {
        this.tablem = this.tabMedias[i].id;
      }
    });
  }
  like(item) {
    console.log('i like ', item);
  }

}
