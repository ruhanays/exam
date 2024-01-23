let cards = document.querySelector('.cards');
let searchInput = document.querySelector('.searchInput');
let sortBtn = document.querySelector('.sorted');
let basketDot = document.querySelector('.basketDot');
let filteredArr = [];
let copyArr = []

async function toggleFav ( id , fav){
    await axios.patch( "http://localhost:3000/users/" + id , { isFavorite : !fav})
    window.location.reload()
}

async function toBasket ( id , count){
    if ( !count){
        await axios.patch( "http://localhost:3000/users/" + id , { inBasket : 1})
    } else {
        await axios.patch ( "http://localhost:3000/users/" + id , { inBasket : count +1})
    }
    window.location.reload()
}

async function getAllCards () {
    let res = await axios ( "http://localhost:3000/users")
    let data = await res.data;
    copyArr=data;
    cards.innerHTML="";
    filteredArr=filteredArr.length ? filteredArr: data
    filteredArr.forEach((el) => {
         if(el.inBasket ){
            basketDot.style.display="inline"
         }
          cards.innerHTML+=` 
          <div class="card">
           
          ${ el.isFavorite ?
            `
            <div class="fav" onClick="toggleFav(${el.id} , ${el.isFavorite})">
            <i class="bi bi-heart"></i>
            </div>
            `
            :
            `
            <div class="fav" onClick="toggleFav(${el.id} , ${el.isFavorite})">
            <i class="bi bi-heart-fill"></i>
            </div>
            `
          }

          <img src="${el.photo}" alt="">
          <h1>${el.title}</h1>
          <p>${el.about}</p>
          <div class="persons">
              <div class="icon">
               <img src=${el.icon} alt="">
              </div>
              <div class="name">
                  <p>${el.name} </p>
              </div>
              <div class="price">
                <span>$${el.price}</span>
                
              
              </div>
          </div>
          <div>
                <button type="button" class="btn btn-primary"><a href="./details.html?id=${el.id}" >Details</a></button>
                <button type="button" class="btn btn-primary"> <a onclick="toBasket({el.id} , {el.inBasket})" href="">Basket</a></button>
                <button type="button" class="btn btn-primary"><a onclick="deleteBtn(${el.id})">Delete</a></button>
        
        
              </div>
      </div>
          
          `
    })
}
getAllCards();

searchInput.addEventListener('input' , function (e) {
    filteredArr=copyArr;
    filteredArr=filteredArr.filter((el) => 
    el.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    )
    getAllCards();
});

sortBtn.addEventListener( "change" , function(e) {
    if ( e.target.value==="za"){
        filteredArr.sort((a,b) => a.price - b.price)
    } else if ( e.target.value === "az"){
        filteredArr.sort((a,b) => b.price - a.price)
    }else {
        filteredArr=[]
    }
    getAllCards();
})

 function deleteBtn(id){
    axios.delete( `http://localhost:3000/users/${id}`)
    .then((res) => windov.location.reload())
 }
