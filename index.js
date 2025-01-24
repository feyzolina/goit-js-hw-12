import{i as u,a as m,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();window.global||(window.global=window);let c=1,f=40;const h=document.querySelector("#searchForm"),g=document.querySelector("#gallery"),i=document.querySelector(".loader"),n=document.querySelector("#loadMoreBtn");h.addEventListener("submit",async function(a){a.preventDefault();const t=document.querySelector("#search").value;i.style.display="block";try{c=1;const r=await d(t);r.length<=0?(u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.classList.add("hidden")):(p(r),c+=1,n.classList.remove("hidden")),document.querySelector("#search").value=""}catch(r){console.log(r.message),n.classList.add("hidden")}finally{i.style.display="none"}});async function d(a){const t="48254147-b4b10b5266c157a9a3946e15d",r=new URLSearchParams({q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:c}),s=`https://pixabay.com/api/?key=${t}&${r.toString()}`;return(await m.get(s)).data.hits}function p(a){const t=a.map(s=>`
        <a href="${s.largeImageURL}" class="image-card">
          <img src="${s.webformatURL}" alt="${s.tags}" />
          <div class="image-info">
            <div class="likes">
              <p class="likes-text">Likes</p>
              <p class="likes-count">${s.likes}</p>
            </div>
            <div class="views">
              <p class="views-text">Views</p>
              <p class="views-count">${s.views}</p>
            </div>
            <div class="comments">
              <p class="comments-text">Comments</p>
              <p class="comments-count">${s.comments}</p>
            </div>
            <div class="downloads">
              <p class="downloads-text">Downloads</p>
              <p class="downloads-count">${s.downloads}</p>
            </div>
          </div>
        </a>
      `).join("");g.innerHTML=t,new y(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}n.addEventListener("click",async function(){const a=document.querySelector("#search").value;c+=1,i.style.display="block";try{const t=await d(a);p(t),n.scrollIntoView({behavior:"smooth",block:"end"})}catch(t){console.log(t.message)}finally{i.style.display="none"}});
//# sourceMappingURL=index.js.map
