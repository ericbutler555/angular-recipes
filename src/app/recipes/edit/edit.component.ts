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
  // Using local recipes array:
  // id: number;

  // Using Firebase db:
  guid: string;

  editMode: boolean = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  // make the dynamic ingredients object easier to work with by making a getter for it:
  get ingredients() { return (<FormArray>this.recipeForm.get('ingredients')); } // have to explicitly type-cast this for some reason

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.recipe = this.route.snapshot.data.recipe;
    this.initForm();

    this.route.params.subscribe((params: Params) => {

      // Using local recipes array:
      // this.id = +params['id'];
      // if (params['id'] != null) {
      //   this.editMode = true;
      //   this.recipe = this.recipeService.getRecipe(this.id);
      // }
      // this.initForm();

      // Using Firebase db:
      this.guid = params['guid'];
      if (params['guid'] != null) {
        this.editMode = true;
        this.recipeService.getRecipeApi(this.guid).subscribe(recipe => {
          this.recipe = recipe;
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  private initForm() {
    let ingredientsArray = [];

    if (this.editMode && this.recipe?.ingredients?.length > 0) {
      for (let ingredient of this.recipe.ingredients) {
        const item = new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*/)])
        });
        ingredientsArray.push(item);
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe?.name, Validators.required),
      'description': new FormControl(this.recipe?.description, Validators.required),
      'imagePath': new FormControl(this.recipe?.imagePath),
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
      // Using local recipe array:
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);

      // Using Firebase db:
      this.recipeService.updateRecipeApi(this.guid, this.recipeForm.value);
    } else {
      // Using local recipe array:
      // this.recipeService.addRecipe(this.recipeForm.value);

      // Using Firebase db:
      this.recipeService.addRecipeApi(this.recipeForm.value);
    }
    this.onClear();
  }

  onClear() {
    this.recipeForm.reset();
    if (this.editMode) {
      // this.router.navigate(['/recipes', this.id]);
      this.router.navigate(['/recipes', this.guid]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }
}
