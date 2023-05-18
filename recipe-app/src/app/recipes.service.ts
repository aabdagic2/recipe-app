import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class RecipesService implements OnInit{

  recipes = [
    { id: 1, title: 'Spaghetti Bolognese', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Classic Italian pasta dish with tomato sauce and ground beef.',rating:3.1 },
    { id: 2, title: 'Chicken Curry', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Spicy Indian curry with chicken and vegetables.',rating:4.5 },
    { id: 3, title: 'Caesar Salad', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Crisp romaine lettuce with parmesan cheese and croutons.',rating:4.0 },
    { id: 4, title: 'Beef Stroganoff', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Russian dish with sautéed beef and sour cream sauce.',rating:2.5 }
    ,{ id: 5, title: 'Spaghetti Bolognese', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Classic Italian pasta dish with tomato sauce and ground beef.',rating:4.7 },
    { id: 6, title: 'Chicken Curry', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Spicy Indian curry with chicken and vegetables.',rating:3.7 },
    { id: 7, title: 'Caesar Salad', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Crisp romaine lettuce with parmesan cheese and croutons.',rating:5 },
    
  ];
  savedRecipes = [
    { id: 1, title: 'Spaghetti Bolognese', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Classic Italian pasta dish with tomato sauce and ground beef.',rating:3.1 },
    { id: 2, title: 'Chicken Curry', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Spicy Indian curry with chicken and vegetables.',rating:4.5 },
    { id: 3, title: 'Caesar Salad', image: 'https://www.rd.com/wp-content/uploads/2020/11/RD-americas-favorite-foods-FT-Getty-Images-7-JValentine.jpg', description: 'Crisp romaine lettuce with parmesan cheese and croutons.',rating:4.0 }
  ];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
   
  }
async getTodayCalories(): Promise<{name:string,calories:number,
image:string,description:string,rating:number}[]>{
  try {
    const response = await this.http.get<any>('https://localhost:7079/api/todaycalories/get').toPromise();
    const rec: {name:string,calories:number,
      image:string,description:string,rating:number}[] = [];
console.log(response);
    response.forEach(async (hit: any) => {

      const label: string = hit.name;
      const image: string = hit.image;
      let description: string = hit.description;
      const img= await this.getRecipe(label);
      rec.push({ name: label,calories:Number(hit.calories), image: img[0].image, description: description, rating: Number(hit.rating) });
    });

    return rec; 
  } catch (error) {
    console.error(error);
    return [];
  }
}
  async getRecipes(): Promise<{ title: string; image: string; description: string; rating: number; }[]> {
    try {
      const response = await this.http.get<any>('https://localhost:7079/api/recipes/Get').toPromise();
      const hits = response["hits"];
      const rec: {  title: string; image: string; description: string; rating: number; }[] = [];

      hits.forEach((hit: any) => {
        const recipe = hit.recipe;

        const label: string = recipe.label;
        const image: string = recipe.image;
        const source: string = recipe.source;
        const url: string = recipe.url;
        let description: string = Number(recipe.calories).toString() + ", ";

        recipe.dietLabels.forEach((element: string) => {
          description += element+"kcal , ";
        });

        rec.push({ title: label, image: image, description: description, rating: 0 });
      });

      return rec;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getRecipe(name:string|null): Promise<{ title: string; image: string; description: string; rating: number; ingredients:{
    text: string,
    quantity: 0,
    measure: string}[],source: string }[]> {
    try {
      const response = await this.http.get<any>('https://localhost:7079/api/recipes/GetRecipeByName/'+name).toPromise();
      const hits = response["hits"];
      const rec: {  title: string; image: string; description: string; rating: number; ingredients:{
        text: string,
        quantity: 0,
        measure: string}[],source: string }[] = [];

      hits.forEach((hit: any) => {
        const recipe = hit.recipe;

        const label: string = recipe.label;
        const image: string = recipe.image;
        const source: string = recipe.source;
        const url: string = recipe.url;
        let description: string = Number(recipe.calories).toString() + ", ";
        const ingredients:{
            text: string,
            quantity: 0,
            measure: string}[]=[];
            recipe.ingredients.forEach((element:  {
              text: string,
              quantity: 0,
              measure: string,
              food: string,
              weight: 0,
              foodId: string
            })=>{
              ingredients.push({text:element.text,quantity:element.quantity, measure: element.measure})
            });
           var instructions: string[]=[];
           if(recipe.instructions!=undefined)
           recipe.instructions.forEach((element:string)=>{instructions.push(element);});
          
        recipe.dietLabels.forEach((element: string) => {
          description += element+"kcal , ";
        });

        rec.push({ title: label, image: image, description: description, rating: 0,ingredients,source });
      });

      return rec;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async getSavedRecipes():Promise<{title: string; image: string; description: string; rating:number; }[] >{
    const response = await this.http.get<any>('https://localhost:7079/api/savedrecipes/').toPromise();
    const hits = response["hits"];
    const rec: {  title: string; image: string; description: string; rating: number; }[] = [];
    response.forEach(async (hit: any) => {

      const label: string = hit.name;
      const image: string = hit.image;
      let description: string = hit.description;
     console.log(hit);
     const r=await this.getRecipe(label);
      rec.push({ title: label, image: r[0].image, description: description, rating: 0 });
    });
    return rec;
   }
   async rateRecipe(){

   }
   

}
