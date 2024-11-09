let searchInputel = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');

function createAndAppendSearchResult(result) {
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item');

    searchResultsEl.appendChild(resultItemEl);

    let {
        title,
        link,
        description
    } = result;
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add('result-title');
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement('a');
    urlEl.classList.add('result-url');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;

    resultItemEl.appendChild(urlEl);

    let lineBreakEl = document.createElement('br');
    resultItemEl.appendChild(lineBreakEl);

    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;

    resultItemEl.appendChild(descriptionEl);
}

function displayresult(searchresults) {
    spinner.classList.toggle('d-none');
    for (let result of searchresults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinner.classList.toggle('d-none');
        let searchInputText = searchInputel.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputText;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayresult(search_results);
            });
    }
}

searchInputel.addEventListener('keydown', searchWikipedia);