import{i as c,a as g,S as v}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();window.global||(window.global=window);let i=1,p=40,h=[],u="";const w=document.querySelector("#searchForm"),f=document.querySelector(".gallery"),l=document.querySelector(".loader"),d=document.querySelector("#loadMoreBtn");w.addEventListener("submit",async function(r){r.preventDefault();const t=document.querySelector("#search").value.trim();t!==u&&(u=t,i=1,h=[]),l.style.display="block";try{const s=await m(t);s.length<=0?(c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d.classList.add("hidden")):(h=s,y(s),i+=1,d.classList.remove("hidden")),document.querySelector("#search").value=""}catch{c.error({message:"An error occurred while fetching results. Please try again later.",position:"topRight"})}finally{l.style.display="none"}});async function m(r){const t="48254147-b4b10b5266c157a9a3946e15d",s=new URLSearchParams({q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:i}),a=`https://pixabay.com/api/?key=${t}&${s.toString()}`,e=await g.get(a),o=e.data.totalHits,n=Math.ceil(o/p);return i>=n&&(c.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}),d.classList.add("hidden")),e.data.hits}function y(r,t=!1){const s=r.map(e=>`
        <a href="${e.largeImageURL}" class="image-card">
          <img src="${e.webformatURL}" alt="${e.tags}" />
          <div class="image-info">
            <div class="likes">
              <p class="likes-text">Likes</p>
              <p class="likes-count">${e.likes}</p>
            </div>
            <div class="views">
              <p class="views-text">Views</p>
              <p class="views-count">${e.views}</p>
            </div>
            <div class="comments">
              <p class="comments-text">Comments</p>
              <p class="comments-count">${e.comments}</p>
            </div>
            <div class="downloads">
              <p class="downloads-text">Downloads</p>
              <p class="downloads-count">${e.downloads}</p>
            </div>
          </div>
        </a>
      `).join("");t?f.insertAdjacentHTML("beforeend",s):f.innerHTML=s,new v(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}d.addEventListener("click",async function(r){r.preventDefault(),l.style.display="block";try{const t=await m(u);y(t,!0),i+=1;const s=document.querySelectorAll(".image-card");if(s.length>0){const a=s[0].getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}catch{c.error({message:"We're sorry, but you've reached the end of search results",position:"topRight"})}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
