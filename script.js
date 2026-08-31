let currentUser = "";


function selectUser(name){

    currentUser = name;


    document.querySelector(".user-box").style.display = "none";


    document.getElementById("panel").classList.remove("hidden");


    document.getElementById("welcome").innerHTML =
    "Hoş geldin " + name;


    localStorage.setItem("user", name);

}



window.onload = function(){

    let savedUser = localStorage.getItem("user");


    if(savedUser){

        currentUser = savedUser;

        document.querySelector(".user-box").style.display = "none";

        document.getElementById("panel").classList.remove("hidden");

        document.getElementById("welcome").innerHTML =
        "Hoş geldin " + savedUser;

    }

}
