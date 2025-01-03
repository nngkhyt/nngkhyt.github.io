let selectedTag = 'All';

function setTag(tag) {
    selectedTag = tag;
    updateTagStyles();
    filterNews();
}

function updateTagStyles() {
    const tagButtons = document.querySelectorAll('.news-tags .btn');
    tagButtons.forEach(button => {
        if (button.textContent.trim() === selectedTag) {
            button.classList.add('selected-tag');
            button.classList.remove('btn-outline-secondary');
        } else {
            button.classList.remove('selected-tag');
            button.classList.add('btn-outline-secondary');
        }
    });
}

function filterNewsByTag(newsItem) {
    if (selectedTag === 'All') {
        return true;
    } else {
        return newsItem.getAttribute('data-tags').includes(selectedTag);
    }
}

function filterNewsByDate(newsItem, year, month) {
    const itemDate = newsItem.getAttribute('data-date');
    if (!year && !month) {
        return true;
    } else if (year && !month) {
        return itemDate.startsWith(year);
    } else if (!year && month) {
        return itemDate.endsWith(month);
    } else {
        return itemDate.startsWith(year) && itemDate.includes(`-${month}`);
    }
}

function searchNews(newsItem, searchText) {
    const title = newsItem.querySelector('.card-title').textContent.toLowerCase();
    return title.includes(searchText);
}

function filterNews() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const year = document.getElementById('yearSelect').value;
    const month = document.getElementById('monthSelect').value;
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(function(item) {
        if (filterNewsByTag(item) && searchNews(item, input) && filterNewsByDate(item, year, month)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    updateSearchButtonStyle(input !== "" || year !== "" || month !== "");
}

function updateSearchButtonStyle(isSearching) {
    const searchButton = document.getElementById('searchButton');
    if (isSearching) {
        searchButton.classList.add('searching');
    } else {
        searchButton.classList.remove('searching');
    }
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearSelect').selectedIndex = 0;
    document.getElementById('monthSelect').selectedIndex = 0;
    setTag('All');
    filterNews();
}


document.addEventListener('DOMContentLoaded', function () {
    populateIngredientDropdown();
});

function populateIngredientDropdown() {
    const recipeItems = document.querySelectorAll('.recipe-item');
    const ingredientSet = new Set();

    // レシピから材料を抽出
    recipeItems.forEach(item => {
        const ingredients = item.getAttribute('data-ingredients').split(' ');
        ingredients.forEach(ingredient => ingredientSet.add(ingredient.trim()));
    });

    // 材料を配列に変換してあいうえお順にソート
    const sortedIngredients = Array.from(ingredientSet).sort((a, b) => a.localeCompare(b, 'ja'));

    const dropdownMenu = document.getElementById('ingredientDropdownMenu');
    sortedIngredients.forEach(ingredient => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${ingredient}" id="ingredient-${ingredient}">
            <label class="form-check-label" for="ingredient-${ingredient}">${ingredient}</label>
        `;
        dropdownMenu.appendChild(checkbox);
    });
}


function filterRecipes() {
    const selectedIngredients = Array.from(document.querySelectorAll('#ingredientDropdownMenu .form-check-input:checked')).map(input => input.value.toLowerCase());
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    const recipeItems = document.querySelectorAll('.recipe-item');

    recipeItems.forEach(item => {
        const itemIngredients = item.getAttribute('data-ingredients').toLowerCase().split(' ');
        const matches = selectedIngredients.map(ingredient => itemIngredients.includes(ingredient));

        const shouldDisplay =
            searchType === 'AND' ? matches.every(match => match) : matches.some(match => match);

        item.style.display = shouldDisplay ? 'block' : 'none';
    });
}

function resetRecipeFilters() {
    const checkboxes = document.querySelectorAll('#ingredientDropdownMenu .form-check-input');
    checkboxes.forEach(checkbox => (checkbox.checked = false));

    document.getElementById('andSearch').checked = true; // AND検索をデフォルトに
    const recipeItems = document.querySelectorAll('.recipe-item');
    recipeItems.forEach(item => (item.style.display = 'block'));
}

