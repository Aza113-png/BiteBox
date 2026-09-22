// Название нашего хранилища
const STORAGE_KEY = "bitebox-recipes";


// Получение всех сохранённых рецептов
function getRecipes() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];

}


// Сохранение рецептов
function saveRecipes(recipes) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(recipes)
    );

}


// Добавление нового рецепта
function addRecipe(recipe) {

    const recipes = getRecipes();

    recipes.push(recipe);

    saveRecipes(recipes);

}

// Находим форму добавления рецепта

const recipeForm = document.getElementById("recipeForm");


// Проверяем, существует ли форма на странице

if (recipeForm) {

    recipeForm.addEventListener("submit", function(event) {

        // Останавливаем стандартную отправку формы
        event.preventDefault();


        // Получаем название рецепта

        const title = document.getElementById(
            "recipeName"
        ).value.trim();


        // Получаем ссылку на изображение

        const image = document.getElementById(
            "recipeImage"
        ).value.trim();


        // Получаем ингредиенты

        const ingredientsText = document.getElementById(
            "recipeIngredients"
        ).value.trim();


        // Получаем шаги приготовления

        const stepsText = document.getElementById(
            "recipeSteps"
        ).value.trim();


        // Получаем выбранные категории

        const selectedCategories = document.querySelectorAll(
            'input[name="category"]:checked'
        );


        const categories = Array.from(
            selectedCategories
        ).map(function(checkbox) {

            return checkbox.value;

        });


        // Превращаем ингредиенты в массив

        const ingredients = ingredientsText
            .split("\n")
            .map(item => item.trim())
            .filter(item => item !== "");


        // Превращаем шаги в массив

        const steps = stepsText
            .split("\n")
            .map(item => item.trim())
            .filter(item => item !== "");


        // Создаём объект нового рецепта

        const newRecipe = {

            id: Date.now().toString(),

            title: title,

            image: image,

            categories: categories,

            ingredients: ingredients,

            steps: steps

        };


        // Сохраняем рецепт

        addRecipe(newRecipe);


        // Сообщение пользователю

        alert("Рецепт успешно сохранён!");


        // Переходим на главную страницу

        window.location.href = "index.html";

    });

}