import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";

@Component({
  selector: "app-bienvenida",
  templateUrl: "./bienvenida.page.html",
  styleUrls: ["./bienvenida.page.scss"]
})
export class BienvenidaPage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController
  ) {}

  async empezar() {
    const alert = await this.alertCtrl.create({
      header: "Bienvenido",
      message: "Eres miembro nuevo?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {
            this.navCtrl.navigateForward("/menu");
          }
        },
        {
          text: "Si",
          handler: () => {
            this.navCtrl.navigateForward("/register-info");
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {}
}
