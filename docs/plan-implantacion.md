# Plan de Implantación — Sistema de gestión para una empresa de importación

| Campo | Valor |
|---|---|
| Proyecto | Sistema de gestión para una empresa de importación |
| Equipo | Individual |
| Versión del plan | 1.0 |
| Fecha | 22/10/2026 |

---

## 1. Ficha técnica y requisitos mínimos — Semana 1

### 1.1. Descripción técnica

El proyecto consiste en desarrollar un sistema de gestión para una empresa de importación. Permitirá administrar proveedores, productos importados, registros de importación, seguimiento de pedidos y costos asociados. También se contempla el manejo de usuarios y la generación de reportes. La arquitectura y las tecnologías se definirán durante el desarrollo del proyecto.

### 1.2. Inventario de software

| Componente | Función | Versión | Licencia y costo |
|---|---|---|---|
| React | Construir la interfaz de usuario | Por definir | Licencia MIT, sin costo de licencia |
| Node.js | Ejecutar el backend | Por definir | Licencia MIT, sin costo de licencia |
| Express | Crear la API del sistema | Por definir | Licencia MIT, sin costo de licencia |
| MySQL Community Server | Almacenar la información | Por definir | Licencia y condiciones por verificar según la edición elegida |
| Git | Controlar versiones del código | Por definir | Licencia GPL-2.0, sin costo de licencia |
| GitHub | Alojar el repositorio del proyecto | Servicio en línea | Plan y condiciones por verificar |
| Docker | Facilitar el despliegue de los servicios, si se utiliza | Por definir | Depende de la edición y componentes utilizados |
| Sistema operativo del servidor | Ejecutar la aplicación | Por definir | Depende del sistema seleccionado |


### 1.3. Sistema operativo del servidor

| Característica | Descripción |
|---|---|
| Distribución y versión | Pendiente de selección |
| Arquitectura | 64 bits, por confirmar |
| Fin del soporte | Pendiente de consultar en la página oficial |
| Licencia | Pendiente de verificar |
| Requisitos mínimos oficiales | Pendiente de consultar según el sistema operativo elegido |

### 1.4. Consumo de recursos

Las mediciones se realizarán cuando se defina y ejecute la aplicación. Por ahora no existen mediciones reales del consumo del sistema.

| Medición | Resultado |
|---|---|
| Memoria RAM en reposo | Pendiente de medir |
| Memoria RAM con carga | Pendiente de medir |
| Pico de uso de CPU | Pendiente de medir |
| Prueba de carga | Pendiente de definir y ejecutar |

### 1.5. Matriz de requisitos

| Recurso | Requisito mínimo | Requisito recomendado |
|---|---|---|
| CPU | Pendiente de medir y validar | Según medición y margen adicional |
| Memoria RAM | Pendiente de medir | Consumo medido más 30–50 % |
| Disco | Pendiente de estimar según aplicación y datos | Espacio adicional para crecimiento y respaldos |
| Red | Conectividad requerida por los usuarios y servicios | Conexión estable según la cantidad de usuarios |
| Arquitectura | Por confirmar | Compatible con las tecnologías seleccionadas |
| Sistema operativo | Por seleccionar | Versión con soporte vigente |
| Contenedores y entorno de ejecución | Según la arquitectura final | Versiones compatibles y documentadas |
| Puertos de red | Por definir según los servicios | Abrir únicamente los necesarios |

El requisito recomendado de memoria RAM se calculará a partir del consumo medido, agregando un margen del 30 al 50 %. El almacenamiento se estimará considerando la base de datos, los documentos y el crecimiento esperado.

### 1.6. Recomendación de plataforma física

La plataforma se seleccionará cuando se definan las tecnologías, la cantidad de usuarios y el consumo de recursos. Se evaluará el uso de un servidor virtual o de servicios en la nube para facilitar la instalación y el mantenimiento. Si se elige un servidor físico que aloje la base de datos, se revisará la conveniencia de utilizar RAID y un sistema de respaldo independiente.

### 1.7. Verificación de requisitos

| Campo | Resultado |
|---|---|
| Script de verificación | `scripts/verificar-requisitos.sh` |
| Entorno de prueba | Ubuntu 26.04 en WSL2 |
| Procesadores | 4 — CUMPLE |
| Memoria RAM | 3859 MB — CUMPLE |
| Disco libre | 955 GB — CUMPLE |
| Arquitectura | x86_64 — CUMPLE |
| Sistema operativo | Ubuntu 26.04 — CUMPLE según el umbral configurado |
| Docker | No instalado — NO CUMPLE |
| Node.js | No instalado — NO CUMPLE |
| Puerto 80 | Libre — CUMPLE |
| Puerto 443 | Libre — CUMPLE |
| Resultado general | 2 requisitos no se cumplen |

**Observación:** la prueba se realizó en el entorno de desarrollo Ubuntu mediante WSL2. Los resultados no representan todavía una evaluación de un servidor definitivo. La ausencia de Docker y Node.js deberá revisarse cuando se defina la arquitectura del sistema y se confirme si estas herramientas son necesarias.

---

## 2. Plan de migración de datos — Semanas 2 y 5

Se documentarán los datos que deban trasladarse, su origen y destino, las reglas de transformación, las validaciones y el procedimiento de recuperación ante errores. Esta sección se completará cuando se defina la estructura de la base de datos.

## 3. Plan de respaldo — Semanas 2 y 6

Se definirán los datos que se respaldarán, la frecuencia, el tiempo máximo de pérdida de información permitido, el tiempo de recuperación, la retención y las pruebas de restauración.

## 4. Hosting y dominio — Semana 3

Se seleccionará el alojamiento más apropiado según los recursos necesarios, el costo y la disponibilidad. También se documentarán el dominio, la configuración de red y la seguridad de las conexiones.

## 5. Plan de instalación y despliegue — Semanas 2 y 4

Se documentarán los requisitos previos, los pasos de instalación, la configuración y la publicación del sistema en el entorno seleccionado.

## 6. Configuración y verificación — Semana 5

Se documentarán las variables de configuración, los servicios requeridos y las pruebas para comprobar que la aplicación funcione correctamente.

## 7. Seguridad, usuarios y permisos — Semana 6

Se definirán los roles, los permisos, las medidas de protección de la información y las reglas de acceso al sistema.

## 8. Pipeline de despliegue y monitoreo — Semana 7

Se describirá el procedimiento para publicar nuevas versiones, comprobar el funcionamiento y regresar a una versión anterior si ocurre un problema.

## 9. Mantenimiento, soporte y capacitación — Semana 8

Se establecerán las actividades de mantenimiento, la atención de incidentes y las orientaciones para los usuarios.

## 10. Aceptación y entrega — Semana 9

Se documentarán las pruebas finales, los resultados de aceptación y la entrega del sistema.
