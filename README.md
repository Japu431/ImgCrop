Image preview [x] 

         index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Crop com HTML5 Canvas e JS</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Image Crop</h1>
        <p>com HTML5 Canvas e JS</p>
    </header>

    <main>
          <button id="select-image">
              <input type="file" id="photo-file">
            Selecionar Imagem
        </button>

        <img id="photo-preview">
    </main>

    <footer></footer>
    
    <script src="scripts.js" type="module"></script>
</body>
</html>

---------------------------------------------

style.css

@import url(https://fonts.googleapis.com/css?family=Roboto:400,700,300);

@keyframes up {
    from {
        opacity: 0;
        transform: translateY(1rem);
    }
    to {
        opacity: 1;
    }
}

:root {
    --bg: #130f0d;
    --orange: #fd951f;
    --brown-opaque: rgba(250, 152, 5, 0.139);
    --white: #f0f0f9;
    --green: hsl(98 100% 62%);
    --blue: hsl(204 100% 59%);
    --purple: #8257e6;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

*, button, input {
    font-family: 'Roboto', sans-serif;
}

body {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--bg);
    color: var(--white);
}

header {
    margin-top: 3.2rem;
    padding-bottom: 4rem;

    text-align: center;
    color: var(--orange);

    animation: up 0.4s;
}

header p {
    font-family: monospace;
}

main {
    margin: 0 auto;
    width: min(80vw, 500px);

    animation: up 0.4s 0.2s backwards;
}

footer {
    margin-top: auto;
    text-align: center;
    padding: 3.2rem 0 1.6rem;
    animation: up 0.4s 0.4s backwards;
}

footer::after {
    content: "Feito com ♥️ por Mayk Brito";
    opacity: 0.6;
    font-size: 0.8rem;
}

button {
  display: block;

  width: 100%;

  padding: .8rem 1.6rem;
  
  overflow: hidden;

  position: relative;

  font-size: 1.2rem;
  font-weight: normal;

  border: none;
  border-radius: 0.4rem;

  background: var(--orange);

  color: var(--bg);

  cursor: pointer;
}

button:hover {
    transform: translate(1px, 1px);
}

button + button {
    margin-top: .8rem;
}

img {
    width: 100%;
    height: auto;
}


/* Image Crop */

#photo-file {
    display: none;
}



------------------------------



Javascript


const photoFile = document.getElementById('photo-file')



document.getElementById('select-image')
.onclick = function() {
    photoFile.click()
}

window.addEventListener('DOMContentLoaded' , () => {
    photoFile.addEventListener('change' , () => {
        let file = photoFile.files.item(0)
        
        
        //Ler um Arquivo 
        
        let reader = new FileReader() 
        reader.readAsDataURL(file)
        reader.onload = function() {
            let image = document.getElementById('photo-preview')
            image.src = event.target.result
        }

    })
})