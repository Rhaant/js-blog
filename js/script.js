/* eslint-disable linebreak-style */
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
  this.classList.add('active');
  let atribute = this.getAttribute('href');
  let targetAtribute = document.querySelector(atribute);
  targetAtribute.classList.add('active');
  console.log(targetAtribute);
}

function removePostLinks () {
  let listItems = document.querySelectorAll('.titles li');

  for (let listItem of listItems){
    listItem.remove();
  }

}

function generatePostLinks () {

  removePostLinks();

  let articleLists = document.querySelectorAll('.post');
    
  for (let article of articleLists){
    let articleId = article.getAttribute('id');
    let articleTitle = article.querySelector('.post-title').innerHTML;
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
  removePostLinks();
  const href = this.getAttribute('href');
  console.log(`${href}`);
  const tags = document.querySelectorAll('.list .titles .active');
  for (let tag of tags){
    tag.classList.remove('active');
    // console.log(tag);
  }
  const activeTags = document.querySelectorAll(`article a[href="${href}"]`);
  console.log(activeTags);
  for (let activeTag of activeTags){
    const hrefTag = activeTag.closest('article').getAttribute('id');
    const postLinkName = activeTag.closest('article').querySelector('.post-title').innerHTML;
    const newTag = document.createElement('li');
    newTag.innerHTML = `<a href=#${hrefTag}><span>${postLinkName}</span</a>`;
    document.querySelector('.wrapper ul').appendChild(newTag);
    console.log(hrefTag);
    console.log(postLinkName);

  }


}

function addClickListenersToTags(){
  const links = document.querySelectorAll('.post-tags a');
  for (let link of links){
    link.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {

  const authors = document.querySelectorAll('.authors li');
  console.log(authors);
  for (let author of authors){
    author.remove();
  }
  const newAuthors = document.querySelectorAll('article');
  let authorsList = [];
  for (let newAuthor of newAuthors){
    const authorData = newAuthor.getAttribute('data-author');
    if (authorsList.includes(authorData)){
      continue;
    }else {
      authorsList.push(authorData);
      const authorTag = document.createElement('li');
      authorTag.innerHTML = `<a href="${authorData}"><span class="author-name">${authorData}</span></a>`;
      console.log(authorData);
      document.querySelector('ul.authors').appendChild(authorTag);  
    }

      
  }

}

function authorsClickHandler(){
  event.preventDefault();
  removePostLinks();
  console.log(this);
  const href = this.getAttribute('href');
  console.log(href);
  const articleAuthors = document.querySelectorAll(`[data-author="${href}"]`);
  console.log(articleAuthors);
  for (let articleAuthor of articleAuthors){
    const articleID = articleAuthor.getAttribute('id');
    console.log(articleID);
    const tagLink = document.createElement('li');
    tagLink.innerHTML = `<a href=#${articleID}><span>${articleID}</span</a>`;
    document.querySelector('.titles').appendChild(tagLink);
  }
}

function generateAuthorsLink() {
  const authors = document.querySelectorAll('.authors a');
  for (let author of authors){
    author.addEventListener('click', authorsClickHandler);
  }
}

/* PROGRAM */

generatePostLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
generateAuthorsLink();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
