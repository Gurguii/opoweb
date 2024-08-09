const input = document.getElementById('input_articulo_constitucion');
const searchButton  = document.getElementById('boton_buscar_articulo_constitucion');
const extractButton = document.getElementById('boton_extraer_articulo_constitucion');
const copyButton = document.getElementById('copy_extracted_doc_button');
const extractedDocsDiv = document.getElementById('extractedDocsDiv');

extractButton.addEventListener('click', event => {
    extraer_articulo_constitucion();
});

searchButton.addEventListener('click', event => {
   buscar_articulo_constitucion();
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

input.addEventListener('click', (event) => {
  input.value = '';
});

function copyButtonFunction(){
  const paragraphs = document.getElementsByClassName('ce_article_explanation_paragraph');
  
  if(!paragraphs){
    console.error("couldn't get element");
  }

  const paragraphTexts = [];
  
  for(const p of paragraphs){
    paragraphTexts.push(p.innerText);
  };

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
  input.value = '';
};

async function extraer_articulo_constitucion() {
  const articles = input.value; 
  
  if(!articles){
    return;
  }

  const url = `extraer_articulo.php?articulos=${articles}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    const data = await response.json();

    if (data.error) {
      window.alert(data.error);
      return;
    }

  data.forEach(obj => {
    const div = document.createElement('div');
    div.classList.add("extracted_article_div");
    div.innerHTML = obj.html;
    extractedDocsDiv.appendChild(div);

    const showButton = document.getElementById(`extracted_article_show_button_${obj.article}`);
    const copyButton = document.getElementById(`extracted_article_copy_button_${obj.article}`);
    const deleteButton = document.getElementById(`extracted_article_delete_button_${obj.article}`);
    const explanationDiv = document.getElementById(`extracted_article_explanation_${obj.article}`);
  
    copyButton.addEventListener('click', event => {
      const paragraphs = document.getElementsByClassName(`ce_article_explanation_paragraph_${obj.article}`);
      var contentToCopy = "";
      for(let i = 0; i < paragraphs.length; ++i){
        contentToCopy+=paragraphs[i].textContent + "\n";
        console.log(paragraphs[i].textContent);
      }
      navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        copyButton.textContent = "¡Copiado!";
        setTimeout(() => {
            copyButton.textContent = "Copiar";
        }, 1000)
      }).catch(err => {
        console.error("Couldn't copy contents to clipboard - ", err);
      })
    });

    showButton.addEventListener('click', event => {
      explanationDiv.hidden = !explanationDiv.hidden;
    });
    
    deleteButton.addEventListener('click', event => {
      div.remove();
    })
  });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}