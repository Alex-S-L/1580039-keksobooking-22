const FILE_EXTENSIONS = ['jpg', 'png', 'jpeg']

const checkFileExtension = (fileName, extensions) => {
  return extensions.some((extension) => {
    return fileName.endsWith(extension);
  })
}

const previewHandler = (previewElement) => {
  return function() {
    const file = this.files[0];
    const isCorrectExtension = checkFileExtension(file.name.toLowerCase(), FILE_EXTENSIONS);
    const isImg = previewElement.tagName === 'IMG';
    // const isDiv = previewElement.tagName === 'DIV'

    if (isCorrectExtension) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        isImg ?
          previewElement.src = reader.result :
          previewElement.style.backgroundImage = `url(${reader.result})`;
      })

      reader.readAsDataURL(file);
    }
  }
}

export {previewHandler}
