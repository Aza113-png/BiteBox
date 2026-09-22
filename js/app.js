// ========================================
// BITEBOX — JAVASCRIPT
// ========================================


// Название хранилища
const STORAGE_KEY = "bitebox-recipes";


// Запасная фотография
const DEFAULT_IMAGE =
    "https://placehold.co/900x600?text=BiteBox";


// ========================================
// 1. ПОЛУЧЕНИЕ РЕЦЕПТОВ
// ========================================

function getRecipes() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];

}


// ========================================
// 2. СОХРАНЕНИЕ РЕЦЕПТОВ
// ========================================

function saveRecipes(recipes) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(recipes)
    );

}


// ========================================
// 3. ДОБАВЛЕНИЕ НОВОГО РЕЦЕПТА
// ========================================

function addRecipe(recipe) {

    const recipes = getRecipes();

    recipes.push(recipe);

    saveRecipes(recipes);

}


// ========================================
// 4. ТЕСТОВЫЕ РЕЦЕПТЫ
// ========================================

const demoRecipes = [

    {

        id: "demo-1",

        title: "Свежий овощной салат",

        image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",

        categories: ["Салаты"],

        ingredients: [
            "2 помидора",
            "1 огурец",
            "Листья салата",
            "Оливковое масло",
            "Соль по вкусу"
        ],

        steps: [
            "Помойте овощи.",
            "Нарежьте помидоры и огурцы.",
            "Добавьте листья салата.",
            "Заправьте оливковым маслом.",
            "Перемешайте и подавайте."
        ]

    },


    {

        id: "demo-2",

        title: "Домашняя пицца",

        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",

        categories: ["Выпечка"],

        ingredients: [
            "300 г муки",
            "150 мл воды",
            "150 г сыра",
            "Томатный соус",
            "Помидоры",
            "Соль по вкусу"
        ],

        steps: [
            "Приготовьте тесто из муки и воды.",
            "Раскатайте тесто.",
            "Смажьте томатным соусом.",
            "Добавьте помидоры и сыр.",
            "Выпекайте при 200°C до готовности."
        ]

    },


    {

        id: "demo-3",

        title: "Рис с овощами",

        image:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",

        categories: ["Быстрые ужины"],

        ingredients: [
            "200 г риса",
            "1 морковь",
            "1 луковица",
            "Растительное масло",
            "Соль и специи"
        ],

        steps: [
            "Промойте рис.",
            "Отварите рис до готовности.",
            "Нарежьте морковь и лук.",
            "Обжарьте овощи.",
            "Добавьте рис и перемешайте."
        ]

    },


    {

        id: "demo-4",

        title: "Сырный пирог",

        image:
            "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",

        categories: ["Выпечка"],

        ingredients: [
            "200 г пшеничной муки",
            "150 г твёрдого сыра",
            "2 куриных яйца",
            "100 мл молока",
            "50 г сливочного масла",
            "1 ч. л. разрыхлителя",
            "Соль по вкусу"
        ],

        steps: [
            "Натрите сыр на крупной тёрке.",
            "Смешайте яйца, молоко и сливочное масло.",
            "Добавьте муку и разрыхлитель.",
            "Добавьте натёртый сыр.",
            "Переложите тесто в форму.",
            "Выпекайте при 180°C около 30–35 минут.",
            "Дайте пирогу остыть и подавайте."
        ]

    },


    {

        id: "demo-5",

        title: "Зелёный боул",

        image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",

        categories: ["Салаты"],

        ingredients: [
            "1 авокадо",
            "1 огурец",
            "Листья салата",
            "100 г киноа",
            "Оливковое масло"
        ],

        steps: [
            "Отварите киноа.",
            "Помойте овощи.",
            "Нарежьте авокадо и огурец.",
            "Выложите ингредиенты в миску.",
            "Заправьте оливковым маслом."
        ]

    }

];


// ========================================
// 5. ДОБАВЛЕНИЕ ТЕСТОВЫХ ДАННЫХ
// ========================================

function initializeDemoRecipes() {

    const initialized = localStorage.getItem(
        "bitebox-demo-initialized"
    );

    // Если стартовые рецепты уже добавлялись,
    // второй раз ничего не делаем

    if (initialized === "yes") {
        return;
    }

    const recipes = getRecipes();

    // Добавляем только те тестовые рецепты,
    // которых ещё нет в хранилище

    const missingDemoRecipes = demoRecipes.filter(
        demo => !recipes.some(
            recipe =>
                recipe.title.toLowerCase() ===
                demo.title.toLowerCase()
        )
    );

    saveRecipes([
        ...missingDemoRecipes,
        ...recipes
    ]);

    localStorage.setItem(
        "bitebox-demo-initialized",
        "yes"
    );

}


// ========================================
// 6. КРАСИВЫЕ НАЗВАНИЯ КАТЕГОРИЙ
// ========================================

function getCategoryLabel(category) {

    if (category === "Салаты") {
        return "🥗 Салаты";
    }

    if (category === "Выпечка") {
        return "🥧 Выпечка";
    }

    if (category === "Быстрые ужины") {
        return "⏱️ Быстрые ужины";
    }

    return category;

}


// ========================================
// 7. ОТОБРАЖЕНИЕ КАРТОЧЕК НА ГЛАВНОЙ
// ========================================

function renderRecipes(category = "Все") {

    const container = document.getElementById(
        "recipesContainer"
    );

    // Если мы не на главной странице,
    // прекращаем выполнение функции

    if (!container) {
        return;
    }

    const recipes = getRecipes();

    // Очищаем контейнер перед отображением

    container.innerHTML = "";


    // Фильтрация рецептов

    const filteredRecipes = recipes.filter(recipe => {

        if (category === "Все") {
            return true;
        }

        return recipe.categories.includes(category);

    });


    // Если рецептов нет

    if (filteredRecipes.length === 0) {

        const message = document.createElement("div");

        message.className = "col-12 text-center py-5";

        const title = document.createElement("h3");

        title.textContent = "Рецепты не найдены 🍴";

        message.appendChild(title);

        container.appendChild(message);

        return;

    }


    // Создание карточек

    filteredRecipes.forEach(recipe => {

        const column = document.createElement("div");

        column.className =
            "col-12 col-sm-6 col-lg-4";


        column.innerHTML = `

            <article class="card recipe-card">

                <img class="recipe-image">

                <div class="card-body">

                    <h5></h5>

                    <div class="d-flex flex-wrap gap-2 mb-4 recipe-tags">
                    </div>

                    <a class="btn btn-dark w-100">
                        Смотреть
                    </a>

                </div>

            </article>

        `;


        // Фотография

        const image = column.querySelector(
            ".recipe-image"
        );

        image.src = recipe.image || DEFAULT_IMAGE;

        image.alt = recipe.title;

        image.onerror = function() {
            image.onerror = null;
            image.src = DEFAULT_IMAGE;
        };


        // Название

        column.querySelector("h5").textContent =
            recipe.title;


        // Категории

        const tagsContainer = column.querySelector(
            ".recipe-tags"
        );

        recipe.categories.forEach(category => {

            const badge = document.createElement(
                "span"
            );

            badge.className = "badge badge-tag";

            badge.textContent =
                getCategoryLabel(category);

            tagsContainer.appendChild(badge);

        });


        // Ссылка на конкретный рецепт

        const button = column.querySelector("a");

        button.href =
            "recipe.html?id=" +
            encodeURIComponent(recipe.id);


        // Добавляем карточку на страницу

        container.appendChild(column);

    });

}


// ========================================
// 8. РАБОТА ФИЛЬТРОВ
// ========================================

function initializeFilters() {

    const buttons = document.querySelectorAll(
        ".filter-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function() {

            // Убираем active у всех кнопок

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });


            // Добавляем active выбранной кнопке

            button.classList.add("active");


            // Получаем выбранную категорию

            const category = button.dataset.category;


            // Перерисовываем карточки

            renderRecipes(category);

        });

    });

}


// ========================================
// 9. СОХРАНЕНИЕ НОВОГО РЕЦЕПТА
// ========================================

const recipeForm = document.getElementById(
    "recipeForm"
);


if (recipeForm) {

    recipeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Название

            const title = document.getElementById(
                "recipeName"
            ).value.trim();


            // Фотография

            const image = document.getElementById(
                "recipeImage"
            ).value.trim();


            // Ингредиенты

            const ingredientsText =
                document.getElementById(
                    "recipeIngredients"
                ).value.trim();


            // Шаги приготовления

            const stepsText = document.getElementById(
                "recipeSteps"
            ).value.trim();


            // Категории

            const selectedCategories =
                document.querySelectorAll(
                    'input[name="category"]:checked'
                );


            const categories = Array.from(
                selectedCategories
            ).map(checkbox => checkbox.value);


            // Превращаем строки в массивы

            const ingredients = ingredientsText
                .split("\n")
                .map(item => item.trim())
                .filter(item => item !== "");


            const steps = stepsText
                .split("\n")
                .map(item => item.trim())
                .filter(item => item !== "");


            // Новый рецепт

            const newRecipe = {

                id: Date.now().toString(),

                title: title,

                image: image,

                categories: categories,

                ingredients: ingredients,

                steps: steps

            };


            // Сохранение

            try {

                addRecipe(newRecipe);

            } catch (error) {

                console.error(error);

                alert(
                    "Не удалось сохранить рецепт. Проверь хранилище браузера."
                );

                return;

            }


            // Переход на главную

            window.location.href = "index.html";

        }
    );

}


// ========================================
// 10. ПРОСМОТР ВЫБРАННОГО РЕЦЕПТА
// ========================================

function renderRecipeDetails() {

    const titleElement = document.getElementById(
        "recipeTitle"
    );

    // Проверяем, что мы на странице рецепта

    if (!titleElement) {
        return;
    }


    // Получаем ID из адресной строки

    const params = new URLSearchParams(
        window.location.search
    );

    const recipeId = params.get("id");


    // Получаем рецепты

    const recipes = getRecipes();


    // Находим выбранный рецепт

    const recipe = recipes.find(
        item => item.id === recipeId
    );


    // Если рецепт не найден

    if (!recipe) {

        titleElement.textContent =
            "Рецепт не найден";

        document.getElementById(
            "recipeImageDetail"
        ).style.display = "none";

        document.getElementById(
            "recipeCategories"
        ).replaceChildren();

        document.getElementById(
            "recipeIngredientsList"
        ).replaceChildren();

        document.getElementById(
            "recipeStepsList"
        ).replaceChildren();

        return;

    }


    // Название

    titleElement.textContent = recipe.title;

    document.title = "BiteBox — " + recipe.title;


    // Фотография

    const image = document.getElementById(
        "recipeImageDetail"
    );

    image.src = recipe.image || DEFAULT_IMAGE;

    image.alt = recipe.title;

    image.onerror = function() {
        image.onerror = null;
        image.src = DEFAULT_IMAGE;
    };


    // Категории

    const categoriesContainer =
        document.getElementById(
            "recipeCategories"
        );

    categoriesContainer.replaceChildren();

    recipe.categories.forEach(category => {

        const badge = document.createElement(
            "span"
        );

        badge.className = "badge badge-tag";

        badge.textContent =
            getCategoryLabel(category);

        categoriesContainer.appendChild(badge);

    });


    // Ингредиенты

    const ingredientsList =
        document.getElementById(
            "recipeIngredientsList"
        );

    ingredientsList.replaceChildren();

    recipe.ingredients.forEach(ingredient => {

        const li = document.createElement("li");

        li.textContent = ingredient;

        ingredientsList.appendChild(li);

    });


    // Шаги приготовления

    const stepsList = document.getElementById(
        "recipeStepsList"
    );

    stepsList.replaceChildren();

    recipe.steps.forEach(step => {

        const li = document.createElement("li");

        li.textContent = step;

        stepsList.appendChild(li);

    });

}


// ========================================
// 11. ЗАПУСК ПРИЛОЖЕНИЯ
// ========================================

// Создаём тестовые данные только при первой
// инициализации, не удаляя пользовательские рецепты

initializeDemoRecipes();


// Отображаем рецепты на главной

renderRecipes();


// Подключаем фильтры

initializeFilters();


// Отображаем выбранный рецепт

renderRecipeDetails();