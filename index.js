import{i as a,a as w,S as L}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();window.global||(window.global=window);let l=1,u=40,p=[],d="";const b=document.querySelector("#searchForm"),h=document.querySelector(".gallery"),g=document.querySelector(".loader"),n=document.querySelector("#loadMoreBtn");function m(){g.style.display="block",n.classList.add("hidden")}function f(){g.style.display="none",n.classList.remove("hidden")}b.addEventListener("submit",async function(o){o.preventDefault();const t=document.querySelector("#search").value.trim();t!==d&&(d=t,l=1,p=[]),m();try{const s=await y(t);s.length<=0?(a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.classList.add("hidden")):(p=s,v(s),l+=1,n.classList.remove("hidden")),document.querySelector("#search").value=""}catch{a.error({message:"An error occurred while fetching results. Please try again later.",position:"topRight"})}finally{f()}});async function y(o){const t="48254147-b4b10b5266c157a9a3946e15d",s=new URLSearchParams({q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:u,page:l}),i=`https://pixabay.com/api/?key=${t}&${s.toString()}`;try{const e=await w.get(i),r=e.data.totalHits,c=Math.ceil(r/u);return l>=c&&(a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n.classList.add("hidden")),e.data.hits}catch(e){throw console.error("Fetch error:",e),e.response?a.error({message:`An error occurred while fetching the data. Status: ${e.response.status}`,position:"topRight"}):e.request?a.error({message:"No response received from the server. Please check your internet connection.",position:"topRight"}):a.error({message:"An unexpected error occurred. Please try again later.",position:"topRight"}),e}}function v(o,t=!1){const s=o.map(e=>`
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
      `).join("");t?h.insertAdjacentHTML("beforeend",s):h.innerHTML=s,new L(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}n.addEventListener("click",async function(o){o.preventDefault(),m();try{const t=await y(d);v(t,!0),l+=1;const s=document.querySelectorAll(".image-card");if(s.length>0){const i=s[0].getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}}catch{n.classList.contains("hidden")||a.error({message:"An error occurred while loading more images. Please try again later.",position:"topRight"})}finally{f()}});
//# sourceMappingURL=index.js.map
