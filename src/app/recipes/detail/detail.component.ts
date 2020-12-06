import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // Using local recipes array:
  // id: number;

  // Using Firebase db:
  guid: string;
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.recipe = this.route.snapshot.data.recipe;

    this.route.params.subscribe((params: Params) => {

      // Using local recipe array:
      // this.id = +params['id'];
      // this.recipe = this.recipeService.getRecipe(this.id);

      // Using Firebase db:
      this.guid = params['guid'];
      this.recipeService.getRecipeApi(this.guid).subscribe(recipe => {
        this.recipe = recipe;
      });

    });
  }

  onAddIngredients() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    // Using local recipe array:
    // this.recipeService.deleteRecipe(this.id);

    // Using Firebase db:
    this.recipeService.deleteRecipeApi(this.guid);
    this.router.navigate(['/recipes']);
  }
}
