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
    remove();
    event.preventDefault();
    this.classList.add('active')
    let atribute = this.getAttribute('href');
    let targetAtribute = document.querySelector(atribute);
    targetAtribute.classList.add('active');
    console.log(targetAtribute);
}

function generatePostLinks () {

    // remove all elements from list  
    let listItems = document.querySelectorAll('.titles li');

    for (let listItem of listItems){
        listItem.remove();
}

    let articleLists = document.querySelectorAll('.post');
    
    for (let article of articleLists){
        let articleId = article.getAttribute('id')
        let articleTitle = article.querySelector('.post-title').innerHTML
        let linkHtml = document.createElement('li');
        linkHtml.innerHTML = `<a href=#${articleId}><span>${articleTitle}</span></a>`;
        document.querySelector('.titles').append(linkHtml);
        // console.log(linkHtml);
        // console.log(articleId);
        // console.log(articleTitle);
    }
    }

function generateTags() {
        removeTags();
        const articles = document.querySelectorAll('.posts article');

        for( let article of articles) {
            const dataTags = article.getAttribute('data-tags').split(' ');
            for (let dataTag of dataTags){
                const tag = document.createElement('li');
                tag.innerHTML = `<a href=#tag-${dataTag}><span>${dataTag}&nbsp;</span></a>`;
                article.querySelector('.list').appendChild(tag);
                console.log(dataTag);
            }

        }
    }

function removeTags(){
        const tags = document.querySelectorAll('.post-tags .list li');

        for (let tag of tags) {
           tag.remove();
        }
    }

function tagClickHandler(){
    event.preventDefault();
    const href = this.getAttribute('href');
    console.log(href);
    const tags = document.querySelectorAll('.active');
    for (let tag of tags){
        tag.classList.remove('active');
        console.log(tag);
    }
    const activeTags = document.querySelectorAll(`article a[href="${href}"]`);
    console.log(activeTags);
    for (let activeTag of activeTags){
        console.log(activeTag.closest('article'))
        // console.log(activeTag);
    }


}

function addClickListenersToTags(){
    const links = document.querySelectorAll('.post-tags a');
    for (let link of links){
        link.addEventListener('click', tagClickHandler);
    }
}


/* PROGRAM */

generatePostLinks();
generateTags();
addClickListenersToTags();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
