import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngestaRecomPage } from './ingesta-recom.page';

const routes: Routes = [
  {
    path: '',
    component: IngestaRecomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IngestaRecomPage]
})
export class IngestaRecomPageModule {}
