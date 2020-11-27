import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    // listen for changes and update list as needed
    this.subscription = this.recipeService.recipesChanged.subscribe((recipesList: Recipe[]) => {
      this.recipes = recipesList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
