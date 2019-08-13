import { Component, OnInit } from "@angular/core";
import { FavoritesService } from "../favorites/favorites.service";
import { UserInfoBD } from "../modelos/userinfo";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { NavController } from "@ionic/angular";
import { Table } from "../modelos/table";
import { UserInfo } from "../modelos/info";
import { Macros } from "../modelos/macros";

@Component({
  selector: "app-register-info",
  templateUrl: "./register-info.page.html",
  styleUrls: ["./register-info.page.scss"]
})

//Se declaran las propiedades de registro del usuario
export class RegisterInfoPage implements OnInit {
  private favoritesService: FavoritesService;

  userInfo = {} as UserInfoBD;

  table = {} as Table;

  info = {} as UserInfo;

  macros: Macros = {
    Calorias: undefined,
    proteinas: undefined,
    grasas: undefined,
    carbohidratos: undefined
  };

  uid;
  email;
  itemSelected: any;
  objSelected: any;
  actividadSelected: any;
  generoText: any;
  objetivoText: any;
  actividadText: any;
  BMR: any;

  genero = [{ text: "Hombre", value: 0 }, { text: "Mujer", value: 1 }];

  objetivo = [
    { text: "Ganar masa muscular", value: 0 },
    { text: "Definicion muscular", value: 1 },
    { text: "Perdida de peso", value: 2 },
    { text: "Mantener el peso", value: 3 }
  ];

  actividad = [
    { text: "Poco o ningun ejercicio", value: 0 },
    { text: "Ejercicio Ligero", value: 1 },
    { text: "Ejercicio Moderado", value: 2 },
    { text: "Ejercicio Fuerte", value: 3 },
    { text: "Ejercicio Muy Fuerte", value: 4 }
  ];

  constructor(
    private _favoritesService: FavoritesService,
    private ofauth: AngularFireAuth,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.favoritesService = _favoritesService;
  }

  //Se obtiene el genero del usuario
  getGenero(genero: string) {
    console.log(genero);
    this.generoText = genero;
    this.userInfo.genero = genero;
  }

  //Se obtiene el objetivo del usuario
  getObjetivo(objetivo: string) {
    console.log(objetivo);
    this.objetivoText = objetivo;
    this.userInfo.objetivo = objetivo;
  }

  //Se obtiene el nivel de actividad fisica del usuario
  getActividad(actividad: string) {
    console.log(actividad);
    this.actividadText = actividad;
    this.userInfo.actividad = actividad;
  }

  //Se insertan las propiedades que ingresa el usuario en la base de datos
  Insertar(userInfo: UserInfoBD, table: Table, macros: Macros) {
    userInfo.email = this.email;
    this.userInfo.email = this.email;
    console.log(userInfo.key);
    if (userInfo.genero === "Hombre") {
      this.BMR =
        5 + 10 * userInfo.peso + 6.25 * userInfo.altura - 5 * userInfo.edad;
      console.log(this.BMR);
      if (userInfo.actividad == "Poco o ningun ejercicio") {
        this.macros.Calorias = Math.round(this.BMR * 1.2);
      } else if (userInfo.actividad == "Ejercicio Ligero") {
        this.macros.Calorias = Math.round(this.BMR * 1.375);
      } else if (userInfo.actividad == "Ejercicio Moderado") {
        this.macros.Calorias = Math.round(this.BMR * 1.55);
      } else if (userInfo.actividad == "Ejercicio Fuerte") {
        this.macros.Calorias = Math.round(this.BMR * 1.725);
      } else if (userInfo.actividad == "Ejercicio Muy Fuerte") {
        this.macros.Calorias = Math.round(this.BMR * 1.9);
      }
      if (userInfo.objetivo == "Ganar masa muscular") {
        this.macros.proteinas = Math.round(userInfo.peso * 2.4);
        this.macros.grasas = Math.round(userInfo.peso * 1.2);
        this.macros.carbohidratos = Math.round(
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
            4
        );
        console.log(this.macros.proteinas);
        console.log(this.macros.grasas);
        console.log(this.macros.carbohidratos);
      } else if (userInfo.objetivo == "Perdida de peso") {
        this.macros.proteinas = userInfo.peso * 1.7;
        this.macros.grasas = userInfo.peso * 0.7;
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
      } else if (userInfo.objetivo == "Definicion muscular") {
        this.macros.proteinas = userInfo.peso * 1.8;
        this.macros.grasas = userInfo.peso * 0.7;
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
      } else if (userInfo.objetivo == "Mantener el peso") {
        this.macros.proteinas = userInfo.peso * 1.8;
        this.macros.grasas = userInfo.peso * 0.9;
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
      }
      console.log(this.macros.Calorias);
    } else if (userInfo.genero === "Mujer") {
      this.BMR =
        10 * userInfo.peso + 6.25 * userInfo.altura - 5 * userInfo.edad - 161;
      console.log(this.BMR);
      if (userInfo.actividad == "Poco o ningun ejercicio") {
        this.macros.Calorias = this.BMR * 1.2;
      } else if (userInfo.actividad == "Ejercicio Ligero") {
        this.macros.Calorias = this.BMR * 1.375;
      } else if (userInfo.actividad == "Ejercicio Moderado") {
        this.macros.Calorias = this.BMR * 1.55;
      } else if (userInfo.actividad == "Ejercicio Fuerte") {
        this.macros.Calorias = this.BMR * 1.725;
      } else if (userInfo.actividad == "Ejercicio Muy Fuerte") {
        this.macros.Calorias = this.BMR * 1.9;
      }
      if (userInfo.objetivo == "Ganar masa muscular") {
        this.macros.proteinas = userInfo.peso * 2.4;
        this.macros.grasas = userInfo.peso * 1.2;
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
        console.log(this.macros.proteinas);
        console.log(this.macros.grasas);
        console.log(this.macros.carbohidratos);
      } else if (userInfo.objetivo == "Perdida de peso") {
        this.macros.proteinas = userInfo.peso * 1.7;
        this.macros.grasas = userInfo.peso * 0.7;
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
      } else if (userInfo.objetivo == "Definicion muscular") {
        this.macros.proteinas = userInfo.peso * 1.8;
        this.macros.grasas = userInfo.peso * 0.7;
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
      } else if (userInfo.objetivo == "Mantener el peso") {
        this.macros.proteinas = userInfo.peso * 1.8;
        this.macros.grasas = Math.round(userInfo.peso * 0.9);
        this.macros.carbohidratos =
          (this.macros.Calorias -
            (this.macros.proteinas * 4 + this.macros.grasas * 9)) /
          4;
      }
    }
    if (typeof userInfo.key === "undefined") {
      this.table.Calorias = 0;
      this.table.carbohidratos = 0;
      this.table.grasas = 0;
      this.table.proteinas = 0;
      this.favoritesService.AddUserInfo(userInfo, this.uid, this.email);
      this.favoritesService.AddUserMacros(this.macros, this.uid);
      this.favoritesService.AddTable(this.table, this.uid);
      console.log(this.uid);
      this.router.navigate(["/menu/ayuda"]);
    }
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        this.email = data.email;
      }
    });
  }
}
