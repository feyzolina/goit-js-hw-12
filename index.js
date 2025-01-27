import{i as m,a as h,S as g}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();window.global||(window.global=window);let c=1,u=40,v=[],d="";const w=document.querySelector("#searchForm"),p=document.querySelector(".gallery"),l=document.querySelector(".loader"),i=document.querySelector("#loadMoreBtn");w.addEventListener("submit",async function(r){r.preventDefault();const t=document.querySelector("#search").value.trim();t!==d&&(d=t,c=1),l.style.display="block";try{const s=await f(t);s.length<=0?(m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i.classList.add("hidden")):(v=s,y(s),c+=1,i.classList.remove("hidden")),document.querySelector("#search").value=""}catch(s){console.log(s.message),i.classList.add("hidden")}finally{l.style.display="none"}});async function f(r){const t="48254147-b4b10b5266c157a9a3946e15d",s=new URLSearchParams({q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:u,page:c}),a=`https://pixabay.com/api/?key=${t}&${s.toString()}`,e=await h.get(a),o=e.data.totalHits,n=Math.ceil(o/u);return c>=n&&(m.info({message:"We're sorry, but you've reached the end of search results",position:"topCenter"}),i.classList.add("hidden")),e.data.hits}function y(r,t=!1){const s=r.map(e=>`
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
      `).join("");t?p.innerHTML+=s:p.innerHTML=s,new g(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}i.addEventListener("click",async function(r){r.preventDefault(),l.style.display="block";try{const t=await f(d);y(t,!0),c+=1;const s=document.querySelectorAll(".image-card");if(s.length>0){const a=s[0].getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}catch(t){console.log(t.message)}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
