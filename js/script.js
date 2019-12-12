'use strict';

function titleClickHandler(){
  console.log('Link was clicked!');
  console.log(event);
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

/* remove all active classes from all article links */
const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
}

const activeArticles = document.querySelectorAll('.posts article.active');

for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
}