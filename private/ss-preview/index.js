/*
  Writes the <head> element for any given page.
*/
function writeHead() {
  let title = document.createElement('title');
  let stylesheet = document.createElement('link');
  let favicon = document.createElement('link');
  let touchIcon = document.createElement('link');
  let meta = document.createElement('meta');
  
  title.innerHTML = 'Strategic Sciences';
  
  stylesheet.type = 'text/css';
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'index.css';
  
  favicon.type = 'image/x-icon';
  favicon.rel = 'icon';
  favicon.href = 'assets/graphics/favicon.png';
  
  touchIcon.rel = 'apple-touch-icon';
  touchIcon.href = '';
  
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0';
  
  document.head.appendChild(title);
  document.head.appendChild(stylesheet);
  document.head.appendChild(favicon);
  document.head.appendChild(touchIcon);
  document.head.appendChild(meta);
}

/*
  Automatically scrolls the page to the element with the given ID.
*/
function jumpTo(id) {
  document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}
