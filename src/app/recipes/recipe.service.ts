import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe';
// import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // If you're storing recipe data in a local array (no db integration):
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Tasty Schnitzel",
  //     "A super-tasty schnitzel - just awesome!",
  //     "https://p0.pikist.com/photos/666/25/food-meat-recipe-power-pork-dishes.jpg",
  //     [
  //       new Ingredient("Meat", 1),
  //       new Ingredient("French fries", 20)
  //     ]
  //   ),
  //   new Recipe(
  //     "Big Fat Burger",
  //     "What else do you need to say?",
  //     "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/12/10/0/WU1712H_Cauliflower-Mac-and-Cheese_s4x3.jpg.rend.hgtvcom.826.620.suffix/1580140849133.jpeg",
  //     [
  //       new Ingredient("Buns", 2),
  //       new Ingredient("Meat", 1)
  //     ]
  //   )
  // ];

  // For storing recipe data in a db:
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) { }

  // HTTP methods for db integration:

  seedRecipesApi() {
    this.http.put(environment.firebase_url + 'recipes.json', this.recipes).subscribe();
  }

  getRecipesApi() {
    this.http.get<Recipe[]>(environment.firebase_url + 'recipes.json').subscribe(response => {
        // since Firebase returns an object, not an array, and its items don't have primary keys,
        // you have to do this extra loop-through instead of just doing `this.recipes = response`:
        const recipeArray = [];
        for (let item in response) {
          let thisItem = response[item];
          thisItem.guid = item;
          recipeArray.push(thisItem);
        }
        this.recipes = recipeArray;
        this.recipesChanged.next(this.recipes.slice());
      });
  }

  getRecipeApi(guid: string) {
    return this.http.get<Recipe>(environment.firebase_url + `recipes/${guid}.json`);
  }

  addRecipeApi(recipe: Recipe) {
    this.http.post(environment.firebase_url + 'recipes.json', recipe).subscribe(() => {
      this.getRecipesApi();
    });
  }

  updateRecipeApi(guid: string, recipe: Recipe) {
    this.http.put(environment.firebase_url + `recipes/${guid}.json`, recipe).subscribe(() => {
      this.getRecipesApi();
    });
  }

  deleteRecipeApi(guid: string) {
    this.http.delete(environment.firebase_url + `recipes/${guid}.json`).subscribe(() => {
      this.getRecipesApi();
    });
  }

  // Local array methods:

  // getRecipes() {
  //   return this.recipes.slice(); // return copy of it, not the original
  // }

  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // updateRecipe(index: number, recipe: Recipe) {
  //   this.recipes[index] = recipe;
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

}
