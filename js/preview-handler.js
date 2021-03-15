const FILE_EXTENTIONS = ['jpg', 'png', 'jpeg']

const checkFileExtention = (fileName, extentions) => {
  return extentions.some((extention) => {
    return fileName.endsWith(extention);
  })
}

const previewHandler = (previewElement) => {
  return function() {
    const file = this.files[0];
    const isCorrectExtention = checkFileExtention(file.name.toLowerCase(), FILE_EXTENTIONS);
    const isImg = previewElement.tagName === 'IMG';
    // const isDiv = previewElement.tagName === 'DIV'

    if (isCorrectExtention) {
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
