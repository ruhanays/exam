let table = document.querySelector('table');
let titleInput = document.querySelector('.title');
let aboutInput = document.querySelector('.about');
let photoInput = document.querySelector('.photoInput');
let priceInput = document.querySelector('.price');
let roundedImage = document.querySelector('.roundedImage');
let addBtn = document.querySelector('#addBtn');

const delEl = (id) =>{
    axios.delete( 'http://localhost:3000/users' + id )
    window.location.reload()
}

photoInput.addEventListener( '.input' , (e) => {
    let file = e.target.files[0];
    if (file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (){
            roundedImage.src = reader.result
        }
    }
})

fetch ("http://localhost:3000/users")
.then (res => res.json())
.then ( data => {
    data.forEach((el) =>{
        cards.innerHTML +=`
        <tr>
          <td> ${el.id}</td>
           <td>${el.title}</td>
           <td>${el.about}</td>
           <td>${el.price}</td>
           <td><button onClick="delEl(${el.id})">Delete</button></td>
        </tr>
        `
    })
})

addBtn.addEventListener("click" , function () {
    if ( titleInput.value !== "" && aboutInput.value !=="" && priceInput.value !=="" ){
        axios.post('http://localhost:3000/users' , {
            title : titleInput.value,
            about : aboutInput.value,
            price : priceInput.value,
            photo : roundedImage.src,
        })
        .then( res => window.location ='./index.html')
    }
    else{
        alert("Melumatlari tam daxil edin!")
    }
})

