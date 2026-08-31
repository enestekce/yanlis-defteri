let aktifKullanici = "";



// kullanıcı giriş

function giris(isim){

    aktifKullanici = isim;

    localStorage.setItem("aktifKullanici", isim);


    document.getElementById("userSelect").classList.add("hidden");

    document.getElementById("mainPanel").classList.remove("hidden");


    document.getElementById("hosgeldin").innerHTML =
    "Hoş geldin " + isim;


    istatistikGuncelle();

}



// sayfa değiştirme

function git(sayfa){

    window.location.href = sayfa;

}



// kayıtları getir

function kayitGetir(){

    if(!aktifKullanici){

        aktifKullanici =
        localStorage.getItem("aktifKullanici");

    }


    let veriler =
    JSON.parse(localStorage.getItem("kayitlar_" + aktifKullanici)) || [];


    return veriler;

}



// kayıt kaydet

function kayitKaydet(kayit){

    let liste = kayitGetir();


    liste.push(kayit);


    localStorage.setItem(
        "kayitlar_" + aktifKullanici,
        JSON.stringify(liste)
    );

}



// ana ekran sayıları

function istatistikGuncelle(){

    let liste = kayitGetir();


    let toplam = liste.length;


    let yanlis =
    liste.filter(x=>x.durum=="Yanlış yaptım").length;


    let bos =
    liste.filter(x=>x.durum=="Boş bıraktım").length;



    if(document.getElementById("toplam")){

        document.getElementById("toplam").innerHTML =
        toplam;


        document.getElementById("yanlis").innerHTML =
        yanlis;


        document.getElementById("bos").innerHTML =
        bos;

    }

}



// sayfa açılınca kullanıcıyı hatırla

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
