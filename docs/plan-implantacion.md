
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
| PostgreSQL | Almacenar la información | 17.x, instalado y probado localmente | Licencia PostgreSQL, de tipo permisivo |
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
| Justificación | Es compatible con Node.js, Express y PostgreSQL y permite alojar los servicios del sistema de importación. |
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
| Base de datos | PostgreSQL 17 | PostgreSQL 17 actualizado, con respaldo y espacio para crecimiento |
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

## 2. Plan de instalación — Semana 2

### 2.1. Objetivo

Definir los pasos para preparar el entorno local del sistema de gestión de una empresa de importación y comprobar que PostgreSQL funcione correctamente.

### 2.2. Entorno de instalación

| Elemento | Configuración |
|---|---|
| Sistema operativo | Ubuntu 26.04 LTS en WSL2 |
| Contenedores | Docker Desktop con integración WSL2 |
| Motor de base de datos | PostgreSQL 17.11 |
| Orquestación | Docker Compose 5.6.1 |
| Proyecto | sistema-importacion |
| Repositorio | https://github.com/sharon05hernandez07-spec/sistema-importacion.git |
| Base de datos | sistema_importacion |
| Usuario de base de datos | importador |

### 2.3. Requisitos previos

- Ubuntu ejecutándose en WSL2.
- Docker Desktop instalado y en funcionamiento.
- Integración de Docker habilitada para Ubuntu.
- Acceso a la carpeta del proyecto.
- Conexión a Internet para descargar la imagen de PostgreSQL.
- Espacio suficiente para la base de datos y los respaldos.

### 2.4. Componentes que se instalarán

Se utilizará Docker Compose para ejecutar PostgreSQL en un contenedor. Los datos se guardarán en un volumen persistente y los respaldos se almacenarán en la carpeta `respaldos`.

### 2.5. Preparación del proyecto

1. Ingresar a la carpeta `~/sistema-importacion`.
2. Revisar los archivos existentes y el estado del repositorio.
3. Verificar Docker con `docker info`.
4. Verificar Docker Compose con `docker compose version`.
5. Confirmar la existencia del archivo `docker-compose.yml`.

### 2.6. Instalación y puesta en marcha

1. Ejecutar `docker compose up -d`.
2. Comprobar el contenedor con `docker compose ps`.
3. Esperar a que PostgreSQL esté listo.
4. Probar la conexión con `docker compose exec -T postgres psql -U importador -d sistema_importacion -c "SELECT version();"`.
5. Confirmar que el motor de base de datos responde correctamente.

### 2.7. Configuración inicial

Se utiliza la base `sistema_importacion` y el usuario `importador`. La configuración de Docker Compose define la persistencia mediante un volumen. La contraseña incluida en el archivo se utiliza solo para el laboratorio local; en un entorno real se debe proteger mediante variables de entorno o un gestor de secretos.

### 2.8. Verificación de la instalación

La prueba realizada mostró PostgreSQL 17.11 y una conexión correcta. Se crearon cuatro tablas: `proveedores`, `productos`, `importaciones` y `detalle_importacion`. También se verificó la relación entre un proveedor, un producto y una importación.

### 2.9. Procedimiento de reversión

Si el contenedor presenta errores, revisar los registros con `docker compose logs postgres` y detener los servicios con `docker compose down`. Después, corregir la configuración y volver a iniciar el servicio.

No se debe utilizar `docker compose down -v` durante el mantenimiento normal, porque elimina el volumen y puede borrar los datos persistentes.

### 2.10. Criterios de aceptación

La instalación se considera satisfactoria cuando Docker responde, el contenedor de PostgreSQL está activo, la conexión funciona y las cuatro tablas pueden consultarse. La instalación de una aplicación web completa queda pendiente, porque el repositorio todavía no contiene el frontend ni el backend funcionales.

---

## 3. Plan de migración de datos — Semana 2

### 3.1. Objetivo medible

Comprobar que los datos puedan trasladarse a una base de destino sin perder registros ni relaciones. La meta del laboratorio es obtener cuatro validaciones con resultado `OK` y comprobar que una transacción temporal puede revertirse.

### 3.2. Origen y destino

| Elemento | Descripción |
|---|---|
| Origen | Base PostgreSQL `sistema_importacion` |
| Destino de prueba | Base PostgreSQL `sistema_importacion_prueba` |
| Base de recuperación | `sistema_importacion_recuperacion` |
| Herramientas | `pg_dump`, `pg_restore` y `psql` |
| Formato de respaldo | Formato personalizado de PostgreSQL (`-Fc`) |

### 3.3. Mapeo de datos

| Tabla de origen | Tabla de destino | Reglas |
|---|---|---|
| proveedores | proveedores | Conservar nombre, país y correo |
| productos | productos | Conservar nombre, categoría y precio |
| importaciones | importaciones | Conservar proveedor, fecha y estado |
| detalle_importacion | detalle_importacion | Conservar importación, producto, cantidad y costo |

En el laboratorio, las tablas se transfieren mediante un respaldo y su restauración. No se realizó todavía una migración entre motores diferentes.

### 3.4. Procedimiento de migración

1. Crear un respaldo actualizado de la base de origen.
2. Crear una base de destino vacía.
3. Restaurar el respaldo con `pg_restore`.
4. Comparar los conteos de registros.
5. Verificar las relaciones entre tablas.
6. Ejecutar el script `scripts/validar-migracion.sh`.
7. Revisar el resultado de cada validación antes de aceptar la migración.

### 3.5. Validaciones realizadas

| Validación | Resultado esperado | Evidencia obtenida |
|---|---|---|
| Existencia de las cuatro tablas | 4 tablas | OK |
| Conteo de registros | 1 proveedor, 1 producto, 1 importación y 1 detalle | OK |
| Integridad de relaciones | Sin referencias faltantes | OK |
| Reglas de cantidad y costo | Cantidad mayor que cero y costo no negativo | OK |

El laboratorio mostró las cuatro validaciones con resultado `OK`. La prueba de rollback también fue satisfactoria: se insertó un registro temporal dentro de una transacción y desapareció después de ejecutar `ROLLBACK`.

### 3.6. Procedimiento de rollback

Si las validaciones fallan, no se debe aceptar la base de destino. Se conserva la base de origen, se registra el error y se vuelve a crear la base de pruebas antes de repetir la restauración. Para operaciones transaccionales, se utiliza `ROLLBACK` cuando los cambios todavía no se han confirmado.

### 3.7. Riesgos y controles

| Riesgo | Control |
|---|---|
| Pérdida de registros | Comparar conteos antes y después |
| Relaciones inválidas | Revisar claves foráneas |
| Respaldo incompleto | Comprobar que el archivo no esté vacío y probar su restauración |
| Error durante la migración | Mantener intacta la base de origen |
| Acceso no autorizado | Proteger credenciales y limitar permisos |
| Falta de espacio | Revisar almacenamiento disponible antes del respaldo |

### 3.8. Estado de la migración

El laboratorio local de respaldo, restauración y validación fue ejecutado con éxito. No se ha realizado una migración de datos de producción ni una conversión desde MySQL a PostgreSQL. Esas actividades quedan pendientes hasta contar con datos reales y un origen definido.

## 4. Hosting y dominio — Semana 3

Se seleccionará el alojamiento más apropiado según los recursos necesarios, el costo y la disponibilidad. También se documentarán el dominio, la configuración de red y la seguridad de las conexiones.

## 5. Plan de respaldo y recuperación — Semana 2

### 5.1. Objetivo

Proteger los datos del sistema de importación y establecer un procedimiento para recuperarlos ante errores, eliminación accidental o pérdida de información.

### 5.2. Alcance

Se respaldará la base PostgreSQL `sistema_importacion`, incluidas sus tablas, registros, estructura y relaciones. Los archivos se guardarán inicialmente en la carpeta local `respaldos`.

### 5.3. Objetivos de recuperación

| Indicador | Objetivo propuesto |
|---|---|
| RPO (pérdida máxima de datos aceptable) | 24 horas |
| RTO (tiempo objetivo para recuperar el servicio) | 2 horas |
| Frecuencia | Diaria |
| Retención local | Aproximadamente 7 días, según la regla del script |
| Formato | Respaldo personalizado de PostgreSQL mediante `pg_dump -Fc` |

Estos valores son objetivos propuestos para el proyecto, no resultados de una prueba de recuperación cronometrada.

### 5.4. Estrategia 3-2-1

La estrategia recomendada contempla tres copias de los datos, dos tipos de almacenamiento y una copia fuera del equipo principal.

En el estado actual existe una base de datos activa y se han generado archivos de respaldo locales. Esto todavía no completa la estrategia 3-2-1. Se debe añadir otra copia en un medio diferente y una copia externa, por ejemplo, en almacenamiento remoto con acceso protegido.

### 5.5. Creación de respaldos

El script `scripts/respaldar-postgres.sh` ejecuta `pg_dump` para generar una copia con fecha y hora. También elimina archivos antiguos que cumplan la condición de retención configurada.

La ejecución manual se probó y produjo un archivo de respaldo de tamaño distinto de cero. La tarea diaria quedó configurada mediante cron a las 6:00 a. m.; todavía se debe verificar una ejecución automática real.

### 5.6. Procedimiento de restauración en ocho pasos

1. Identificar el archivo de respaldo que se desea recuperar.
2. Comprobar que el archivo existe y tiene tamaño mayor que cero.
3. Confirmar que Docker y PostgreSQL estén disponibles.
4. Crear una base de datos de recuperación vacía.
5. Ejecutar `pg_restore` con el archivo seleccionado.
6. Verificar que existan las cuatro tablas esperadas.
7. Comparar los conteos de registros y revisar las relaciones.
8. Registrar el resultado y autorizar el uso de la base recuperada solo si las comprobaciones son satisfactorias.

### 5.7. Prueba de recuperación realizada

Se creó el archivo `respaldos/sistema_importacion.dump` con `pg_dump`. Luego se restauró la copia en una base separada y se verificaron las cuatro tablas y los conteos de registros.

Posteriormente, se eliminó `detalle_importacion` únicamente de la base de pruebas. La restauración en `sistema_importacion_recuperacion` permitió recuperar el registro de detalle, incluida su cantidad y costo unitario. La base de origen no se modificó durante esta prueba.

### 5.8. Retención y almacenamiento

El script aplica una regla de eliminación de respaldos antiguos al ejecutarse. Los archivos locales deben revisarse periódicamente y copiarse a un medio independiente. La copia externa debe contar con acceso restringido y una prueba de restauración propia.

### 5.9. Responsabilidades y evidencias

El responsable del proyecto verificará el resultado de cada respaldo, mantendrá la documentación y realizará pruebas de restauración. Como evidencia se conservarán la lista de archivos, las salidas de `pg_dump` y `pg_restore`, los conteos comparados y el registro de las validaciones.

### 5.10. Pendientes

- Comprobar una ejecución automática real de cron.
- Implementar y verificar la copia externa para completar la estrategia 3-2-1.
- Medir el tiempo real de restauración para contrastarlo con el RTO propuesto.
- Revisar periódicamente que los archivos puedan restaurarse correctamente.

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

