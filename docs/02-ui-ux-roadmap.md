# UI / UX roadmap

## 1. Meta de diseño

La experiencia debe ser:

- móvil primero
- calmada y segura
- clara y accesible
- adaptativa al dark mode
- visualmente premium pero simple
- consistente entre welcome, auth y panel

## 2. Principios visuales

- Paleta principal: azul marino + verde brillante + neutrales claros/oscuros
- Botones con alta legibilidad y área de toque mínima de 44 px
- Textos con contraste mínimo adecuado para accesibilidad
- Bordes suaves y tarjetas con shadow sutil
- Menús compactos para mobile

## 3. Estado actual

Se ha avanzado en:

- sistema de tema global
- adaptabilidad móvil
- simplificación de la landing
- focus en legibilidad y contraste
- limpieza de estructura visual base

## 4. Fases pendientes

### Fase 1: culminar visual UI
- finalización de pantallas de app y panel
- cohesión de cards, botones, estados, badges, inputs
- unificar tamaños de tipografía y espaciados
- revisar contraste por pantalla y rol

### Fase 2: completar UX
- guiar al usuario con mensajes claros
- estados de vacíos y errores
- flujo de atención con menor fricción
- microinteracciones suaves
- feedback visual en reportes y acciones principales

### Fase 3: refinamiento premium
- tono elegante y institucional
- consistencia de iconografía y jerarquía visual
- mejor spacing entre secciones y menores errores de lectura

## 5. Checklist de calidad UX

- cada botón debe verse claramente en light y dark
- cada subtítulo debe mantener contraste
- cada pantalla debe comunicar el siguiente paso
- cada acción debe tener feedback inmediato
- cada rol debe tener estado visual claro
- mobile debe sentirse cómodo en una sola mano

## 6. Recomendación de tokens

Usar variables CSS centralizadas:

- --fondo
- --superficie
- --superficie-alt
- --texto-principal
- --texto-secundario
- --borde
- --brand-navy
- --brand-green

Esto evita que cada pantalla tenga estilos improvisados.
