import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/start/start.component';
import { RecipeDetailComponent } from './recipes/detail/detail.component';
import { RecipeEditComponent } from './recipes/edit/edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },

    // Using local recipe array:
    // { path: ':id', component: RecipeDetailComponent },
    // { path: ':id/edit', component: RecipeEditComponent }

    // Using Firebase db:
    { path: ':guid', component: RecipeDetailComponent, resolve: { recipe: RecipeResolverService } },
    { path: ':guid/edit', component: RecipeEditComponent, resolve: { recipe: RecipeResolverService } }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
