//Grabs clients viewport dimensions, creates an array of them, console logs it, and returns the array. Helper function.
function getClientDimensions() {
	const clientMaxWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const clientMaxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	const maxHeightMaxWidth = [clientMaxHeight, clientMaxWidth];
	console.log(maxHeightMaxWidth);
	return maxHeightMaxWidth; //an array containing max client height and width values.  
}

// Grab and return the home button element.
function getHomeButton() {
	let homeButton = document.getElementById('home');
	return homeButton;
}

function pageLoad() { // This function is a container function for ordering the processes.
	/* Dynamically create an array, with height and width set to the array indexes returned from running the 
        getClientDimensions function. */
    let container = document.getElementById('container')
	let dimensionsArray = getClientDimensions();
	let dimensionsArrayHeight = dimensionsArray[0];
    let dimensionsArrayWidth = dimensionsArray[1];
    container.style.height = dimensionsArrayHeight;
    container.style.width = dimensionsArrayWidth; 
    alert(`Page dimensions set from viewport generated dimensions: Height: ${dimensionsArrayHeight}, Width: ${dimensionsArrayWidth}`);
	// Log for testing. 
	console.log(`Max Client Height Dimension: ${dimensionsArrayHeight}.`);
	console.log(`Max Client Width Dimension: ${dimensionsArrayWidth}`);

    watchWordListener(); // call watchword listener, to alert when button clicked on that span, will be used as anchor. 

	/* Grabbed the homebutton and created it's event listeners */
	let homeButton = getHomeButton();
	homeButton.addEventListener('mouseover', addToDiv);

	/* Add an event listener to when the louse mouse loses focus, calling the buttonLosesFocus
	    function to remove the paragraph from the screen.*/
	homeButton.addEventListener('mouseout', buttonLosesFocus);
	viewportResizeEventListener();
}

function followButtonListener() { 
    let buttons = document.getElementsByClassName('github-button'); 
    for(let i = 0 ; i < buttons.length ; i++) {
        buttons[i].addEventListener('mouseover', largerButtonsOnHover);
    }
    return buttons;
}


// update the client max height and width value when the page resizes. 
function viewportResizeEventListener() {
	window.addEventListener('resize', appendToNavBar);
}


/* called from viewPortResizeEventListener. initialise array with updated height and width **runs getClientDimensions() 
function.  grabs height and width from that, creates string, changes innerHTML of newPara before appending updated details  */
function appendToNavBar(navBarId, newPara, dimensions) {
    let container = document.getElementById('container'); 
    let beingResized = true;
	navBarId = document.getElementById('top-nav-bar');
	newPara = document.createElement('p');
	dimensions = getClientDimensions();
    console.log(dimensions);
    container.style.height = dimensions[0]; 
    container.style.width = dimensions[1]; 
    console.log(`Container dimensions are now set to: Max Height - ${dimensions[0]}, Max Width - ${dimensions[1]}`);
	newPara.setAttribute('id', 'displayUpdate');
	if (beingResized) {
		newPara.innerHTML = `<h4>Current ViewPort Dimensions: Max Height - ${dimensions[0]}, Max Width - ${dimensions[1]}</h4>`;
		navBarId.append(newPara);
	}
}


/* grabs home details div id, creates a new paragraph element, apends it to the new dv, 
    adds an id to the newPara element, gives it some inner html, then calls getHeadingPara element */
function addToDiv() {
	let divId = document.getElementById('home-details');
	let newPara = document.createElement('p');
	divId.append(newPara);
	newPara.setAttribute('id', 'dynamicPara');
	newPara.innerHTML = " ";
	divId.append(newPara);
	newPara.innerHTML = `The home page contains the latest things I've been working on.
                         This will start to look good over time, and include more features!`;
	getHeadingPara();
}


/* grabs headingParagraph, gives it an id, and changes the style of that element to include margin top.  */
function getHeadingPara() {
	let headingPara = document.getElementById('headingPara');
	console.log(headingPara);
	headingPara.style.marginTop = "1em";
}

/* When the mouse is moved out of the home button, we create a grab the paragraph we need, 
    remove it's id as it was only needed for the time, and empties it's inner html.  TL;DR It removes the home details
    from the page without removing it from access by the program.*/
function buttonLosesFocus() {
	let para = document.getElementById('dynamicPara');
	para.innerHTML = " ";
	para.id = "buttonOut";
	console.log(para);
}

function watchWordListener() {
    let watchWordId = document.getElementById('watchButton'); 
    watchWordId.addEventListener('click', watchWordClickHandler); 
}

function watchWordClickHandler() { 
    alert('You clicked the watchword! Good Find!  This will be changed for an actual followme button in a moment.');
}

// call the page load function, when page loads, call all the required functions to run in order. 
pageLoad();
