var estrutura = document.getElementById('body')
var cont=0;
var links = [];
const xhr = new XMLHttpRequest();


xhr.open("GET", "https://api.github.com/users/GabrielKruger-IV2/repos")
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {

        const result = JSON.parse(xhr.responseText);
        estrutura.innerHTML+= `<div id="Titulo">
        <h1>Meu portfólio</h1>
        </div>`
        for (i = 0; i < result.length; i++) {
            if(cont==0){
            estrutura.innerHTML += `    
            
            <div id="div" class="left">
                <table id="table" >
                    <tr >
                    
                        <td id="tdNome"><h3 id="nome">Nome:${result[i].name}</h3></td>
                        <td class="tdA"><a href="${result[i].html_url}" id="linkPagina">Link</a></td>
                    
                </tr>
    
                <tr>
                    
                    <td id="tdLing"><img src='images/${result[i].language}.png' width='100px' height='100px'><p id="linguagem">Linguagem principal:${result[i].language}</p></td>
                    <td class="tdA"><button class="btn" onclick="copiar(${i})">Clonar</button> <button class="btn" onclick="repo(${result[i].id})">Ver repositório</button></td>
                </tr>
    
        
                </table>
            </div>`;
        cont=1;
        links[i] = result[i].clone_url;
        
    }else{
        estrutura.innerHTML += `    
        
        
        <div id="div" class="right">
            <table id="table" >
                <tr >
                
                    <td id="tdNome"><h3 id="nome">Nome:${result[i].name}</h3></td>
                    <td class="tdA"><a href="${result[i].html_url}" id="linkPagina">Link</a></td>
                
            </tr>

            <tr>
                
                <td id="tdLing"><img src='images/${result[i].language}.png' width='100px' height='100px'><p id="linguagem">Linguagem principal:${result[i].language}</p></td>
                <td class="tdA"><button class="btn" onclick="copiar(${i})">Clonar</button><button class="btn" onclick="repo(${result[i].id})">Ver repositório</button></td>
            </tr>

    
            </table>
        </div>
    `;
        cont=0;
        links[i] = result[i].clone_url;
        
        }


        }
    }
}


function copiar(e) {
    const input= document.createElement("input");
    input.value = links[e];
    input.id = "input";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    alert("Link copiado");
  }

  function repo(obj){
      
      const obj_json = JSON.stringify(obj);
      localStorage.setItem("repo",obj_json)
      window.location.href = "repositorio.html";
      
  }