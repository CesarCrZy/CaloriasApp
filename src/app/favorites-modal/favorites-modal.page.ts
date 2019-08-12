import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, NavParams } from "@ionic/angular";
import { FavoritesService } from "../favorites/favorites.service";
import { Comida } from "../modelos/comida";
import { AngularFireAuth } from "angularfire2/auth";
import { map } from "rxjs/operators";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs";
import { Macros } from "../modelos/macros";
import { Table } from "../modelos/table";
import { convertToView } from "@ionic/core/dist/types/components/nav/view-controller";

@Component({
  selector: "app-favorites-modal",
  templateUrl: "./favorites-modal.page.html",
  styleUrls: ["./favorites-modal.page.scss"]
})
export class FavoritesModalPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Comida[]>;
  public totalcalorias = 0;
  public totalprote = 0;
  public totalgrasas = 0;
  public totalcarbos = 0;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  valores: Table[] = [];

  comida = {} as Comida;
  table = {} as Table;
  ingesta;
  in = [];
  nombre: string;
  public uid: string;
  calorias: number;
  public key;

  constructor(
    private db: AngularFireDatabase,
    private ofauth: AngularFireAuth,
    public navCtrl: NavController,
    private modalctrl: ModalController,
    private _favoritesService: FavoritesService
  ) {
    this.favoritesService = _favoritesService;
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.comida.uid = data.uid;
        this.uid = data.uid;
      }
    });

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
  }

  OnSave(comida: Comida) {
    this.db.database
      .ref("Usuarios/")
      .child(this.uid)
      .child("/ingesta")
      .once("value")
      .then(function(snapshot) {
        var calorias = snapshot.val();

        for (key in calorias) {
          console.log(key);
        }
      });
    var arrcal = [];
    var arrprote = [];
    var arrgrasas = [];
    var arrcarbos = [];
    if (typeof comida.key === "undefined") {
      var key;
      this.favoritesService.AddFavoriteAF(comida, this.uid);
      this.favoritesList$.subscribe(val => {
        this.db.database
          .ref("Usuarios/")
          .child(this.uid)
          .child("/ingesta")
          .once("value")
          .then(function(snapshot) {
            var calorias = snapshot.val();

            for (key in calorias) {
              console.log(key);
            }
          });
        arrcal = val;
        arrprote = val;
        arrgrasas = val;
        arrcarbos = val;
        for (var i = 0; i < arrcal.length; i++) {
          this.totalcalorias += arrcal[i]["Calorias"];
        }
        for (var i = 0; i < arrprote.length; i++) {
          this.totalprote += parseInt(arrprote[i]["proteinas"]);
        }
        for (var i = 0; i < arrgrasas.length; i++) {
          this.totalgrasas += parseInt(arrgrasas[i]["grasas"]);
        }
        for (var i = 0; i < arrcarbos.length; i++) {
          this.totalcarbos += parseInt(arrcarbos[i]["carbohidratos"]);
        }
        this.table.Calorias = this.totalcalorias;
        this.table.proteinas = this.totalprote;
        this.table.grasas = this.totalgrasas;
        this.table.carbohidratos = this.totalcarbos;
        console.log(arrcal);
        this.favoritesService.UpdateTable(key, this.uid, this.table);
      });
      this.navCtrl.navigateForward("/menu/favorites");
    } else {
      this.favoritesService.UpdateFavoriteAF(comida.key, comida).then(ref => {
        this.navCtrl.navigateForward("/menu");
      });
    }
  }

  OnSave1() {
    this.modalctrl.dismiss();
  }
  OnClose() {
    this.navCtrl.navigateForward("/menu/favorites");
  }
}
