import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(recipe) {
    this.recipeSelected.emit();
  }

}
