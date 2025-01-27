import './js/init';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let page = 1;
let perPage = 40;
let loadedPosts = [];
let currentSearchTerm = '';
const searchForm = document.querySelector('#searchForm');
const galleryDiv = document.querySelector('.gallery');
const loadingSpinnerDiv = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#loadMoreBtn');


searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const search = document.querySelector('#search').value.trim();

  if (search !== currentSearchTerm) {
    currentSearchTerm = search;
    page = 1;
    loadedPosts = []; 
  }
  loadingSpinnerDiv.style.display = 'block';

  try {
    const posts = await fetchPosts(search);

    if (posts.length <= 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      loadMoreBtn.classList.add('hidden');
    } else {
      loadedPosts = posts;
      renderPosts(posts);
      page += 1;
      loadMoreBtn.classList.remove('hidden');
    }

    document.querySelector('#search').value = '';

  } catch (error) {
    iziToast.error({
      message: "An error occurred while fetching results. Please try again later.",
      position: 'topRight'
    });
  } finally {
    loadingSpinnerDiv.style.display = 'none';
  }
});


async function fetchPosts(search) {
  const apiKey = '48254147-b4b10b5266c157a9a3946e15d';
  const searchParams = new URLSearchParams({
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page
  });
  const url = `https://pixabay.com/api/?key=${apiKey}&${searchParams.toString()}`;
  const response = await axios.get(url);
  const totalHits = response.data.totalHits;
  const totalPages = Math.ceil(totalHits / perPage);

  if (page >= totalPages) {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results",
      position: 'topRight'
    });
    loadMoreBtn.classList.add('hidden');
  }
  return response.data.hits;
}

function renderPosts(images, append = false) {
  const galleryContent = images
    .map(image => {
      return `
        <a href="${image.largeImageURL}" class="image-card">
          <img src="${image.webformatURL}" alt="${image.tags}" />
          <div class="image-info">
            <div class="likes">
              <p class="likes-text">Likes</p>
              <p class="likes-count">${image.likes}</p>
            </div>
            <div class="views">
              <p class="views-text">Views</p>
              <p class="views-count">${image.views}</p>
            </div>
            <div class="comments">
              <p class="comments-text">Comments</p>
              <p class="comments-count">${image.comments}</p>
            </div>
            <div class="downloads">
              <p class="downloads-text">Downloads</p>
              <p class="downloads-count">${image.downloads}</p>
            </div>
          </div>
        </a>
      `;
    }).join('');

  if (append) {
    galleryDiv.insertAdjacentHTML('beforeend', galleryContent);
  } else {
    galleryDiv.innerHTML = galleryContent;
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
  });
  lightbox.refresh();
}

loadMoreBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  loadingSpinnerDiv.style.display = 'block';

  try {
    const posts = await fetchPosts(currentSearchTerm);
    renderPosts(posts, true);
    page += 1;

    const galleryItems = document.querySelectorAll('.image-card');
    if (galleryItems.length > 0) {
      const firstItemHeight = galleryItems[0].getBoundingClientRect().height;

      window.scrollBy({
        top: firstItemHeight * 2.0,
        behavior: 'smooth'
      });
    }

  } catch (error) {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results",
      position: 'topRight'
    });
  } finally {
    loadingSpinnerDiv.style.display = 'none';
  }
});
