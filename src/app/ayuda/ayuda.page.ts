import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Macros } from "../modelos/macros";
import { FavoritesService } from "../favorites/favorites.service";
import { AngularFireAuth } from "angularfire2/auth";
import { map } from "rxjs/operators";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-ayuda",
  templateUrl: "./ayuda.page.html",
  styleUrls: ["./ayuda.page.scss"]
})
export class AyudaPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Macros[]>;
  uid;

  constructor(
    _favoritesService: FavoritesService,
    private ofauth: AngularFireAuth,
    public navCtrl: NavController
  ) {
    this.favoritesService = _favoritesService;
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;

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
    });
  }
}
