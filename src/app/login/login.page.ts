import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "../modelos/user";
import {
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "@ionic/angular";
import * as $ from "jquery";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    private ofauth: AngularFireAuth,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private routers: Router,
    public toastController: ToastController
  ) {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
      }
    });
  }
  user = {} as User;
  uid;

  //Funcion asincrona para comprobar las credenciales del usuario con la base de datos y redirigirlo
  async login(user: User) {
    this.ofauth.authState.subscribe(async data => {
      if (data && data.email && data.uid) {
        this.uid = data.uid;
      }
    });

    if (typeof this.uid == "undefined") {
      this.navCtrl.navigateForward("/login");
      const toast = await this.toastController.create({
        message: "Datos incorrectos",
        duration: 2000
      });
      toast.present();
    } else {
      var error1;
      try {
        const result = this.ofauth.auth
          .signInWithEmailAndPassword(user.email, user.password)
          .catch(function(error) {
            error1 = error.code;
          });
        console.log(result);
        if (result) {
          this.routers.navigateByUrl("/menu/ayuda");
        } else if (error1) {
          this.navCtrl.navigateForward("/login");
        } else {
          this.navCtrl.navigateForward("/login");
          const toast = await this.toastController.create({
            message: "Datos incorrectos",
            duration: 2000
          });
          toast.present();
        }
      } catch (e) {
        const toast = await this.toastController.create({
          message: "Inserta tu datos",
          duration: 2000
        });
        toast.present();
      }
    }
  }

  //Se declara el contenido de los campos de texto vacios
  ngOnInit() {
    $("#email").text("");
    $("#password").text("");
  }
}
