import { Component, OnInit } from '@angular/core';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFireAuth } from 'angularfire2/auth';
import { File } from '@ionic-native/file/ngx';
import { Comida } from '../modelos/comida';
import { Observable } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';
import { NavController, ToastController } from '@ionic/angular';
import {map} from 'rxjs/operators';
import { UserInfo } from '../modelos/info';
import { Macros } from '../modelos/macros';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<UserInfo[]>;
  favoriteList1: Observable<Macros[]>;
  favoriteList2: Observable<Macros[]>;

  uid;
  constructor(private file: File, private ofauth: AngularFireAuth,  _favoritesService: FavoritesService) {
    this.favoritesService = _favoritesService;
   }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        this.favoritesList$ = this.favoritesService
          .GetUserInfo(this.uid)
          .snapshotChanges().pipe(map(
            changes => {
            return changes.map(c => ({
             key: c.payload.key, ...c.payload.val()
          }));
         }
       ));

       this.favoriteList1 = this.favoritesService
          .GetRecomdacion(this.uid)
          .snapshotChanges().pipe(map(
            changes => {
            return changes.map(c => ({
             key: c.payload.key, ...c.payload.val()
          }));
         }
       ));


       this.favoriteList2 = this.favoritesService
          .GetIngesta(this.uid)
          .snapshotChanges().pipe(map(
            changes => {
            return changes.map(c => ({
             key: c.payload.key, ...c.payload.val()
          }));
         }
       ));


      }
    });
  }
  makePdf() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
    content: [
    {
    columns: [
    {
    
    },
    [
    { text: '' , style: 'header' },
    {text: 'Ya estoy hasta la puta madre', style: 'sub_header'}
    ]
    ]
    }
    ],
    styles: {
    header: {
    bold: true,
    fontSize: 20,
    alignment: 'right'
    },
    sub_header: {
    fontSize: 18,
    alignment: 'right'
    },
    url: {
    fontSize: 16,
    alignment: 'right'
    }
    },
    pageSize: 'A4',
    pageOrientation: 'portrait'
    };
    pdfmake.createPdf(docDefinition).download();
    }

}
