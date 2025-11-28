/* ======================================================= */
/* ARQUIVO JAVASCRIPT: script.js (COMPLETO)                */
/* ======================================================= */

const ESTOQUE_SIZE = 28;
const EXPEDITION_SIZE = 12;

// Elementos do DOM
const containerEstoque = document.getElementById('estoque-container');
const containerExpedicao = document.getElementById('expeditions-container');
const statusPanels = {
    geral: document.getElementById('status-geral'),
    processo: document.getElementById('status-processo'),
    montagem: document.getElementById('status-montagem')
};
const envDataElements = {
    health: document.getElementById('health'),
    temperature: document.getElementById('temperature'),
    voltage: document.getElementById('voltage'),
    humidity: document.getElementById('humidity'),
    current: document.getElementById('current')
};

let isWorking = false;
const COLORS_ESTOQUE = ['vermelho', 'azul', 'preto', 'vazio'];
const STATUS_EXPEDICAO = ['working-status', 'idle-status'];

// --- Funções de Inicialização ---

function initializeStock() {
    if (!containerEstoque) return; 
    for (let i = 0; i < ESTOQUE_SIZE; i++) {
        const posicao = document.createElement('div');
        posicao.className = 'posicao vazio'; 
        posicao.id = `pos-${i + 1}`;
        posicao.innerHTML = `<span class="pos-number">${i + 1}</span>`;
        containerEstoque.appendChild(posicao);
    }
}

function initializeExpeditions() {
    if (!containerExpedicao) return; 
    for (let i = 0; i < EXPEDITION_SIZE; i++) {
        const expedicao = document.createElement('div');
        expedicao.className = 'expedicao idle-status'; 
        expedicao.id = `exp-${i + 1}`;
        expedicao.innerHTML = `<span class="pedido-info">Livre<br>#${i + 1}</span>`;
        containerExpedicao.appendChild(expedicao);
    }
}


// --- Funções de Simulação e Controle ---

function toggleStatus() {
    isWorking = !isWorking;
    const statusText = isWorking ? "TRABALHANDO ⚡" : "OCIOSO 💤";
    const addClass = isWorking ? 'working-status' : 'idle-status';
    const removeClass = isWorking ? 'idle-status' : 'working-status';

    for (const key in statusPanels) {
        const panel = statusPanels[key];
        if (panel) {
            panel.querySelector('.status-text').textContent = statusText;
            panel.classList.remove(removeClass);
            panel.classList.add(addClass);
        }
    }
}

function randomizeStock() {
    for (let i = 1; i <= ESTOQUE_SIZE; i++) {
        const posicao = document.getElementById(`pos-${i}`);
        if (!posicao) continue;
        
        const randomColor = COLORS_ESTOQUE[Math.floor(Math.random() * COLORS_ESTOQUE.length)];
        posicao.classList.remove(...COLORS_ESTOQUE);
        posicao.classList.add(randomColor);
    }
}

function randomizeExpeditions() {
    for (let i = 1; i <= EXPEDITION_SIZE; i++) {
        const expedicao = document.getElementById(`exp-${i}`);
        if (!expedicao) continue;
        
        if (Math.random() > 0.4) { // 60% de chance de ter um pedido
            const status = STATUS_EXPEDICAO[Math.floor(Math.random() * STATUS_EXPEDICAO.length)];
            const pedidoNum = Math.floor(Math.random() * 9000) + 1000;
            
            expedicao.classList.remove(...STATUS_EXPEDICAO);
            expedicao.classList.add(status);

            const statusLabel = status === 'working-status' ? 'ENVIANDO' : 'AGUARDANDO';
            expedicao.innerHTML = `<span class="pedido-info">P#${pedidoNum}<br>${statusLabel}</span>`;
        } else {
            // Vazio/Ocioso
            expedicao.classList.remove(...STATUS_EXPEDICAO);
            expedicao.classList.add('idle-status');
            expedicao.innerHTML = `<span class="pedido-info">LIVRE<br>#${i}</span>`;
        }
    }
}

function updateEnvironmentalData() {
    // Valores realistas simulados com chance de alerta
    const temp = (Math.random() * 10 + 20).toFixed(1); // 20.0°C a 30.0°C
    const volt = (Math.random() * 10 + 215).toFixed(0); // 215V a 225V
    const humid = (Math.random() * 20 + 45).toFixed(0); // 45% a 65%
    const current = (Math.random() * 3 + 8).toFixed(1); // 8.0A a 11.0A

    // 1. SAÚDE DA BANCADA: Alerta se Temperatura ou Corrente estiver alta
    let healthStatus = 'OK';
    let healthClass = 'ok-data';
    if (temp > 28 || current > 10.5) {
        healthStatus = 'ALERTA!';
        healthClass = 'alert-data';
    } 

    envDataElements.health.textContent = healthStatus;
    envDataElements.health.className = healthClass; // Aplica a classe CSS

    // 2. TEMPERATURA: Alerta se > 28°C
    envDataElements.temperature.textContent = `${temp}°C`;
    envDataElements.temperature.className = temp > 28 ? 'alert-data' : 'ok-data';

    // 3. TENSÃO: OK padrão, mas atualiza valor
    envDataElements.voltage.textContent = `${volt}V`;

    // 4. UMIDADE: OK padrão, mas atualiza valor
    envDataElements.humidity.textContent = `${humid}%`;
    
    // 5. CORRENTE: Alerta se > 10.5A
    envDataElements.current.textContent = `${current}A`;
    envDataElements.current.className = current > 10.5 ? 'alert-data' : 'ok-data';
}

function randomizeAll() {
    randomizeStock();
    randomizeExpeditions();
    updateEnvironmentalData();
}

// ----------------------------------------------------
// Inicialização
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initializeStock();
    initializeExpeditions();
    
    // Inicializa o estado como Ocioso
    isWorking = true; 
    toggleStatus(); 

    // Define a simulação inicial dos dados ambientais
    randomizeAll();

    // Atualiza os dados ambientais a cada 5 segundos
    setInterval(updateEnvironmentalData, 5000); 
});