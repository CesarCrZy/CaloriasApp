import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import {
  ToastController,
  NavController,
  ModalController
} from "@ionic/angular";
import { FavoritesService } from "../favorites/favorites.service";
import { Comida } from "../modelos/comida";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FavoritesModalPage } from "../favorites-modal/favorites-modal.page";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Comida[]>;

  pages = [
    {
      title: "Objetivo de Macros",
      url: "/menu/ingesta-recom",
      icon: "../../assets/imgs/objetivo.svg"
    },
    {
      title: "Insertar tus Comidas",
      url: "/menu/favorites",
      icon: "../../assets/imgs/ensalada.svg"
    },
    {
      title: "Reporte",
      url: "/menu/reporte",
      icon: "../../assets/imgs/reporte.svg"
    },
    {
      title: "Ayuda",
      url: "/menu/ayuda",
      icon: "../../assets/imgs/ayuda.svg"
    }
  ];

  selectedPath = "";
  constructor(private routers: Router) {
    this.routers.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}
}
