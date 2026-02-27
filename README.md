# 🚀 MGi Sistema de Gestión - Frontend Test

Este repositorio contiene la solución a la prueba técnica para el puesto de Frontend Developer. Está construido utilizando **Nuxt 4**, **Vue 3**, **Pinia**, y **Tailwind CSS** (vía Nuxt UI), aplicando principios de Clean Architecture para garantizar escalabilidad y mantenibilidad.

---

## 🧠 Comprensión del problema

**¿Qué problema resuelve este módulo?**
El sistema proporciona una interfaz administrativa segura (Dashboard) para la gestión centralizada del inventario. Permite visualizar, crear, actualizar y eliminar productos interactuando con una API RESTful, asegurando que solo el personal autorizado tenga acceso.

**¿Qué tipo de usuario lo utilizaría y qué flujos existen?**
Está pensado para personal administrativo o gestores de inventario. Los flujos principales son:

1. **Flujo de Seguridad:** Autenticación de credenciales (Login) y cierre de sesión.
2. **Flujo de Lectura:** Visualización del catálogo de productos.
3. **Flujo de Mutación:** Operaciones CRUD (Crear, Editar, Eliminar) sobre los productos.

---

## 🗺️ Planificación previa

**¿Qué partes del sistema identificaste?**

1. **Capa de Infraestructura (Networking):** Configuración base de llamadas HTTP, interceptores y variables de entorno.
2. **Capa de Dominio (Auth & Products):** Repositorios para separar la lógica de la API de la interfaz.
3. **Capa de Estado:** Manejo global de usuario y tokens.
4. **Capa de Presentación (UI):** Vistas protegidas y componentes de diseño.

**¿En qué orden decidiste implementarlas y por qué?**
**Orden de implementación:**

1. _Infraestructura y Auth:_ Sin acceso seguro no hay datos. Se priorizó el interceptor y la configuración de Nuxt para asentar las bases.
2. _Estado global:_ Implementación de Pinia y persistencia.
3. _Módulo de Productos:_ Construcción del CRUD consumiendo los repositorios ya creados.
4. _Testing:_ Pruebas unitarias y E2E sobre los flujos críticos.

**¿Qué dejé fuera y por qué?**
Se omitió la implementación de validaciones complejas en tiempo real en todos los campos (debounce) y el manejo de "Refresh Tokens", priorizando entregar una arquitectura base sólida, testeada y limpia dentro del tiempo límite de la prueba, en lugar de un proyecto lleno de features a medias.

---

## 🏗️ Arquitectura y estructura del proyecto

**¿Cómo organizaste carpetas y responsabilidades?**
El proyecto aprovecha el estándar del nuevo directorio `app/` de **Nuxt 4**, organizando las responsabilidades de la siguiente manera:

- **`app/repositories/`**: Implementa el Patrón Repositorio. Aquí viven las llamadas a la API (`AuthRepository`, `ProductRepository`). Aísla a los componentes de los detalles técnicos de `$fetch` o de las URLs exactas.
- **`app/plugins/api.ts`**: Plugin centralizado que inyecta la instancia de la API configurada globalmente (interceptores, headers) en toda la aplicación.
- **`app/components/`**: Divididos por dominio (`auth/`, `products/`). Se aplicó el patrón de _Dumb Components_ (ej. `LoginForm.vue` solo maneja UI y emite eventos; la página maneja la lógica).
- **`app/utils/`**: Funciones puras auto-importadas (ej. validaciones de negocio) que facilitan el Unit Testing.

**¿Por qué decidiste usar composables / repositorios / middleware?**

- **Composables (y Pinia):** Decidí usar un composable específico en el módulo de productos para extraer la lógica compleja y mantener el componente visual (el archivo .vue) lo más limpio y declarativo posible, respetando el principio de Responsabilidad Única. Para la lógica que necesitaba ser verdaderamente global y reutilizable (como la autenticación), utilicé los Setup Stores de Pinia, que bajo el capó en Vue 3 funcionan exactamente como composables globales, pero con el beneficio añadido de la hidratación y persistencia de estado.

- **Repositorios (en lugar de Servicios clásicos):** Para el consumo de endpoints, opté por implementar el Patrón Repositorio (ProductRepository, AuthRepository) en lugar de servicios sueltos. Esto me permitió abstraer por completo la capa de red. Los repositorios no saben de URLs base ni de tokens; simplemente reciben una instancia preconfigurada de $fetch inyectada a través del Plugin de Nuxt. Esto hace que el código sea altamente predecible y fácil de mockear en los tests.

- **Middleware:** Utilicé el sistema de middlewares nativo de Nuxt para la protección de rutas. Al leer la cookie en el middleware, aseguro que las rutas privadas (como el Dashboard) estén blindadas desde la primera carga, evitando destellos en la pantalla (flickering) de contenido no autorizado.

**Alternativas consideradas:**

- **Llamadas HTTP directas:** Consideré hacer las peticiones `$fetch` directamente dentro de los _actions_ de Pinia o en los componentes. Lo descarté rotundamente porque viola el principio de Responsabilidad Única (SRP), dificulta el testing (obligando a mockear toda la red) y hace que un cambio en la API rompa múltiples archivos en la capa visual.

- **Almacenamiento de sesión (Cookies vs LocalStorage):** Inicialmente pensé en guardar toda la información del usuario (el perfil completo) junto con el token dentro de una misma cookie por simplicidad de configuración. Sin embargo, lo descarté por razones de rendimiento: los navegadores adjuntan automáticamente las cookies en los _headers_ de **cada** petición HTTP. Enviar un payload con los datos del usuario en cada llamada a la API generaría una sobrecarga (_overhead_) de red completamente innecesaria. Por ello, decidí separar las responsabilidades: el JWT (ligero y necesario para la autorización) vive en la cookie, mientras que el perfil del usuario se guarda en el `localStorage` y se sincroniza de forma transparente con el Store de Pinia.

---

## 🛠️ Decisiones técnicas clave

- **Manejo de estado (Pinia):** Elegido sobre composables simples por su integración nativa con las Vue DevTools, soporte SSR y facilidad para hidratar/persistir datos usando `pinia-plugin-persistedstate`.
- **Manejo de Autenticación:** Se implementó una estrategia híbrida usando Middlewares de Nuxt y Cookies para el JWT. Esto permite validar la sesión en el servidor, eliminando el flickering y blindando las rutas privadas desde la primera carga.
- **Manejo de errores:** Centralizado en la capa de red. Un interceptor global atrapa los códigos HTTP (como 401) para tomar acciones transversales (ej. forzar logout), evitando llenar los componentes con bloques `try/catch` repetitivos.
- **Librería UI (Nuxt UI v4):** Permite una iteración rápida con componentes accesibles (Headless UI) y estilos altamente personalizables mediante Tailwind CSS.
- **Tipado (TypeScript):** Se definieron interfaces estrictas (`User`, `Product`, `LoginCredentials`) para modelar el dominio, garantizando autocompletado y seguridad de contratos entre el frontend y DummyJSON.
- **Calidad de Código (ESLint + Prettier):** Se integraron ambas herramientas para estandarizar el formato del código y realizar análisis estático. Esto asegura la consistencia en el proyecto, previene errores comunes de sintaxis y mantiene las buenas prácticas de desarrollo desde el inicio.

---

## 🔐 Flujo de autenticación

1. **¿Cómo funciona el login?:** El usuario ingresa datos en `LoginForm.vue`. El componente valida que no estén vacíos y emite un evento a la página. La página despacha la acción en el `useAuthStore`.
2. **¿Dónde se guarda el token?:** Si la API responde con éxito, el JWT (`accessToken`) se guarda en una **Cookie** (para que el middleware de Nuxt pueda leerla en el servidor si fuera necesario) y los datos del perfil se persisten en `localStorage`.
3. **¿Cómo se protegen las rutas?:** Un middleware global evalúa la existencia de la cookie. Si un usuario no autenticado intenta acceder a `/products`, es redirigido a `/login`.
4. **¿Qué pasaría si el token expira?:** Si el token expira o es revocado, cualquier petición subsecuente a la API devolverá un estado `401 Unauthorized`. El interceptor global en `plugins/api.ts` captura este error, limpia el estado de Pinia, borra las cookies y redirige silenciosamente al usuario al login.

---

## 🧪 Testing

Se priorizó el valor sobre el volumen, aplicando pruebas en las dos capas más críticas de la pirámide:

- **Unit Testing (Vitest):** Se testearon las funciones puras de validación (`validateLoginForm`, `validateProductForm`). _Por qué:_ Es el núcleo de las reglas de negocio y debe responder sin depender del DOM.
- **E2E Testing (Playwright):** Se automatizó el "Happy Path" de Autenticación (Flujo Login -> Redirección -> Dashboard). _Por qué:_ Para confirmar que la UI, el Store, el Router y la API están correctamente conectados.
- **¿Qué no se testeó?** No se escribieron _Component Tests_ exhaustivos (ej. "el botón renderiza el texto") porque Nuxt UI ya garantiza la accesibilidad y el renderizado base, y el ROI (Retorno de Inversión) de esos tests en una prueba técnica es bajo.
- **¿Qué tipo de bugs buscaban evitar los tests?:** Evita regresiones donde el usuario podría enviar formularios vacíos o quedarse atascado en una pantalla blanca tras un login defectuoso.

---

## 🚧 Limitaciones y mejoras

**Limitaciones actuales:**

- La API de simulación (DummyJSON) no valida estrictamente las firmas de los tokens JWT en los métodos de mutación (`DELETE`, `PUT`), por lo que la simulación de rechazo de token en la capa visual no es 100% fidedigna al comportamiento de un backend real.

**Mejoras para un proyecto real (Con más tiempo):**

1. **Flujo de Refresh Token:** Implementar rotación de tokens silenciosa antes de que el token principal expire.
2. **Optimistic Updates:** Actualizar la UI inmediatamente tras borrar o editar un producto, y hacer el rollback solo si la petición falla, para dar una sensación de velocidad instantánea.
3. **Refactorización hacia un Design System interno:** Extraer y abstraer elementos de la interfaz (botones, inputs, dropdowns) en componentes base (wrappers) 100% reutilizables y personalizables. Al igual que se logró con el componente AppConfirmModal, el objetivo es centralizar los estilos para asegurar la consistencia del look and feel y agilizar el desarrollo de futuras vistas.
4. **i18n:** Implementar `vue-i18n` para soportar múltiples idiomas en el panel.

---

## ⚙️ Pasos de ejecución

Sigue estos pasos para levantar el entorno de desarrollo localmente:

### 1. Requisitos previos

- Node.js (v20 o superior recomendado).
- Git.
- pnpm (Gestor de paquetes utilizado en el proyecto)

### 2. Instalación

Clona el repositorio e instala las dependencias con pnpm:
git clone https://github.com/SergioNiv/mgi-frontend-nuxt.git
cd mgi-frontend-nuxt
pnpm install

### 3. Variables de entorno

El proyecto utiliza la funcionalidad de configuración en tiempo de ejecución de Nuxt (runtimeConfig) con valores por defecto (fallback).
El proyecto levantará automáticamente sin necesidad de configurar un .env.

(Nota: Si deseas modificar la URL de la API, puedes duplicar el archivo .env.example, renombrarlo a .env y editar la variable NUXT_PUBLIC_API_BASE_URL).

### 4. Entorno de Desarrollo

Inicia el servidor local:

pnpm run dev
La aplicación estará disponible en http://localhost:3000.

### 5. Ejecución de Pruebas (Tests)

Pruebas Unitarias (Lógica de negocio):

pnpm run test:unit

Pruebas End-to-End (Flujo crítico de Login):
Asegúrate de instalar los navegadores de Playwright la primera vez:

npx playwright install
pnpm run test:e2e

```bash

```
