import './js/init';
import axios from 'axios';


const fetchPostsBtn = document.querySelector('.btn');
const postsList = document.querySelector('.posts');
const apiKey = '48254147-b4b10b5266c157a9a3946e15d';
const url = `https://pixabay.com/api/?key=${apiKey}&${searchParams.toString()}`;

let page = 1;
let perPage = 40;

fetchPostsBtn.addEventListener('click', async () => {
  try {
    const posts = await fetchPostsBtn();
    renderPosts(posts);
    page += 1;
    if (page > 1) {
      fetchPostsBtn.textContent = 'LOAD MORE';
    }
  } catch (error) {
    console.log(error);
  }
});
async function fetchPosts() {
  const params = new URLSearchParams(
    {
      _limit: perPage,
      _page: page,
    }
  );
  const response = await axios.get(url);
  return response.data;
}
function renderPosts(posts) {
  const markup = posts.map(({ id, tiitle, body, userId }) => {
    return `<li>
    <h2 class="post-title">${tiitle.slice(0, 30)}</h2>
    <p><b>Post Id</b>: ${id}</p>
    <p><b>Author Id</b>: ${userId}</p>
    <p>${body}</p>
    </li>
    `;
  })
    .join("");
  postsList.insertAdjacentHTML('beforeend', markup);
}

