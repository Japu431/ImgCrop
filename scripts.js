const photoFile = document.getElementById('photo-file')
let photoPreview = document.getElementById('photo-preview')
let image;
let photoName;

//Select & Preview img

document.getElementById('select-image')
.onclick = function() {
    photoFile.click()
}

window.addEventListener('DOMContentLoaded' , () => {
    photoFile.addEventListener('change' , () => {
        let file = photoFile.files.item(0)
            photoName = file.name;
        
        
        //Ler um Arquivo 
        
        let reader = new FileReader() 
        reader.readAsDataURL(file)
        reader.onload = function() {
            image = new Image();
            image.src = event.target.result
            image.onload = onLoadImage
        }

    })
})


//Selection Tool
const selection = document.getElementById('selection-tool')

let startX , startY , relativeStartY , relativeStartX,
endX , endY , relativeEndX , relativeEndY;
let startSelection = false;

const events = {
    mouseover(){
        this.style.cursor = 'crosshair'
    },
    mousedown(){
        const {clientX , clientY,offsetX ,offsetY} = event 
        // console.table({
        //     'client': [clientX, clientY],
        //     'offset': [offsetX,offsetY]
        // })

        startX = clientX
        startY = clientY
        relativeStartX =offsetX
        relativeStartY = offsetY 

        startSelection = true   
    },
    mousemove(){
        endX = event.clientX
        endY = event.clientY

      if(startSelection){
        selection.style.display = 'Initial';
        selection.style.top = startY + 'px';
        selection.style.left = startX+'px';

        selection.style.width = (endX - startX) + 'px';
        selection.style.height = (endY - startY) + 'px';
      }  
    },
    mouseup(){
        startSelection = false;

        relativeEndX = event.layerX;
        relativeEndY = event.layerY;

        //Mostrar o botão de corte
        cropButton.style.display = 'initial'
    }
}
Object.keys(events)
.forEach(eventName => {
    photoPreview.addEventListener(eventName,events[eventName])
})


//Canvas

let canvas = document.createElement('canvas')
let ctx =  canvas.getContext('2d') // ctx - contexto do canvas

function onLoadImage() {
    const { width, height } = image;
    canvas.width =  width;
    canvas.height = height;

    // Limpar Contexto

    ctx.clearRect( 0 , 0 , width , height);

    // Desenhar Imagem do contexto
    ctx.drawImage(image,0,0)

    photoPreview.src = canvas.toDataURL()
}

// Cotar Imagem
const cropButton = document.getElementById('crop-image')
cropButton.onclick = () => {
    const { width: imgW , height: imgH} = image
    const { width:previewW , height : previewH} = photoPreview


    const [widthFactor, heightFactor] = [
        +(imgW / previewW),
        +(imgH / previewH)
    ]
    const [selectionWidth , selectionheight] = [
        +selection.style.width.replace('px',''),
        +selection.style.height.replace('px','')
    ] 

    const [croppedWidth,croppedHeight] = [
        +(selectionWidth * widthFactor),
        +(selectionheight * heightFactor)
    ]

    const [actualX , actualY] = [
        +(relativeStartX * widthFactor),
        +(relativeStartY * heightFactor)
    ]

    // Pegar contexto das imgs cortadas

    const croppedImage = ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)

    // Limpar o ctx 
 
    ctx.clearRect(0,0,ctx.width,ctx.height)

    // Ajuste de proporção

    image.width = canvas.width = croppedWidth ;
    image.height = canvas.height = croppedHeight;

    //Add img cortada ao ctx
    ctx.putImageData(croppedImage, 0,0)

    // Esconder Ferramentas 
    selection.style.display = 'none'

    // Atualizar o preview da img
    photoPreview.src = canvas.toDataURL()

    //Mostrar o botão de Download

    downloadButton.style.display = 'initial'
}
  // Download
const downloadButton = document.getElementById('download')
downloadButton.onclick = function() 
{
    const a = document.createElement('a')
    a.download = photoName + '-cropped.png';
    a.href = canvas.toDataURL()
    a.click()
}