// 導航菜單切換
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 點擊導航鏈接時關閉菜單
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
});

// 模態框控制
const modal = document.getElementById('tool-container');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 打開工具
function openTool(toolName) {
    const toolBody = document.getElementById('tool-body');
    
    switch(toolName) {
        case 'calculator':
            toolBody.innerHTML = getCalculatorHTML();
            setTimeout(() => initCalculator(), 0);
            break;
        case 'converter':
            toolBody.innerHTML = getConverterHTML();
            setTimeout(() => initConverter(), 0);
            break;
        case 'color':
            toolBody.innerHTML = getColorHTML();
            setTimeout(() => initColor(), 0);
            break;
        case 'json':
            toolBody.innerHTML = getJSONHTML();
            setTimeout(() => initJSON(), 0);
            break;
        case 'password':
            toolBody.innerHTML = getPasswordHTML();
            setTimeout(() => initPassword(), 0);
            break;
        case 'qrcode':
            toolBody.innerHTML = getQRCodeHTML();
            setTimeout(() => initQRCode(), 0);
            break;
    }
    
    modal.style.display = 'block';
}

// 打開遊戲
function openGame(gameName) {
    const toolBody = document.getElementById('tool-body');
    
    switch(gameName) {
        case '2048':
            toolBody.innerHTML = getGame2048HTML();
            setTimeout(() => initGame2048(), 0);
            break;
        case 'memory':
            toolBody.innerHTML = getMemoryGameHTML();
            setTimeout(() => initMemoryGame(), 0);
            break;
        case 'tictactoe':
            toolBody.innerHTML = getTicTacToeHTML();
            setTimeout(() => initTicTacToe(), 0);
            break;
        case 'guess':
            toolBody.innerHTML = getGuessGameHTML();
            setTimeout(() => initGuessGame(), 0);
            break;
        case 'snake':
            toolBody.innerHTML = getSnakeGameHTML();
            setTimeout(() => initSnakeGame(), 0);
            break;
        case 'flappy':
            toolBody.innerHTML = getFlappyGameHTML();
            setTimeout(() => initFlappyGame(), 0);
            break;
    }
    
    modal.style.display = 'block';
}

// ========== 工具 HTML 和初始化 ==========

// 計算機
function getCalculatorHTML() {
    return `
        <h2>計算機</h2>
        <div class="tool-container">
            <div class="tool-output" id="display">0</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1rem;">
                <button class="tool-button" onclick="appendToDisplay('7')">7</button>
                <button class="tool-button" onclick="appendToDisplay('8')">8</button>
                <button class="tool-button" onclick="appendToDisplay('9')">9</button>
                <button class="tool-button" onclick="appendToDisplay('/')" style="background-color: var(--secondary-color);">÷</button>
                
                <button class="tool-button" onclick="appendToDisplay('4')">4</button>
                <button class="tool-button" onclick="appendToDisplay('5')">5</button>
                <button class="tool-button" onclick="appendToDisplay('6')">6</button>
                <button class="tool-button" onclick="appendToDisplay('*')" style="background-color: var(--secondary-color);">×</button>
                
                <button class="tool-button" onclick="appendToDisplay('1')">1</button>
                <button class="tool-button" onclick="appendToDisplay('2')">2</button>
                <button class="tool-button" onclick="appendToDisplay('3')">3</button>
                <button class="tool-button" onclick="appendToDisplay('-')" style="background-color: var(--secondary-color);">−</button>
                
                <button class="tool-button" onclick="appendToDisplay('0')">0</button>
                <button class="tool-button" onclick="appendToDisplay('.')">.</button>
                <button class="tool-button" onclick="calculateResult()" style="background-color: var(--secondary-color); grid-column: span 2;">=</button>
            </div>
            <button class="tool-button" onclick="clearDisplay()" style="width: 100%; margin-top: 1rem; background-color: #64748b;">清除</button>
        </div>
    `;
}

function initCalculator() {
    window.displayValue = '0';
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (window.displayValue === '0' && value !== '.') {
        window.displayValue = value;
    } else {
        window.displayValue += value;
    }
    display.textContent = window.displayValue;
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        window.displayValue = String(eval(window.displayValue));
        display.textContent = window.displayValue;
    } catch (e) {
        display.textContent = '錯誤';
        window.displayValue = '0';
    }
}

function clearDisplay() {
    const display = document.getElementById('display');
    window.displayValue = '0';
    display.textContent = window.displayValue;
}

// 單位轉換
function getConverterHTML() {
    return `
        <h2>單位轉換</h2>
        <div class="tool-container">
            <div class="tool-input-group">
                <label>轉換類型</label>
                <select id="converterType" onchange="updateConverterUnits()">
                    <option value="length">長度</option>
                    <option value="weight">重量</option>
                    <option value="temperature">溫度</option>
                </select>
            </div>
            <div class="tool-input-group">
                <label>輸入值</label>
                <input type="number" id="converterInput" placeholder="輸入數值" onchange="performConversion()">
            </div>
            <div class="tool-input-group">
                <label>從</label>
                <select id="converterFrom" onchange="performConversion()">
                    <option value="m">米 (m)</option>
                    <option value="km">公里 (km)</option>
                    <option value="cm">厘米 (cm)</option>
                    <option value="mm">毫米 (mm)</option>
                    <option value="mile">英里</option>
                    <option value="yard">碼</option>
                    <option value="foot">英尺</option>
                    <option value="inch">英寸</option>
                </select>
            </div>
            <div class="tool-input-group">
                <label>到</label>
                <select id="converterTo" onchange="performConversion()">
                    <option value="m">米 (m)</option>
                    <option value="km">公里 (km)</option>
                    <option value="cm">厘米 (cm)</option>
                    <option value="mm">毫米 (mm)</option>
                    <option value="mile">英里</option>
                    <option value="yard">碼</option>
                    <option value="foot">英尺</option>
                    <option value="inch">英寸</option>
                </select>
            </div>
            <div class="tool-output" id="converterResult">結果將顯示在這裡</div>
        </div>
    `;
}

function initConverter() {
    window.conversionFactors = {
        length: {
            m: 1,
            km: 0.001,
            cm: 100,
            mm: 1000,
            mile: 0.000621371,
            yard: 1.09361,
            foot: 3.28084,
            inch: 39.3701
        },
        weight: {
            kg: 1,
            g: 1000,
            mg: 1000000,
            lb: 2.20462,
            oz: 35.274
        },
        temperature: {
            celsius: 'C',
            fahrenheit: 'F',
            kelvin: 'K'
        }
    };
}

function updateConverterUnits() {
    const type = document.getElementById('converterType').value;
    const fromSelect = document.getElementById('converterFrom');
    const toSelect = document.getElementById('converterTo');
    
    let options = '';
    if (type === 'length') {
        options = `
            <option value="m">米 (m)</option>
            <option value="km">公里 (km)</option>
            <option value="cm">厘米 (cm)</option>
            <option value="mm">毫米 (mm)</option>
            <option value="mile">英里</option>
            <option value="yard">碼</option>
            <option value="foot">英尺</option>
            <option value="inch">英寸</option>
        `;
    } else if (type === 'weight') {
        options = `
            <option value="kg">公斤 (kg)</option>
            <option value="g">克 (g)</option>
            <option value="mg">毫克 (mg)</option>
            <option value="lb">磅 (lb)</option>
            <option value="oz">盎司 (oz)</option>
        `;
    } else if (type === 'temperature') {
        options = `
            <option value="celsius">攝氏度 (°C)</option>
            <option value="fahrenheit">華氏度 (°F)</option>
            <option value="kelvin">開爾文 (K)</option>
        `;
    }
    
    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
    performConversion();
}

function performConversion() {
    const type = document.getElementById('converterType').value;
    const input = parseFloat(document.getElementById('converterInput').value) || 0;
    const from = document.getElementById('converterFrom').value;
    const to = document.getElementById('converterTo').value;
    const result = document.getElementById('converterResult');
    
    let converted = 0;
    
    if (type === 'length' || type === 'weight') {
        const factors = window.conversionFactors[type];
        converted = input * (factors[to] / factors[from]);
    } else if (type === 'temperature') {
        if (from === 'celsius') {
            if (to === 'fahrenheit') converted = (input * 9/5) + 32;
            else if (to === 'kelvin') converted = input + 273.15;
            else converted = input;
        } else if (from === 'fahrenheit') {
            if (to === 'celsius') converted = (input - 32) * 5/9;
            else if (to === 'kelvin') converted = (input - 32) * 5/9 + 273.15;
            else converted = input;
        } else if (from === 'kelvin') {
            if (to === 'celsius') converted = input - 273.15;
            else if (to === 'fahrenheit') converted = (input - 273.15) * 9/5 + 32;
            else converted = input;
        }
    }
    
    result.textContent = `${input} ${from} = ${converted.toFixed(4)} ${to}`;
}

// 顏色轉換
function getColorHTML() {
    return `
        <h2>顏色轉換</h2>
        <div class="tool-container">
            <div class="tool-input-group">
                <label>HEX 顏色</label>
                <input type="text" id="hexInput" placeholder="#FF5733" onchange="convertColor()">
            </div>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <div style="flex: 1;">
                    <label>RGB</label>
                    <input type="text" id="rgbInput" placeholder="rgb(255, 87, 51)" readonly>
                </div>
                <div style="flex: 1;">
                    <label>HSL</label>
                    <input type="text" id="hslInput" placeholder="hsl(9, 100%, 60%)" readonly>
                </div>
            </div>
            <div class="tool-output" id="colorPreview" style="height: 100px; background-color: #FF5733; border-radius: 8px;"></div>
            <button class="tool-button" onclick="randomColor()" style="width: 100%; margin-top: 1rem;">隨機顏色</button>
        </div>
    `;
}

function initColor() {
    document.getElementById('hexInput').value = '#FF5733';
    convertColor();
}

function convertColor() {
    const hex = document.getElementById('hexInput').value;
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const match = hex.match(hexRegex);
    
    if (match) {
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        
        document.getElementById('rgbInput').value = `rgb(${r}, ${g}, ${b})`;
        
        const hsl = rgbToHsl(r, g, b);
        document.getElementById('hslInput').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        
        document.getElementById('colorPreview').style.backgroundColor = hex;
    }
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function randomColor() {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    document.getElementById('hexInput').value = randomHex;
    convertColor();
}

// JSON 格式化
function getJSONHTML() {
    return `
        <h2>JSON 格式化</h2>
        <div class="tool-container">
            <div class="tool-input-group">
                <label>輸入 JSON</label>
                <textarea id="jsonInput" placeholder='{"name": "example"}' rows="6"></textarea>
            </div>
            <div style="display: flex; gap: 1rem;">
                <button class="tool-button" onclick="formatJSON()" style="flex: 1;">格式化</button>
                <button class="tool-button" onclick="minifyJSON()" style="flex: 1; background-color: var(--secondary-color);">壓縮</button>
                <button class="tool-button" onclick="validateJSON()" style="flex: 1; background-color: #64748b;">驗證</button>
            </div>
            <div class="tool-output" id="jsonOutput" style="margin-top: 1rem;">
                <pre id="jsonResult">結果將顯示在這裡</pre>
            </div>
        </div>
    `;
}

function formatJSON() {
    const input = document.getElementById('jsonInput').value;
    const result = document.getElementById('jsonResult');
    
    try {
        const parsed = JSON.parse(input);
        result.textContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
        result.textContent = '錯誤: ' + e.message;
    }
}

function minifyJSON() {
    const input = document.getElementById('jsonInput').value;
    const result = document.getElementById('jsonResult');
    
    try {
        const parsed = JSON.parse(input);
        result.textContent = JSON.stringify(parsed);
    } catch (e) {
        result.textContent = '錯誤: ' + e.message;
    }
}

function validateJSON() {
    const input = document.getElementById('jsonInput').value;
    const result = document.getElementById('jsonResult');
    
    try {
        JSON.parse(input);
        result.textContent = '✓ JSON 有效';
        result.style.color = 'green';
    } catch (e) {
        result.textContent = '✗ JSON 無效: ' + e.message;
        result.style.color = 'red';
    }
}

// 密碼生成器
function getPasswordHTML() {
    return `
        <h2>密碼生成器</h2>
        <div class="tool-container">
            <div class="tool-input-group">
                <label>密碼長度: <span id="lengthValue">16</span></label>
                <input type="range" id="passwordLength" min="8" max="32" value="16" onchange="updateLengthValue()">
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="uppercase" checked> 大寫字母 (A-Z)
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="lowercase" checked> 小寫字母 (a-z)
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="numbers" checked> 數字 (0-9)
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="symbols" checked> 特殊符號 (!@#$...)
                </label>
            </div>
            <div class="tool-output" id="passwordOutput">點擊生成按鈕</div>
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button class="tool-button" onclick="generatePassword()" style="flex: 1;">生成密碼</button>
                <button class="tool-button" onclick="copyPassword()" style="flex: 1; background-color: var(--secondary-color);">複製</button>
            </div>
        </div>
    `;
}

function updateLengthValue() {
    document.getElementById('lengthValue').textContent = document.getElementById('passwordLength').value;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    let chars = '';
    
    if (document.getElementById('uppercase').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (document.getElementById('lowercase').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (document.getElementById('numbers').checked) chars += '0123456789';
    if (document.getElementById('symbols').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    window.generatedPassword = password;
    document.getElementById('passwordOutput').textContent = password;
}

function copyPassword() {
    if (window.generatedPassword) {
        navigator.clipboard.writeText(window.generatedPassword).then(() => {
            alert('已複製到剪貼板！');
        });
    }
}

// 二維碼生成
function getQRCodeHTML() {
    return `
        <h2>二維碼生成</h2>
        <div class="tool-container">
            <div class="tool-input-group">
                <label>輸入文字或 URL</label>
                <textarea id="qrcodeInput" placeholder="輸入要編碼的文字或 URL" rows="4"></textarea>
            </div>
            <button class="tool-button" onclick="generateQRCode()" style="width: 100%;">生成二維碼</button>
            <div id="qrcodeOutput" style="text-align: center; margin-top: 2rem;"></div>
        </div>
    `;
}

function generateQRCode() {
    const text = document.getElementById('qrcodeInput').value;
    const output = document.getElementById('qrcodeOutput');
    
    if (!text) {
        output.innerHTML = '<p style="color: red;">請輸入文字或 URL</p>';
        return;
    }
    
    const encodedText = encodeURIComponent(text);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
    
    output.innerHTML = `
        <img src="${qrCodeUrl}" alt="QR Code" style="max-width: 300px; border: 2px solid var(--primary-color); border-radius: 8px;">
        <br>
        <a href="${qrCodeUrl}" download="qrcode.png" class="tool-button" style="display: inline-block; margin-top: 1rem;">下載二維碼</a>
    `;
}

// ========== 遊戲 HTML 和初始化 ==========

// 2048 遊戲
function getGame2048HTML() {
    return `
        <h2>2048 遊戲</h2>
        <div class="game-container">
            <div class="game-info">分數: <span id="score2048">0</span></div>
            <div class="game-board" id="board2048" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 10px; background: #bbada0; border-radius: 6px;"></div>
            <div class="game-controls">
                <button class="tool-button" onclick="restart2048()">重新開始</button>
                <p style="text-align: center; width: 100%; color: #666;">使用方向鍵或 WASD 控制</p>
            </div>
        </div>
    `;
}

function initGame2048() {
    window.game2048 = {
        board: Array(16).fill(0),
        score: 0
    };
    addNewTile2048();
    addNewTile2048();
    render2048();
    
    document.addEventListener('keydown', handle2048Input);
}

function addNewTile2048() {
    const empty = window.game2048.board.map((v, i) => v === 0 ? i : null).filter(v => v !== null);
    if (empty.length > 0) {
        const pos = empty[Math.floor(Math.random() * empty.length)];
        window.game2048.board[pos] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render2048() {
    const board = document.getElementById('board2048');
    board.innerHTML = '';
    
    window.game2048.board.forEach(tile => {
        const div = document.createElement('div');
        div.style.cssText = `
            width: 60px; height: 60px; 
            background: ${tile === 0 ? '#cdc1b4' : getColorFor2048(tile)};
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: ${tile > 4 ? 'white' : '#776e65'};
        `;
        div.textContent = tile || '';
        board.appendChild(div);
    });
    
    document.getElementById('score2048').textContent = window.game2048.score;
}

function getColorFor2048(value) {
    const colors = {
        2: '#eee4da', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
        32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
        512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
    };
    return colors[value] || '#3c3c2f';
}

function handle2048Input(e) {
    if (!window.game2048) return;
    
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault();
        move2048(key);
    }
}

function move2048(direction) {
    const board = window.game2048.board;
    const oldBoard = [...board];
    
    // 簡化的 2048 邏輯
    if (direction === 'arrowleft' || direction === 'a') {
        for (let i = 0; i < 4; i++) {
            const row = board.slice(i * 4, i * 4 + 4);
            const merged = merge2048(row);
            merged.forEach((v, j) => board[i * 4 + j] = v);
        }
    } else if (direction === 'arrowright' || direction === 'd') {
        for (let i = 0; i < 4; i++) {
            const row = board.slice(i * 4, i * 4 + 4).reverse();
            const merged = merge2048(row).reverse();
            merged.forEach((v, j) => board[i * 4 + j] = v);
        }
    }
    
    if (oldBoard.join() !== board.join()) {
        addNewTile2048();
    }
    render2048();
}

function merge2048(arr) {
    const filtered = arr.filter(v => v !== 0);
    const merged = [];
    
    for (let i = 0; i < filtered.length; i++) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2);
            window.game2048.score += filtered[i] * 2;
            i++;
        } else {
            merged.push(filtered[i]);
        }
    }
    
    while (merged.length < 4) {
        merged.push(0);
    }
    
    return merged;
}

function restart2048() {
    window.game2048 = { board: Array(16).fill(0), score: 0 };
    addNewTile2048();
    addNewTile2048();
    render2048();
}

// 記憶翻牌遊戲
function getMemoryGameHTML() {
    return `
        <h2>記憶翻牌遊戲</h2>
        <div class="game-container">
            <div class="game-info">配對: <span id="memoryMatches">0</span>/8</div>
            <div class="game-board" id="memoryBoard" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;"></div>
            <button class="tool-button" onclick="restartMemory()" style="margin-top: 1rem;">重新開始</button>
        </div>
    `;
}

function initMemoryGame() {
    const icons = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍒', '🍑', '🥝'];
    const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    
    window.memoryGame = {
        cards: cards,
        flipped: Array(16).fill(false),
        matched: Array(16).fill(false),
        firstCard: null,
        secondCard: null,
        matches: 0,
        locked: false
    };
    
    renderMemory();
}

function renderMemory() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    
    window.memoryGame.cards.forEach((card, i) => {
        const div = document.createElement('div');
        div.style.cssText = `
            width: 80px; height: 80px;
            background: ${window.memoryGame.matched[i] ? '#90EE90' : '#6366f1'};
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            cursor: pointer;
            transition: all 0.3s;
        `;
        div.textContent = window.memoryGame.flipped[i] || window.memoryGame.matched[i] ? card : '?';
        div.onclick = () => flipMemoryCard(i);
        board.appendChild(div);
    });
    
    document.getElementById('memoryMatches').textContent = window.memoryGame.matches;
}

function flipMemoryCard(index) {
    if (window.memoryGame.locked || window.memoryGame.flipped[index] || window.memoryGame.matched[index]) return;
    
    window.memoryGame.flipped[index] = true;
    renderMemory();
    
    if (window.memoryGame.firstCard === null) {
        window.memoryGame.firstCard = index;
    } else {
        window.memoryGame.secondCard = index;
        window.memoryGame.locked = true;
        
        setTimeout(() => {
            if (window.memoryGame.cards[window.memoryGame.firstCard] === window.memoryGame.cards[window.memoryGame.secondCard]) {
                window.memoryGame.matched[window.memoryGame.firstCard] = true;
                window.memoryGame.matched[window.memoryGame.secondCard] = true;
                window.memoryGame.matches++;
            } else {
                window.memoryGame.flipped[window.memoryGame.firstCard] = false;
                window.memoryGame.flipped[window.memoryGame.secondCard] = false;
            }
            
            window.memoryGame.firstCard = null;
            window.memoryGame.secondCard = null;
            window.memoryGame.locked = false;
            renderMemory();
        }, 1000);
    }
}

function restartMemory() {
    initMemoryGame();
}

// 井字棋
function getTicTacToeHTML() {
    return `
        <h2>井字棋</h2>
        <div class="game-container">
            <div class="game-info" id="tictactoeStatus">你是 X，電腦是 O</div>
            <div class="game-board" id="tictactoeBoard" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; background: #333; padding: 5px; border-radius: 6px;"></div>
            <button class="tool-button" onclick="restartTicTacToe()" style="margin-top: 1rem;">重新開始</button>
        </div>
    `;
}

function initTicTacToe() {
    window.tictactoe = {
        board: Array(9).fill(''),
        gameOver: false
    };
    renderTicTacToe();
}

function renderTicTacToe() {
    const board = document.getElementById('tictactoeBoard');
    board.innerHTML = '';
    
    window.tictactoe.board.forEach((cell, i) => {
        const div = document.createElement('div');
        div.style.cssText = `
            width: 80px; height: 80px;
            background: white;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            cursor: pointer;
        `;
        div.textContent = cell;
        div.onclick = () => playTicTacToe(i);
        board.appendChild(div);
    });
}

function playTicTacToe(index) {
    if (window.tictactoe.board[index] === '' && !window.tictactoe.gameOver) {
        window.tictactoe.board[index] = 'X';
        
        if (!checkWinner(window.tictactoe.board)) {
            const emptyIndex = window.tictactoe.board.findIndex(c => c === '');
            if (emptyIndex !== -1) {
                window.tictactoe.board[emptyIndex] = 'O';
            }
        }
        
        const winner = checkWinner(window.tictactoe.board);
        if (winner) {
            document.getElementById('tictactoeStatus').textContent = winner === 'X' ? '你贏了！' : '電腦贏了！';
            window.tictactoe.gameOver = true;
        } else if (window.tictactoe.board.every(c => c !== '')) {
            document.getElementById('tictactoeStatus').textContent = '平手！';
            window.tictactoe.gameOver = true;
        }
        
        renderTicTacToe();
    }
}

function checkWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function restartTicTacToe() {
    initTicTacToe();
    document.getElementById('tictactoeStatus').textContent = '你是 X，電腦是 O';
}

// 猜數字遊戲
function getGuessGameHTML() {
    return `
        <h2>猜數字遊戲</h2>
        <div class="game-container">
            <div class="game-info">
                <p>我想了一個 1-100 之間的數字，你來猜！</p>
                <p>嘗試次數: <span id="guessAttempts">0</span></p>
            </div>
            <div class="tool-input-group">
                <input type="number" id="guessInput" placeholder="輸入你的猜測" min="1" max="100">
            </div>
            <button class="tool-button" onclick="submitGuess()" style="width: 100%;">提交猜測</button>
            <div class="tool-output" id="guessResult" style="margin-top: 1rem;">開始遊戲吧！</div>
            <button class="tool-button" onclick="restartGuess()" style="width: 100%; margin-top: 1rem; background-color: #64748b;">重新開始</button>
        </div>
    `;
}

function initGuessGame() {
    window.guessGame = {
        target: Math.floor(Math.random() * 100) + 1,
        attempts: 0
    };
}

function submitGuess() {
    const input = document.getElementById('guessInput');
    const guess = parseInt(input.value);
    const result = document.getElementById('guessResult');
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        result.textContent = '請輸入 1-100 之間的數字';
        return;
    }
    
    window.guessGame.attempts++;
    
    if (guess === window.guessGame.target) {
        result.textContent = `🎉 恭喜！你用 ${window.guessGame.attempts} 次猜中了！`;
        result.style.color = 'green';
    } else if (guess < window.guessGame.target) {
        result.textContent = `太小了！再試試。`;
        result.style.color = 'orange';
    } else {
        result.textContent = `太大了！再試試。`;
        result.style.color = 'orange';
    }
    
    document.getElementById('guessAttempts').textContent = window.guessGame.attempts;
    input.value = '';
}

function restartGuess() {
    initGuessGame();
    document.getElementById('guessInput').value = '';
    document.getElementById('guessAttempts').textContent = '0';
    document.getElementById('guessResult').textContent = '開始遊戲吧！';
    document.getElementById('guessResult').style.color = 'inherit';
}

// 貪食蛇遊戲
function getSnakeGameHTML() {
    return `
        <h2>貪食蛇遊戲</h2>
        <div class="game-container">
            <div class="game-info">分數: <span id="snakeScore">0</span></div>
            <canvas id="snakeCanvas" width="300" height="300" style="border: 2px solid var(--primary-color); border-radius: 6px; background: black;"></canvas>
            <p style="color: #666; margin-top: 1rem;">使用方向鍵或 WASD 控制</p>
            <button class="tool-button" onclick="restartSnake()" style="margin-top: 1rem;">重新開始</button>
        </div>
    `;
}

function initSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    window.snakeGame = {
        canvas: canvas,
        ctx: ctx,
        snake: [{x: 10, y: 10}],
        food: {x: 15, y: 15},
        direction: {x: 1, y: 0},
        nextDirection: {x: 1, y: 0},
        score: 0,
        gameOver: false
    };
    
    document.addEventListener('keydown', handleSnakeInput);
    gameLoopSnake();
}

function handleSnakeInput(e) {
    if (!window.snakeGame) return;
    
    const key = e.key.toLowerCase();
    if (key === 'arrowup' || key === 'w') window.snakeGame.nextDirection = {x: 0, y: -1};
    else if (key === 'arrowdown' || key === 's') window.snakeGame.nextDirection = {x: 0, y: 1};
    else if (key === 'arrowleft' || key === 'a') window.snakeGame.nextDirection = {x: -1, y: 0};
    else if (key === 'arrowright' || key === 'd') window.snakeGame.nextDirection = {x: 1, y: 0};
}

function gameLoopSnake() {
    if (!window.snakeGame || window.snakeGame.gameOver) return;
    
    const game = window.snakeGame;
    const canvas = game.canvas;
    const ctx = game.ctx;
    
    // 更新方向
    if (!(game.nextDirection.x === -game.direction.x && game.nextDirection.y === -game.direction.y)) {
        game.direction = game.nextDirection;
    }
    
    // 移動蛇
    const head = {x: game.snake[0].x + game.direction.x, y: game.snake[0].y + game.direction.y};
    
    // 檢查碰撞
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
        game.snake.some(s => s.x === head.x && s.y === head.y)) {
        game.gameOver = true;
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('遊戲結束！分數: ' + game.score, 50, 150);
        return;
    }
    
    game.snake.unshift(head);
    
    // 檢查食物
    if (head.x === game.food.x && head.y === game.food.y) {
        game.score += 10;
        document.getElementById('snakeScore').textContent = game.score;
        game.food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
    } else {
        game.snake.pop();
    }
    
    // 繪製
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'lime';
    game.snake.forEach(s => ctx.fillRect(s.x * 15, s.y * 15, 14, 14));
    
    ctx.fillStyle = 'red';
    ctx.fillRect(game.food.x * 15, game.food.y * 15, 14, 14);
    
    setTimeout(gameLoopSnake, 100);
}

function restartSnake() {
    window.snakeGame = null;
    document.getElementById('snakeScore').textContent = '0';
    initSnakeGame();
}

// 飛翔的鳥遊戲
function getFlappyGameHTML() {
    return `
        <h2>飛翔的鳥</h2>
        <div class="game-container">
            <div class="game-info">分數: <span id="flappyScore">0</span></div>
            <canvas id="flappyCanvas" width="300" height="400" style="border: 2px solid var(--primary-color); border-radius: 6px; background: #87CEEB;"></canvas>
            <p style="color: #666; margin-top: 1rem;">點擊或按空格鍵讓鳥飛起來</p>
            <button class="tool-button" onclick="restartFlappy()" style="margin-top: 1rem;">重新開始</button>
        </div>
    `;
}

function initFlappyGame() {
    const canvas = document.getElementById('flappyCanvas');
    const ctx = canvas.getContext('2d');
    
    window.flappyGame = {
        canvas: canvas,
        ctx: ctx,
        bird: {x: 50, y: 150, width: 20, height: 20, velocity: 0},
        pipes: [],
        score: 0,
        gameOver: false,
        pipeCounter: 0
    };
    
    canvas.addEventListener('click', flapFlappy);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            flapFlappy();
        }
    });
    
    gameLoopFlappy();
}

function flapFlappy() {
    if (!window.flappyGame || window.flappyGame.gameOver) return;
    window.flappyGame.bird.velocity = -8;
}

function gameLoopFlappy() {
    if (!window.flappyGame || window.flappyGame.gameOver) return;
    
    const game = window.flappyGame;
    const canvas = game.canvas;
    const ctx = game.ctx;
    
    // 更新鳥
    game.bird.velocity += 0.4;
    game.bird.y += game.bird.velocity;
    
    // 檢查邊界
    if (game.bird.y + game.bird.height > canvas.height || game.bird.y < 0) {
        game.gameOver = true;
    }
    
    // 生成管道
    game.pipeCounter++;
    if (game.pipeCounter > 90) {
        const gapSize = 100;
        const pipeY = Math.random() * (canvas.height - gapSize - 100) + 50;
        game.pipes.push({x: canvas.width, y: pipeY, width: 50, height: pipeY});
        game.pipes.push({x: canvas.width, y: pipeY + gapSize, width: 50, height: canvas.height - pipeY - gapSize});
        game.pipeCounter = 0;
    }
    
    // 更新管道
    game.pipes = game.pipes.filter(p => p.x + p.width > 0);
    game.pipes.forEach(p => p.x -= 5);
    
    // 檢查碰撞
    game.pipes.forEach(p => {
        if (game.bird.x < p.x + p.width && game.bird.x + game.bird.width > p.x &&
            game.bird.y < p.y + p.height && game.bird.y + game.bird.height > p.y) {
            game.gameOver = true;
        }
    });
    
    // 計分
    game.pipes.forEach(p => {
        if (p.x === game.bird.x) {
            game.score++;
            document.getElementById('flappyScore').textContent = game.score;
        }
    });
    
    // 繪製
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'yellow';
    ctx.fillRect(game.bird.x, game.bird.y, game.bird.width, game.bird.height);
    
    ctx.fillStyle = 'green';
    game.pipes.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
    
    if (game.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('遊戲結束！分數: ' + game.score, 80, 200);
    } else {
        setTimeout(gameLoopFlappy, 30);
    }
}

function restartFlappy() {
    window.flappyGame = null;
    document.getElementById('flappyScore').textContent = '0';
    initFlappyGame();
}
