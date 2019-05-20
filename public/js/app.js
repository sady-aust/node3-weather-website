console.log("Client side js file loaded");


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let seachValue = search.value;

    fetch("/weather?address="+seachValue).then(resnponse=>{
        resnponse.json().then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log(data);
            }

        })
    });


});
