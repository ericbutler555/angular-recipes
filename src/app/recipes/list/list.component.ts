import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Test Recipe", "This is a test recipe description", "https://p0.pikist.com/photos/666/25/food-meat-recipe-power-pork-dishes.jpg"),
    new Recipe("Test Recipe", "This is a test recipe description", "https://p0.pikist.com/photos/666/25/food-meat-recipe-power-pork-dishes.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
