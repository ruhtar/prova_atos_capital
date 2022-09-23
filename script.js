///----------------- DECLARAÇÃO DE VARIÁVEIS -----------------------------
const url = "https://gorest.co.in/public/v2/users/";
const botaoCriar = document.getElementById("botao-criar");
const tabela = document.getElementById("tabela");
const dados = pegaUsuarios(url);
const usuarios = JSON.parse(dados);

//------------------------- FUNÇÕES -----------------------------
function pegaUsuarios(url) {
  //Função responsável por fazer a requição pela URL.
  const request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

function renderizaCampos() {
  //Função principal que gera a tabela inicial.
  //Usa o https://gorest.co.in/public/v2/users e renderiza na tela os campos “id”, “name” e “email".
  //2ª questão. Letra A.
  usuarios.forEach((elemento) => {
    const linha = criaTabela(elemento);
    tabela.appendChild(linha);
  });
}
renderizaCampos();

function criaTabela(usuarios) {
  //Função responsável por lidar com a tabela e os usuários.
  const linha = document.createElement("tr");
  const id = document.createElement("td");
  const nome = document.createElement("td");
  const email = document.createElement("td");
  const tdBotao = document.createElement("td");
  const botaoEditar = document.createElement("button");
  const botaoExcluir = document.createElement("button");

  tdBotao.appendChild(botaoEditar);
  tdBotao.appendChild(botaoExcluir);

  id.innerHTML = usuarios.id;
  nome.innerHTML = usuarios.name;
  email.innerHTML = usuarios.email;
  botaoEditar.innerHTML = "Editar";
  botaoExcluir.innerHTML = "Excluir";

  // Colocando classes nos elementos
  botaoEditar.classList.add("botao-editar");
  botaoExcluir.classList.add("botao-excluir");
  id.classList.add("classe-id");
  nome.classList.add("classe-nome");
  email.classList.add("classe-email");

  // Eventos de click
  editaUsuario(botaoEditar, id.innerHTML, nome, email, usuarios);
  deletaUsuario(botaoExcluir, id.innerHTML, linha);

  linha.appendChild(id);
  linha.appendChild(nome);
  linha.appendChild(email);
  linha.appendChild(tdBotao);

  return linha;
}

// -------------- Definição das funções de click para o CRUD --------------------

async function criaUsuario(url) {
  //Letra B.
  //Cria um registro na tabela pela api com inputs do usuário.
  const name = prompt("Digite o nome do(a) usuário(a): ");
  const genero = prompt("Digite o gênero do(a) usuário(a):\n\n male ou female");
  const email = prompt("Digite um email válido para o(a) usuário(a): ");
  const status = prompt(
    "Digite o status do(a) usuário(a):\n\n active ou inactive"
  );

  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer cf489406dc86d4a28dbcddb0eb797e941cd2058822872318b1ff6d8fe51ce7eb",
    },
    body: JSON.stringify({
      name: name,
      gender: genero,
      email: email,
      status: status,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      if (data) {
        const linha = criaTabela(data);
        tabela.appendChild(linha);
      }
    })
    .catch((error) => console.log(error));
}

function editaUsuario(botaoEditar, id, nomeTabela, emailTabela, usuarios) {
  //Letra C.
  //Função que edita os dados do usuário.
  //Valores são entrados por input.
  botaoEditar.addEventListener("click", async () => {
    //If state para caso o usuário não queria editar esse campo específico.
    let name = prompt("Digite o novo nome do(a) usuário(a): ");
    if (name == "") name = usuarios.name;

    let genero = prompt("Digite o novo gênero do(a) usuário(a): ");
    if (genero == "") genero = usuarios.gender;

    let email = prompt("Digite o novo email do(a) usuário(a): ");
    if (email == "") email = usuarios.email;

    let status = prompt("Digite o novo status do(a) usuário(a): ");
    if (status == "") status = usuarios.status;

    await fetch(url + `${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer cf489406dc86d4a28dbcddb0eb797e941cd2058822872318b1ff6d8fe51ce7eb",
      },
      body: JSON.stringify({
        name: name,
        gender: genero,
        email: email,
        status: status,
      }),
    })
      .then((res) => {
        if (res.ok) {
          nomeTabela.innerHTML = name;
          emailTabela.innerHTML = email;
          //seta os valores da tabela para serem iguais aos editados.
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function deletaUsuario(botaoExcluir, id, linha) {
  //Letra D.
  //Função que deleta um usuário segundo o parâmetro passado pelo endpoint.
  botaoExcluir.addEventListener("click", async () => {
    await fetch(url + `${id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer cf489406dc86d4a28dbcddb0eb797e941cd2058822872318b1ff6d8fe51ce7eb",
      },
      body: {
        id: id,
      },
    })
      .then((res) => {
        if (res.ok) {
          linha.remove();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
