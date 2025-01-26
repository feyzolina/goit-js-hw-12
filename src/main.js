import './js/init';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let page = 1;  // Sayfa numarasını takip et
let perPage = 40;
let loadedPosts = [];  // Yüklenen postları tutacağımız dizi
let currentSearchTerm = '';  // Şu anki arama terimini tutacağımız değişken
const searchForm = document.querySelector('#searchForm');
const galleryDiv = document.querySelector('#gallery');
const loadingSpinnerDiv = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('#loadMoreBtn');

// Arama formu submit edildiğinde
searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const search = document.querySelector('#search').value.trim();

  // Eğer yeni bir arama yapılıyorsa, sayfayı sıfırlayalım
  if (search !== currentSearchTerm) {
    currentSearchTerm = search;
    page = 1;
    loadedPosts = [];  // Eski postları temizle
  }

  loadingSpinnerDiv.style.display = 'block';

  try {
    const posts = await fetchPosts(search);

    if (posts.length <= 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
      loadMoreBtn.classList.add('hidden');  // Butonu gizle
    } else {
      loadedPosts = posts;  // Yeni postları yüklü postlar olarak kaydediyoruz
      renderPosts(posts);  // Başlangıçta galeriyi sıfırlayıp yeni fotoğrafları ekle
      page += 1;  // Sayfa numarasını artır
      loadMoreBtn.classList.remove('hidden');  // "Load More" butonunu göster
    }

    document.querySelector('#search').value = '';  // Arama kutusunu temizle

  } catch (error) {
    console.log(error.message);
    loadMoreBtn.classList.add('hidden');  // Hata durumunda butonu gizle
  } finally {
    loadingSpinnerDiv.style.display = 'none';
  }
});

// Postları alacak fonksiyon
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
  return response.data.hits;  // API'den gelen resimleri döndür
}

// Postları render edecek fonksiyon
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
    galleryDiv.innerHTML += galleryContent;  // Yeni fotoğrafları mevcut galerinin sonuna ekle
  } else {
    galleryDiv.innerHTML = galleryContent;  // Başlangıçta galeriyi sıfırla ve yeni fotoğrafları ekle
  }

  // Fotoğraflar açılır pencere ile görüntülenmesi için
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
  });
  lightbox.refresh();
}

// Load More butonuna tıklandığında
loadMoreBtn.addEventListener('click', async function (event) {
  event.preventDefault();
  loadingSpinnerDiv.style.display = 'block';

  try {
    // Önceki aramanın devamını alıyoruz
    const posts = await fetchPosts(currentSearchTerm);

    // Mevcut fotoğrafların üzerine yeni fotoğrafları ekle
    renderPosts(posts, true);

    page += 1;  // Sayfa numarasını artır
  } catch (error) {
    console.log(error.message);
  } finally {
    loadingSpinnerDiv.style.display = 'none';
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



