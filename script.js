const contentContainer = document.querySelector('.content-container')
const submitBtn = document.querySelector('.search-form__button')
const inputBox = document.querySelector('.search-form__text')

let array = []

const fetchData = (artist) => {
    fetchJsonp(`https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=200`)
    .then(res=>res.json())
    .then(res=>{
        array = res.results
        renderDisplay()
    })
    .catch(()=>{
        alert('no user found')
    })
}


const submit = () =>{
    submitBtn.addEventListener('click',()=>{
        loadingScreen()
        if(inputBox.value === "" || inputBox.value === null){
            alert("type a artist!")
            return
        }
        let artists = inputBox.value
        fetchData(artists)
    })
}
submit()

const renderDisplay = () =>{
    let render = array.map(arr=>{
        return (`<div class="album-info-container"> 
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
    },500)
    contentContainer.innerHTML = render
}

const loadingScreen = () =>{
    contentContainer.innerHTML = "Loading Album..."
}

const deleteAlbumBtn = () =>{
    const deleteBtn = document.querySelectorAll('.delete-btn')
    deleteBtn.forEach(item=>{
        item.addEventListener('click',(e)=>{
            let newArray = [...array]
            for (let i = 0; i < newArray.length;i++){
                if(+e.target.id === newArray[i].collectionId){
                    newArray.splice(i,1)
                }
            }
            let newRender = newArray.map(newArr=>{
                return (`<div class="album-info-container"> 
                            <ul>
                                <li><img src="${newArr.artworkUrl60}" alt="album-picture" class="album-img"/>
                                <li>Artist: <b style="color:green">${newArr.artistName}</b></li>
                                <li>Album Name: <b style="color:red">${newArr.collectionName.toUpperCase()}</b></li>
                                <li>Album Price: <b style="color:blue">$${newArr.collectionPrice}</b></li>
                                <li><button class="delete-btn" id="${newArr.collectionId}">Close</button></li>
                            </ul>
                        </div>
                `)
            }).join('')
            setTimeout(()=>{
                deleteAlbumBtn()
            },500)
            contentContainer.innerHTML = newRender
        })
    })
}
