import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "A super-tasty schnitzel - just awesome!",
      "https://p0.pikist.com/photos/666/25/food-meat-recipe-power-pork-dishes.jpg",
      [
        new Ingredient("Meat", 1),
        new Ingredient("French fries", 20)
      ]
    ),
    new Recipe(
      "Big Fat Burger",
      "What else do you need to say?",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/12/10/0/WU1712H_Cauliflower-Mac-and-Cheese_s4x3.jpg.rend.hgtvcom.826.620.suffix/1580140849133.jpeg",
      [
        new Ingredient("Buns", 2),
        new Ingredient("Meat", 1)
      ]
    )
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice(); // return copy of it, not the original
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
