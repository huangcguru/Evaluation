const contentContainer = document.querySelector('.content-container')
const submitBtn = document.querySelector('.search-form__button')
const inputBox = document.querySelector('.search-form__text')

let album = []
// let loading = false;

const fetchData = (artist) => {
    fetchJsonp(`https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=200`)
    .then(res=>res.json())
    .then(res=>{
        album = res.results
        renderDisplay()
    })
    .catch(()=>{
        alert('Oops.. artisit does not exsit ')
    })
}

const submit = () =>{
    submitBtn.addEventListener('click',()=>{
        loadingDisplay()
        if(inputBox.value === "" || inputBox.value === null){
            alert("Input area can't be empty")
            return
        }
        let artists = inputBox.value
        fetchData(artists)
    })
}
submit()

const renderDisplay = () =>{
    let render = album.map(arr=>{
        return (`<div class="content-container"> 
                    <ul>
                        <li><img src=${arr.artworkUrl60} alt="album-picture" class="album-img"/>
                        <li>Artist: <b style="color:green">${arr.artistName}</b></li>
                        <li>Album Name: <b style="color:red">${arr.collectionName.toUpperCase()}</b></li>
                        <li>Album Price: <b style="color:blue">$${arr.collectionPrice}</b></li>
                        <li><button class="delete-btn" id="${arr.collectionId}">Close</button></li>
                    </ul>
                </div>
        `)
    }).join('')
    setTimeout(()=>{
        deleteAlbumBtn()
    },1000)
    contentContainer.innerHTML = render
}

const loadingDisplay = () =>{
    var loading = document.getElementById ( "loader" ) ;
    loading.style.visibility = "visible" 
    
    // still ned to figure out to do it right...
    setTimeout(()=>{
        loading.style.visibility = "hidden" 
    },500)
//     if ( page_request.readyState == 1 )
//       loading.style.visibility = "visible" ;

//   // when loaded successfully
//   if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1))
//   {
//       document.getElementById(containerid).innerHTML=page_request.responseText ;
//       loading.style.visibility = "hidden" ;
//   }
}

