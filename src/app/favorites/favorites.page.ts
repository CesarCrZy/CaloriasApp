import { Component, OnInit } from "@angular/core";
import { FavoritesService } from "./favorites.service";
import { Comida } from "../modelos/comida";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import {
  ToastController,
  NavController,
  ModalController
} from "@ionic/angular";
import { RouterEvent } from "@angular/router";
import { Observable } from "rxjs";
import { FavoritesModalPage } from "../favorites-modal/favorites-modal.page";
import { AngularFireDatabase } from "angularfire2/database";
import { Table } from "../modelos/table";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.page.html",
  styleUrls: ["./favorites.page.scss"]
})
export class FavoritesPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Comida[]>;
  comida = {} as Comida;
  table = {} as Table;
  public totalcalorias = 0;
  public totalprote = 0;
  public totalgrasas = 0;
  public totalcarbos = 0;
  uid: string;
  calo;
  pages = [
    {
      title: "Ingesta",
      url: "../favorites"
    }
  ];

  selectedPath = "";
  constructor(
    private db: AngularFireDatabase,
    private ofauth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    _favoritesService: FavoritesService
  ) {
    this.favoritesService = _favoritesService;
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        this.comida.uid = data.uid;
      }
      this.favoritesList$ = this.favoritesService
        .GetComidasUser(this.uid)
        .snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val()
            }));
          })
        );
    });
  }

  async OnNew() {
    this.navCtrl.navigateForward("/favorites-modal");
  }

  OnSave(comida: Comida) {
    if (typeof comida.key === "undefined") {
      try {
        this.favoritesService.AddFavoriteAF(comida, this.uid).then(ref => {
          console.log("e");
        });
      } catch (e) {
        console.log("error");
      }
    } else {
      this.favoritesService
        .UpdateFavoriteAF(comida.key, comida)
        .then(ref => {});
    }
  }
}
