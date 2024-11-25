const filePickerElement = document.getElementById('file-upload');
const imagePreviewElement = document.getElementById('image-preview');
const fileuploadLabel = document.getElementById('fileuploadLabel');

function showPreview() {
    const files = filePickerElement.files;
    if(!files || files.length === 0)
    {
        imagePreviewElement.style.display = 'none';
        return;
    }

    const pickedFile = files[0];

    imagePreviewElement.src = URL.createObjectURL(pickedFile);
    imagePreviewElement.style.display = 'block';
    fileuploadLabel.style.display = 'none';
}

filePickerElement.addEventListener('change', showPreview);