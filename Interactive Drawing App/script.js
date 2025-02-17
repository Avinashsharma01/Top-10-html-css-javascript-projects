const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let brushSize = 5;
let brushColor = "#000000";
let isEraser = false;
let paths = [];
let undonePaths = [];

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

function startDrawing(e) {
    isDrawing = true;
    const path = {
        color: brushColor,
        size: brushSize,
        points: [],
        eraser: isEraser,
    };
    paths.push(path);
    undonePaths = []; // Clear redo history
    addPoint(e.offsetX, e.offsetY);
}

function stopDrawing() {
    isDrawing = false;
}

function draw(e) {
    if (!isDrawing) return;
    addPoint(e.offsetX, e.offsetY);
    redrawCanvas();
}

function addPoint(x, y) {
    const currentPath = paths[paths.length - 1];
    currentPath.points.push({ x, y });
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const backgroundColor = document.body.classList.contains(
        "dark-mode"
    )
        ? "#444"
        : "white";
    paths.forEach((path) => {
        ctx.beginPath();
        ctx.lineWidth = path.size;
        ctx.strokeStyle = path.eraser
            ? backgroundColor
            : path.color;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        path.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths = [];
    undonePaths = [];
}

function updateBrushSize() {
    brushSize = document.getElementById("brushSize").value;
}

function updateBrushColor() {
    brushColor = document.getElementById("colorPicker").value;
    isEraser = false; // Disable eraser when color changes
}

function toggleEraser() {
    isEraser = !isEraser;
}

function undo() {
    if (paths.length > 0) {
        undonePaths.push(paths.pop());
        redrawCanvas();
    }
}

function redo() {
    if (undonePaths.length > 0) {
        paths.push(undonePaths.pop());
        redrawCanvas();
    }
}

function saveDrawing() {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") {
        undo();
    } else if (e.ctrlKey && e.key === "y") {
        redo();
    } else if (e.key === "c") {
        clearCanvas();
    }
});