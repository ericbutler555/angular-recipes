import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  // Using local recipes array:
  // @Input() index: number;
}
