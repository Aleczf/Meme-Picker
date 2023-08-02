import {catsData} from '/data.js'




// ************ Elementi in possesso ***************


const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

// ************** eventListeners **************



emotionRadios.addEventListener('change', highlightCheckedOption)


getImageBtn.addEventListener('click', renderCat)


memeModalCloseBtn.addEventListener ('click', closeModale)







// ************** Funzioni *********************+


// Restituisce una lista di emotions che comporrà il radio menu

function getEmotionsArray(cats){
    const emotionsArray= []
    for (let cat of cats) {                              //scandaglia il file di dati per restituire le emotions
        for (let emotion of cat.emotionTags){

            if (!emotionsArray.includes(emotion)) {      //evita i doppioni
                emotionsArray.push(emotion)                
            }          
        }
    }
    return emotionsArray

}

getEmotionsArray(catsData)




// stampa le emozioni nel menu radio

function renderEmotionsRadios(cats) {
    
    const emotions = getEmotionsArray(cats)    
    let radioItems = ''
    
    for (let emotion of emotions) {
        radioItems += 
        `         
            <div class="radio">
                ${emotion}

                <label for="${emotion}"></label>                              

                <input 
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >        
            </div>
        `
    }

    emotionRadios.innerHTML = radioItems    


}

renderEmotionsRadios(catsData)






//funzione che cambia il colore degli elementi radio selezionati. 
//Si innesca ad ogni cambiamento associato ad "emotionRadios" e va ad aggiungere la classe "Highlight" al div parent.

function highlightCheckedOption(e) {
   
    const radios = document.getElementsByClassName('radio')


    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    
    document.getElementById(e.target.id).parentElement.classList.add('highlight')

}



// Funzioni per bottone "Get Image"



function getMatchingCatsArray() {
  
    if (document.querySelector('input[type="radio"]:checked')) {

        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter(function(cat){
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } 
            else {
                return cat.emotionTags.includes(selectedEmotion) 
            }
               
        })

        return matchingCatsArray

    }
  
}

let singleCat = []


function getSingleCatObject() {

    const catsArray = getMatchingCatsArray()


    
    if (catsArray.length === 1){
        singleCat = catsArray[0]

        console.log(catsArray[0])




    }
    else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        singleCat = catsArray[randomNumber]
        
        console.log(catsArray[randomNumber])


    }



}



function renderCat(){
    const catObject = getSingleCatObject()


    memeModalInner.innerHTML =  
        `
        <img 
        class="cat-img" 
        src="./images/${singleCat.image}"
        alt="${singleCat.alt}"
        >
        `
    memeModal.style.display = 'flex'
}




function closeModale() {                   // Funzione per chiusura modale
    memeModal.style.display = 'none'
}























// //Ciclo for che tira fuori in oggetto gatto a random dal json


// function randomCat() {
//     const randomObj = Math.round(Math.random() * catsData.length)

//     for (let i = 0; i < catsData.length; i++) {
//         return catsData[randomObj]
//     }
// }


 








// ********** CICLO FOR TRADIZIONALE **********

// function getEmotionsArray(cats) {

//     catsArray = []
//     for (let i = 0; i < cats.length; i++) {
        
//         for (let j = 0; j < cats[i].emotionTags.length; j++) {
//             catsArray.push(cats[i].emotionTags[j]) 
//         }
    
//     }


//     console.log(catsArray)
// }

// getEmotionsArray(catsData)




