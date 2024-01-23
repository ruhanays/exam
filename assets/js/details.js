let id = new URLSearchParams( window.location.search).get("id");
let cards = document.querySelector('.cards')

async function getAllCards(){
    let res = await axios ( `http://localhost:3000/users/${id}`)
    let data = await res.data;
    cards.innerHTML+=`
    <div class="card">
    <img src="${data.photo}" alt="">
    <h1>${data.title}</h1>
    <p>${data.about}</p>
    <div class="persons">
        <div class="icon">
         <img src=${data.icon} alt="">
        </div>
        <div class="name">
            <p>${data.name} </p>
        </div>
        <div class="price">
          <span>$${data.price}</span>
          </div>
          </div>
          </div>

 `;
}
getAllCards()
