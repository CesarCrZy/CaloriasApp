import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  {
    path: "bienvenida",
    loadChildren: "./bienvenida/bienvenida.module#BienvenidaPageModule"
  },
  {
    path: "register-info",
    loadChildren: "./register-info/register-info.module#RegisterInfoPageModule"
  },
  { path: "menu", loadChildren: "./menu/menu.module#MenuPageModule" },
  {
    path: "favorites-modal",
    loadChildren:
      "./favorites-modal/favorites-modal.module#FavoritesModalPageModule"
  },
  {
    path: "favorites",
    loadChildren: "./favorites/favorites.module#FavoritesPageModule"
  },
  {
    path: "ingesta-recom",
    loadChildren: "./ingesta-recom/ingesta-recom.module#IngestaRecomPageModule"
  },
  {
    path: "calculos",
    loadChildren: "./calculos/calculos.module#CalculosPageModule"
  },
  {
    path: "reporte",
    loadChildren: "./reporte/reporte.module#ReportePageModule"
  },
  { path: "ayuda", loadChildren: "./ayuda/ayuda.module#AyudaPageModule" }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
