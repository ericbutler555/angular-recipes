import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void { }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
