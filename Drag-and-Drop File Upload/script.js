const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

// Handle drag events
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
});

// Handle click to open file dialog
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

function handleFiles(files) {
    files.forEach((file) => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const progress = document.createElement('div');
        progressBar.appendChild(progress);

        const removeButton = document.createElement('span');
        removeButton.classList.add('file-remove');
        removeButton.textContent = '✖';
        removeButton.addEventListener('click', () => {
            fileItem.remove();
        });

        fileItem.appendChild(fileName);
        fileItem.appendChild(progressBar);
        fileItem.appendChild(removeButton);
        fileList.appendChild(fileItem);

        simulateUpload(progress);
    });
}

function simulateUpload(progress) {
    let percent = 0;
    const interval = setInterval(() => {
        percent += 10;
        progress.style.width = `${percent}%`;
        if (percent >= 100) {
            clearInterval(interval);
        }
    }, 300);
}
