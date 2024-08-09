const glossaryFile = "terms.json";
const glossarySearchInput = document.getElementById('glossary_search_input');
const glossaryList = document.getElementById('glossary_list');
const definitionBlock = document.getElementById('currentDefinitionShown');
const glossary_right_column = document.getElementById('glossary_right_column');

let glossaryDictionary = {};

glossarySearchInput.addEventListener('input', event => {
  const inputValue = glossarySearchInput.value;

  if(!inputValue){
    Object.entries(glossaryDictionary).forEach(([term, definition]) => {
      let htmlElement = document.getElementById(term);
      if(!htmlElement){
        console.error(`Element with id ${term} doesn't exist`);
        return;  
      }
      htmlElement.hidden = false;
    });
  }else{
    Object.entries(glossaryDictionary).forEach(([term, definition]) => {
      let htmlElement = document.getElementById(term);
      if(!htmlElement){
        console.error(`Element with id ${term} doesn't exist`);
        return;  
      }
      // Some buttons could be added in the html so that we switch between
      // these methods for case insensitive, full match, include...
      htmlElement.hidden = term.includes(inputValue) ? false : true;
      //htmlElement.hidden = term.startsWith(inputValue) ? false : true;
    });  
  };
});

function loadGlossary() {
  fetch(glossaryFile)
    .then(response => response.json())
    .then(data => {

      data.forEach(elem => {
        glossaryDictionary[elem.term] = elem.definition;
      })

      let listOfTerms = "";

      Object.entries(glossaryDictionary).forEach(([term, definition]) => {
        listOfTerms += `<li><button class="glossaryListButton" id="${term}">${term}</button></li>`;
      });

      glossaryList.innerHTML = listOfTerms;
      
      const buttons = document.querySelectorAll('.glossaryListButton');
      buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
          showDictionaryTerm(button.id);
        });
        button.addEventListener('focus', () => {
          showDictionaryTerm(button.id);
        });
        button.addEventListener('click', () => {
          pinDefinition(button.id);
        });
      });

      return data; // Return the data for further use
    })
    .catch(error => {
      console.error(`Caught an error -> ${error}`);
    });
}

function showDictionaryTerm(elementID){
  let elem = document.getElementById(elementID);
  if(!elem){
    console.error(`Unexistant element with id ${elementID}`);
    return;
  }
  definitionBlock.innerHTML = `<h3>${elementID}</h3><p>${glossaryDictionary[elementID]}</p>`;
} 

function pinDefinition(elementID) {
  let elem = document.getElementById(elementID);
  if (!elem) {
    console.error(`Unexistant element with id ${elementID}`);
    return;
  }

  // Create the new elements
  const newDiv = document.createElement('div');
  newDiv.classList.add('pinnedDefinitionDiv');

  const p1 = document.createElement('p');
  p1.textContent = `${elementID}`;
  const p2 = document.createElement('p');
  p2.textContent = glossaryDictionary[elementID];

  // Append elements to the new div
  newDiv.appendChild(p1);
  newDiv.appendChild(p2);

  // Append the new div to the parent
  glossary_right_column.appendChild(newDiv);

  // Add the click event listener
  newDiv.addEventListener('click', () => {
    newDiv.remove();
  });
}

loadGlossary();