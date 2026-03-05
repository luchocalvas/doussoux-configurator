// =====================================================
// MÓDULO: SISTEMA DE CLIPARTS
// =====================================================
// Añade esto a tu index.html actual

// 1. CONFIGURACIÓN DE CLIPARTS
const CLIPARTS_CONFIG = {
    flames: {
        name: 'Llamas',
        icon: '🔥',
        items: [
            { id: 'flame-1', file: './assets/cliparts/flames/flame-1.svg', colorable: true },
            { id: 'flame-2', file: './assets/cliparts/flames/flame-2.svg', colorable: true },
            { id: 'flame-3', file: './assets/cliparts/flames/flame-3.svg', colorable: true }
        ]
    },
    skulls: {
        name: 'Calaveras',
        icon: '💀',
        items: [
            { id: 'skull-1', file: './assets/cliparts/skulls/skull-1.svg', colorable: true },
            { id: 'skull-2', file: './assets/cliparts/skulls/skull-2.svg', colorable: true }
        ]
    },
    sports: {
        name: 'Hockey',
        icon: '🏒',
        items: [
            { id: 'hockey-stick', file: './assets/cliparts/sports/hockey-stick.svg', colorable: true },
            { id: 'puck', file: './assets/cliparts/sports/puck.svg', colorable: true },
            { id: 'helmet', file: './assets/cliparts/sports/helmet.svg', colorable: true }
        ]
    },
    geometric: {
        name: 'Geométrico',
        icon: '⭐',
        items: [
            { id: 'star', file: './assets/cliparts/geometric/star.svg', colorable: true },
            { id: 'lightning', file: './assets/cliparts/geometric/lightning.svg', colorable: true },
            { id: 'circle', file: './assets/cliparts/geometric/circle.svg', colorable: true }
        ]
    },
    flags: {
        name: 'Banderas',
        icon: '🏴',
        items: [
            { id: 'spain', file: './assets/cliparts/flags/spain.png', colorable: false },
            { id: 'france', file: './assets/cliparts/flags/france.png', colorable: false },
            { id: 'italy', file: './assets/cliparts/flags/italy.png', colorable: false },
            { id: 'germany', file: './assets/cliparts/flags/germany.png', colorable: false }
        ]
    }
};

// 2. FUNCIÓN PARA AÑADIR CLIPART SVG (con cambio de color)
function addSVGClipart(filepath, color = '#FFFFFF') {
    fabric.loadSVGFromURL(filepath, function(objects, options) {
        const clipart = fabric.util.groupSVGElements(objects, options);
        
        // Aplicar color si el clipart es colorable
        clipart.getObjects().forEach(obj => {
            if (obj.fill && obj.fill !== 'none') {
                obj.fill = color;
            }
            if (obj.stroke && obj.stroke !== 'none') {
                obj.stroke = color;
            }
        });
        
        // Posicionar en el centro
        clipart.set({
            left: fabricCanvas.width / 2,
            top: fabricCanvas.height / 2,
            originX: 'center',
            originY: 'center'
        });
        
        // Escalar apropiadamente
        const scale = Math.min(
            200 / clipart.width,
            200 / clipart.height
        );
        clipart.scale(scale);
        
        fabricCanvas.add(clipart);
        fabricCanvas.setActiveObject(clipart);
        fabricCanvas.renderAll();
        
        // Añadir a layers
        addLayer('clipart', filepath.split('/').pop());
    }, function(item, object) {
        object.set('id', item.getAttribute('id'));
    });
}

// 3. FUNCIÓN PARA AÑADIR CLIPART PNG (sin cambio de color)
function addPNGClipart(filepath) {
    fabric.Image.fromURL(filepath, function(img) {
        img.set({
            left: fabricCanvas.width / 2,
            top: fabricCanvas.height / 2,
            originX: 'center',
            originY: 'center'
        });
        
        // Escalar
        const scale = Math.min(
            150 / img.width,
            150 / img.height
        );
        img.scale(scale);
        
        fabricCanvas.add(img);
        fabricCanvas.setActiveObject(img);
        fabricCanvas.renderAll();
        
        // Añadir a layers
        addLayer('clipart', filepath.split('/').pop());
    });
}

// 4. HTML PARA CLIPARTS
// Añade esto en tu panel de herramientas:
/*
<div class="tab-content" id="tab-cliparts">
    <div class="section-title">Cliparts</div>
    <div class="category-list" id="cliparts-container">
        <!-- Las categorías se generan dinámicamente -->
    </div>
</div>
*/

// 5. GENERAR CATEGORÍAS DE CLIPARTS
function generateClipArtsUI() {
    const container = document.getElementById('cliparts-container');
    container.innerHTML = '';
    
    Object.keys(CLIPARTS_CONFIG).forEach(categoryKey => {
        const category = CLIPARTS_CONFIG[categoryKey];
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-item';
        categoryDiv.innerHTML = `
            <div class="category-header">
                <span class="category-name">${category.icon} ${category.name}</span>
                <span class="category-arrow">▼</span>
            </div>
            <div class="category-content">
                <div class="clipart-grid" id="clipart-grid-${categoryKey}"></div>
            </div>
        `;
        
        // Toggle categoría
        categoryDiv.querySelector('.category-header').onclick = () => {
            categoryDiv.classList.toggle('expanded');
        };
        
        container.appendChild(categoryDiv);
        
        // Generar cliparts de la categoría
        const grid = document.getElementById(`clipart-grid-${categoryKey}`);
        category.items.forEach(clipart => {
            const clipartDiv = document.createElement('div');
            clipartDiv.className = 'clipart-item';
            clipartDiv.title = clipart.id;
            
            // Preview del clipart
            if (clipart.file.endsWith('.svg')) {
                clipartDiv.innerHTML = `<img src="${clipart.file}" alt="${clipart.id}">`;
            } else {
                clipartDiv.innerHTML = `<img src="${clipart.file}" alt="${clipart.id}">`;
            }
            
            // Click para añadir
            clipartDiv.onclick = () => {
                if (clipart.colorable && clipart.file.endsWith('.svg')) {
                    // SVG con color del texto actual
                    addSVGClipart(clipart.file, state.textColor);
                } else {
                    // PNG sin color
                    addPNGClipart(clipart.file);
                }
            };
            
            grid.appendChild(clipartDiv);
        });
    });
}

// 6. CSS NECESARIO
/*
.category-item {
    background: #1a1a1a;
    border: 1px solid #222;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 12px;
}

.category-header {
    padding: 12px 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
}

.category-header:hover {
    background: #222;
}

.category-arrow {
    transition: transform 0.2s ease;
}

.category-item.expanded .category-arrow {
    transform: rotate(180deg);
}

.category-content {
    display: none;
    padding: 16px;
    border-top: 1px solid #222;
}

.category-item.expanded .category-content {
    display: block;
}

.clipart-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.clipart-item {
    aspect-ratio: 1;
    background: #0a0a0a;
    border: 1px solid #222;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 12px;
}

.clipart-item:hover {
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.05);
    transform: scale(1.05);
}

.clipart-item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
*/

// 7. INICIALIZAR
window.addEventListener('load', () => {
    generateClipArtsUI();
});

// =====================================================
// IMPORTANTE: Estructura de carpetas necesaria
// =====================================================
/*
assets/cliparts/
├── flames/
│   ├── flame-1.svg
│   ├── flame-2.svg
│   └── flame-3.svg
├── skulls/
│   ├── skull-1.svg
│   └── skull-2.svg
├── sports/
│   ├── hockey-stick.svg
│   └── puck.svg
├── geometric/
│   ├── star.svg
│   └── lightning.svg
└── flags/
    ├── spain.png
    ├── france.png
    └── italy.png
*/
