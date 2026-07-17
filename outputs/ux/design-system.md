# Design System - Sistema de Gerenciamento de Tarefas

## 1. Princípios de Design

| Princípio | Descrição |
|-----------|-----------|
| **Clareza** | Cada elemento tem um propósito claro; nada é supérfluo |
| **Eficiência** | Ações comuns exigem o mínimo de cliques possível |
| **Consistência** | Padrões visuais e de interação uniformes em todo o sistema |
| **Feedback** | Toda ação do usuário gera resposta visual imediata |

---

## 2. Paleta de Cores

### Cores Primárias

```css
/* Tailwind custom colors */
primary: {
  50:  '#eef2ff',  /* Background hover leve */
  100: '#e0e7ff',  /* Background leve */
  200: '#c7d2fe',  /* Hover leve */
  300: '#a5b4fc',  /* Active leve */
  400: '#818cf8',  /* Ícones / bordas */
  500: '#6366f1',  /* PRIMARY - Botões, links principais */
  600: '#4f46e5',  /* Hover primary */
  700: '#4338ca',  /* Active primary */
  800: '#3730a3',  /* Texto primary escuro */
  900: '#312e81',  /* Fundo escuro */
}
```

### Cores Neutras

```css
neutral: {
  50:  '#f8fafc',  /* Fundo da página */
  100: '#f1f5f9',  /* Fundo de cards / seções */
  200: '#e2e8f0',  /* Bordas leves, dividers */
  300: '#cbd5e1',  /* Bordas, inputs desabilitados */
  400: '#94a3b8',  /* Placeholder, texto secundário */
  500: '#64748b',  /* Texto de apoio */
  600: '#475569',  /* Texto corpo */
  700: '#334155',  /* Texto corpo forte */
  800: '#1e293b',  /* Títulos */
  900: '#0f172a',  /* Título principal */
}
```

### Cores Semânticas

| Token | Cor | Uso |
|-------|-----|-----|
| `success` | `#22c55e` | Status "done", confirmações |
| `warning` | `#eab308` | Status "doing", alertas |
| `error` | `#ef4444` | Erros, validações |
| `info` | `#3b82f6` | Informações |

---

## 3. Tipografia

### Font Family

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Escala Tipográfica

| Nível | Tamanho | Line-height | Peso | Uso |
|-------|---------|-------------|------|-----|
| `h1` | 1.875rem (30px) | 2.25rem | 700 | Título da página |
| `h2` | 1.5rem (24px) | 2rem | 600 | Título de seção |
| `h3` | 1.25rem (20px) | 1.75rem | 600 | Título de card |
| `body` | 0.938rem (15px) | 1.5rem | 400 | Texto corrido |
| `body-sm` | 0.875rem (14px) | 1.25rem | 400 | Texto auxiliar |
| `caption` | 0.75rem (12px) | 1rem | 400 | Labels, timestamps |
| `button` | 0.875rem (14px) | 1.25rem | 500 | Botões |

---

## 4. Espaçamento (Spacing Scale)

```css
spacing: {
  0:  '0px',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
}
```

### Margins e Padding Padrão

| Contexto | Padding |
|----------|---------|
| Page container | `px-6 py-8` (desktop), `px-4 py-6` (mobile) |
| Card | `p-4` |
| Drawer | `p-6` |
| Kanban column | `p-4` |
| Kanban card | `p-3` |

---

## 5. Border & Radius

```css
border-radius: {
  sm:     '4px',    /* Badges, avatares */
  md:     '8px',    /* Cards, inputs, botões */
  lg:     '12px',   /* Modais, drawer */
  xl:     '16px',   /* Cards grandes */
  full:   '9999px', /* Pilulas, badges */
}
```

---

## 6. Shadows

```css
shadow: {
  sm:   '0 1px 2px rgba(0,0,0,0.05)',
  md:   '0 4px 6px -1px rgba(0,0,0,0.1)',
  lg:   '0 10px 15px -3px rgba(0,0,0,0.1)',
  xl:   '0 20px 25px -5px rgba(0,0,0,0.1)',
  drawer: '-4px 0 24px rgba(0,0,0,0.15)',  /* Sombra do drawer */
}
```

---

## 7. Componentes de Interface

### Botões

| Variante | Classe Tailwind | Uso |
|----------|-----------------|-----|
| **Primary** | `bg-primary-500 text-white hover:bg-primary-600` | Ação principal |
| **Secondary** | `bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50` | Ação secundária |
| **Ghost** | `text-neutral-600 hover:bg-neutral-100` | Ação terciária |
| **Danger** | `bg-error text-white hover:bg-red-600` | Exclusão |

**Tamanhos:**
- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-sm`
- `lg`: `px-6 py-3 text-base`

### Inputs

```css
/* Input padrão */
input {
  @apply w-full px-3 py-2 border border-neutral-300 rounded-md
         text-neutral-800 placeholder-neutral-400
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
         transition-colors duration-200;
}

/* Input com erro */
input.error {
  @apply border-error focus:ring-error;
}

/* Label */
label {
  @apply block text-sm font-medium text-neutral-700 mb-1;
}
```

### Cards

```css
card {
  @apply bg-white rounded-lg border border-neutral-200 p-4 shadow-sm;
}
```

### Badges de Status

| Status | Cor |
|--------|-----|
| **todo** | `bg-neutral-100 text-neutral-600` |
| **doing** | `bg-warning/10 text-warning` |
| **done** | `bg-success/10 text-success` |

### Kanban

| Elemento | Estilo |
|----------|--------|
| **Column** | `bg-neutral-50 rounded-lg min-h-[400px] w-[320px] flex-shrink-0` |
| **Column Header** | `px-4 py-3 font-semibold text-sm text-neutral-700 border-b border-neutral-200` |
| **Card** | `bg-white rounded-md p-3 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow` |

### Drawer

```css
drawer: {
  container: 'fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-drawer z-50',
  backdrop:  'fixed inset-0 bg-black/40 z-40',
  animation: 'translate-x-0 transition-transform duration-300 ease-in-out',
  closed:    'translate-x-full',
}
```

---

## 8. Transições e Animações

| Elemento | Duração | Easing |
|----------|---------|--------|
| Drawer open/close | 300ms | `ease-in-out` |
| Hover em cards | 200ms | `ease-out` |
| Checkbox toggle | 150ms | `ease-in-out` |
| Página carregando | 200ms | `ease-out` |
| Feedback toast | 300ms | `ease-in-out` |

---

## 9. Responsividade

| Breakpoint | Largura | Comportamento |
|------------|---------|---------------|
| `sm` | ≥640px | Drawer ocupa 100% da largura |
| `md` | ≥768px | Drawer max-w-md, Kanban horizontal scroll |
| `lg` | ≥1024px | Kanban 3 colunas lado a lado |
| `xl` | ≥1280px | Layout otimizado para wide screen |

### Mobile-First Abordagem

- Kanban em mobile: tabs horizontais ou swipe entre colunas
- Drawer em mobile: ocupa 100% da tela
- Tabela de tarefas em mobile: lista simples com ícones de ação
- Navegação inferior (mobile) vs sidebar (desktop)
