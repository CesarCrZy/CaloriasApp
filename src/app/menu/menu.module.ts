import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/ingesta-recom',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'favorites',
        loadChildren: '../favorites/favorites.module#FavoritesPageModule'
      },
      {
        path: 'ingesta-recom',
        loadChildren: '../ingesta-recom/ingesta-recom.module#IngestaRecomPageModule'
      },
      {
        path: 'reporte',
        loadChildren: '../reporte/reporte.module#ReportePageModule'
      },
      {
        path: 'ayuda',
        loadChildren: '../ayuda/ayuda.module#AyudaPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
