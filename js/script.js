'use strict';
/* FUNKCJE */

function remove () {
    /* remove all active classes from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');
    
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    
    /* remove all active classes from article posts */
    const activeArticles = document.querySelectorAll('.posts article.active');
    
    for (let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    
    }

function titleClickHandler(){ 
    event.preventDefault();
    remove();
    this.classList.add('active')
    let atribute = this.getAttribute('href');
    let targetAtribute = document.querySelector(atribute);
    targetAtribute.classList.add('active');
    console.log(targetAtribute);
}

/* PROGRAM */

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


// const articleNames = document.querySelectorAll('.titles a');

// for (let articleName of articleNames){
// }

// // const articleIds = document.querySelectorAll('post');

// // for (let articleId of articleIds) {
    
// }

