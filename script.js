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


    return JSON.parse(

        localStorage.getItem("kayitlar_" + aktifKullanici)

    ) || [];

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



// ana ekran istatistik

function istatistikGuncelle(){


    let liste = kayitGetir();



    let toplamSayi = liste.length;



    let yanlisSayi =
    liste.filter(x => x.durum == "Yanlış yaptım").length;



    let bosSayi =
    liste.filter(x => x.durum == "Boş bıraktım").length;



    let tekrarSayi =
    liste.filter(x => x.tekrar == true).length;





    if(document.getElementById("toplam")){

        document.getElementById("toplam").innerHTML =
        toplamSayi;

    }




    if(document.getElementById("yanlis")){

        document.getElementById("yanlis").innerHTML =
        yanlisSayi;

    }




    if(document.getElementById("bos")){

        document.getElementById("bos").innerHTML =
        bosSayi;

    }




    if(document.getElementById("tekrar")){

        document.getElementById("tekrar").innerHTML =
        tekrarSayi;

    }


}





// kayıt silme

function kayitSil(index){


    let veriler = kayitGetir();



    if(confirm("Bu kaydı silmek istediğine emin misin?")){


        veriler.splice(index,1);



        localStorage.setItem(

            "kayitlar_" + aktifKullanici,

            JSON.stringify(veriler)

        );



        location.reload();


    }


}





// tekrar edildi

function tekrarYapildi(index){


    let veriler = kayitGetir();



    if(!veriler[index].tekrar){

        veriler[index].tekrar = true;

    }

    else{

        veriler[index].tekrar = false;

    }




    localStorage.setItem(

        "kayitlar_" + aktifKullanici,

        JSON.stringify(veriler)

    );



    location.reload();


}






// sayfa açılınca kullanıcıyı hatırla

window.onload = function(){



    let kayitli =

    localStorage.getItem("aktifKullanici");




    if(kayitli && document.getElementById("mainPanel")){


        aktifKullanici = kayitli;



        document.getElementById("userSelect").classList.add("hidden");



        document.getElementById("mainPanel").classList.remove("hidden");



        document.getElementById("hosgeldin").innerHTML =

        "Hoş geldin " + kayitli;



        istatistikGuncelle();
gorevleriGoster();

       }
};


function hedefEkleAc(){

    let alan = document.getElementById("hedefEkleAlan");

    if(alan.style.display === "none" || alan.style.display === ""){

        alan.style.display = "block";

    }else{

        alan.style.display = "none";

    }

}


function hedefKaydet(){

    let hedef = document.getElementById("yeniHedef").value.trim();

    if(hedef === ""){
        alert("Hedef boş bırakılamaz");
        return;
    }

    localStorage.setItem("gunlukHedef", hedef);

    document.getElementById("hedefYazi").innerHTML = hedef;

    alert("🎯 Günlük hedef kaydedildi");

}
function gorevEkleAc(){

let alan = document.getElementById("gorevEkleAlan");

if(alan.style.display == "none" || alan.style.display == ""){

alan.style.display = "block";

}
else{

alan.style.display = "none";

}

}


function gorevKaydet(){

let ders = document.getElementById("dersAdi").value;
let tur = document.getElementById("gorevTuru").value;
let hedef = document.getElementById("hedefMiktar").value;
let link = document.getElementById("youtubeLink").value;


let gorevler =
JSON.parse(localStorage.getItem("gorevler_" + aktifKullanici)) || [];

gorevler.push({

ders:ders,
tur:tur,
hedef:hedef,
tamamlanan:0,
link:link

});


localStorage.setItem(
"gorevler_" + aktifKullanici,
JSON.stringify(gorevler)
);

alert("✅ Görev eklendi");


gorevleriGoster();

}
function gorevleriGoster(){

let liste = document.getElementById("gorevListesi");

if(!liste) return;


let gorevler =
JSON.parse(localStorage.getItem("gorevler_" + aktifKullanici)) || [];


liste.innerHTML="";


gorevler.forEach((gorev,index)=>{


liste.innerHTML += `

<div class="box">

<h3>📚 ${gorev.ders}</h3>

<p>
${gorev.tur}
</p>

<p>
🎯 Hedef: ${gorev.hedef}
</p>

<p>
✅ Çözülen: ${gorev.tamamlanan}
</p>


<button onclick="gorevTamamla(${index})">

+ Tamamlandı

</button>


${gorev.link ? 
`<a href="${gorev.link}" target="_blank">
▶️ Video
</a>` 
:""}


</div>

`;

});


}



function gorevTamamla(index){

let gorevler =
JSON.parse(localStorage.getItem("gorevler_" + aktifKullanici)) || [];

gorevler[index].tamamlanan++;


localStorage.setItem(
"gorevler_" + aktifKullanici,
JSON.stringify(gorevler)
);

gorevleriGoster();

}
