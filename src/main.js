import './js/init';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let page = 1;
let perPage = 40;
const searchForm = document.querySelector('#searchForm');
const galleryDiv = document.querySelector('#gallery');
const loadingSpinnerDiv = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#loadMoreBtn');


searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const search = document.querySelector('#search').value;
  const apiKey = '48254147-b4b10b5266c157a9a3946e15d';

  loadingSpinnerDiv.style.display = 'block';

  try {

    const posts = await fetchPosts(search);
    renderPosts(posts);
    page += 1;

    if (page > 1) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight'
    });
  } finally {
    loadingSpinnerDiv.style.display = 'none';
  }
});

async function fetchPosts(search) {
  const searchParams = new URLSearchParams({
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page
  });
  const url = `https://pixabay.com/api/?key=48254147-b4b10b5266c157a9a3946e15d&${searchParams.toString()}`;
  const response = await axios.get(url);
  return response.data.hits;
}


function renderPosts(images) {
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

  galleryDiv.innerHTML = galleryContent;
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
  });
  lightbox.refresh();
}


loadMoreBtn.addEventListener('click', async function () {
  const search = document.querySelector('#search').value;
  loadMoreBtn.textContent = 'Loading...';
  try {

    const posts = await fetchPosts(search);
    renderPosts(posts);
    page += 1;
  } catch (error) {
    iziToast.error({
      message: 'Sorry, there are no more images available.',
      position: 'topRight'
    });
  } finally {
    loadMoreBtn.textContent = 'Load More';
  }
});



// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250
// });

// document.querySelector('#searchForm').addEventListener('submit', function (event) {
//   event.preventDefault();
//   const search = document.querySelector('#search').value;
//   const apiKey = '48254147-b4b10b5266c157a9a3946e15d';

//   const loadingSpinnerDiv = document.querySelector('.loader');
//   loadingSpinnerDiv.style.display = 'block';

//   const searchParams = new URLSearchParams({
//     q: search,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true
//   });

//   const url = `https://pixabay.com/api/?key=${apiKey}&${searchParams.toString()}`;

//   fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);

//       const galleryDiv = document.querySelector('#gallery');
//       galleryDiv.innerHTML = '';

//       if (data.hits && data.hits.length > 0) {
//         const galleryContent = data.hits.map(image => {
//           return `
//             <a href="${image.largeImageURL}" class="image-card">
//               <img src="${image.webformatURL}" alt="${image.tags}" />
//               <div class="image-info">
//                 <div class="likes">
//                   <p class="likes-text">Likes</p>
//                   <p class="likes-count">${image.likes}</p>
//                 </div>
//                 <div class="views">
//                   <p class="views-text">Views</p>
//                   <p class="views-count">${image.views}</p>
//                 </div>
//                 <div class="comments">
//                   <p class="comments-text">Comments</p>
//                   <p class="comments-count">${image.comments}</p>
//                 </div>
//                 <div class="downloads">
//                   <p class="downloads-text">Downloads</p>
//                   <p class="downloads-count">${image.downloads}</p>
//                 </div>
//               </div>
//             </a>
//           `;
//         }).join('');

//         galleryDiv.innerHTML = galleryContent;
//         lightbox.refresh();
//       } else {
//         iziToast.error({
//           message: 'Sorry, there are no images matching your search query. Please try again!',
//           position: 'topRight'
//         });
//       }

//       loadingSpinnerDiv.style.display = 'none';

//       document.querySelector('#searchForm').reset();
//     })
//     .catch(error => {
//       console.error('API request error:', error);
//     });
// });



