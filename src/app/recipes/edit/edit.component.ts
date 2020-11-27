import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  // make the dynamic ingredients object easier to work with by making a getter for it:
  get ingredients() { return (<FormArray>this.recipeForm.get('ingredients')); } // have to explicitly type-cast this for some reason

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (params['id'] != null) {
        this.editMode = true;
        this.recipe = this.recipeService.getRecipe(this.id);
      }
      this.initForm();
    });
  }

  private initForm() {
    let ingredientsArray = [];

    if (this.editMode && this.recipe?.ingredients?.length > 0) {
      for (let ingredient of this.recipe.ingredients) {
        let item = new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*/)])
        });
        ingredientsArray.push(item);
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe?.name, Validators.required),
      'description': new FormControl(this.recipe?.description, Validators.required),
      'imagePath': new FormControl(this.recipe?.imagePath, Validators.required),
      'ingredients': new FormArray(ingredientsArray)
    });
  }

  onAddIngredient() {
    this.ingredients.push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*/)])
    }));
  }

  onDeleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onClear();
  }

  onClear() {
    this.recipeForm.reset();
    if (this.editMode) {
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }
}
