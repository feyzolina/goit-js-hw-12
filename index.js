import{i as d,a as m,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();window.global||(window.global=window);let c=1,f=40;const h=document.querySelector("#searchForm"),g=document.querySelector("#gallery"),l=document.querySelector(".loader"),n=document.querySelector("#loadMoreBtn");h.addEventListener("submit",async function(r){r.preventDefault();const t=document.querySelector("#search").value;l.style.display="block";try{const a=await p(t);u(a),c+=1,c>1&&(n.style.display="block")}catch{d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{l.style.display="none"}});async function p(r){const a=`https://pixabay.com/api/?key=48254147-b4b10b5266c157a9a3946e15d&${new URLSearchParams({q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:c}).toString()}`;return(await m.get(a)).data.hits}function u(r){const t=r.map(o=>`
        <a href="${o.largeImageURL}" class="image-card">
          <img src="${o.webformatURL}" alt="${o.tags}" />
          <div class="image-info">
            <div class="likes">
              <p class="likes-text">Likes</p>
              <p class="likes-count">${o.likes}</p>
            </div>
            <div class="views">
              <p class="views-text">Views</p>
              <p class="views-count">${o.views}</p>
            </div>
            <div class="comments">
              <p class="comments-text">Comments</p>
              <p class="comments-count">${o.comments}</p>
            </div>
            <div class="downloads">
              <p class="downloads-text">Downloads</p>
              <p class="downloads-count">${o.downloads}</p>
            </div>
          </div>
        </a>
      `).join("");g.innerHTML=t,new y(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}n.addEventListener("click",async function(){const r=document.querySelector("#search").value;n.textContent="Loading...";try{const t=await p(r);u(t),c+=1}catch{d.error({message:"Sorry, there are no more images available.",position:"topRight"})}finally{n.textContent="Load More"}});
//# sourceMappingURL=index.js.map
