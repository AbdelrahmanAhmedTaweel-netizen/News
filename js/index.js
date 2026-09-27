getData();
document.querySelector("button").addEventListener("click" , function(e){
    e.preventDefault();

    let category = document.querySelector("#category").value,
        search = document.querySelector("#Search").value;

    getData(category , search , 1);
})