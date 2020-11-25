import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientChangeSubscription: Subscription;

  isEditing: boolean = false;
  editingIngredient: Ingredient | null = null;
  editingIndex: number = -1;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.ingredientChangeSubscription.unsubscribe();
  }

  onEditClick(index: number) {
    let ingredient = this.shoppingListService.getIngredient(index);
    this.isEditing = true;
    this.editingIngredient = ingredient;
    this.editingIndex = index;
  }

  resetProperties() {
    this.isEditing = false;
    this.editingIngredient = null;
    this.editingIndex = -1;
  }
}
