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
    const summary = newsItem.querySelector('.card-text').textContent.toLowerCase();
    return title.includes(searchText) || summary.includes(searchText);
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

document.addEventListener('DOMContentLoaded', function() {
    updateTagStyles();
});
