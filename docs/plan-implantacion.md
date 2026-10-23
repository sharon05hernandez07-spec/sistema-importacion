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
| Distribución y versión | Ubuntu Server 26.04 LTS, propuesta por confirmar |
| Arquitectura | 64 bits |
| Fin del soporte | Consultar la fecha oficial correspondiente a la versión seleccionada |
| Licencia | Sistema operativo de código abierto, sin costo de licencia |
| Requisitos mínimos oficiales | Consultar la documentación oficial de Ubuntu Server para la versión seleccionada |
| Justificación | Es compatible con Node.js, Express y MySQL y permite alojar los servicios del sistema de importación. |
### 1.4. Consumo de recursos

Las mediciones se realizarán cuando se defina y ejecute la aplicación. Por ahora no existen mediciones reales del consumo del sistema.

| Medición | Resultado |
|---|---|
| Memoria RAM en reposo | Pendiente de medir |
| Memoria RAM con carga | Pendiente de medir |
| Pico de uso de CPU | Pendiente de medir |
| Prueba de carga | Pendiente de definir y ejecutar |

### 1.5. Matriz de requisitos

| Recurso | Requisito mínimo estimado | Requisito recomendado estimado |
|---|---|---|
| CPU | 2 núcleos | 2 núcleos |
| Memoria RAM | 4 GB | 6 GB (4 GB + 50 % = 6 GB) |
| Disco | 20 GB disponibles | 40 GB disponibles para aplicación, base de datos y crecimiento inicial |
| Red | Conexión de red y acceso a los puertos necesarios | Conexión estable y segura según la cantidad de usuarios |
| Arquitectura | x86_64 de 64 bits | x86_64 de 64 bits |
| Sistema operativo | Ubuntu Server LTS de 64 bits | Ubuntu Server LTS con soporte vigente |
| Entorno de ejecución | Node.js y servicios necesarios, versiones por definir | Versiones compatibles y documentadas |
| Base de datos | MySQL Community Server, versión por definir | MySQL con respaldo y espacio para crecimiento |
| Contenedores | Docker, solo si se adopta para el despliegue | Docker con versión compatible, si se utiliza |
| Puertos de red | Solo los necesarios para la aplicación y la administración | Acceso restringido mediante reglas de seguridad |

**Cálculo del margen de memoria:** se estima un mínimo inicial de 4 GB. Para la recomendación se agrega un margen del 50 %: 4 GB × 1,5 = 6 GB.

**Nota:** estos valores son estimaciones iniciales para planificar el servidor. Se deben validar cuando la aplicación esté desarrollada y se pueda medir su consumo real. El almacenamiento se ajustará según el volumen de documentos y registros que maneje la empresa.
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
