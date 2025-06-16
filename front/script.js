const token = "9922e61d73a5d3"; // Insira seu token aqui
let historico = [];

function buscarIP() {
    const ip = document.getElementById("ipInput").value.trim();
    const url = ip ? `https://ipinfo.io/${ip}/json?token=${token}` : `https://ipinfo.io/json?token=${token}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            mostrarTabela(data);
            salvarHistorico(data.ip || ip || "IP Desconhecido");
        })
        .catch(err => {
            alert("Erro ao buscar o IP.");
            console.error(err);
        });
}

function mostrarTabela(dados) {
    const tabela = document.getElementById("tabelaDados");
    tabela.innerHTML = "";
    for (const chave in dados) {
        const valor = dados[chave];
        const linha = `<tr><td>${chave}</td><td>${valor}</td></tr>`;
        tabela.innerHTML += linha;
    }
    document.getElementById("resultadoTable").style.display = "table";
}

function salvarHistorico(ip) {
    historico.unshift(ip); // adiciona no início
    renderizarHistorico();
}

function excluirHistorico(index) {
    historico.splice(index, 1);
    renderizarHistorico();
}

function renderizarHistorico() {
    const container = document.getElementById("historico");
    container.innerHTML = "";
    historico.forEach((ip, index) => {
        const div = document.createElement("div");
        div.className = "historico-item";
        div.innerHTML = `
            <span>${ip}</span>
            <button onclick="excluirHistorico(${index})">Excluir</button>
        `;
        container.appendChild(div);
    });
}
