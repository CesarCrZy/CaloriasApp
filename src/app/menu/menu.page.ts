import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { FavoritesService } from "../favorites/favorites.service";
import { Comida } from "../modelos/comida";
import { Observable } from "rxjs";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<Comida[]>;

  //Array de objetos con las paginas
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
  constructor(
    private routers: Router,
    private ofauth: AngularFireAuth,
    public navCtrl: NavController
  ) {
    this.routers.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

  //Al cerrar sesion redirige al login
  salir() {
    this.routers.navigateByUrl("/login");
  }
}
