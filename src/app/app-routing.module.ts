import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule) }, // lazy-load recipes routes (and module) only when user requests them - saves on initial package download/setup in browser
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })], // this extra preloading config is optional, without it the app will wait to load modules until the user requests them
  exports: [RouterModule]
})
export class AppRoutingModule { }
