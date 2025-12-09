// script.js
// ====================================================================
// CALCULADORA DE FPS (front-end) + Integração Firestore (history)
// ====================================================================

// ---------------------------
// IMPORTS FIREBASE (module)
// ---------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ---------------------------
// CONFIGURAÇÃO FIREBASE
// Substitua se quiser outra config (já com a sua presente)
// ---------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDgk0e5RwAx0taHWQlOiUoU7lLGIiLyfxo",
  authDomain: "fps-performance.firebaseapp.com",
  projectId: "fps-performance",
  storageBucket: "fps-performance.firebasestorage.app",
  messagingSenderId: "146385084292",
  appId: "1:146385084292:web:47cc1a4bd03b8d09dec7d1",
  measurementId: "G-FDV8NB4BNR"
};

console.log("🔧 Inicializando Firebase...");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("🔥 Firebase inicializado com sucesso.");

// ---------------------------
// DADOS DE PERFORMANCE (GPU, CPU, jogos, multiplers)
// (mantive seu objeto completo; se quiser atualizar, edite aqui)
// ---------------------------
const performanceData = {
    gpuScores: {
        'RTX5090': 110, 'RTX5080': 98, 'RTX5070': 88,
        'RTX4090': 100, 'RTX4080S': 90, 'RTX4080': 88, 'RTX4070TiS': 82,
        'RTX4070Ti': 80, 'RTX4070S': 75, 'RTX4070': 72,
        'RTX4060Ti-16GB': 62, 'RTX4060Ti': 60, 'RTX4060': 55, 'RTX4050': 48,
        'RTX3090Ti': 85, 'RTX3090': 83, 'RTX3080Ti': 78, 'RTX3080-12GB': 76,
        'RTX3080': 75, 'RTX3070Ti': 68, 'RTX3070': 65, 'RTX3060Ti': 58,
        'RTX3060-12GB': 50, 'RTX3060-8GB': 48, 'RTX3050-8GB': 40, 'RTX3050-6GB': 36,
        'RTX2080Ti': 70, 'RTX2080S': 63, 'RTX2080': 60, 'RTX2070S': 56,
        'RTX2070': 52, 'RTX2060S': 48, 'RTX2060-12GB': 46, 'RTX2060': 45,
        'GTX1660Ti': 42, 'GTX1660S': 40, 'GTX1660': 38, 'GTX1650S': 33,
        'GTX1650-GDDR6': 30, 'GTX1650': 28, 'GTX1630': 24,
        'GTX1080Ti': 62, 'GTX1080': 54, 'GTX1070Ti': 50, 'GTX1070': 47,
        'GTX1060-6GB': 38, 'GTX1060-3GB': 35, 'GTX1050Ti': 28,
        'GTX1050-3GB': 24, 'GTX1050': 22,
        'GTX980Ti': 48, 'GTX980': 42, 'GTX970': 38, 'GTX960-4GB': 30,
        'GTX960': 28, 'GTX950': 24,
        'GTX780Ti': 42, 'GTX780': 38, 'GTX770': 35, 'GTX760': 30,
        'GTX750Ti': 22, 'GTX750': 18,
        'GTX690': 36, 'GTX680': 32, 'GTX670': 30, 'GTX660Ti': 26,
        'GTX660': 24, 'GTX650Ti': 20, 'GTX650': 16,
        'RX7900XTX': 92, 'RX7900XT': 85, 'RX7900GRE': 80, 'RX7800XT': 75,
        'RX7700XT': 68, 'RX7600XT-16GB': 58, 'RX7600XT': 56, 'RX7600': 52,
        'RX6950XT': 82, 'RX6900XT': 80, 'RX6800XT': 76, 'RX6800': 72,
        'RX6750XT': 65, 'RX6700XT': 62, 'RX6700-10GB': 58, 'RX6650XT': 55,
        'RX6600XT': 52, 'RX6600': 48, 'RX6500XT': 35, 'RX6400': 28,
        'RX5700XT': 58, 'RX5700': 54, 'RX5600XT': 48, 'RX5600': 45,
        'RX5500XT-8GB': 38, 'RX5500XT': 36, 'RX5500': 34,
        'VEGA64-LC': 54, 'VEGA64': 52, 'VEGA56': 48, 'VEGAFEVII': 60,
        'RX590': 42, 'RX580-8GB': 40, 'RX580': 38, 'RX570-8GB': 36,
        'RX570': 34, 'RX560-4GB': 28, 'RX560': 26, 'RX550': 20,
        'RX480-8GB': 40, 'RX480': 38, 'RX470-8GB': 36, 'RX470': 34,
        'RX460-4GB': 26, 'RX460': 24,
        'R9-FURY-X': 48, 'R9-FURY': 46, 'R9-NANO': 44, 'R9-390X': 38,
        'R9-390': 36, 'R9-380X': 32, 'R9-380': 30, 'R9-290X': 36,
        'R9-290': 34, 'R9-280X': 30, 'R9-280': 28, 'R9-270X': 26,
        'R9-270': 24,
        'R7-370': 22, 'R7-360': 20, 'R7-265': 24, 'R7-260X': 22,
        'R7-260': 20, 'R7-250X': 18, 'R7-250': 16,
        'A770-16GB': 65, 'A770': 63, 'A750': 58, 'A580': 50,
        'A380': 38, 'A310': 28
    },
    cpuScores: {
        'i9-14900KS': 100, 'i9-14900K': 100, 'i9-14900KF': 100, 'i9-14900': 96, 'i9-14900F': 96,
        'i7-14700K': 92, 'i7-14700KF': 92, 'i7-14700': 88, 'i7-14700F': 88,
        'i5-14600K': 85, 'i5-14600KF': 85, 'i5-14600': 82, 'i5-14500': 78,
        'i5-14400': 75, 'i5-14400F': 75, 'i3-14100': 62, 'i3-14100F': 62,
        'i9-13900KS': 99, 'i9-13900K': 98, 'i9-13900KF': 98, 'i9-13900': 94, 'i9-13900F': 94,
        'i7-13700K': 90, 'i7-13700KF': 90, 'i7-13700': 86, 'i7-13700F': 86,
        'i5-13600K': 82, 'i5-13600KF': 82, 'i5-13600': 80, 'i5-13500': 76,
        'i5-13400': 72, 'i5-13400F': 72, 'i3-13100': 60, 'i3-13100F': 60,
        'i9-12900KS': 92, 'i9-12900K': 88, 'i9-12900KF': 88, 'i9-12900': 85, 'i9-12900F': 85,
        'i7-12700K': 80, 'i7-12700KF': 80, 'i7-12700': 76, 'i7-12700F': 76,
        'i5-12600K': 75, 'i5-12600KF': 75, 'i5-12600': 72, 'i5-12500': 70,
        'i5-12400': 68, 'i5-12400F': 68, 'i3-12300': 60, 'i3-12100': 58, 'i3-12100F': 58,
        'i9-11900K': 75, 'i9-11900KF': 75, 'i9-11900': 72, 'i9-11900F': 72,
        'i7-11700K': 70, 'i7-11700KF': 70, 'i7-11700': 67, 'i7-11700F': 67,
        'i5-11600K': 65, 'i5-11600KF': 65, 'i5-11500': 62, 'i5-11400': 60,
        'i5-11400F': 60, 'i3-11100': 52,
        'i9-10900K': 72, 'i9-10900KF': 72, 'i9-10850K': 70, 'i9-10900': 68, 'i9-10900F': 68,
        'i7-10700K': 68, 'i7-10700KF': 68, 'i7-10700': 65, 'i7-10700F': 65,
        'i5-10600K': 62, 'i5-10600KF': 62, 'i5-10500': 60, 'i5-10400': 58,
        'i5-10400F': 58, 'i3-10300': 50, 'i3-10100': 48, 'i3-10100F': 48,
        'i9-9900KS': 70, 'i9-9900K': 68, 'i9-9900KF': 68, 'i9-9900': 66,
        'i7-9700K': 64, 'i7-9700KF': 64, 'i7-9700': 62, 'i7-9700F': 62,
        'i5-9600K': 58, 'i5-9600KF': 58, 'i5-9500': 56, 'i5-9400': 54,
        'i5-9400F': 54, 'i3-9350K': 50, 'i3-9100': 46, 'i3-9100F': 46,
        'i7-8700K': 62, 'i7-8700': 60, 'i5-8600K': 56, 'i5-8500': 54,
        'i5-8400': 52, 'i3-8350K': 48, 'i3-8300': 46, 'i3-8100': 45,
        'i7-7700K': 58, 'i7-7700': 56, 'i5-7600K': 52, 'i5-7600': 50,
        'i5-7500': 49, 'i5-7400': 48, 'i3-7350K': 46, 'i3-7300': 44, 'i3-7100': 42,
        'i7-6700K': 54, 'i7-6700': 52, 'i5-6600K': 48, 'i5-6600': 47,
        'i5-6500': 46, 'i5-6400': 44, 'i3-6320': 42, 'i3-6300': 41, 'i3-6100': 40,
        'i7-5775C': 50, 'i5-5675C': 46,
        'i7-4790K': 48, 'i7-4790': 47, 'i7-4770K': 46, 'i7-4770': 45,
        'i5-4690K': 44, 'i5-4670K': 43, 'i5-4590': 42, 'i5-4460': 41,
        'i3-4370': 38, 'i3-4330': 37, 'i3-4130': 36,
        '9950X': 100, '9900X': 95, '9700X': 88, '9600X': 82,
        '7950X3D': 100, '7950X': 98, '7900X3D': 95, '7900X': 93, '7900': 90,
        '7800X3D': 98, '7700X': 88, '7700': 85, '7600X': 82, '7600': 80, '7500F': 76,
        '5950X': 85, '5900X': 82, '5900': 80, '5800X3D': 90, '5800X': 78,
        '5800': 76, '5700X': 75, '5700G': 72, '5600X': 72, '5600': 70,
        '5600G': 68, '5500': 65, '5500GT': 64, '5300G': 60,
        '4700G': 70, '4650G': 66, '4350G': 58,
        '3950X': 75, '3900XT': 74, '3900X': 72, '3800XT': 70, '3800X': 68,
        '3700X': 65, '3600XT': 64, '3600X': 62, '3600': 60, '3500X': 58,
        '3500': 56, '3400G': 54, '3300X': 58, '3200G': 50, '3100': 54,
        '2700X': 58, '2700': 56, '2700E': 54, '2600X': 54, '2600': 52,
        '2600E': 50, '2500X': 52, '2400G': 48, '2300X': 50, '2200G': 46,
        '1800X': 52, '1700X': 50, '1700': 48, '1600X': 48, '1600': 46,
        '1600AF': 50, '1500X': 46, '1400': 44, '1300X': 42, '1200': 40,
        '3990X': 75, '3970X': 78, '3960X': 80, '2990WX': 65, '2970WX': 68,
        '2950X': 70, '1950X': 62, '1920X': 60
    },
    gameDemand: {
        'cyberpunk': { gpu: 98, cpu: 75 },
        'starfield': { gpu: 92, cpu: 80 },
        'flight-sim': { gpu: 88, cpu: 95 },
        'rdr2': { gpu: 90, cpu: 70 },
        'metro-exodus': { gpu: 88, cpu: 65 },
        'atomic-heart': { gpu: 82, cpu: 68 },
        're4-remake': { gpu: 85, cpu: 70 },
        'dead-space': { gpu: 88, cpu: 72 },
        'last-of-us': { gpu: 90, cpu: 75 },
        'baldurs-gate3': { gpu: 80, cpu: 85 },
        'god-of-war': { gpu: 80, cpu: 68 },
        'spider-man': { gpu: 78, cpu: 65 },
        'horizon': { gpu: 88, cpu: 70 },
        'dying-light2': { gpu: 82, cpu: 75 },
        'ac-valhalla': { gpu: 80, cpu: 70 },
        'far-cry6': { gpu: 78, cpu: 65 },
        'watch-dogs': { gpu: 80, cpu: 68 },
        'tomb-raider': { gpu: 75, cpu: 60 },
        'control': { gpu: 82, cpu: 65 },
        'ghostwire': { gpu: 75, cpu: 62 },
        'uncharted': { gpu: 78, cpu: 65 },
        'days-gone': { gpu: 72, cpu: 68 },
        'remnant2': { gpu: 85, cpu: 72 },
        'lies-of-p': { gpu: 75, cpu: 68 },
        'lords-fallen': { gpu: 80, cpu: 70 },
        'valorant': { gpu: 30, cpu: 55 },
        'csgo': { gpu: 25, cpu: 65 },
        'overwatch2': { gpu: 55, cpu: 60 },
        'apex': { gpu: 65, cpu: 68 },
        'warzone': { gpu: 75, cpu: 72 },
        'cod-mw3': { gpu: 80, cpu: 70 },
        'battlefield2042': { gpu: 85, cpu: 80 },
        'rainbow6': { gpu: 60, cpu: 65 },
        'destiny2': { gpu: 68, cpu: 62 },
        'halo': { gpu: 70, cpu: 65 },
        'titanfall2': { gpu: 50, cpu: 58 },
        'splitgate': { gpu: 48, cpu: 55 },
        'fortnite': { gpu: 60, cpu: 65 },
        'pubg': { gpu: 65, cpu: 70 },
        'naraka': { gpu: 68, cpu: 65 },
        'lol': { gpu: 20, cpu: 50 },
        'dota2': { gpu: 35, cpu: 60 },
        'smite': { gpu: 40, cpu: 55 },
        'aoe4': { gpu: 50, cpu: 70 },
        'starcraft2': { gpu: 35, cpu: 75 },
        'total-war': { gpu: 70, cpu: 85 },
        'wow': { gpu: 50, cpu: 65 },
        'ffxiv': { gpu: 55, cpu: 62 },
        'gw2': { gpu: 45, cpu: 60 },
        'eso': { gpu: 55, cpu: 62 },
        'lost-ark': { gpu: 60, cpu: 58 },
        'new-world': { gpu: 68, cpu: 70 },
        'bdo': { gpu: 62, cpu: 65 },
        'forza-horizon5': { gpu: 75, cpu: 62 },
        'forza-motorsport': { gpu: 80, cpu: 65 },
        'f1-2023': { gpu: 70, cpu: 60 },
        'gran-turismo7': { gpu: 75, cpu: 62 },
        'need-for-speed': { gpu: 72, cpu: 58 },
        'dirt5': { gpu: 68, cpu: 55 },
        'crew-motorfest': { gpu: 70, cpu: 58 },
        'gta5': { gpu: 65, cpu: 70 },
        'witcher3': { gpu: 75, cpu: 65 },
        'minecraft': { gpu: 45, cpu: 58 },
        'cities-skylines': { gpu: 60, cpu: 80 },
        'planet-zoo': { gpu: 62, cpu: 70 },
        'satisfactory': { gpu: 60, cpu: 65 },
        'valheim': { gpu: 45, cpu: 55 },
        'rust': { gpu: 68, cpu: 70 },
        'ark': { gpu: 75, cpu: 72 },
        '7-days': { gpu: 58, cpu: 65 },
        'sons-forest': { gpu: 78, cpu: 70 },
        'conan': { gpu: 62, cpu: 65 },
        'dayz': { gpu: 60, cpu: 68 },
        'green-hell': { gpu: 55, cpu: 60 },
        're-village': { gpu: 75, cpu: 65 },
        'outlast': { gpu: 50, cpu: 55 },
        'evil-within': { gpu: 62, cpu: 58 },
        'phasmophobia': { gpu: 40, cpu: 52 },
        'street-fighter6': { gpu: 58, cpu: 52 },
        'mortal-kombat': { gpu: 60, cpu: 55 },
        'tekken8': { gpu: 65, cpu: 58 },
        'guilty-gear': { gpu: 52, cpu: 50 },
        'elden-ring': { gpu: 75, cpu: 68 },
        'dark-souls3': { gpu: 62, cpu: 60 },
        'sekiro': { gpu: 68, cpu: 62 },
        'stray': { gpu: 58, cpu: 52 },
        'hades': { gpu: 25, cpu: 40 },
        'hollow-knight': { gpu: 18, cpu: 35 },
        'celeste': { gpu: 15, cpu: 30 },
        'terraria': { gpu: 22, cpu: 42 },
        'stardew': { gpu: 18, cpu: 35 },
        'disco-elysium': { gpu: 30, cpu: 45 },
        'palworld': { gpu: 70, cpu: 68 },
        'lethal-company': { gpu: 45, cpu: 55 },
        'helldivers2': { gpu: 72, cpu: 70 }
    },
    resolutionMultiplier: {
        '720p': 1.4, '900p': 1.2, '1080p': 1.0,
        'ultrawide-1080': 0.85, '1440p': 0.65, 'ultrawide': 0.70,
        '4K': 0.40, '5K': 0.28, '8K': 0.18
    },
    qualityMultiplier: {
        'low': 1.8, 'medium': 1.35, 'high': 1.0, 'ultra': 0.75
    }
};

// ---------------------------
// VOLTAR CONFIG (preserve)
// ---------------------------
function voltarConfig() {
    const results = document.getElementById('results');
    if (results) results.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.voltarConfig = voltarConfig;

// ====================================================================
// FUNÇÃO calculateFPS (sua lógica, sem alterações, com correção de scoping)
// ====================================================================
function calculateFPS() {
    const cpu = document.getElementById('cpu').value;
    const gpu = document.getElementById('gpu').value;
    const resolution = document.getElementById('resolution').value;
    const quality = document.getElementById('quality').value;
    const game = document.getElementById('game').value;

    if (!cpu || !gpu || !resolution || !quality || !game) {
        alert('Por favor, selecione todas as configurações!');
        return;
    }

    // Obter scores dos componentes
    const cpuScore = performanceData.cpuScores[cpu] || 50;
    const gpuScore = performanceData.gpuScores[gpu] || 50;
    const gameDemand = performanceData.gameDemand[game] || { gpu: 50, cpu: 50 };
    const resMultiplier = performanceData.resolutionMultiplier[resolution] || 1;
    const qualMultiplier = performanceData.qualityMultiplier[quality] || 1;

    // 1. Calcular performance base da GPU (0-240 FPS teórico)
    const gpuBaseFPS = (gpuScore / 100) * 240;

    // 2. Calcular performance base da CPU (0-240 FPS teórico)
    const cpuBaseFPS = (cpuScore / 100) * 240;

    // 3. Redução pela demanda do jogo (jogos mais pesados reduzem mais FPS)
    const gpuDemandFactor = 1 - (gameDemand.gpu / 100) * 0.85;
    const cpuDemandFactor = 1 - (gameDemand.cpu / 100) * 0.75;

    const gpuEffectiveFPS = gpuBaseFPS * gpuDemandFactor;
    const cpuEffectiveFPS = cpuBaseFPS * cpuDemandFactor;

    // 4. Peso dinâmico baseado no tipo de jogo
    const cpuWeight = 0.20 + (gameDemand.cpu / 100) * 0.25;
    const gpuWeight = 1 - cpuWeight;

    // 5. FPS combinado considerando ambos componentes
    let baseFPS = (gpuEffectiveFPS * gpuWeight) + (cpuEffectiveFPS * cpuWeight);

    // 6. Aplicar bottleneck severo se componentes muito desbalanceados
    const componentRatio = Math.min(cpuScore, gpuScore) / Math.max(cpuScore, gpuScore);
    if (componentRatio < 0.4) {
        baseFPS *= (0.5 + componentRatio * 0.5);
    }

    // 7. Aplicar multiplicadores de resolução e qualidade
    let adjustedFPS = baseFPS * resMultiplier * qualMultiplier;

    // 8. Limites realistas por qualidade e resolução
    const hardwareLimit = (cpuScore + gpuScore) / 2;
    if (hardwareLimit < 40) {
        adjustedFPS = Math.min(adjustedFPS, 60);
    } else if (hardwareLimit < 60) {
        adjustedFPS = Math.min(adjustedFPS, 120);
    }

    // 9. Garantir mínimos realistas
    adjustedFPS = Math.max(adjustedFPS, 5);

    // 10. Calcular variação Min/Avg/Max baseada na estabilidade do jogo
    const stability = 1 - (gameDemand.gpu + gameDemand.cpu) / 250;
    const avgFps = Math.round(adjustedFPS);
    const minFps = Math.max(1, Math.round(avgFps * (0.65 + stability * 0.15)));
    const maxFps = Math.round(avgFps * (1.05 + (1 - stability) * 0.15));

    // Garantir que as variáveis finais existam (declaração padrão)
    let finalMin = minFps;
    let finalAvg = avgFps;
    let finalMax = maxFps;

    // 11. Ajustes finais para jogos específicos
    if (gameDemand.gpu < 40 && gpuScore > 70) {
        const bonusFPS = Math.round((gpuScore - 70) * 5);
        finalAvg = avgFps + bonusFPS;
        finalMin = minFps + Math.round(bonusFPS * 0.8);
        finalMax = maxFps + Math.round(bonusFPS * 1.2);

        updateResults(finalMin, finalAvg, finalMax, cpuScore, gpuScore, gameDemand, cpuWeight, gpuWeight);

    } else {
        updateResults(finalMin, finalAvg, finalMax, cpuScore, gpuScore, gameDemand, cpuWeight, gpuWeight);
    }

    // -----------------------------
    // 🔥 SALVAR NO HISTÓRICO (local + Firestore)
    // -----------------------------
    const historyItem = {
        cpu: document.getElementById('cpu').options[document.getElementById('cpu').selectedIndex].text || cpu,
        gpu: document.getElementById('gpu').options[document.getElementById('gpu').selectedIndex].text || gpu,
        jogo: document.getElementById('game').options[document.getElementById('game').selectedIndex].text || game,
        resolucao: document.getElementById('resolution').options[document.getElementById('resolution').selectedIndex].text || resolution,
        qualidade: document.getElementById('quality').options[document.getElementById('quality').selectedIndex].text || quality,
        fps: finalAvg,
        min: finalMin,
        max: finalMax,
        data: new Date().toLocaleString("pt-BR")
    };

    // Salvar localmente (mantendo seu comportamento anterior)
    let historyLocal = JSON.parse(localStorage.getItem("fpsHistory")) || [];
    historyLocal.unshift(historyItem);
    localStorage.setItem("fpsHistory", JSON.stringify(historyLocal));

    // Exibir seção de histórico e recarregar ela na UI
    const historySection = document.getElementById("historySection");
    if (historySection) historySection.style.display = "block";
    loadHistory();

    // Salvar no Firestore (coleção "history")
    saveToHistory({
        cpu: historyItem.cpu,
        gpu: historyItem.gpu,
        jogo: historyItem.jogo,
        resolucao: historyItem.resolucao,
        qualidade: historyItem.qualidade,
        fps: historyItem.fps,
        min: historyItem.min,
        max: historyItem.max,
        timestamp: new Date().toISOString(),
        ua: navigator.userAgent,
        page: window.location.pathname
    });
}

// Expor calculateFPS para escopo global (se você usa onclick no HTML)
window.calculateFPS = calculateFPS;

// ---------------------------
// saveToHistory -> Firestore (usa addDoc)
// ---------------------------
async function saveToHistory(data) {
    try {
        console.log("📤 Enviando dados ao Firestore...", data);
        await addDoc(collection(db, "history"), {
            ...data
        });
        console.log("✅ Histórico salvo com sucesso no Firestore!");
    } catch (erro) {
        console.error("❌ ERRO ao salvar histórico no Firestore:", erro);
    }
}
window.saveToHistory = saveToHistory;

// ---------------------------
// loadHistory e clearHistory - usam localStorage (UI)
// ---------------------------
function loadHistory() {
    let history = JSON.parse(localStorage.getItem("fpsHistory")) || [];
    const historyList = document.getElementById("historyList");
    if (!historyList) return;

    if (!history.length) {
        historyList.innerHTML = "<p style='color:#999;'>Nenhum cálculo registrado ainda.</p>";
        return;
    }

    let html = "";

    history.forEach(item => {
        html += `
            <div style="padding:12px; margin-bottom:12px; border-left:3px solid #ff0000; background:rgba(255,0,0,0.05); border-radius:8px;">
                <strong>CPU:</strong> ${item.cpu}<br>
                <strong>GPU:</strong> ${item.gpu}<br>
                <strong>Jogo:</strong> ${item.jogo}<br>
                <strong>Resolução:</strong> ${item.resolucao}<br>
                <strong>Qualidade:</strong> ${item.qualidade}<br>
                <strong>FPS (avg):</strong> ${item.fps}<br>
                <span style="color:#888; font-size:0.9em;">${item.data}</span>
            </div>
        `;
    });

    historyList.innerHTML = html;
}

function clearHistory() {
    localStorage.removeItem("fpsHistory");
    loadHistory();
}
window.clearHistory = clearHistory;

// ---------------------------
// updateResults - detalhado (mantive seu estilo)
// ---------------------------
function getPerformanceLevel(score) {
    if (score >= 95) return 'Extremo';
    if (score >= 85) return 'Excelente';
    if (score >= 75) return 'Muito Bom';
    if (score >= 65) return 'Bom';
    if (score >= 50) return 'Médio';
    if (score >= 35) return 'Fraco';
    return 'Muito Fraco';
}

function updateResults(minFps, avgFps, maxFps, cpuScore, gpuScore, gameDemand, cpuWeight, gpuWeight) {
    // Atualizar interface (certifique-se que esses elementos existem no HTML)
    const minEl = document.getElementById('minFps');
    const avgEl = document.getElementById('avgFps');
    const maxEl = document.getElementById('maxFps');
    const perfBar = document.getElementById('perfBar');
    const perfTextEl = document.getElementById('perfText');
    const configInfoEl = document.getElementById('configInfo');

    if (minEl) minEl.textContent = minFps;
    if (avgEl) avgEl.textContent = avgFps;
    if (maxEl) maxEl.textContent = maxFps;

    const perfPercentage = Math.min(100, Math.round((avgFps / 240) * 100));
    if (perfBar) {
        perfBar.style.width = perfPercentage + '%';
        perfBar.textContent = perfPercentage + '%';
    }

    let perfText = '';
    let perfIcon = '';

    if (avgFps >= 240) {
        perfIcon = '🚀';
        perfText = 'EXTREMO! Performance excepcional para monitores 240Hz+. Experiência competitiva máxima!';
    } else if (avgFps >= 165) {
        perfIcon = '⚡';
        perfText = 'EXCELENTE! Perfeito para monitores 165Hz-240Hz. Ideal para e-sports!';
    } else if (avgFps >= 144) {
        perfIcon = '🔥';
        perfText = 'ÓTIMO! Excelente para monitores 144Hz. Gameplay muito fluido!';
    } else if (avgFps >= 120) {
        perfIcon = '✅';
        perfText = 'MUITO BOM! Ótimo para monitores 120Hz. Experiência suave!';
    } else if (avgFps >= 90) {
        perfIcon = '👍';
        perfText = 'BOM! Performance fluida e responsiva. Boa experiência de jogo!';
    } else if (avgFps >= 60) {
        perfIcon = '✔️';
        perfText = 'JOGÁVEL! FPS adequado para a maioria dos jogos. Experiência aceitável.';
    } else if (avgFps >= 45) {
        perfIcon = '⚠️';
        perfText = 'MÉDIO! Jogável mas não ideal. Considere reduzir configurações para melhor experiência.';
    } else if (avgFps >= 30) {
        perfIcon = '⚠️';
        perfText = 'BAIXO! Experiência comprometida. Reduza qualidade gráfica ou resolução.';
    } else {
        perfIcon = '❌';
        perfText = 'MUITO BAIXO! Upgrade de hardware necessário para este jogo/configuração.';
    }

    const cpuBottleneck = cpuScore < (gpuScore * 0.55);
    const gpuBottleneck = gpuScore < (cpuScore * 0.55);
    const severeBottleneck = Math.abs(cpuScore - gpuScore) > 40;

    if (cpuBottleneck && severeBottleneck) {
        perfText += '<br><br>🔴 <strong>CPU BOTTLENECK SEVERO:</strong> Seu processador está limitando significativamente sua GPU!';
    } else if (cpuBottleneck) {
        perfText += '<br><br>🟡 <strong>CPU Bottleneck detectado:</strong> Seu processador pode limitar a GPU em alguns cenários.';
    } else if (gpuBottleneck && severeBottleneck) {
        perfText += '<br><br>🔴 <strong>GPU BOTTLENECK SEVERO:</strong> Sua placa de vídeo está limitando o desempenho!';
    } else if (gpuBottleneck) {
        perfText += '<br><br>🟡 <strong>GPU Bottleneck detectado:</strong> Sua GPU está limitando o desempenho.';
    } else if (Math.abs(cpuScore - gpuScore) < 15) {
        perfText += '<br><br>✅ <strong>Setup Balanceado:</strong> CPU e GPU estão bem equilibradas!';
    }

    if (perfTextEl) perfTextEl.innerHTML = perfIcon + ' <strong>' + perfText + '</strong>';

    // Info de configuração (seguro: verificar existência)
    try {
        const cpuText = document.getElementById('cpu').options[document.getElementById('cpu').selectedIndex].text;
        const gpuText = document.getElementById('gpu').options[document.getElementById('gpu').selectedIndex].text;
        const resText = document.getElementById('resolution').options[document.getElementById('resolution').selectedIndex].text;
        const qualText = document.getElementById('quality').options[document.getElementById('quality').selectedIndex].text;
        const gameText = document.getElementById('game').options[document.getElementById('game').selectedIndex].text;

        const combinedScore = Math.round((cpuScore * cpuWeight + gpuScore * gpuWeight));

        if (configInfoEl) {
            configInfoEl.innerHTML = `
                <strong>Processador:</strong> ${cpuText}<br>
                <strong>Placa de Vídeo:</strong> ${gpuText}<br>
                <strong>Resolução:</strong> ${resText}<br>
                <strong>Qualidade Gráfica:</strong> ${qualText}<br>
                <strong>Jogo:</strong> ${gameText}<br>
                <br>
                <strong style="color: #ff6666;">📊 Análise Técnica Detalhada:</strong><br>
                • Score CPU: ${cpuScore}/100 (${getPerformanceLevel(cpuScore)})<br>
                • Score GPU: ${gpuScore}/100 (${getPerformanceLevel(gpuScore)})<br>
                • Demanda do jogo - GPU: ${gameDemand.gpu}/100<br>
                • Demanda do jogo - CPU: ${gameDemand.cpu}/100<br>
                • Peso GPU no cálculo: ${Math.round(gpuWeight * 100)}%<br>
                • Peso CPU no cálculo: ${Math.round(cpuWeight * 100)}%<br>
                • Performance combinada: ${combinedScore}/100<br>
                • Variação de FPS: ${maxFps - minFps} (${minFps} → ${maxFps})
            `;
        }
    } catch (e) {
        // se algum elemento não existir, é ok — apenas ignore
    }

    // mostrar results
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ---------------------------
// Conectar botões depois do DOM
// ---------------------------
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        const btn = document.getElementById("btnSalvar");
        if (btn) btn.addEventListener("click", calculateFPS);

        loadHistory();
    });
} else {
    const btn = document.getElementById("btnSalvar");
    if (btn) btn.addEventListener("click", calculateFPS);

    loadHistory();
}