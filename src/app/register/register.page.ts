import { Component, OnInit } from "@angular/core";
import { User } from "../modelos/user";
import { AngularFireAuth } from "angularfire2/auth";
import { NavController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(private ofauth: AngularFireAuth, public navCtrl: NavController) {}

  //Se crea un usuario en la base de datos y se redirige al login
  async register(user: User) {
    try {
      const result = await this.ofauth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(result);
      this.navCtrl.navigateForward("/login");
    } catch (e) {
      console.error(e);
    }
  }

  ngOnInit() {}
}
