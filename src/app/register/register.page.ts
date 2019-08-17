import { Component, OnInit } from "@angular/core";
import { User } from "../modelos/user";
import { AngularFireAuth } from "angularfire2/auth";
import { NavController, NavParams, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(
    private ofauth: AngularFireAuth,
    public navCtrl: NavController,
    private routers: Router,
    public toastController: ToastController
  ) {}

  //Se crea un usuario en la base de datos y se redirige al login
  async register(user: User) {
    try {
      const result = await this.ofauth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(result);
      if (result) {
        this.routers.navigateByUrl("/login");
      } else {
        this.navCtrl.navigateForward("/register");
        const toast = await this.toastController.create({
          message: "Intentalo nuevamente",
          duration: 2000
        });
        toast.present();
      }
    } catch (e) {
      const toast = await this.toastController.create({
        message: "Inserta tus datos para registrarte",
        duration: 2000
      });
      toast.present();
    }
  }

  ngOnInit() {}

  back() {
    this.navCtrl.navigateForward("/login");
  }
}
