/* webappliaktion som använder flickr api för att hämta bilder av Lova Unger 2019 */


 document.querySelector('button').addEventListener('click', async () => {

// get search word
let input = document.querySelector('#search').value;

// get sort 
let sort = document.querySelector('input[name="sortby"]:checked').value;
   
// get amount per page
let pageLimit = document.getElementById('limit').value;

// Get images 
let data = await searchFlickr(input,sort,pageLimit);
//update UI 
updateUI(data);

 })

 async function searchFlickr(input,sort,pageLimit){
   const apiKey = '6765cdd05a0a90926774a7abe7ccef23';
   const baseUrl =  'https://api.flickr.com/services/rest';

   let method = 'flickr.photos.search';
   let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${input}&sort=${sort}&per_page=${pageLimit}&format=json&nojsoncallback=1`;
   let resp = await fetch(url);
   let data = await resp.json();
   console.log(data);
   return data.photos;
 }

// update UI 

 function updateUI(data){
    data.photo.forEach(img => {

      

       // skapa element 
       let elImg = document.createElement('img');

       // lägg till attribut dvs src = länk till bilden + bildstorlek = liten (q)
       elImg.setAttribute('src', imgUrl(img, 'q'));
      
   
       document.querySelector('#photos').appendChild(elImg);


       // lägger länk ( <a> ) runt bilden
       $(elImg).wrap($("<a>").attr("href" , largeImage(img)
       
       ));
      
      

    });
 }

 // construct img url

 function imgUrl(img,size){
return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`;


}


// construct full image link


function largeImage(img) {

   return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;

}

/* 

       let linkEl = document.createElement('a');
       linkEl.setAttribute('href',largeImage(img));

          console.log(linkEl);
      document.querySelector('#photos').appendChild(linkEl,elImg);

*/