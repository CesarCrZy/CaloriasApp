import { Component, OnInit } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { AngularFireAuth } from "angularfire2/auth";
import { File } from "@ionic-native/file/ngx";
import { Comida } from "../modelos/comida";
import { Observable } from "rxjs";
import { FavoritesService } from "../favorites/favorites.service";
import { NavController, ToastController } from "@ionic/angular";
import { map } from "rxjs/operators";
import { UserInfo } from "../modelos/info";
import { Macros } from "../modelos/macros";

@Component({
  selector: "app-reporte",
  templateUrl: "./reporte.page.html",
  styleUrls: ["./reporte.page.scss"]
})
export class ReportePage implements OnInit {
  private favoritesService: FavoritesService;
  favoritesList$: Observable<UserInfo[]>;
  favoriteList1: Observable<Macros[]>;
  favoriteList2: Observable<Macros[]>;
  public email = "";
  public edad = 0;
  public peso = 0;
  public altura = 0;
  public genero = "";
  public objetivo = "";
  public actividad = "";

  public caloriasrec = 0;
  public proterec = 0;
  public grasasrec = 0;
  public carbosrec = 0;

  public caloriascon = 0;
  public protecon = 0;
  public grasascon = 0;
  public carboscon = 0;

  uid;
  constructor(
    private file: File,
    private ofauth: AngularFireAuth,
    _favoritesService: FavoritesService
  ) {
    this.favoritesService = _favoritesService;
  }

  ngOnInit() {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
        var arremail = [];
        var arredad = [];
        var arrpeso = [];
        var arraltura = [];
        var arrgenero = [];
        var arrobjetivo = [];
        var arractividad = [];
        this.favoritesList$ = this.favoritesService
          .GetUserInfo(this.uid)
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
          arremail = val;
          arredad = val;
          arrpeso = val;
          arraltura = val;
          arrgenero = val;
          arrobjetivo = val;
          arractividad = val;
          for (var i = 0; i < arremail.length; i++) {
            this.email = arremail[i]["email"];
          }
          for (var i = 0; i < arredad.length; i++) {
            this.edad = parseInt(arredad[i]["edad"]);
          }
          for (var i = 0; i < arrpeso.length; i++) {
            this.peso = parseInt(arrpeso[i]["peso"]);
          }
          for (var i = 0; i < arraltura.length; i++) {
            this.altura = parseInt(arraltura[i]["altura"]);
          }
          for (var i = 0; i < arrgenero.length; i++) {
            this.genero = arrgenero[i]["genero"];
          }
          for (var i = 0; i < arrobjetivo.length; i++) {
            this.objetivo = arrobjetivo[i]["objetivo"];
          }
          for (var i = 0; i < arractividad.length; i++) {
            this.actividad = arractividad[i]["actividad"];
          }
        });

        //------------------------------------------------------------------------------------
        var arrcalrec = [];
        var arrproterec = [];
        var arrgrasasrec = [];
        var arrcarbosrec = [];
        this.favoriteList1 = this.favoritesService
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

        this.favoriteList1.subscribe(val => {
          arrcalrec = val;
          arrproterec = val;
          arrgrasasrec = val;
          arrcarbosrec = val;
          for (var i = 0; i < arrcalrec.length; i++) {
            this.caloriasrec = arrcalrec[i]["Calorias"];
          }
          for (var i = 0; i < arrproterec.length; i++) {
            this.proterec = parseInt(arrproterec[i]["proteinas"]);
          }
          for (var i = 0; i < arrgrasasrec.length; i++) {
            this.grasasrec = parseInt(arrgrasasrec[i]["grasas"]);
          }
          for (var i = 0; i < arrcarbosrec.length; i++) {
            this.carbosrec = parseInt(arrcarbosrec[i]["carbohidratos"]);
          }
        });
        //-------------------------------------------------------------------------------------
        var arrcalcon = [];
        var arrprotecon = [];
        var arrgrasascon = [];
        var arrcarboscon = [];
        this.favoriteList2 = this.favoritesService
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

        this.favoriteList2.subscribe(val => {
          arrcalcon = val;
          arrprotecon = val;
          arrgrasascon = val;
          arrcarboscon = val;
          for (var i = 0; i < arrcalcon.length; i++) {
            this.caloriascon = arrcalcon[i]["Calorias"];
          }
          for (var i = 0; i < arrprotecon.length; i++) {
            this.protecon = parseInt(arrprotecon[i]["proteinas"]);
          }
          for (var i = 0; i < arrgrasascon.length; i++) {
            this.grasascon = parseInt(arrgrasascon[i]["grasas"]);
          }
          for (var i = 0; i < arrcarboscon.length; i++) {
            this.carboscon = parseInt(arrcarboscon[i]["carbohidratos"]);
          }
        });
      }
    });
  }

  makePdf() {
    var meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth();
    var yyy = fecha.getFullYear();
    var fecha_formateada = dia + " de " + meses[mes] + " de " + yyy;

    var docDefinition = {
      content: [
        { text: "INFORME", style: "header" },
        { text: "Fecha: " + fecha_formateada, alignment: "right" },

        { text: "De", style: "subheader" },
        { text: "CaloriasApp" },

        { text: "Para", style: "subheader" },
        { text: this.email },

        { text: "1. Datos del Usuario", style: "subheader" },
        { text: "Objetivo: " + this.objetivo, style: "underline" },

        { text: "Actividad Fisica: " + this.actividad, style: "underline" },

        { text: "Genero: " + this.genero, style: "underline" },

        { text: "Peso: " + this.peso + " Kg", style: "underline" },

        { text: "Altura: " + this.altura + " Cm", style: "underline" },

        { text: "Edad: " + this.edad, style: "underline" },
        //--------------------------------------------------------------------------------------
        { text: "2. Macronutrientes Recomendados por dia", style: "subheader" },
        { text: "Calorias: " + this.caloriasrec, style: "underline" },

        { text: "Proteinas: " + this.proterec, style: "underline" },

        { text: "Grasas: " + this.grasasrec, style: "underline" },

        { text: "Carbohidratos: " + this.carbosrec, style: "underline" },
        //----------------------------------------------------------------------------------------------
        { text: "3. Macronutrientes que has consumido", style: "subheader" },
        { text: "Calorias: " + this.caloriascon, style: "underline" },

        { text: "Proteinas: " + this.protecon, style: "underline" },

        { text: "Grasas: " + this.grasascon, style: "underline" },

        { text: "Carbohidratos: " + this.carboscon, style: "underline" }
        // { text: "", style: "story", margin: [0, 20, 0, 20] }
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: "center",
          width: "50%"
        },
        underline: {
          fontSize: 14
        }
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }
}
