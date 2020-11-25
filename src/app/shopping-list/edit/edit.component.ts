import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @Input() index: number;
  @Input() editMode: boolean;
  @Output() refreshForm = new EventEmitter();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    let submittedIngredient = new Ingredient(
      form.value.name,
      form.value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.index, submittedIngredient);
    } else {
      this.shoppingListService.addIngredient(submittedIngredient);
    }
    this.clearForm();
  }

  deleteIngredient() {
    // this.shoppingListService.deleteIngredient(this.ingredient);
    this.shoppingListService.deleteIngredient(this.index);
    this.clearForm();
  }

  clearForm() {
    // this.ingredient = null;
    // this.index = -1;
    // this.editMode = false;
    this.refreshForm.emit();
  }
}
