import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private recipeService: RecipeService) { }

  onSeedData() {
    // Never really need to do this except the once to get the initial recipes into the db.
    // this.recipeService.seedRecipesApi();
  }

  onFetchData() {
    // Never really need to do this either since I'm getting data on the recipe list init.
    // this.recipeService.getRecipesApi();
  }
}
