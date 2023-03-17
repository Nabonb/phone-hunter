const fetchData = (inputTextString,number) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputTextString}`
    fetch(url)
    .then(res => res.json())
    .then(data =>showAllData(data.data ,number))
}
const showAllData = (allMobiles , number)=>{
    const loadingSpinner = document.getElementById('load-spinner');
    const products = document.getElementById("product-div");
    products.innerHTML='';
    // for see more button
    const seeMore = document.getElementById("btn-see-more");
    if(allMobiles.length > number){
        seeMore.classList.remove('d-none');
        allMobiles = allMobiles.slice(0,number);
    }
    else{
        seeMore.classList.add('d-none');
    }
    
    //display no phone found
    const noPhoneFound = document.getElementById('no-phone-found');
    if(allMobiles.length == 0){
        noPhoneFound.classList.remove('d-none');
        loadingSpinner.classList.add('d-none')
    }
    else{
        noPhoneFound.classList.add('d-none');
    }

    

    //display all phones
    allMobiles.forEach(mobile => {
        // console.log(mobile)
       const newDiv = document.createElement('div');
       newDiv.classList.add('col')
       newDiv.innerHTML=
        `
        <div class="card h-100 p-5">
          <img src="${mobile.image}" class="card-img-top" alt="...">
          <div class="card-body">
                <h5 class="card-title">${mobile.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
          <button onclick="viewDetails('${mobile.slug}')" type="submit" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
    `;
    
    products.appendChild(newDiv)
    loadingSpinner.classList.add('d-none')
    });
}
//for search mobiles with for 9 showing 9 phone
document.getElementById('btn-search').addEventListener('click',function(){
    // console.log('kaku clicked');
    const loadingSpinner = document.getElementById('load-spinner');
    loadingSpinner.classList.remove('d-none')
    const inputText = document.getElementById('exampleInputEmail1');
    const inputTextString = inputText.value;
    fetchData(inputTextString,9);
})

//for see more for see all the mobiles
document.getElementById('btn-see-more').addEventListener('click',function(){
    const loadingSpinner = document.getElementById('load-spinner');
    loadingSpinner.classList.remove('d-none')
    const inputText = document.getElementById('exampleInputEmail1');
    const inputTextString = inputText.value;
    fetchData(inputTextString);
})

const viewDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => forMoreDetails(data))
}

//for modal details
const forMoreDetails = (id) =>{
    console.log(id.data)
    const title = document.getElementById('exampleModalLabel')
    title.innerText = id.data.name;
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML=`
        <img class="img-fluid w-100 p-5" src="${id.data.image}" alt="...">
        <p><span class="fw-bold">Storage:</span> ${id.data.mainFeatures.storage}</p>
        <p><span class="fw-bold">Memory:</span> ${id.data.mainFeatures.memory}</p>
        <p><span class="fw-bold">Release Date:</span> ${id.data.releaseDate? id.data.releaseDate: 'NO RELEASE DATE' } </p>
    `
    

}

fetchData('iphone');