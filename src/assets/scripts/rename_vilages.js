// ==UserScript==
// @name     Renomeador de aldeias
// @version  1
// @grant    none
// ==/UserScript==

var div_paged_view_content = document.querySelector("#paged_view_content");

if (div_paged_view_content) {
  // 1. Cria a nova div
  var div_new_name = document.createElement("div");
  div_new_name.id = "rename-div";

  // 2. Cria a tabela
  var table_new_name = document.createElement("table");
  table_new_name.className = "rename-table";
  table_new_name.style.width = "15%";
  table_new_name.style.border = "7px solid rgba(121,0,0,0.71)";
  table_new_name.style.borderImageSlice = "7 7 7 7";
  table_new_name.style.borderImageSource =
    "url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png)";

  // 3. Cria o tbody
  var tbody = document.createElement("tbody");

  // 4. Cria a primeira linha e o cabeçalho
  var tr1 = document.createElement("tr");
  var th = document.createElement("th");
  th.style.textAlign = "center";
  th.colSpan = "11";
  th.textContent = "Escreva o novo nome para as aldeias";
  tr1.appendChild(th);

  // 5. Cria a segunda linha e as células
  var tr2 = document.createElement("tr");

  // Célula do input de texto
  var td1 = document.createElement("td");
  td1.id = "input_name";
  td1.align = "center";
  var input_name = document.createElement("input");
  input_name.id = "my-input-text";
  input_name.type = "text";
  input_name.style.width = "246px";
  input_name.size = "32";
  input_name.maxLength = "32";
  td1.appendChild(input_name);

  // Célula do botão
  var td2 = document.createElement("td");
  td2.id = "countScript";
  td2.align = "center";
  var inputButton = document.createElement("input");
  inputButton.id = "my-input-button";
  inputButton.type = "button";
  inputButton.className = "btn";
  inputButton.value = "Renomear";
  inputButton.addEventListener("click", renameVillages);
  td2.appendChild(inputButton);

  tr2.appendChild(td1);
  tr2.appendChild(td2);

  // 6. Adiciona as linhas ao tbody
  tbody.appendChild(tr1);
  tbody.appendChild(tr2);

  // 7. Adiciona o tbody à tabela
  table_new_name.appendChild(tbody);

  // 8. Adiciona a tabela à nova div
  div_new_name.appendChild(table_new_name);

  // 9. Adiciona um <br> após a tabela
  div_new_name.appendChild(document.createElement("br"));

  // 10. Insere a nova div no topo da div existente
  div_paged_view_content.insertBefore(
    div_new_name,
    div_paged_view_content.firstChild
  );
}

function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

async function renameVillages() {
  // Seleciona todos os links de renomear
  var rename_links = document.querySelectorAll(
    'a.rename-icon[data-title="Renomear"]'
  );
  var new_name = document.querySelector("#rename-div #my-input-text").value;

  for (let link of rename_links) {
    link.click();
    await delay(100);
    var rename_input = document.querySelector(
      'input[type="text"]:not(#my-input-text)'
    );
    var rename_button = document.querySelector(
      'input[type="button"]:not(#my-input-button)'
    );

    if (rename_input && rename_button) {
      rename_input.value = new_name;
      await delay(100);
      rename_button.click();
      await delay(100);
    }
  }
}
