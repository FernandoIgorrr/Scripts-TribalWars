// ==UserScript==
// @name     Auto-saques
// @version  1
// @grant    none
// ==/UserScript==

var units_home = document.querySelector("#units_home")
var units_tbodies = units_home.tBodies

var tr2 = document.createElement("tr");
var tr3 = document.createElement("tr");

var td1 = document.createElement("td");
var td2 = document.createElement("td");

var td11 = document.createElement("td");

td1.id = "full-farm-a-button";
td1.align = "center";

td2.id = "full-farm-b-button";
td2.align = "center";
td2.colSpan = 7;

td11.id = "quebra-muralha";
td11.align = "center";
td11.colSpan = 8;

var inputButtonA = document.createElement("input");
  inputButtonA.id = "full-farm-a";
  inputButtonA.type = "button";
  inputButtonA.className = "btn";
  inputButtonA.value = "Full farm A";
  inputButtonA.addEventListener('click', autoFarmA);

var inputButtonB = document.createElement("input");
  inputButtonB.id = "full-farm-b";
  inputButtonB.type = "button";
  inputButtonB.className = "btn";
  inputButtonB.value = "Full farm B";
  inputButtonB.addEventListener('click', autoFarmB);

var inputButtonQM = document.createElement("input");
  inputButtonQM.id = "quebra-muralha";
  inputButtonQM.type = "button";
  inputButtonQM.className = "btn";
  inputButtonQM.value = "Qubra Muralha";
  inputButtonQM.addEventListener('click', quebraMuralha);


td1.appendChild(inputButtonA);
td2.appendChild(inputButtonB);

td11.appendChild(inputButtonQM);

tr2.appendChild(td1);
tr2.appendChild(td2);

tr3.appendChild(td11);

units_tbodies[0].appendChild(tr2);
units_tbodies[0].appendChild(tr3);



function autoFarmA() {

    const buttons = document.querySelectorAll(".farm_icon.farm_icon_a:not(.decoration)");
    let index = 0;

	  var lights_values = document.querySelectorAll('input[name^="light["]');
		var lights_value_a = lights_values[0].value;
		console.log("VALOR DE A: " + lights_value_a)

    const clickButton = () => {
        if (index < buttons.length) {
            let num_lights = Number(document.querySelector(".unit-item.unit-item-light").innerText)
            console.log("NUMERO ATUAL DE TROPAS: " + num_lights)

            if(num_lights < lights_value_a){
              index = buttons.length
              console.log("ACABOU AS TROPAS")
            }
            buttons[index].click();
            index++;
        } else {
            clearInterval(interval);
            console.log("Todos os botões foram clicados.");
        }
    };

    const interval = setInterval(clickButton, 333);
}


function autoFarmB() {

    const buttons = document.querySelectorAll(".farm_icon.farm_icon_b:not(.decoration)");
    let index = 0;


	  var lights_values = document.querySelectorAll('input[name^="light["]');
		var lights_value_b = lights_values[1].value;

    const clickButton = () => {
        if (index < buttons.length) {
            let num_lights = Number(document.querySelector(".unit-item.unit-item-light").innerText)

            if(num_lights < lights_value_b){
              index = buttons.length
            }
            buttons[index].click();
            index++;
        } else {
            clearInterval(interval);
            console.log("Todos os botões foram clicados.");
        }
    };

    const interval = setInterval(clickButton, 333);
}

function quebraMuralha(){

  var table = document.querySelector("#plunder_list")

  if (table)
  {
  	var trs = table.querySelectorAll("tr");
	}
  else
  {
    console.log("Tabela não encontrada.");
	}

  let trsWithImage = Array.from(trs).filter(tr => {
    // Verifica se a <td> dentro do <tr> contém a imagem específica
    let tdWithImage = tr.querySelector("td img[data-title='Perdas']");
    return tdWithImage !== null;
	});
  console.log("VAI CHAMAR????")
  // Inicia o processo de clicar nos links com intervalo
  clickWithDelay(0,trsWithImage);
    console.log("CHAMOU !!!!")

}

function clickWithDelay(index,trsWithImage) {

    if (index < trsWithImage.length) {

      let tr = trsWithImage[index];
      let link = tr.querySelector("a[href^='/game.php?village='][onclick]");

      if (link) {
        link.click();
        console.log("Link correto clicado:", link.href);

        // Espera 1 segundo para a janela carregar
        setTimeout(() => {
          // Preenche os inputs com os valores especificados
          let lightInput = document.querySelector("#unit_input_light");
          let ramInput = document.querySelector("#unit_input_ram");
          if (lightInput && ramInput) {
            lightInput.value = 25;
            ramInput.value = 15;
            console.log("Inputs preenchidos: light = 25, ram = 10");

            // Clica no botão após preencher os inputs
            let firstButton = document.querySelector("input[type='submit']#target_attack");
            if (firstButton) {
              firstButton.click();
              console.log("Primeiro botão de enviar clicado.");

              // Espera mais 1 segundo para a próxima janela carregar
              setTimeout(() => {
                // Clica no botão de confirmação
                let confirmButton = document.querySelector("#troop_confirm_submit");
                if (confirmButton) {
                  confirmButton.click();
                  console.log("Botão de confirmação clicado.");
                } else {
                  console.log("Botão de confirmação não encontrado.");
                }

                // Chama a função novamente após 3 segundos para o próximo índice
                setTimeout(() => clickWithDelay(index + 1,trsWithImage), 3000);
              }, 1000); // 1 segundo de espera para a confirmação
            } else {
              console.log("Primeiro botão de enviar não encontrado.");
            }
          } else {
            console.log("Inputs não encontrados.");
          }
        }, 1000); // 1 segundo de espera para a janela carregar
      }
    }
  }
