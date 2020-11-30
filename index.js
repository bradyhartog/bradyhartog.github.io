/*
	Define constants.
*/

// Colors.
let grayLo = '#252525';
let grayMidLo = '#616161';
let grayMidHi = '#9D9D9D';
let grayHi = '#D9D9D9';

// Animation parameters.
let navOpacityStep = 0.05;
let navOpacityStepCount = Math.round(1 / navOpacityStep);
let navInterval = 5;

/*
	Expands and condenses the navigator.
*/
function toggleNav() {
	let navCondensed = document.getElementById('nav-condensed');
	let navExpanded = document.getElementById('nav-expanded');
	
	if (navExpanded.style.display === 'block') {
		let opacityOfNavCon = 0;
		let opacityOfNavExp = 1;
		
		let interval = setInterval(condense, navInterval);
		let intervalStep = 0;
		
		navCondensed.style.display = 'block';
		
		function condense() {
			if (intervalStep === navOpacityStepCount) {
				clearInterval(interval);
				
				navExpanded.style.display = 'none';
				
				return;
			}
			
			opacityOfNavCon += navOpacityStep;
			opacityOfNavExp -= navOpacityStep;

			navCondensed.style.opacity = opacityOfNavCon;
			navExpanded.style.opacity = opacityOfNavExp;

			intervalStep++;
		}
	}
	else {
		let opacityOfNavCon = 1;
		let opacityOfNavExp = 0;
		
		let interval = setInterval(expand, navInterval);
		let intervalStep = 0;
		
		navExpanded.style.display = 'block';
		
		function expand() {
			if (intervalStep === navOpacityStepCount) {
				clearInterval(interval);
				
				navCondensed.style.display = 'none';
				
				return;
			}
			
			opacityOfNavCon -= navOpacityStep;
			opacityOfNavExp += navOpacityStep;
			
			navCondensed.style.opacity = opacityOfNavCon;
			navExpanded.style.opacity = opacityOfNavExp;

			intervalStep++;
		}
	}
}

/*
	Reveals and conceals the ith .sub-menu belonging to the jth .menu-item.
*/
function showSubMenu(i, j) {
	let subMenu = document.getElementsByClassName('sub-menu').item(i);
	let menuItem = document.getElementsByClassName('menu-item-select').item(j);
	
	if (subMenu.style.display === 'block') {
		subMenu.style.display = '';
		menuItem.style.backgroundColor = '';
	}
	else {
		subMenu.style.display = 'block';
		menuItem.style.backgroundColor = 'rgba(217, 217, 217, 0.12)';
	}
}

/*
*/
function setSitePath(p1, p2) {
	document.getElementById('site-path').innerHTML = p1 + ' ' + p2;
	
	document.
}

function getHTML() {
  let z, i, elmnt, file, xhttp, html;
	
  // Loop through a collection of all HTML elements.
  z = document.getElementsByTagName('*');
	
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
		
    // Search for elements with the 'include' atrribute.
    file = elmnt.getAttribute('include');
		
//		console.log(file);
		
    if (file) {
      // Make an HTTP request using the attribute value as the file name.
      xhttp = new XMLHttpRequest();
			
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) html = this.responseText;
          if (this.status == 404) html = 'Page not found.';
					
					console.log(html);
					
          // Remove the attribute, and call this function once more.
          elmnt.removeAttribute('include');
          getHTML();
        }
      } 
			
      xhttp.open('GET', file, true);
      xhttp.send();
			
			console.log(html);
      return html;
    }
  }
}

/*
	Includes the content of an HTML file within another HTML file. Adapted from
	W3Schools.
*/
/*
function includeHTML() {
  let z, i, elmnt, file, xhttp;
	
  // Loop through a collection of all HTML elements.
  z = document.getElementsByTagName('*');
	
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
		
    // Search for elements with the 'include' atrribute.
    file = elmnt.getAttribute('include');
		
    if (file) {
      // Make an HTTP request using the attribute value as the file name.
      xhttp = new XMLHttpRequest();
			
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) elmnt.innerHTML = this.responseText;
          if (this.status == 404) elmnt.innerHTML = 'Page not found.';
					
          // Remove the attribute, and call this function once more.
          elmnt.removeAttribute('include');
          includeHTML();
        }
      } 
			
      xhttp.open('GET', file, true);
      xhttp.send();
			
      return;
    }
  }
}
*/

/*
function pageSetup(p1, p2) {
	includeHTML();
	setSitePath('Work', 'Design');
}
*/
