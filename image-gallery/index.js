const urlDefault =
  'https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=20YMWruSfryYAX6ydVUA7oHD71nN4Zu4J2sSnp-afwI&query=dark';
const urlForSearch =
  'https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=20YMWruSfryYAX6ydVUA7oHD71nN4Zu4J2sSnp-afwI&query=';
const alertBlock = document.querySelector('.alert-block');
const btnSearch = document.querySelector('.btn-search');
const form = document.querySelector('.form');
const mainImg = document.querySelector('.main-img');
const search = document.querySelector('.search');

// get data from API
async function getImages(url) {
  const res = await fetch(url);
  const apiAnswer = await res.json();
  const lengthObjImages = apiAnswer.results.length;
  showImages(apiAnswer);
  hasInvalidSearch(lengthObjImages);
}

// show data on page
function showImages(apiAnswer) {
  mainImg.innerHTML = '';
  alertBlock.innerHTML = '';
  alertBlock.classList.remove('height100');
  apiAnswer.results.forEach((e) => {
    const blockImg = document.createElement('div');
    const img = document.createElement('img');
    const btnDownload = document.createElement('button');
    const linkForDownload = document.createElement('a');
    const arrowDownload = document.createElement('img');
    blockImg.classList.add('block-img');
    img.classList.add('img');
    mainImg.append(blockImg);
    blockImg.append(img);
    //new
    blockImg.append(btnDownload);
    btnDownload.append(linkForDownload);
    linkForDownload.append(arrowDownload);
    //new
    img.setAttribute('alt', 'query images');
    img.src = e.urls.thumb;
    img.src = e.urls.regular;
    linkForDownload.href = e.links.download;
    linkForDownload.setAttribute('target', '_blank');
    arrowDownload.src = './src/img/download-icon.svg';
    arrowDownload.classList.add('icon-download');
    btnDownload.classList.add('btn-download');
  });
}

// submit query
function submitQuery(e) {
  e.preventDefault();
  const queryUrl = `${urlForSearch}${search.value}`;
  if (search.value) {
    getImages(queryUrl);
  }
}

form.addEventListener('submit', submitQuery);
btnSearch.addEventListener('click', submitQuery);

// checking for invalid value
function hasInvalidSearch(lengthObjImages) {
  if (lengthObjImages === 0) {
    alertBlock.classList.add('height100');
    alertBlock.innerHTML =
      '<p class="text-alert change">Nothing was found for the query' +
      ' "' +
      search.value +
      '".' +
      'Try again...</p>';
  }
}
getImages(urlDefault);
