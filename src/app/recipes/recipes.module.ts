import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './list/list.component';
import { RecipeItemComponent } from './item/item.component';
import { RecipeStartComponent } from './start/start.component';
import { RecipeDetailComponent } from './detail/detail.component';
import { RecipeEditComponent } from './edit/edit.component';

import { AuthGuard } from '../auth/auth.guard';
import { RecipeResolverService } from '../recipes/recipe-resolver.service';

const recipeRoutes: Routes = [
  {
    // path is '' since 'recipes' is defined in app-routing.module (to enable lazy-load)
    path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },

      // Using local recipe array:
      // { path: ':id', component: RecipeDetailComponent },
      // { path: ':id/edit', component: RecipeEditComponent }

      // Using Firebase db:
      { path: ':guid', component: RecipeDetailComponent, resolve: { recipe: RecipeResolverService } },
      { path: ':guid/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolverService } }
    ]
  }
];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeDetailComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes), // use "forChild" instead of "forRoot" in feature modules
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
