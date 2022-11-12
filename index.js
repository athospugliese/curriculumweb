Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "PDZ9yF78xgN3wgkud2DBh4s4ouR46Vcu3HRhoJMH", // This is your Application ID
  "hWL8JHVEJ3itZb4jRKigrSqj1QsJIuWg62ZhwfMa" // This is your Javascript key
);
const recado = Parse.Object.extend("recado");

const h3Descricao = document.getElementById("h3Descricao");
const listarecados = document.getElementById("listarecados");
const inputDescricao = document.getElementById("inputDescricao");
const btInserir = document.getElementById("btInserir");





const lerrecados = async () => {
  const query = new Parse.Query(recado);
  try {
    const results = await query.find();
    listarecados.innerHTML = "";
    for (const recado of results) {
      const descricao = recado.get("descricao");
      const lirecado = document.createElement("li");
      const textNode = document.createTextNode(
        ` ${descricao}`
      );
      lirecado.appendChild(textNode);
      listarecados.appendChild(lirecado);
    }
  } catch (error) {
    console.error("Error while fetching recado", error);
  }
};



const inserirrecado = async () => {
  const descricao = inputDescricao.value.trim();
  if (!descricao) {
    alert("Favor inserir uma descrição!");
    return;
  }
  const recado = new Parse.Object("recado");
  recado.set("descricao", descricao);
  try {
    const result = await recado.save();
    console.log("recado created", result.id);
  } catch (error) {
    console.error("Error while creating recado: ", error);
  }
  inputDescricao.value = "";
  inputDescricao.focus();
  lerrecados();
};

lerrecados();

btInserir.onclick = inserirrecado;
