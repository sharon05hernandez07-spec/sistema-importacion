
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
| React | Construir la interfaz de usuario | 19.3.x, propuesta | Licencia MIT, sin costo de licencia |
| Node.js | Ejecutar el backend | 24.x LTS, propuesta | Licencia MIT, sin costo de licencia |
| Express | Crear la API del sistema | 5.x, propuesta | Licencia MIT, sin costo de licencia |
| MySQL Community Server | Almacenar la información | 8.4 LTS, propuesta | GPLv2 con condiciones adicionales; revisar componentes y condiciones de distribución |
| Git | Controlar versiones del código | 2.x, propuesta | GPL-2.0, sin costo de licencia |
| GitHub | Alojar el repositorio del proyecto | Servicio en línea | Plan Free: sin costo para las funciones incluidas; funciones adicionales sujetas a condiciones y cobros |
| Docker Engine | Facilitar el despliegue, si se utiliza | 29.x, propuesta | Apache License 2.0 para Docker Engine; revisar por separado los demás componentes |
| Ubuntu Server | Ejecutar la aplicación | 26.04 LTS, propuesta | Software libre y de código abierto; soporte estándar hasta mayo de 2031 |


### 1.3. Sistema operativo del servidor

| Característica | Descripción |
|---|---|
| Distribución y versión | Ubuntu Server 26.04 LTS, propuesta por confirmar |
| Arquitectura | 64 bits |
| Fin del soporte estándar | Mayo de 2031, según el ciclo oficial de Ubuntu 26.04 LTS |
| Licencia | Sistema operativo de código abierto, sin costo de licencia |
| Requisitos oficiales | Consultar la documentación de Ubuntu Server 26.04 LTS antes de instalar el servidor |
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
| Entorno de ejecución | Node.js 24.x LTS y dependencias necesarias | Node.js 24.x LTS actualizado y dependencias compatibles |
| Base de datos | MySQL Community Server 8.4 LTS | MySQL 8.4 LTS actualizado, con respaldo y espacio para crecimiento |
| Contenedores | Docker Engine 29.x, solo si se adopta | Docker Engine actualizado, si se utiliza |
| Puertos de red | Solo los necesarios para la aplicación y la administración | Acceso restringido mediante reglas de seguridad |

**Cálculo del margen de memoria:** se estima un mínimo inicial de 4 GB. Para la recomendación se agrega un margen del 50 %: 4 GB × 1,5 = 6 GB.

**Nota:** estos valores son estimaciones iniciales para planificar el servidor. Se deben validar cuando la aplicación esté desarrollada y se pueda medir su consumo real. El almacenamiento se ajustará según el volumen de documentos y registros que maneje la empresa.
### 1.6. Recomendación de plataforma física

La plataforma se seleccionará cuando se definan las tecnologías, la cantidad de usuarios y el consumo de recursos. Se evaluará el uso de un servidor virtual o de servicios en la nube para facilitar la instalación y el mantenimiento. Si se elige un servidor físico que aloje la base de datos, se revisará la conveniencia de utilizar RAID y un sistema de respaldo independiente.

###### 1.7. Verificación de requisitos

La siguiente tabla resume los resultados de la verificación del entorno de desarrollo mediante Ubuntu en WSL2.

| REQUISITO | ESPERADO | ENCONTRADO | ESTADO |
|---|---|---|---|
| Procesadores | >= 2 | 4 | CUMPLE |
| RAM (MB) | >= 4096 | 3859 | NO CUMPLE |
| Disco libre (GB) | >= 20 en / | 955 | CUMPLE |
| Arquitectura | x86_64 o aarch64 | x86_64 | CUMPLE |
| Sistema operativo | Ubuntu >= 22.04 | Ubuntu 26.04 | CUMPLE |
| Docker | >= 24.0 | No instalado | NO CUMPLE |
| Node.js | >= 20.0 | No instalado | NO CUMPLE |
| Puerto 80 | Libre | Libre | CUMPLE |
| Puerto 443 | Libre | Libre | CUMPLE |

**RESULTADO:** 3 requisitos no se cumplen.

**Observación:** la RAM disponible es inferior al mínimo establecido y Docker y Node.js no están instalados en este entorno. Estos resultados corresponden al entorno de desarrollo WSL2 y deberán revisarse antes del despliegue definitivo.

**Evidencia:** la salida real del script de verificación debe incorporarse aquí en un bloque de código, utilizando la ejecución con los requisitos definidos para la matriz.

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

