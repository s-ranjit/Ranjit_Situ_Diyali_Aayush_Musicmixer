const dropZones = document.querySelectorAll(".dropBox");
const playButton = document.querySelector("#playAll");
const pauseButton = document.querySelector("#pauseAll");
const resetButton = document.querySelector("#reset");
const icons = document.querySelectorAll(".instruments img");
const audios = document.querySelectorAll("audio");

// store the original parent element of each icon in order to reset them later
let originalParents = [];
icons.forEach(function (icon) {
    originalParents.push(icon.parentElement); // to store the original parent
});

// this will help to know which icon is being dragged
let draggedIcon = null;

// Define functions
function handleDragStart(event) {
    draggedIcon = event.target; // this function stores the dragged icon for later use
}

function handleDragOver(event) {
    event.preventDefault(); // this function allows drop
}

function handleDrop(event) {
    event.preventDefault();
    
    if (draggedIcon) {
        const audioId = draggedIcon.getAttribute("data-audio"); // this helps to get  audioo id
        const audio = document.querySelector(`#${audioId}`); // this selects the audio element using id

        // this line prevents the icons to drop in the same drop zone
        if (event.currentTarget.children.length === 0) {
            event.currentTarget.appendChild(draggedIcon); // this helps in moving the dragged icon to the drop zone
            draggedIcon.classList.add("dropped"); // this adds the 'dropped' class to make it bigger

            // this plays the corresponding audio
            if (audio) {
                audio.currentTime = 0; // resets audio to the beginning
                audio.play(); // this plays the audio
            }
        } else {
            console.log("This drop zone is occupied.");
        }
    }
}

function playAllAudios() {
    audios.forEach(function (audio) {
        audio.play(); 
    });
}

function pauseAllAudios() {
    audios.forEach(function (audio) {
        audio.pause(); 
    });
}

function resetAll() {
    audios.forEach(function (audio) {
        audio.pause();
        audio.currentTime = 0; 
    });

    // this resets the icons go back to their original positions
    icons.forEach(function (icon, index) {
        originalParents[index].appendChild(icon); // this helps in moving the icon go back to its original parents
        icon.classList.remove("dropped"); // this remove the 'dropped' class
    });
}

// Add event listeners
icons.forEach(function (icon) {
    icon.addEventListener("dragstart", handleDragStart);
});

dropZones.forEach(function (zone) {
    zone.addEventListener("dragover", handleDragOver); // this allows drag over
    zone.addEventListener("drop", handleDrop); // this handles drop event
});

playButton.addEventListener("click", playAllAudios);
pauseButton.addEventListener("click", pauseAllAudios);
resetButton.addEventListener("click", resetAll);