import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent }
      // path is '' since 'shopping-list' is defined in app-routing.module (to enable lazy-load)
    ]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShoppingListModule { }
