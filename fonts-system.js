// =====================================================
// MÓDULO: SISTEMA DE FUENTES
// =====================================================
// Añade esto a tu index.html actual

// 1. CONFIGURACIÓN DE FUENTES
const FONT_OPTIONS = [
    { name: 'Arial', value: 'Arial', style: 'sans-serif' },
    { name: 'Impact', value: 'Impact', style: 'bold' },
    { name: 'Fjalla One', value: 'Fjalla One', style: 'sport' },
    { name: 'Bebas Neue', value: 'Bebas Neue', style: 'sport' },
    { name: 'Anton', value: 'Anton', style: 'bold' },
    { name: 'Permanent Marker', value: 'Permanent Marker', style: 'handwritten' },
    { name: 'Righteous', value: 'Righteous', style: 'modern' }
];

// 2. HTML PARA SELECTOR DE FUENTES
// Añade esto en tu panel de herramientas:
/*
<div class="tab-content" id="tab-fonts">
    <div class="section-title">Fuente de Texto</div>
    <div class="font-grid" id="font-grid">
        <!-- Las fuentes se generan dinámicamente -->
    </div>
    
    <div class="input-group">
        <label class="input-label">Tamaño</label>
        <input type="range" id="font-size-slider" 
               min="12" max="120" value="48" 
               class="slider">
        <span id="font-size-value">48px</span>
    </div>
    
    <div class="input-group">
        <label class="input-label">Color del Texto</label>
        <div class="color-grid" id="text-color-grid">
            <!-- Colores para texto -->
        </div>
    </div>
</div>
*/

// 3. GENERAR GRID DE FUENTES
function generateFontGrid() {
    const container = document.getElementById('font-grid');
    container.innerHTML = '';
    
    FONT_OPTIONS.forEach(font => {
        const fontDiv = document.createElement('div');
        fontDiv.className = 'font-option';
        fontDiv.style.fontFamily = font.value;
        fontDiv.textContent = 'Aa';
        fontDiv.title = font.name;
        fontDiv.dataset.font = font.value;
        
        if (font.value === state.currentFont) {
            fontDiv.classList.add('active');
        }
        
        fontDiv.onclick = () => {
            // Remover active de todos
            document.querySelectorAll('.font-option').forEach(el => {
                el.classList.remove('active');
            });
            // Activar este
            fontDiv.classList.add('active');
            // Cambiar fuente
            changeTextFont(font.value);
        };
        
        container.appendChild(fontDiv);
    });
}

// 4. FUNCIÓN PARA CAMBIAR FUENTE
function changeTextFont(fontFamily) {
    const activeObject = fabricCanvas.getActiveObject();
    
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontFamily', fontFamily);
        fabricCanvas.renderAll();
    }
    
    // Guardar para próximos textos
    state.currentFont = fontFamily;
}

// 5. FUNCIÓN PARA CAMBIAR TAMAÑO
function changeTextSize(size) {
    const activeObject = fabricCanvas.getActiveObject();
    
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fontSize', size);
        fabricCanvas.renderAll();
    }
    
    // Actualizar display
    document.getElementById('font-size-value').textContent = size + 'px';
    
    // Guardar para próximos textos
    state.fontSize = size;
}

// 6. COLORES PARA TEXTO
const TEXT_COLORS = [
    { name: 'Blanco', hex: '#FFFFFF' },
    { name: 'Negro', hex: '#000000' },
    { name: 'Rojo', hex: '#FF0000' },
    { name: 'Azul', hex: '#0066FF' },
    { name: 'Cyan', hex: '#00D4FF' },
    { name: 'Verde', hex: '#00FF66' },
    { name: 'Amarillo', hex: '#FFD700' },
    { name: 'Naranja', hex: '#FF6600' },
    { name: 'Rosa', hex: '#FF66CC' },
    { name: 'Morado', hex: '#7B2CBF' },
    { name: 'Dorado', hex: '#FFD700' },
    { name: 'Plateado', hex: '#C0C0C0' }
];

// 7. GENERAR GRID DE COLORES PARA TEXTO
function generateTextColorGrid() {
    const container = document.getElementById('text-color-grid');
    container.innerHTML = '';
    
    TEXT_COLORS.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-option';
        colorDiv.style.background = color.hex;
        colorDiv.title = color.name;
        colorDiv.dataset.color = color.hex;
        
        if (color.hex === state.textColor) {
            colorDiv.classList.add('active');
        }
        
        colorDiv.onclick = () => {
            document.querySelectorAll('#text-color-grid .color-option').forEach(el => {
                el.classList.remove('active');
            });
            colorDiv.classList.add('active');
            changeTextColor(color.hex);
        };
        
        container.appendChild(colorDiv);
    });
}

// 8. FUNCIÓN PARA CAMBIAR COLOR DE TEXTO
function changeTextColor(color) {
    const activeObject = fabricCanvas.getActiveObject();
    
    if (activeObject && activeObject.type === 'i-text') {
        activeObject.set('fill', color);
        fabricCanvas.renderAll();
    }
    
    // Guardar para próximos textos
    state.textColor = color;
}

// 9. EVENT LISTENERS
document.getElementById('font-size-slider')?.addEventListener('input', (e) => {
    changeTextSize(parseInt(e.target.value));
});

// 10. CSS NECESARIO
/*
.font-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}

.font-option {
    background: #1a1a1a;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 20px 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 24px;
    color: #fff;
}

.font-option:hover {
    border-color: #333;
    transform: translateY(-2px);
}

.font-option.active {
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.05);
}

.slider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #1a1a1a;
    outline: none;
    margin: 10px 0;
}

.slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00d4ff;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00d4ff;
    cursor: pointer;
    border: none;
}
*/

// 11. INICIALIZAR
window.addEventListener('load', () => {
    generateFontGrid();
    generateTextColorGrid();
    
    // Valores iniciales
    state.currentFont = 'Fjalla One';
    state.fontSize = 48;
    state.textColor = '#FFFFFF';
});

// 12. ACTUALIZAR addLayer PARA USAR LA FUENTE ACTUAL
// Modifica tu función addLayer existente:
/*
function addTextLayer(content = 'TEXTO') {
    const text = new fabric.IText(content, {
        left: fabricCanvas.width / 2,
        top: fabricCanvas.height / 2,
        fontSize: state.fontSize,
        fill: state.textColor,
        fontFamily: state.currentFont,  // ← Usa la fuente actual
        fontWeight: '400',
        originX: 'center',
        originY: 'center'
    });
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    fabricCanvas.renderAll();
    
    addLayer('text', content);
    return text;
}
*/
