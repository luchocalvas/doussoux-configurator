// =====================================================
// MÓDULO: SISTEMA DE CAMBIO DE COLORES
// =====================================================
// Añade esto a tu index.html actual

// 1. CONFIGURACIÓN DE COLORES
const SHIRT_COLORS = [
    { id: 'black', name: 'Negro', hex: '#000000' },
    { id: 'white', name: 'Blanco', hex: '#FFFFFF' },
    { id: 'red', name: 'Rojo', hex: '#FF0000' },
    { id: 'blue', name: 'Azul', hex: '#0066FF' },
    { id: 'cyan', name: 'Cyan', hex: '#00D4FF' },
    { id: 'green', name: 'Verde', hex: '#00FF66' },
    { id: 'yellow', name: 'Amarillo', hex: '#FFD700' },
    { id: 'orange', name: 'Naranja', hex: '#FF6600' },
    { id: 'pink', name: 'Rosa', hex: '#FF66CC' },
    { id: 'purple', name: 'Morado', hex: '#7B2CBF' }
];

// 2. FUNCIÓN PARA CAMBIAR COLOR DE CAMISETA
function changeShirtColor(colorHex) {
    const backgroundImage = fabricCanvas.backgroundImage;
    
    if (!backgroundImage) return;
    
    // Resetear filtros
    backgroundImage.filters = [];
    
    // Aplicar nuevo color si no es blanco/negro
    if (colorHex !== '#FFFFFF' && colorHex !== '#000000') {
        backgroundImage.filters.push(
            new fabric.Image.filters.BlendColor({
                color: colorHex,
                mode: 'tint',
                alpha: 0.6
            })
        );
    }
    
    backgroundImage.applyFilters();
    fabricCanvas.renderAll();
    
    // Guardar color actual
    state.currentShirtColor = colorHex;
}

// 3. HTML PARA EL SELECTOR DE COLORES
// Añade esto en tu panel de herramientas:
/*
<div class="tab-content" id="tab-colors">
    <div class="section-title">Color de Camiseta</div>
    <div class="color-grid" id="color-grid">
        <!-- Los colores se generan dinámicamente -->
    </div>
</div>
*/

// 4. GENERAR GRID DE COLORES
function generateColorGrid() {
    const container = document.getElementById('color-grid');
    container.innerHTML = '';
    
    SHIRT_COLORS.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-option';
        colorDiv.style.background = color.hex;
        colorDiv.title = color.name;
        colorDiv.dataset.color = color.hex;
        
        if (color.hex === state.currentShirtColor) {
            colorDiv.classList.add('active');
        }
        
        colorDiv.onclick = () => {
            // Remover active de todos
            document.querySelectorAll('.color-option').forEach(el => {
                el.classList.remove('active');
            });
            // Activar este
            colorDiv.classList.add('active');
            // Cambiar color
            changeShirtColor(color.hex);
        };
        
        container.appendChild(colorDiv);
    });
}

// 5. CSS NECESARIO
/*
.color-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}

.color-option {
    aspect-ratio: 1;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.active {
    border-color: #00d4ff;
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2);
}

.color-option.active::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 0 0 3px rgba(0,0,0,0.5);
}
*/

// 6. INICIALIZAR AL CARGAR
window.addEventListener('load', () => {
    generateColorGrid();
    state.currentShirtColor = '#000000'; // Color inicial
});

// IMPORTANTE: Solo necesitas 1 imagen PNG por vista (en blanco o negro)
// El sistema aplicará el color automáticamente
