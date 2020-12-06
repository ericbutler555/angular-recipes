import { Ingredient } from '../shared/ingredient';

export class Recipe {

	public guid?: string;
	public name: string;
	public description: string;
	public imagePath?: string;
	public ingredients?: Ingredient[];

	constructor(name: string, desc: string, img: string = "", ings: Ingredient[] = []) {
		this.name = name;
		this.description = desc;
		this.imagePath = img;
		this.ingredients = ings;
	}
}
