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

  getIngredients(): Ingredient[] {
    return this.ingredients.slice(); // return copy of it, not the original
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(oldIndex: number, newIngredient: Ingredient) {
    this.ingredients[oldIndex] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // deleteIngredient(ingredient: Ingredient) {
  //   const index = this.ingredients.findIndex(i => i.name === ingredient.name && i.amount === ingredient.amount);
  //   this.ingredients.splice(index, 1);
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
