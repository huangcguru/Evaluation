const contentContainer = document.querySelector(".content-container");
const submitBtn = document.querySelector(".search-form__button");
const inputBox = document.querySelector(".search-form__text");

let album = [];

var loader = document.getElementById("loader");

function displayLoading() {
  loader.style.visibility = "visible";
}

function hideLoading() {
  loader.style.visibility = "hidden";
}

const fetchData = (artist) => {
  displayLoading();
  fetchJsonp(
    `https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((res) => res.json())
    .then((res) => {
      hideLoading();
      album = res.results;
      renderDisplay();
    })
    .catch((error) => {
      console.log(error, "error");
      alert("Oops.. artisit does not exsit");
    });
};

submitBtn.addEventListener("click", function (e) {
  let artisitName = inputBox.value;

  if (artisitName === "") {
    alert("Please type a name");
    return;
  } else {
    fetchData(artisitName);
  }
});

const renderDisplay = () => {
  let render = album
    .map((arr) => {
      return `<div class="content-container">
                    <ul>
                        <li><img src=${
                          arr.artworkUrl60
                        } alt="album-picture" class="album-img"/>
                        <li>Artist: <b style="color:green">${
                          arr.artistName
                        }</b></li>
                        <li>Album Name: <b style="color:red">${arr.collectionName.toUpperCase()}</b></li>
                        <li>Album Price: <b style="color:blue">$${
                          arr.collectionPrice
                        }</b></li>
                        <li><button class="delete-btn" id="${
                          arr.collectionId
                        }">Close</button></li>
                    </ul>
                </div>
        `;
    })
    .join("");
  setTimeout(() => {
    deleteAlbumBtn();
  }, 1000);
  contentContainer.innerHTML = render;
};
