/*
	Define constants.
*/

// Colors.
let grayLo = '#252525';
let grayMidLo = '#616161';
let grayMidHi = '#9D9D9D';
let grayHi = '#D9D9D9';

// Animation parameters.
let opacityStep = 0.03;
let opacityStepCount = Math.round(1 / opacityStep);
// Include params in animateContent.

/**/
function showModal(content) {
	toggleModal();	
	use(content, 'modal-content-container', animateContent);
}

/**/
function hideModal() {
	// Check if the prior animation has finished to prevent duplicate animations.
	if (document.getElementById('modal-content').style.top === '0%') {
		animateContent();
		setTimeout(toggleModal, 275);	
	}
}

/**/
function toggleModal() {
	let n = document.getElementById('main-nav');
	let m = document.getElementById('modal');
	
	if (m.style.display === 'block') {
		let t = n;
		n = m;
		m = t;
	}
	
	let nOpacity = 1;
	let mOpacity = 0;

	let interval = setInterval(fade, 5);
	let intervalStep = 0;

	m.style.display = 'block';

	function fade() {
		if (intervalStep === opacityStepCount) {
			clearInterval(interval);

			n.style.display = 'none';
			
			// Reset the scroll position of the modal content.
			document.getElementById('modal-content').scrollTop = 0;

			return;
		}

		nOpacity -= opacityStep;
		mOpacity += opacityStep;

		n.style.opacity = nOpacity;
		m.style.opacity = mOpacity;

		intervalStep++;
	}
}

/*
	Configures the navigable site path of a page as displayed in the nav.
	
	At present, this function is intended to configure the path of a site with
	only two lower levels.
*/
/*
function setNavPath() {
	let dirs = document.location.pathname.split('/');
	let slct = document.getElementsByClassName('dir-select');  // Selectors.
	
	// If the page is at least one level deep, include the current directory.
	if (dirs.length > 2) {
		let currentDir = dirs[dirs.length - 2];
		
		slct[slct.length - 1].style.display = 'table-cell';
		slct[slct.length - 1].setAttribute('href', currentDir + '.html');
		
		document.getElementById('current-dir').innerHTML = toTitleCase(currentDir);
	}
	
	// If the page is two levels deep, include the upper directory.
	if (dirs.length > 3) {
		let upperDir = dirs[dirs.length - 3];
		
		slct[slct.length - 2].style.display = 'table-cell';
		slct[slct.length - 2].setAttribute('href', '../' + upperDir + '.html');
		
		document.getElementById('upper-dir').innerHTML = toTitleCase(upperDir);
	}
}
*/

/**/
function setSiteSection() {
	let dirs = document.location.pathname.split('/');
	
	if (dirs.length > 2) {
		let currentDir = dirs[dirs.length - 2];
		let ss = document.getElementsByClassName('site-section');
		
		for (s of ss)
			s.innerHTML = toTitleCase(currentDir);
	}
}

/*
	[REWRITE]
	Populates an HTML component.
	
	Parameters:
	• path						The file path to the component relative to the components
										directory.
	• containerName		The class name of the container element(s) into which to
										populate the component.
	• callback				The function to call after the component has been populated,
										if any.
*/
function use(path, containerName, callback) {
	let containers = document.getElementsByClassName(containerName);
	
	let req = new XMLHttpRequest();
			
	req.onreadystatechange = populate;
	req.addEventListener('load', callback);
	req.open('GET', path, true);
	req.send();
	
	function populate() {
		if (this.status == 200 && this.readyState == 4)
			for (container of containers)
				container.innerHTML = this.responseText;
		
		if (this.status == 404)
			console.log('Component not found: ' + path);
	}
}

/*
	Writes the <head> element for any given page.
*/
function writeHead() {
	let title = document.createElement('title');
	let stylesheet = document.createElement('link');
	let favicon = document.createElement('link');
	let touchIcon = document.createElement('link');
	let meta = document.createElement('meta');
	
	title.innerHTML = 'Brady Hartog';
	
	stylesheet.type = 'text/css';
	stylesheet.rel = 'stylesheet';
	stylesheet.href = '/index.css';
	
	favicon.type = 'image/x-icon';
	favicon.rel = 'icon';
	favicon.href = '/global/images/favicon.png';
	
	touchIcon.rel = 'apple-touch-icon';
	touchIcon.href = '/global/images/apple-touch-icon.png';
	
	meta.name = 'viewport';
	meta.content = 'width=device-width, initial-scale=1.0';
	
	document.head.appendChild(title);
	document.head.appendChild(stylesheet);
	document.head.appendChild(favicon);
	document.head.appendChild(touchIcon);
	document.head.appendChild(meta);
}

/**/
function setGalleryItems() {
	let items = document.getElementsByClassName('gallery-item-container');
	
	for (item of items) {
		let type = item.getAttribute('data-type');
		let ref = item.getAttribute('data-ref');
		let imageSrc = item.getAttribute('data-image-src');  // Move to below switch?
		
		/*
		switch (type) {
			case 'article':
				item.setAttribute('onclick', 'showModal("' + ref +'")');
				break;
			case 'audio':
				//
				break;
			case 'image':
				//
				break;
			case 'video':
				//
		}
		*/
		
		let image = item.getElementsByClassName('gallery-image')[0];
		let label = item.getElementsByClassName('gallery-label')[0];
		let sublabel = item.getElementsByClassName('gallery-sublabel')[0];
		
		image.setAttribute('src', imageSrc);
		label.innerHTML = item.getAttribute('data-label');
		sublabel.innerHTML = item.getAttribute('data-sublabel');
		item.setAttribute('onclick', 'showModal("' + ref +'")');
	}
}

/**/
function animateContent() {
	let content = document.getElementById('modal-content');
	
	let pos = 100;
	let posFinal = 0;
	let k = 0.95;
	
	if (content.style.top === '0%') {
		pos = 0.05;
		posFinal = 100;
		k = 1.05/k;
		
		animate();
	}
	else {
		setTimeout(animate, 250);
	}
	
	function animate() {
		let interval = setInterval(move, 2);
		let intervalStep = 0;

		function move() {
			if (intervalStep === 150) {
				clearInterval(interval);

				content.style.top = posFinal + '%';

				return;
			}
			
			pos *= k;

			content.style.top = pos + '%';

			intervalStep++;
		}
	}
}

/*
	Converts a string to title case by capitalizing the first letter of every
	word as distinguished by spaces. This function does not consider exceptions
	to capitalization such as conjunctions.
*/
function toTitleCase(string) {
	let newString = '';             // Initialize a new string for the conversion.
	let words = string.split(' ');  // Get the words distinguished by spaces.
	
	for (w of words) {
		if (w.length > 0)
			newString += w[0].toUpperCase() + w.substr(1);
	}
	
	return newString;
}