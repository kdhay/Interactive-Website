let currentColor;
let currentStrokeWeight;
let currentStrokeType = 'solid'; // Default stroke type
let currentOpacity = 255; // Default opacity: fully opaque
let eraserActive = false; // Track eraser state

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255); // Set background color to white

    currentColor = color(0, 0, 0, currentOpacity); // Default color: black with full opacity
    currentStrokeWeight = 5; // Default stroke weight
}

function draw() {
    if (mouseIsPressed) {
        stroke(currentColor);
        strokeWeight(currentStrokeWeight);

        switch(currentStrokeType) {
            case 'solid':
                drawingContext.setLineDash([]); // Solid line
                break;
            case 'dashed':
                drawingContext.setLineDash([10, 15]); // Dashed line
                break;
            case 'dashType1':
                drawingContext.setLineDash([5, 10]); // Dash Type 1 pattern
                break;
            case 'dashType2':
                drawingContext.setLineDash([15, 5, 3, 5]); // Dash Type 2 pattern
                break;
        }

        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

// Additional function implementations remain unchanged...


// Function to change colour
function changeColor(c) {
    const rgbColor = color(c).levels.slice(0, 3); // Extract RGB components
    currentColor = color(...rgbColor, currentOpacity);
}

// Function to change stroke weight
function changeStrokeWeight(w) {
    currentStrokeWeight = w;
}

// Function to change stroke type
function changeStrokeType(type) {
    currentStrokeType = type;
}

// Function to change opacity
function changeOpacity(o) {
    currentOpacity = parseInt(o, 10);
    const rgbColor = currentColor.levels.slice(0, 3); // Extract RGB components
    currentColor = color(...rgbColor, currentOpacity);
}

// Function to activate eraser
function activateEraser() {
    eraserActive = !eraserActive; // Toggle eraser state
    if (eraserActive) {
        currentColor = color(255); // Set color to white for eraser
        currentOpacity = 255; // Ensure full opacity for eraser
    } else {
        // Revert to previous color and opacity settings
        changeOpacity(document.getElementById('opacityDropdown').value);
        changeColor(document.getElementById('colorPicker').value);
    }
}

// Clear Screen
function clearCanvas() {
    background(255);
}

// Code to collect info from screen to put into our functions
document.getElementById('colorPicker').addEventListener('input', function() {
    changeColor(this.value);
});

document.getElementById('lineWidth').addEventListener('input', function() {
    changeStrokeWeight(this.value);
});

document.getElementById('strokeType').addEventListener('change', function() {
    changeStrokeType(this.value);
});

document.getElementById('opacityDropdown').addEventListener('change', function() {
    changeOpacity(this.value);
});

document.getElementById('clearBtn').addEventListener('click', function() {
    clearCanvas();
});

document.getElementById('eraserBtn').addEventListener('click', function() {
    activateEraser();
});
