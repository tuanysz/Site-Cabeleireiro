// Carrega os agendamentos ao abrir a página
window.addEventListener("load", carregarAgendamentos);

function agendar() {
    const nome = document.getElementById("nome").value.trim();
    const servico = document.getElementById("servico").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    if (!nome || !servico || !data || !hora) {
        alert("Preencha todos os campos!");
        return;
    }

    const timestamp = new Date(`${data}T${hora}`).getTime();
    const novoAgendamento = { nome, servico, data, hora, timestamp };

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(novoAgendamento);

    // Ordena por data/hora
    agendamentos.sort((a, b) => a.timestamp - b.timestamp);

    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    mostrarAgendamentos(agendamentos);
    limparCampos();
    alert("✅ Agendamento realizado com sucesso!");
}

function mostrarAgendamentos(listaAgendamentos) {
    const lista = document.getElementById("listaAgendamentos");
    lista.innerHTML = "<h1>Agendamentos:</h1>";

    if (listaAgendamentos.length === 0) {
        const vazio = document.createElement("p");
        vazio.textContent = "Nenhum agendamento futuro.";
        vazio.className = "vazio";
        lista.appendChild(vazio);
        return;
    }

    listaAgendamentos.forEach(item => {
        const card = document.createElement("div");
        card.className = "agendamento-card";

        const partesData = item.data.split("-");
        const dataBR = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

        card.innerHTML = `
            <p><strong>${item.nome}</strong> agendou <strong>${item.servico}</strong></p>
            <p>${dataBR} às ${item.hora}</p>
        `;

        lista.appendChild(card);

        // Animação suave
        card.style.opacity = "0";
        setTimeout(() => {
            card.style.transition = "opacity 0.4s ease";
            card.style.opacity = "1";
        }, 100);
    });
}

function carregarAgendamentos() {
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const agora = Date.now();

    //  Remove agendamentos antigos
    const futuros = agendamentos.filter(a => a.timestamp > agora);

    // Se houve mudanças, salva novamente
    if (futuros.length !== agendamentos.length) {
        localStorage.setItem("agendamentos", JSON.stringify(futuros));
    }

    mostrarAgendamentos(futuros);
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("servico").value = "";
    document.getElementById("data").value = "";
    document.getElementById("hora").value = "";
}