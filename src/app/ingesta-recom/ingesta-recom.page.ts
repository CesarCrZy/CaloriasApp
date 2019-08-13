import { Component, OnInit } from "@angular/core";
import { FavoritesService } from "../favorites/favorites.service";
import { Observable } from "rxjs";
import { Comida } from "../modelos/comida";
import { NavController, ModalController } from "@ionic/angular";
import { AngularFireAuth } from "angularfire2/auth";
import { map } from "rxjs/operators";
import { UserInfoBD } from "../modelos/userinfo";
import { Macros } from "../modelos/macros";
import { Table } from "../modelos/table";
import * as $ from "jquery";
//import {$} from '../../assets/jquery-3.4.1';

@Component({
  selector: "app-ingesta-recom",
  templateUrl: "./ingesta-recom.page.html",
  styleUrls: ["./ingesta-recom.page.scss"]
})
export class IngestaRecomPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Macros[]>;
  favoritesListIngesta: Observable<Table[]>;
  comida = {} as Comida;
  uid: string;
  public totalcalorias = 0;
  public totalprote = 0;
  public totalgrasas = 0;
  public totalcarbos = 0;
  public calo = 0;
  public prote = 0;
  public grasas = 0;
  public carbos = 0;

  constructor(
    private ofauth: AngularFireAuth,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    _favoritesService: FavoritesService
  ) {
    this.favoritesService = _favoritesService;
    this.ofauth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        this.comida.uid = data.uid;
      }
    });
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        this.comida.uid = data.uid;

        this.favoritesList$ = this.favoritesService
          .GetRecomdacion(this.uid)
          .snapshotChanges()
          .pipe(
            map(changes => {
              return changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val()
              }));
            })
          );
        this.favoritesList$.subscribe(val => {
          console.log(val);
          if (val.length == 0) {
            this.navCtrl.navigateForward("/register-info");
          }
        });
      }

      var cal = [];
      var prote = [];
      var grasas = [];
      var carbos = [];
      var callow = 0;
      var calhigh = 0;
      var protelow = 0;
      var protehigh = 0;
      var grasaslow = 0;
      var grasashigh = 0;
      var carbolow = 0;
      var carbohigh = 0;
      this.favoritesList$ = this.favoritesService
        .GetRecomdacion(this.uid)
        .snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val()
            }));
          })
        );
      this.favoritesList$.subscribe(val => {
        cal = val;
        prote = val;
        grasas = val;
        carbos = val;
        for (var i = 0; i < cal.length; i++) {
          this.calo = cal[i]["Calorias"];
          callow = this.calo / 3;
          calhigh = this.calo / 2;
        }
        for (var i = 0; i < prote.length; i++) {
          this.prote = parseInt(prote[i]["proteinas"]);
          protelow = this.prote / 3;
          protehigh = this.prote / 2;
        }
        for (var i = 0; i < grasas.length; i++) {
          this.grasas = parseInt(grasas[i]["grasas"]);
          grasaslow = this.grasas / 3;
          grasashigh = this.grasas / 2;
        }
        for (var i = 0; i < carbos.length; i++) {
          this.carbos = parseInt(carbos[i]["carbohidratos"]);
          carbolow = this.carbos / 3;
          carbohigh = this.carbos / 2;
        }

        $("#calorias")
          .attr("max", this.calo)
          .attr("optimum", this.calo)
          .attr("low", callow)
          .attr("high", calhigh);
        $("#proteinas")
          .attr("max", this.prote)
          .attr("optimum", this.prote)
          .attr("low", protelow)
          .attr("high", protehigh);

        $("#grasas")
          .attr("max", this.grasas)
          .attr("optimum", this.grasas)
          .attr("low", grasaslow)
          .attr("high", grasashigh);

        $("#carbohidratos")
          .attr("max", this.carbos)
          .attr("optimum", this.carbos)
          .attr("low", carbolow)
          .attr("high", carbohigh);
      });

      //-------------------------------------------------------------------
      this.favoritesListIngesta = this.favoritesService
        .GetIngesta(this.uid)
        .snapshotChanges()
        .pipe(
          map(changes => {
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val()
            }));
          })
        );
      var arrcal = [];
      var arrprote = [];
      var arrgrasas = [];
      var arrcarbos = [];
      this.favoritesListIngesta.subscribe(val => {
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

        $("#calorias").attr("value", this.totalcalorias);
        $("#proteinas").attr("value", this.totalprote);
        $("#grasas").attr("value", this.totalgrasas);
        $("#carbohidratos").attr("value", this.totalcarbos);
      });
    });
  }
}
