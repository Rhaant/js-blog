/* eslint-disable linebreak-style */
'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}

let fontSize = 0;
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
//   console.log(targetAtribute);
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
    // linkHtml.innerHTML = `<a href=#${articleId}><span>${articleTitle}</span></a>`;
    const linkHTMLData = {id: articleId, title: articleTitle};
    linkHtml.innerHTML = templates.articleLink(linkHTMLData);
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
      const tagHTMLData = {id: dataTag, title: dataTag};
      tag.innerHTML = templates.tagLink(tagHTMLData);
      // tag.innerHTML = `<a href=#tag-${dataTag}><span>${dataTag}&nbsp;</span></a>`;
      article.querySelector('.list').appendChild(tag);
    //   console.log(dataTag);
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
  //   console.log(activeTags);
  for (let activeTag of activeTags){
    const hrefTag = activeTag.closest('article').getAttribute('id');
    const postLinkName = activeTag.closest('article').querySelector('.post-title').innerHTML;
    const newTag = document.createElement('li');
    const tagHTMLData = {id: hrefTag, title: postLinkName};
    newTag.innerHTML = templates.tagLink(tagHTMLData);
    // newTag.innerHTML = `<a href=#${hrefTag}><span>${postLinkName}</span</a>`;
    document.querySelector('.wrapper ul').appendChild(newTag);
    // console.log(hrefTag);
    // console.log(postLinkName);

  }


}

function addClickListenersToTags(){
  const links = document.querySelectorAll('.post-tags a');
  for (let link of links){
    link.addEventListener('click', tagClickHandler);
  }
  const cloudLinks = document.querySelectorAll('aside .tags a');
  for (let cloudLink of cloudLinks){
    cloudLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthors() {

  const authors = document.querySelectorAll('.authors li');
  //   console.log(authors);
  for (let author of authors){
    author.remove();
  }
  const newAuthors = document.querySelectorAll('article');
  let authorsList = [];
  const authorCounter = {};
  for (let newAuthor of newAuthors){
    const authorData = newAuthor.getAttribute('data-author');
    authorsList.push(authorData);
    const authorPost = newAuthor.querySelector('p');
    const tagHTMLData = {id: authorData, title: authorData};
    authorPost.innerHTML = templates.tagLink(tagHTMLData);
    // authorPost.innerHTML = `<a href="${authorData}"><span>${authorData}</span></a>`;
    authorPost.querySelector('a').addEventListener('click', authorsClickHandler);
      
  }
  authorsList.forEach(function(author){
    authorCounter[author] = (authorCounter[author] || 0)+1;
  });
  for (let key in authorCounter){
    const linkHtml = document.createElement('li');
    const linkHTMLData = {id: key, title: key, counter: authorCounter[key] };
    linkHtml.innerHTML = templates.authorLink(linkHTMLData);
    // linkHtml.innerHTML = `<a href="${key}"><span class="author-name">${key}&nbsp; ${authorCounter[key]}</span></a>`;
    document.querySelector('ul.authors').appendChild(linkHtml);
  }

}

function authorsClickHandler(){
  event.preventDefault();
  console.log(document.querySelector('ul.list.titles'));
  removePostLinks();

  const href = this.getAttribute('href');
  const articleAuthors = document.querySelectorAll(`[data-author="${href}"]`);
  for (let articleAuthor of articleAuthors){
    const articleID = articleAuthor.getAttribute('id');
    let tagLink = document.createElement('li');
    const tagHTMLData = {id: articleID, title: articleID};
    tagLink.innerHTML = templates.tagLink(tagHTMLData);
    // tagLink.innerHTML = `<a href=#${articleID}><span>${articleID}</span></a>`;
    document.querySelector('ul.list.titles').append(tagLink);
    let postLinkList = document.querySelector('ul.list.titles');
    postLinkList.appendChild(tagLink);

    }
}

function generateAuthorsLink() {
  const authors = document.querySelectorAll('.authors a');
  for (let author of authors){
    author.addEventListener('click', authorsClickHandler);
  }
}

function generateTagsLinks() {
  const articles = document.querySelectorAll('article');
  const tagsCounter = {};
  let listOfTags = [];
  for (let article of articles){
    const articleTags = article.getAttribute('data-tags').split(' ');
    for (let articleTag of articleTags){
      listOfTags.push(articleTag);
    }
    // console.log(listOfTags);
  }
  listOfTags.forEach(function(tag){
    tagsCounter[tag] = (tagsCounter[tag] || 0)+1;
  });
  //   console.log(tagsCounter);
  for (let key in tagsCounter){
    const linkHtml = document.createElement('li');
    const tagHTMLData = {id: key, title: key};
    linkHtml.innerHTML = templates.tagLink(tagHTMLData);
    // linkHtml.innerHTML = `<a href=#tag-${key}><span>${key}&nbsp&nbsp;</span></a>`;
    fontSize = Math.floor((tagsCounter[key]+1)*0.5);
    linkHtml.classList.add(`tag-size-${fontSize}`);
    document.querySelector(`aside .tags`).appendChild(linkHtml);
    // console.log(key);
  }

  let value = Object.keys(tagsCounter).map((key)=>{return tagsCounter[key];});
  let min = Math.min.apply(null, value);
  let max = Math.max.apply(null, value);
  console.log(min, max);
}


function generateAuthorsName () {
  let authorNames = document.querySelectorAll('article');
  for (let authorName of authorNames){

  }
}



/* PROGRAM */

generatePostLinks();
generateTags();
generateTagsLinks();
addClickListenersToTags();
generateAuthors();
generateAuthorsLink();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
