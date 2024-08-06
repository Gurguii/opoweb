const input = document.getElementById('input_articulo_constitucion');
const extractedDiv = document.getElementById('articulo_extraido_div');
const searchButton  = document.getElementById('boton_buscar_articulo_constitucion');
const extractButton = document.getElementById('boton_extraer_articulo_constitucion');
const copyButton = document.getElementById('copy_extracted_doc_button');
const showExplanationButton = document.getElementById('boton_mostrar_explicacion');

extractButton.addEventListener('click', event => {
    extraer_articulo_constitucion();
});

showExplanationButton.addEventListener('click', event => {
    const elem = document.getElementById('articulo_extraido_explicacion_div');
    if(elem.hidden){
        showExplanationButton.innerText = "ocultar explicación";
        elem.hidden = false;
    }else{
        showExplanationButton.innerText = 'mostrar explicación';
        elem.hidden = true;
    }
});

searchButton.addEventListener('click', event => {
   buscar_articulo_constitucion();
});

copyButton.addEventListener('click', (event) => {
    copyButtonFunction();
});

copyButton.addEventListener('mouseover', (event) => {
    document.getElementById("articulo_extraido_contenido").style.color = 'blue';
});

copyButton.addEventListener('mouseout', (event) => {
    document.getElementById("articulo_extraido_contenido").style.color = '';
});

copyButton.addEventListener('touchend', (event) => {
    copyButtonFunction();
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if(event.shiftKey){
       extractButton.click();
    }else{
       searchButton.click();
    }
  }
});

function copyButtonFunction(){
  const paragraphs = document.getElementsByClassName("extracted_doc_paragraph");
  const paragraphTexts = [];
  
  for (let i = 0; i < paragraphs.length; ++i) {
    paragraphTexts.push(paragraphs[i].innerText);
  }
  const contentToCopy = paragraphTexts.join('\n');
  navigator.clipboard.writeText(contentToCopy)
  .then(() => {
    copyButton.textContent = "copiado!";
    setTimeout(() => {
        copyButton.textContent = "copiar";
    }, 1000)
  }).catch(err => {
    console.error("Couldn't copy contents to clipboard - ", err);
  })
};

function clearInput(idInput){
	const elemento = document.getElementById(idInput);
	if (elemento && elemento.tagName.toLowerCase() === 'input') {
        elemento.value = '';
    } else {
        console.error('El elemento con el ID "' + idInput + '" no es un input.');
    }
};

function comprobar_articulo(){
	const num_articulo = parseInt(input.value, 10);
	if(num_articulo > 169 || num_articulo < 1){
		window.alert("El número de artículo debe estar comprendido entre 1-169, no hay ni más ni menos artículos en la constitución");
		return;
	}else if(!num_articulo){
		window.alert("No se puede realizar una búsqueda con el campo vacío");
		return;
    }
	return `https://www.laconstitucion.es/articulo-${num_articulo}-de-la-constitucion-espanola.html`;
};

function buscar_articulo_constitucion(){
	const url = comprobar_articulo();
	if(!url){
		return;
    }
	window.open(url, "_blank");
    extractedDiv.hidden = true;
	clearInput(input.id);
};

async function extraer_articulo_constitucion() {
    const num_articulo = parseInt(input.value, 10);
    if (!comprobar_articulo(num_articulo)) {
        console.log("returning");
        return;
    }
    const url = `extraer_articulo.php?articulo=${num_articulo}`;
    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    .then(response => response.json())
    .then(data => {
        // data.content -> summary of the contents
        // data.explanation -> explanation of the article
        const title = document.getElementById('articulo_extraido_titulo');
        const content_container = document.getElementById('articulo_extraido_contenido');
        const explanation_container = document.getElementById('articulo_extraido_explicacion_contenido'); 

        if(!title || !content_container || !explanation_container){
            window.error("There are missing HTML elements, please reload to try fix this.");
            return;
        }

        title.innerHTML = `Artículo ${num_articulo} de la Constitución Española`;
        content_container.innerHTML = data.content;
        explanation_container.innerHTML = data.explanation;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    extractedDiv.hidden = false;
};