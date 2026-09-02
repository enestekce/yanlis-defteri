let aktifKullanici = "";


function giris(isim){

    aktifKullanici = isim;

    localStorage.setItem("aktifKullanici", isim);


    document.getElementById("userSelect").classList.add("hidden");

    document.getElementById("mainPanel").classList.remove("hidden");


    document.getElementById("hosgeldin").innerHTML =
    "Hoş geldin " + isim;


    istatistikGuncelle();

}



function git(sayfa){

    window.location.href = sayfa;

}



function kayitGetir(){

    if(!aktifKullanici){

        aktifKullanici =
        localStorage.getItem("aktifKullanici");

    }


    return JSON.parse(
        localStorage.getItem("kayitlar_" + aktifKullanici)
    ) || [];

}



function kayitKaydet(kayit){

    let liste = kayitGetir();

    liste.push(kayit);


    localStorage.setItem(
        "kayitlar_" + aktifKullanici,
        JSON.stringify(liste)
    );

}



function istatistikGuncelle(){

    let liste = kayitGetir();


    let toplam = liste.length;


    let yanlis =
    liste.filter(x=>x.durum=="Yanlış yaptım").length;


    let bos =
    liste.filter(x=>x.durum=="Boş bıraktım").length;



    if(document.getElementById("toplam")){


        toplam.innerHTML=toplam;


    }


    if(document.getElementById("yanlis")){

        document.getElementById("yanlis").innerHTML=yanlis;

    }


    if(document.getElementById("bos")){

        document.getElementById("bos").innerHTML=bos;

    }


}



function kayitSil(index){


let veriler = kayitGetir();


veriler.splice(index,1);


localStorage.setItem(

"kayitlar_" + aktifKullanici,

JSON.stringify(veriler)

);


location.reload();


}



function tekrarYapildi(index){


let veriler=kayitGetir();


veriler[index].tekrar =
!veriler[index].tekrar;


localStorage.setItem(

"kayitlar_" + aktifKullanici,

JSON.stringify(veriler)

);


location.reload();


}




window.onload=function(){


let kayitli =
localStorage.getItem("aktifKullanici");


if(kayitli && document.getElementById("mainPanel")){


aktifKullanici=kayitli;


document.getElementById("userSelect").classList.add("hidden");


document.getElementById("mainPanel").classList.remove("hidden");


document.getElementById("hosgeldin").innerHTML =
"Hoş geldin " + kayitli;


istatistikGuncelle();


}


}
