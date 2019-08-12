import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { FavoritesService } from "../favorites/favorites.service";
import { Observable } from "rxjs";
import { Comida } from "../modelos/comida";
import { map } from "rxjs/operators";

@Component({
  selector: "app-calculos",
  templateUrl: "./calculos.page.html",
  styleUrls: ["./calculos.page.scss"]
})
export class CalculosPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Comida[]>;
  uid;
  constructor(
    private ofauth: AngularFireAuth,
    _favoritesService: FavoritesService
  ) {
    this.favoritesService = _favoritesService;
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
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
    });
  }
}
