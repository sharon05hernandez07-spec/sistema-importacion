
| Campo | Valor |
|---|---|
| Proyecto | Sistema de gestión para una empresa de importación |
| Equipo | Individual |
| Versión del plan | 1.0 |
| Fecha | 23/10/2026 |

---

## 1. Ficha técnica y requisitos mínimos — Semana 1 (CE-1, CE-2)

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

## 2. Plan de migración de datos — Semanas 2 y 5 (CE-3)

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

## 3. Plan de respaldo — Semanas 2 y 6 (CE-4)

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

El script `scripts/respaldar.sh` ejecuta `pg_dump` para generar una copia con fecha y hora. También elimina archivos antiguos que cumplan la condición de retención configurada.

Se ejecutó manualmente `bash scripts/respaldar.sh` y se generó un archivo de aproximadamente 12 KB. El script valida que el archivo no esté vacío, comprueba que `pg_restore --list` pueda leerlo y conserva como máximo siete respaldos recientes. La tarea diaria quedó configurada mediante cron a las 6:00 a. m.; todavía se debe verificar una ejecución automática real y revisar `respaldos/cron.log`.

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

Se generó un archivo con `scripts/respaldar.sh` y se restauró en una base de datos separada llamada `sistema_importacion_validacion`, sin sobrescribir la base de origen. La restauración de la base tardó aproximadamente 0,50 segundos. Los conteos obtenidos fueron iguales en origen y destino: proveedores = 1, productos = 1, importaciones = 1 y detalle_importacion = 1 (total: 4 registros en las cuatro tablas). La lectura del detalle permitió comprobar sus campos de cantidad y costo unitario.

El tiempo de 0,50 segundos corresponde únicamente al comando de restauración de la base de datos; no representa el tiempo de recuperación de toda la aplicación. La comparación de conteos tampoco sustituye pruebas funcionales completas.

### 5.8. Retención y almacenamiento

El script aplica una regla de eliminación de respaldos antiguos al ejecutarse. Los archivos locales deben revisarse periódicamente y copiarse a un medio independiente. La copia externa debe contar con acceso restringido y una prueba de restauración propia.

### 5.9. Responsabilidades y evidencias

El responsable del proyecto verificará el resultado de cada respaldo, mantendrá la documentación y realizará pruebas de restauración. Como evidencia se conservarán la lista de archivos, las salidas de `pg_dump` y `pg_restore`, los conteos comparados y el registro de las validaciones.

### 5.10. Pendientes

- Comprobar una ejecución automática real de cron.
- Implementar y verificar la copia externa para completar la estrategia 3-2-1.
- Medir el tiempo real de restauración para contrastarlo con el RTO propuesto.
- Revisar periódicamente que los archivos puedan restaurarse correctamente.

## 4. Hosting y dominio — Semana 3 (CE-1)

### 4.1. Estado actual y decisión

El proyecto se encuentra en etapa de desarrollo y validación local. Todavía no se ha contratado ni configurado un servicio de hosting para la aplicación completa, por lo que no se presenta un proveedor, dominio o dirección pública como si ya estuvieran habilitados.

Para una primera publicación se evaluará un servidor virtual Linux o una plataforma de alojamiento compatible con Node.js y PostgreSQL. La decisión se tomará comparando costo mensual, facilidad de despliegue, respaldo, disponibilidad, soporte y posibilidad de restringir el acceso a la base de datos.

### 4.2. Dominio, DNS y HTTPS

| Elemento | Estado o criterio |
|---|---|
| Dominio | Pendiente de selección y registro |
| DNS | Pendiente de configurar cuando exista dominio y hosting |
| HTTPS | Obligatorio antes de exponer el sistema a usuarios; se evaluará certificado TLS válido |
| Proxy inverso | Pendiente; se podrá utilizar Nginx o el proxy administrado por la plataforma elegida |
| Base de datos | No debe exponerse públicamente; se limitará al backend y a la administración autorizada |
| Transferencia de archivos | Se utilizará Git y un método de despliegue autenticado; no se publicarán credenciales en el repositorio |

### 4.3. Criterios para aprobar el hosting

Antes de la publicación se debe comprobar que el servicio soporte la aplicación y la versión de PostgreSQL elegidas, permita configurar variables de entorno y secretos, tenga registros de ejecución, permita realizar respaldos y ofrezca un procedimiento de recuperación. Los costos definitivos se anotarán después de comparar los planes disponibles.

### 4.4. Pendientes

- Elegir y documentar el proveedor de hosting.
- Definir el dominio y configurar los registros DNS.
- Configurar HTTPS y las reglas de red.
- Documentar el procedimiento de publicación y la evidencia de acceso seguro.

## 5. Plan de instalación y despliegue — Semanas 2 y 4 (CE-1, CE-5)

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

## 6. Configuración y verificación — Semana 5 (CE-1)

### 6.1. Ambientes

| Ambiente | Uso | Estado |
|---|---|---|
| Desarrollo local (WSL2) | Programación y pruebas iniciales | Disponible |
| Pruebas | Validar migración, respaldo y restauración con datos sintéticos | Parcialmente verificado |
| Producción | Servicio para usuarios finales | Pendiente; la aplicación completa aún no está desplegada |

### 6.2. Variables de configuración

Los valores se deben suministrar mediante variables de entorno o un mecanismo de secretos. Esta tabla describe los nombres y su propósito; no incluye contraseñas ni valores secretos.

| Variable | Propósito | Regla |
|---|---|---|
| `DB_HOST` | Host del servicio PostgreSQL | Nombre interno del servicio en contenedores o host autorizado |
| `DB_PORT` | Puerto PostgreSQL | Usar el puerto configurado para el ambiente |
| `DB_NAME` | Nombre de la base de datos | Base correspondiente al ambiente |
| `DB_USER` | Usuario de conexión de la aplicación | Usuario de privilegios mínimos |
| `DB_PASSWORD` | Secreto de autenticación | No guardar su valor en Git ni en documentación |
| `PORT` | Puerto de escucha del backend | Definido por el ambiente de ejecución |
| `NODE_ENV` | Modo de ejecución de Node.js | `development`, `test` o `production`, según el ambiente |

Los nombres anteriores son una propuesta para la configuración de la aplicación web. Como el backend funcional aún está pendiente, no se afirma que todas estas variables ya estén implementadas.

### 6.3. Servicios y comprobaciones

| Servicio o componente | Comprobación | Estado |
|---|---|---|
| PostgreSQL | Consultar versión y conectar a la base | Verificado en local |
| Tablas de la base de datos | Consultar proveedores, productos, importaciones y detalle_importacion | Verificado en local |
| Respaldo | Ejecutar `bash scripts/respaldar.sh` y validar el archivo con `pg_restore --list` | Verificado manualmente |
| Ejecución automática del respaldo | Revisar cron y `respaldos/cron.log` tras la hora programada | Pendiente |
| Backend/API | Solicitar un endpoint de salud cuando esté implementado | Pendiente |
| Interfaz web | Abrir la aplicación y realizar una operación de prueba | Pendiente |

### 6.4. Smoke tests

Antes de aprobar una versión se realizarán las siguientes comprobaciones rápidas:

1. Confirmar que los servicios requeridos estén activos.
2. Comprobar que el backend responda a su endpoint de salud.
3. Iniciar sesión con un usuario de prueba cuando exista autenticación.
4. Consultar un registro de prueba y crear, modificar y eliminar datos sintéticos según los permisos del rol.
5. Verificar que la interfaz muestre los resultados esperados y que los errores no expongan secretos.
6. Confirmar que el respaldo pueda leerse y restaurarse en una base aislada.

Los puntos 2 a 5 quedan pendientes hasta disponer de la aplicación web funcional. No se registran como aprobados por anticipado.

## 7. Seguridad, usuarios y permisos — Semana 6 (CE-1)

### 7.1. Principios de seguridad

Se aplicará el principio de mínimo privilegio, se utilizarán credenciales distintas por ambiente y se evitará publicar contraseñas, tokens, archivos de configuración sensibles o datos personales. Las pruebas se harán con datos sintéticos.

### 7.2. Matriz de usuarios y permisos

| Usuario o rol | Sistema operativo | Base de datos | Estado |
|---|---|---|---|
| Administrador del entorno | Administración autorizada de Ubuntu/WSL2 y Docker | No debe utilizarse para operaciones normales de la aplicación | Política definida; prueba pendiente |
| Usuario de aplicación | Sin acceso administrativo al sistema operativo | Solo permisos necesarios sobre las tablas que utiliza la aplicación | Pendiente de implementar y probar |
| Responsable de respaldo | Acceso controlado al script y a la carpeta de respaldos | Permisos necesarios para ejecutar el respaldo y restauración autorizada | Script probado manualmente; revisión de privilegios pendiente |
| Usuario de consulta | Sin acceso al sistema operativo | Solo lectura de la información permitida por su función | Pendiente de implementar |

### 7.3. Políticas de acceso

- No utilizar la cuenta administrativa de PostgreSQL para conexiones habituales de la aplicación.
- Limitar las conexiones de la base de datos a los servicios y equipos autorizados.
- No abrir públicamente el puerto de PostgreSQL.
- Revisar permisos de archivos de respaldo y evitar que usuarios no autorizados puedan leerlos.
- Guardar secretos en variables de entorno protegidas o en un gestor de secretos.
- Excluir archivos `.env` del control de versiones y mantener un `.env.example` sin valores secretos.
- Rotar credenciales si se publican accidentalmente y revisar el historial del repositorio cuando corresponda.

### 7.4. Firewall y exposición de servicios

En el entorno local, el acceso a PostgreSQL se limita al propósito de desarrollo. Para un despliegue público se permitirá desde Internet únicamente el tráfico necesario para la aplicación mediante HTTPS. El acceso administrativo y el acceso directo a la base de datos se restringirán a redes o mecanismos autorizados. Las reglas concretas quedan pendientes de definir junto con el proveedor de hosting.

### 7.5. Pruebas de privilegios

| Prueba | Resultado |
|---|---|
| Confirmar que el usuario de aplicación no tenga permisos administrativos | Pendiente |
| Intentar una operación no autorizada con un usuario de solo lectura | Pendiente |
| Confirmar que los secretos no estén versionados ni se muestren en registros | Pendiente de revisar la configuración completa |
| Comprobar permisos de lectura y escritura en los respaldos | Pendiente |

La matriz define las verificaciones necesarias; no se considera aprobada ninguna prueba de privilegios que todavía no se haya ejecutado.

## 8. Pipeline de despliegue y monitoreo — Semana 7 (CE-1, CE-5)

### 8.1. Flujo previsto

```text
Desarrollar cambios
      |
      v
Revisión del código y pruebas
      |
      v
Guardar cambios en Git
      |
      v
Preparar versión de entrega
      |
      v
Configurar variables y secretos del ambiente
      |
      v
Desplegar en pruebas
      |
      v
Ejecutar smoke tests y verificar registros
      |
      v
Aprobar publicación y desplegar
      |
      v
Monitorear servicio y conservar respaldo
```

Este flujo es el procedimiento previsto. No se afirma que exista un pipeline automatizado de integración y despliegue continuo.

### 8.2. Pasos para publicar una versión

1. Revisar los cambios y confirmar que no incluyan credenciales ni datos reales.
2. Ejecutar las pruebas disponibles y guardar sus resultados.
3. Crear una versión identificable mediante etiqueta o número de versión.
4. Preparar las variables del ambiente sin incluir secretos en Git.
5. Desplegar primero en pruebas y ejecutar las comprobaciones de salud.
6. Autorizar la publicación solo si las pruebas requeridas pasan.
7. Registrar la versión desplegada y la fecha del cambio.

### 8.3. Procedimiento de rollback

Si la publicación falla, se detendrá la promoción de la versión. Se revisarán los registros, se restaurará la versión estable anterior del código y se repetirán los smoke tests. Si el problema afecta datos, no se restaurará una base encima de la original sin autorización: se preservará el estado actual, se realizará una copia y se seguirá el procedimiento de recuperación de la sección 3.

### 8.4. Monitoreo

| Elemento | Qué revisar | Estado |
|---|---|---|
| Disponibilidad del backend | Respuesta del endpoint de salud | Pendiente de implementar |
| PostgreSQL | Estado del contenedor y capacidad de conexión | Verificado en pruebas locales |
| Registros de aplicación | Errores de inicio, conexión y solicitudes fallidas | Pendiente para la aplicación completa |
| Espacio en disco | Uso del volumen y carpeta de respaldos | Pendiente de automatizar |
| Respaldos | Archivo reciente, tamaño válido y resultado de restauración | Respaldo manual probado; monitoreo automático pendiente |

### 8.5. Criterios de publicación

No se publicará una versión si fallan las pruebas críticas, si existen secretos expuestos o si no se puede recuperar la información. La automatización del pipeline y las alertas quedan pendientes hasta definir el hosting y completar el backend.

## 9. Mantenimiento, soporte y capacitación — Semana 8 (CE-5)

### 9.1. Plan de mantenimiento

| Frecuencia | Actividad | Evidencia |
|---|---|---|
| Diaria | Revisar que se genere el respaldo programado | Archivo reciente y registro de cron |
| Semanal | Revisar espacio en disco, registros y estado de servicios | Lista de comprobación |
| Mensual | Probar restauración en una base aislada y revisar permisos | Informe de prueba |
| Cuando haya cambios | Actualizar dependencias de forma controlada y ejecutar pruebas | Registro de versión y pruebas |
| Trimestral | Revisar usuarios, permisos, retención y procedimiento de recuperación | Acta de revisión |

Las frecuencias son propuestas de operación y se ajustarán según el uso y los recursos disponibles.

### 9.2. Niveles de soporte

| Nivel | Tipo de incidente | Acción |
|---|---|---|
| Nivel 1 | Dudas de uso o errores sencillos | Registrar el caso, orientar al usuario y comprobar pasos básicos |
| Nivel 2 | Fallos de la aplicación, acceso o conexión a la base de datos | Revisar registros, configuración y permisos; documentar la solución |
| Nivel 3 | Pérdida de datos, falla grave o despliegue fallido | Activar al responsable técnico, preservar evidencias y aplicar el plan de recuperación |

Durante la etapa formativa, el responsable del proyecto realizará estas actividades. Los tiempos de atención definitivos deberán acordarse antes de una puesta en producción.

### 9.3. Capacitación

La capacitación propuesta incluirá una explicación de acceso al sistema, recorrido por las funciones disponibles, manejo seguro de credenciales, reporte de errores y procedimiento para solicitar soporte. La sesión se acompañará con una guía breve y datos sintéticos de práctica.

La capacitación práctica queda pendiente hasta que la interfaz y las funciones de usuario estén terminadas.

### 9.4. Material de ayuda

Se mantendrá la documentación dentro del repositorio, especialmente el plan de implantación, las instrucciones de instalación, el procedimiento de respaldo y la guía de recuperación. Los enlaces externos a manuales de la aplicación se agregarán cuando se seleccione el hosting y se complete la interfaz.

### 9.5. Registro de incidentes

Cada incidente deberá registrar fecha, síntoma, impacto, pasos para reproducirlo, acción realizada y resultado. No se deben incluir contraseñas, tokens ni datos personales innecesarios en los reportes.

## 10. Aceptación y entrega — Semana 9 (CE-1 a CE-5)

### 10.1. Pruebas de aceptación

| ID | Prueba | Resultado actual | Estado |
|---|---|---|---|
| PA-01 | Iniciar PostgreSQL y conectarse a la base local | Conexión local realizada correctamente | Aprobada en laboratorio |
| PA-02 | Consultar las cuatro tablas del sistema | Tablas disponibles | Aprobada en laboratorio |
| PA-03 | Generar y validar un archivo de respaldo | Archivo generado y legible por `pg_restore --list` | Aprobada en laboratorio |
| PA-04 | Restaurar en una base independiente y comparar conteos | 1 proveedor, 1 producto, 1 importación y 1 detalle en ambos lados | Aprobada en laboratorio |
| PA-05 | Verificar interfaz y operaciones completas de usuario | Aplicación web completa aún no disponible | Pendiente |
| PA-06 | Verificar seguridad de roles y permisos | Pruebas de privilegios pendientes | Pendiente |
| PA-07 | Publicar en hosting con HTTPS | Hosting y dominio aún no configurados | Pendiente |
| PA-08 | Verificar ejecución automática de respaldos y copia externa | Cron configurado; ejecución automática y copia externa por comprobar | Pendiente |

### 10.2. Simulacro cruzado

El simulacro cruzado con otro equipo todavía no se ha realizado. Para completarlo, una persona que no haya preparado el entorno deberá seguir las instrucciones de la sección 5 desde cero, registrar cada paso, anotar errores y comprobar si logra iniciar los servicios sin ayuda. El resultado y las mejoras se añadirán cuando la prueba se ejecute.

### 10.3. Criterios de aceptación de la entrega

La entrega final se aceptará cuando:
- la aplicación completa pueda instalarse siguiendo los pasos documentados;
- las pruebas funcionales y de seguridad requeridas estén ejecutadas;
- los respaldos puedan restaurarse y la evidencia incluya conteos antes y después;
- la configuración de hosting, dominio y HTTPS esté documentada, si aplica;
- exista una guía de usuario y un procedimiento de soporte;
- el simulacro cruzado haya sido realizado y documentado.

### 10.4. Acta de entrega y niveles de servicio

| Campo | Registro |
|---|---|
| Proyecto | Sistema de gestión para una empresa de importación |
| Responsable de entrega | Pendiente de completar |
| Receptor de la entrega | Pendiente de definir |
| Versión entregada | Pendiente de la versión funcional |
| Fecha de entrega | Pendiente |
| Disponibilidad objetivo | Por acordar antes de producción |
| Tiempo de respuesta de soporte | Por acordar antes de producción |
| Tiempo objetivo de recuperación (RTO) | 2 horas como objetivo propuesto; requiere validación integral |
| Resultado de aceptación | Parcial: base de datos, respaldo y restauración probados en laboratorio; aplicación completa pendiente |
| Observaciones | No se debe presentar como despliegue de producción hasta completar las pruebas pendientes |

### 10.5. Pendientes principales para la entrega final

1. Completar el frontend y el backend funcionales.
2. Mover las credenciales de laboratorio fuera del archivo versionado y revisar la configuración pública del repositorio.
3. Configurar y verificar el hosting, el dominio y HTTPS.
4. Verificar la ejecución automática de cron y completar la copia externa 3-2-1.
5. Ejecutar pruebas funcionales y de privilegios, y registrar sus evidencias.
6. Realizar el simulacro cruzado y completar el acta de entrega.
