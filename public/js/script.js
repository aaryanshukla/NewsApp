document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-query').value;
        fetchNews(query);
    });
});

function fetchNews(query = '') {
    fetch(`/news?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            displayNews(data.articles);
        })
        .catch(error => console.error('Error fetching news:', error));
}


function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No articles found.</p>';
        return;
      }

    articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'news-item';
        div.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(div);
    });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchNews();
  });
  
  function fetchNews() {
    const query = document.getElementById('search-query').value;
    const from = document.getElementById('search-from').value;
    const to = document.getElementById('search-to').value;
    const language = document.getElementById('search-language').value;
    const sortBy = document.getElementById('search-sortby').value;
    const bias = document.getElementById('search-bias').value;

    
  
    let url = '/news?';
    url += query ? `q=${encodeURIComponent(query)}&` : '';
    url += from ? `from=${encodeURIComponent(from)}&` : '';
    url += to ? `to=${encodeURIComponent(to)}&` : '';
    url += language ? `language=${encodeURIComponent(language)}&` : '';
    url += sortBy ? `sortBy=${encodeURIComponent(sortBy)}` : '';
    url += bias ? `bias=${encodeURIComponent(bias)}&` : '';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayNews(data.articles);
      })
      .catch(error => console.error('Error fetching news:', error));
  }
  