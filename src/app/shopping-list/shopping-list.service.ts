import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("apples", 5),
    new Ingredient("tomatoes", 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice(); // return copy of it, not the original
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
