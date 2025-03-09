async function loadCategoris() {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();
    loadDisplay(data.categories)

}

const loadCategoriesVideos = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    // console.log(data.category)
    // loadDisplay(data.categories)
    {
        removActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        console.log(activeBtn)
        loadDisplayVideos(data.category)
    }

}

const loadDisplay = (categories) => {
    const categoriConteinar = document.getElementById("categories")
    categories.forEach(item => {
        
        // console.log(item.category_id)
        const buttonContainer = document.createElement("div");
        
        buttonContainer.innerHTML =`
        <button id="btn-${item.category_id}" onclick = "loadCategoriesVideos(${item.category_id})" class = "btn btn-ctegori">
        ${item.category}
        </buutton>
        `
            ;
        categoriConteinar.appendChild(buttonContainer)
    });
}

const loadDetails = async(videoId)=>{
    // console.log(videoId)
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json();
    displayDetails(data.video)
}
const displayDetails = (video) =>{
    console.log(video)
    const detailsContainer = document.getElementById('modal-contant');
    // document.getElementById('showmodalData').click()
    detailsContainer.innerHTML =`
    <img class=" w-1/2" src=${video.thumbnail} />
    <p>${video.description}</p>
    `
    document.getElementById('customModal').showModal();
}

function setTime(time){
    const hour = parseInt(time / 3600);
    const remainingsSecond = parseInt(time % 3600);
    const minutes = parseInt(remainingsSecond / 60);
    const second = parseInt(remainingsSecond % 60);
    return `${hour} hour ${minutes} minutes ${second} second`
}

const removActiveClass = () =>{
    const buttons = document.getElementsByClassName("btn-ctegori")
    for(let btn of buttons){
        btn.classList.remove("active")
    }
    console.log(buttons)
}


const loadVideos = async (searchData ="") =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchData}`);
    const data = await res.json();
    
    loadDisplayVideos(data.videos)

}





const loadDisplayVideos = (videos) =>{
   
    const videoContainer = document.getElementById("videoLoader");
    videoContainer.innerHTML = ""

    if(videos.length === 0 ){
        videoContainer.innerHTML = `
        <div class = " flex justify-center col-span-4 items-center mt-20">
        <div >
        <div class=" flex justify-center">
         <img class = "flex justify-center" src = "../asset/Icon.png" /> 
         </div>
         <div class=" flex justify-center">
        <h3 class= "w-2/3 font-bold text-2xl text-center mt-8">Oops!! Sorry, There is no content here</h3>
        </div>
        </div>
        </div>
        `
        return;
    }

    videos.forEach(video => {
        //  console.log(video )
        const div = document.createElement("div")

        div.classList = "card card-compact"
        div.innerHTML = `
        
  <figure  class = " h-[200px] relative">
    <img
    class="object-cover w-full h-full"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : ` <span class = "absolute right-2 bottom-2 bg-black text-white p-1 rounded">${setTime(video.others.posted_date)}</span>`
      }
     
  </figure>
  <div class=" flex py-3 gap-3">
  <div>
  <img class="w-10 h-10 object-cover  rounded-full" src=${video.authors[0].profile_picture} />
  </div>
  <div>
   <h2 class=" font-bold">${video.title}</h2>
   <div class = " flex gap-2 items-center">
   <p>${video.authors[0].profile_name}</p>

   ${video.authors[0].verified === true ?`<img class = " w-5 h-5" src ="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />` : "" }
   
   
   </div>
   <p>${video.others.views} views</p>
    
  </div>
   
    
  </div>
  <p> <button onclick="loadDetails('${video.video_id}')" class = " btn bg-red-500" >Details</button> </p>

        ` 
        videoContainer.appendChild(div)
    })
}

const searchData = document.getElementById('inputFild').addEventListener("keyup",(e)=>{
    loadVideos(e.target.value)
})



// los()
loadCategoris();
loadVideos();