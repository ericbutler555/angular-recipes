import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Test Recipe 1", "This is the first test recipe description", "https://p0.pikist.com/photos/666/25/food-meat-recipe-power-pork-dishes.jpg"),
    new Recipe("Test Recipe 2", "This is another test recipe description", "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/12/10/0/WU1712H_Cauliflower-Mac-and-Cheese_s4x3.jpg.rend.hgtvcom.826.620.suffix/1580140849133.jpeg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
