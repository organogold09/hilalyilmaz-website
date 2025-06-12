-- Renk Paleti Tablosu
-- Hilal Yılmaz Website Renk Ayarları

CREATE TABLE IF NOT EXISTS color_palettes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    palette_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    colors JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    
    INDEX idx_palette_name (palette_name),
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);

-- Varsayılan renk paletleri
INSERT IGNORE INTO color_palettes (palette_name, is_active, colors, created_by) VALUES 
(
    'Varsayılan Palet',
    TRUE,
    JSON_OBJECT(
        'primary', JSON_OBJECT(
            '50', '#fef7ee',
            '100', '#fdedd3',
            '200', '#fbd7a5',
            '300', '#f8bb6d',
            '400', '#f59532',
            '500', '#f3770a',
            '600', '#e45c00',
            '700', '#bd4502',
            '800', '#973708',
            '900', '#7c2f0a'
        ),
        'secondary', JSON_OBJECT(
            '50', '#f8fafc',
            '100', '#f1f5f9',
            '200', '#e2e8f0',
            '300', '#cbd5e1',
            '400', '#94a3b8',
            '500', '#64748b',
            '600', '#475569',
            '700', '#334155',
            '800', '#1e293b',
            '900', '#0f172a'
        )
    ),
    'system'
),
(
    'Pembe Tonları',
    FALSE,
    JSON_OBJECT(
        'primary', JSON_OBJECT(
            '50', '#fdf2f8',
            '100', '#fce7f3',
            '200', '#fbcfe8',
            '300', '#f9a8d4',
            '400', '#f472b6',
            '500', '#ec4899',
            '600', '#db2777',
            '700', '#be185d',
            '800', '#9d174d',
            '900', '#831843'
        ),
        'secondary', JSON_OBJECT(
            '50', '#f8fafc',
            '100', '#f1f5f9',
            '200', '#e2e8f0',
            '300', '#cbd5e1',
            '400', '#94a3b8',
            '500', '#64748b',
            '600', '#475569',
            '700', '#334155',
            '800', '#1e293b',
            '900', '#0f172a'
        )
    ),
    'system'
),
(
    'Mor Tonları',
    FALSE,
    JSON_OBJECT(
        'primary', JSON_OBJECT(
            '50', '#faf5ff',
            '100', '#f3e8ff',
            '200', '#e9d5ff',
            '300', '#d8b4fe',
            '400', '#c084fc',
            '500', '#a855f7',
            '600', '#9333ea',
            '700', '#7c3aed',
            '800', '#6b21a8',
            '900', '#581c87'
        ),
        'secondary', JSON_OBJECT(
            '50', '#f8fafc',
            '100', '#f1f5f9',
            '200', '#e2e8f0',
            '300', '#cbd5e1',
            '400', '#94a3b8',
            '500', '#64748b',
            '600', '#475569',
            '700', '#334155',
            '800', '#1e293b',
            '900', '#0f172a'
        )
    ),
    'system'
);

-- Aktif paleti getiren view
CREATE OR REPLACE VIEW active_color_palette AS
SELECT * FROM color_palettes WHERE is_active = TRUE LIMIT 1; 