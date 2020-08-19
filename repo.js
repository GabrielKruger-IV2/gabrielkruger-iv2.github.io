let id= JSON.parse(localStorage.getItem('repo'));
var estrutura = document.getElementById('body');


let nomeRepo =""; 
var nomeUser;
var urlFoto;
var descricao;
var seguidores ="";
var colaboradores="";
var branches="";
var commits="";
var lingua="";



    const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/users/GabrielKruger-IV2/repos");
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {

        const result = JSON.parse(xhr.responseText);
        for(i=0;i<result.length;i++){
            if(id==result[i].id){

                nomeRepo = result[i].name;
                nomeUser = result[i].owner.login;
                urlFoto = result[i].owner.avatar_url;
                descricao = result[i].description;
                lingua = result[i].languages_url;
                seguidores = result[i].owner.following_url;
                colaboradores = result[i].collaborators_url;
                branches = result[i].branches_url;
                commits = result[i].commits_url;
                
                
                document.getElementById("idNomeRepo").innerHTML += nomeRepo;

                var imgUser = document.createElement('img')
                imgUser.setAttribute('src', urlFoto)
                document.getElementById('idImgPerfil').appendChild(imgUser)

                document.getElementById("idNomeUser").innerHTML+=nomeUser;
                if(descricao==null){
                    document.getElementById("descricao").innerHTML+="Não há descrição"
                }else{
                document.getElementById("descricao").innerHTML+=descricao
            }

            branche(nomeRepo);
            comit(nomeRepo);
            lang(nomeRepo);
            urlFollow="https://api.github.com/users/GabrielKruger-IV2/following"
            folow(urlFollow)
                }
        
            }
        }
}

function folow(url){
const xhr2 = new XMLHttpRequest();
xhr2.open("GET", url);
xhr2.send();
xhr2.onreadystatechange = function () {
    if (xhr2.status == 200 && xhr2.readyState == 4) {

        const seg = JSON.parse(xhr2.responseText);

        document.getElementById("contSeg").innerHTML+="Seguidores:"+ seg.length ;

    }
}
}
/*const xhr3 = new XMLHttpRequest();
xhr3.open("GET", colaboradores);
xhr3.send();
xhr3.onreadystatechange = function () {
    if (xhr3.status == 200 && xhr3.readyState == 4) {

        const colaborador = JSON.parse(xhr3.responseText);
        
      
    }
}*/

function branche (nome){
    
const xhr4 = new XMLHttpRequest();
xhr4.open("GET", "https://api.github.com/repos/GabrielKruger-IV2/"+nome+"/branches");
xhr4.send();
xhr4.onreadystatechange = function () {
    if (xhr4.status == 200 && xhr4.readyState == 4) {

        const branche = JSON.parse(xhr4.responseText);

        for(i=0;i<branche.lenght;i++){
        document.getElementById("idbranche").innerText +=  branche[i].name ;
        alert(branche[i].name);
    }
        
    }
}
}

function comit(nome){
const xhr5 = new XMLHttpRequest();
xhr5.open("GET", "https://api.github.com/repos/GabrielKruger-IV2/"+nome+"/commits");
xhr5.send();
xhr5.onreadystatechange = function () {
    if (xhr5.status == 200 && xhr5.readyState == 4) {

        
        const comi = JSON.parse(xhr5.responseText);
        for(i=0;i<comi.lenght;i++){
        document.getElementById("idCommit").innerText += ` ${comi[i].commit.message},`;
    }
        
    }
}
}

function lang(nome){
const xhr6 = new XMLHttpRequest();
xhr6.open("GET", "https://api.github.com/repos/GabrielKruger-IV2/"+nome+"/languages");
xhr6.send();
xhr6.onreadystatechange = function () {
    if (xhr6.status == 200 && xhr6.readyState == 4) {

        const ling = JSON.parse(xhr6.responseText);

        for(i=0;i<ling.lenght;i++){
            document.getElementById("idLing").innerText += ' ' + ling[i].name + ',';
            
        }
    }
}
}
