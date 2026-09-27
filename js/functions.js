async function getData(category="Business" , search ="" , page=1){

    let parameters = new URLSearchParams({
        category :category,
        q: search ,
        from :"2026-09-25" ,
        sortBy:"publishedAt",
        apiKey:"f7eb48c0c2474de7bf1972e5a98e52cb",
        pageSize :10,
        page:page
    })


    let response =await fetch(`https://newsapi.org/v2/top-headlines?${parameters.toString()}`);
    let myData = await response.json();

    console.log(myData);

    showData(myData , page);
 }

function showData(data , currentPage){

    if(data.status !== "ok"){
        console.error("NewsAPI error:", data.message || data);
        return;
    }


    let numberOfPages = Math.ceil(data.totalResults / 10),
        news = data.articles;
        dataRow = document.querySelector("#Data .row")
    dataRow.innerHTML="";

    if(news.length > 0){
        for(let item of news){
            dataRow.innerHTML += cardComponent(item);
        }
        document.querySelector("nav .pagination").innerHTML= preparePagination (currentPage , numberOfPages)

        
    }else{

    }
}

function preparePagination (currentPage , totalPages){
    let list = `<li class="page-item ${(currentPage == 1)?'disabled' :''}"><a class="page-link" onclick="paginate(${(currentPage>1)?(currentPage-1 ): 1})" >Previous</a></li>`;
    
    for(let i=1 ;i<=totalPages ;i++){
        list+=`<li class="page-item ${(currentPage == i)? 'active' : ''}"><a class="page-link" onclick="paginate(${i})">${i}</a></li>`
    }

    list += `<li class="page-item ${(currentPage == totalPages)?'disabled' :''}"><a class="page-link" onclick="paginate(${(currentPage < totalPages)?(currentPage + 1 ): totalPages})">Next</a></li>`;
    return list;
}

function cardComponent(item){
    return `
    <div class="col-lg-4 mb-3">
        <div class="item">
            <div class="card m-auto" style="width: 18rem;">
            <img 
                src="${item.urlToImage || 'images/default.jpeg'}"
                onerror="this.onerror=null; this.src='images/default.jpeg'"
                class="card-img-top"
                alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title?.slice(0 , 15)}</h5>
                <p class="card-text">${item.description?.slice(0 ,100)}</p>
                <a href="${item.url}" target="_blank" class="btn btn-dark">See More</a>
            </div>
            </div>
        </div>
    </div>
    `
 }

function paginate(pageNumbrr){
    let category = document.querySelector("#category").value,
        search = document.querySelector("#Search").value;

    getData(category , search , pageNumbrr);    
}
 