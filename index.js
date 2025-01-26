import{i as y,a as h,S as g}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();window.global||(window.global=window);let c=1,v=40,p=[],d="";const w=document.querySelector("#searchForm"),u=document.querySelector("#gallery"),i=document.querySelector(".loader"),n=document.querySelector("#loadMoreBtn");w.addEventListener("submit",async function(r){r.preventDefault();const t=document.querySelector("#search").value.trim();t!==d&&(d=t,c=1,p=[]),i.style.display="block";try{const s=await m(t);s.length<=0?(y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.classList.add("hidden")):(p=s,f(s),c+=1,n.classList.remove("hidden")),document.querySelector("#search").value=""}catch(s){console.log(s.message),n.classList.add("hidden")}finally{i.style.display="none"}});async function m(r){const t="48254147-b4b10b5266c157a9a3946e15d",s=new URLSearchParams({q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:v,page:c}),a=`https://pixabay.com/api/?key=${t}&${s.toString()}`;return(await h.get(a)).data.hits}function f(r,t=!1){const s=r.map(e=>`
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
      `).join("");t?u.innerHTML+=s:u.innerHTML=s,new g(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}n.addEventListener("click",async function(r){r.preventDefault(),i.style.display="block";try{const t=await m(d);f(t,!0),c+=1}catch(t){console.log(t.message)}finally{i.style.display="none"}});
//# sourceMappingURL=index.js.map
