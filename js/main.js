/* webappliaktion som använder flickr api för att hämta bilder av Lova Unger 2019 */


 document.querySelector('button').addEventListener('click', async () => {

let input = document.querySelector('#search').value;
let sort = document.querySelector('input[name="sortby"]:checked').value;


   
// Get images 
let data = await getImages(input,sort);
//update UI 
updateUI(data);

  // Get sort 

  console.log(sort);
  


 })


 
 async function getImages(input,sort){
   const apiKey = '6765cdd05a0a90926774a7abe7ccef23';
   const baseUrl =  'https://api.flickr.com/services/rest';
   
   let method = 'flickr.photos.search';
   let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${input}&sort=${sort}&format=json&nojsoncallback=1`;
   let resp = await fetch(url);
   let data = await resp.json();
   console.log(data);


 


   return data.photos;

   
   
 }




// update UI 

document.querySelector('#photos').innerHTML = "";
 function updateUI(data){
    data.photo.forEach(img => {
       // skapa element 
       let elImg = document.createElement('img');
       elImg.setAttribute('src', imgUrl(img, 'q'));
       document.querySelector('#photos').appendChild(elImg);
     

    });


 }

 // construct img url

 function imgUrl(img,size){
return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`



}

