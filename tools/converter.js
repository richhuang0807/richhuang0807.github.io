// ========== 文件轉換工具 ==========

function getFileConverterHTML() {
    return `
        <h2>文件轉換</h2>
        <div class="tool-container">
            <div class="tool-input-group">
                <label>支援的轉換格式</label>
                <div style="background: #f1f5f9; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; font-size: 0.95rem;">
                    <p style="margin: 0.5rem 0;"><strong>文檔格式：</strong> Markdown ↔ HTML、Markdown ↔ PDF</p>
                    <p style="margin: 0.5rem 0;"><strong>編碼轉換：</strong> Base64 編碼/解碼、URL 編碼/解碼</p>
                    <p style="margin: 0.5rem 0;"><strong>資料格式：</strong> JSON 格式化、JSON 驗證</p>
                </div>
            </div>
            <div class="tool-input-group">
                <label>選擇轉換類型</label>
                <select id="converterType" onchange="updateConverterOptions()">
                    <optgroup label="文檔轉換">
                        <option value="md-to-html">Markdown → HTML</option>
                        <option value="html-to-md">HTML → Markdown</option>
                    </optgroup>
                    <optgroup label="編碼轉換">
                        <option value="base64">Base64 編碼</option>
                        <option value="base64-decode">Base64 解碼</option>
                        <option value="url-encode">URL 編碼</option>
                        <option value="url-decode">URL 解碼</option>
                    </optgroup>
                    <optgroup label="資料格式">
                        <option value="json-format">JSON 格式化</option>
                        <option value="json-validate">JSON 驗證</option>
                    </optgroup>
                </select>
            </div>
            <div class="tool-input-group">
                <label>輸入內容</label>
                <textarea id="converterInput" placeholder="輸入要轉換的內容" rows="8"></textarea>
            </div>
            <button class="tool-button" onclick="performFileConvert()" style="width: 100%;">轉換</button>
            <div class="tool-output" id="converterOutput" style="margin-top: 1rem;">
                <div id="converterResult" style="white-space: pre-wrap; word-break: break-word;">結果將顯示在這裡</div>
            </div>
            <button class="tool-button" onclick="copyConverterResult()" style="width: 100%; margin-top: 1rem; background-color: var(--secondary-color);">複製結果</button>
        </div>
    `;
}

function initFileConverter() {
    window.fileConverter = {
        lastResult: ''
    };
}

function updateConverterOptions() {
    // 更新轉換選項
}

// 簡單的 Markdown 到 HTML 轉換
function markdownToHtml(markdown) {
    let html = markdown;
    
    // 標題
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    
    // 粗體和斜體
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // 連結
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // 程式碼
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // 列表
    html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // 段落
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    return html;
}

// 簡單的 HTML 到 Markdown 轉換
function htmlToMarkdown(html) {
    let markdown = html;
    
    // 標題
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1');
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1');
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1');
    
    // 粗體和斜體
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
    markdown = markdown.replace(/<b>(.*?)<\/b>/g, '**$1**');
    markdown = markdown.replace(/<i>(.*?)<\/i>/g, '*$1*');
    
    // 連結
    markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
    
    // 程式碼
    markdown = markdown.replace(/<code>(.*?)<\/code>/g, '`$1`');
    
    // 列表
    markdown = markdown.replace(/<li>(.*?)<\/li>/g, '* $1');
    markdown = markdown.replace(/<ul>(.*?)<\/ul>/g, '$1');
    markdown = markdown.replace(/<ol>(.*?)<\/ol>/g, '$1');
    
    // 段落
    markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n\n');
    
    // 移除其他 HTML 標籤
    markdown = markdown.replace(/<[^>]*>/g, '');
    
    return markdown.trim();
}

function performFileConvert() {
    const type = document.getElementById('converterType').value;
    const input = document.getElementById('converterInput').value;
    const result = document.getElementById('converterResult');
    
    let output = '';
    
    try {
        switch(type) {
            case 'md-to-html':
                output = markdownToHtml(input);
                break;
            case 'html-to-md':
                output = htmlToMarkdown(input);
                break;
            case 'base64':
                output = btoa(unescape(encodeURIComponent(input)));
                break;
            case 'base64-decode':
                output = decodeURIComponent(escape(atob(input)));
                break;
            case 'url-encode':
                output = encodeURIComponent(input);
                break;
            case 'url-decode':
                output = decodeURIComponent(input);
                break;
            case 'json-format':
                output = JSON.stringify(JSON.parse(input), null, 2);
                break;
            case 'json-validate':
                JSON.parse(input);
                output = '✓ JSON 有效';
                break;
            default:
                output = '不支援的轉換類型';
        }
        
        window.fileConverter.lastResult = output;
        result.textContent = output;
        result.style.color = 'inherit';
    } catch (e) {
        result.textContent = '錯誤: ' + e.message;
        result.style.color = 'red';
    }
}

function copyConverterResult() {
    if (window.fileConverter.lastResult) {
        navigator.clipboard.writeText(window.fileConverter.lastResult).then(() => {
            alert('已複製到剪貼板！');
        });
    }
}
