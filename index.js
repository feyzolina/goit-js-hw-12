import{a as w,S as b,i as d}from"./assets/vendor-DEenWwFD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();window.global||(window.global=window);let l=1,f=140,m=[],u="";const L=document.querySelector("#searchForm"),h=document.querySelector(".gallery"),p=document.querySelector(".loader"),a=document.querySelector("#loadMoreBtn");function g(){console.log("Yükleme başladı, buton gizleniyor"),p.style.display="block",a.classList.add("hidden")}function S(){console.log("Yükleme bitti, buton görünür oluyor"),p.style.display="none",a.classList.remove("hidden")}function c(r){r==="noImages"?d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):r==="endOfResults"?d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):d.error({message:"An unexpected error occurred. Please try again later.",position:"topRight"})}L.addEventListener("submit",async function(r){r.preventDefault();const s=document.querySelector("#search").value.trim();s!==u&&(u=s,l=1,m=[]),g();try{const t=await y(s);t.length<=0?(c("noImages"),a.classList.add("hidden"),document.querySelector("#search").value=""):(m=t,v(t),l+=1,a.classList.remove("hidden")),document.querySelector("#search").value=""}catch(t){console.log(t)}finally{p.style.display="none"}});async function y(r){const s="48254147-b4b10b5266c157a9a3946e15d",t=new URLSearchParams({q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:f,page:l}),n=`https://pixabay.com/api/?key=${s}&${t.toString()}`;try{const e=await w.get(n),o=e.data.totalHits,i=Math.ceil(o/f);if(o===0)throw new Error("noImages");if(l>=i)throw new Error("endOfResults");return e.data.hits}catch(e){throw e.message==="noImages"?(c("noImages"),document.querySelector("#search").value=""):e.message==="endOfResults"?c("endOfResults"):c("unexpected"),e}}function v(r,s=!1){const t=r.map(e=>`
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
      `).join("");s?h.insertAdjacentHTML("beforeend",t):h.innerHTML=t,new b(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}a.addEventListener("click",async function(r){r.preventDefault(),g();try{const s=await y(u);v(s,!0),l+=1;const t=document.querySelectorAll(".image-card");if(t.length>0){const n=t[0].getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}catch{a.classList.contains("hidden")||c("unexpected")}finally{S()}});
//# sourceMappingURL=index.js.map
