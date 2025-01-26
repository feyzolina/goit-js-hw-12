import{i as m,a as y,S as f}from"./assets/vendor-DEenWwFD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();window.global||(window.global=window);let c=1,h=40;const g=document.querySelector("#searchForm"),d=document.querySelector("#gallery"),i=document.querySelector(".loader"),n=document.querySelector("#loadMoreBtn");g.addEventListener("submit",async function(r){r.preventDefault();const s=document.querySelector("#search").value.trim();i.style.display="block";try{c=1;const t=await u(s);t.length<=0?(m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.classList.add("hidden")):(p(t),c+=1,n.classList.remove("hidden")),document.querySelector("#search").value=""}catch(t){console.log(t.message),n.classList.add("hidden")}finally{i.style.display="none"}});async function u(r){const s="48254147-b4b10b5266c157a9a3946e15d",t=new URLSearchParams({q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,_limit:h,_page:c}),a=`https://pixabay.com/api/?key=${s}&${t.toString()}`;return(await y.get(a)).data.hits}function p(r,s=!1){const t=r.map(e=>`
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
      `).join("");s?d.innerHTML+=t:d.innerHTML=t,new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}n.addEventListener("click",async function(r){r.preventDefault();const s=document.querySelector("#search").value.trim();i.style.display="block";try{const t=await u(s);p(t,!0),c+=1}catch(t){console.log(t.message)}finally{i.style.display="none"}});
//# sourceMappingURL=index.js.map
