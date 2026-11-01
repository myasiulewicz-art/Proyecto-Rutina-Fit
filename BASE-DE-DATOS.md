# Base de datos de Rutina Fit

**Tecnología:** Supabase (PostgreSQL). Las cuentas usan Supabase Authentication (correo y contraseña).
**Script de creación:** [base-de-datos/rutina-fit-supabase.sql](base-de-datos/rutina-fit-supabase.sql)

## Cómo se relacionan las tablas

```
auth.users (cuentas, las crea Supabase)
   ├── perfiles            1 a 1   (datos personales)
   ├── dias_rutina         1 a N   (días de entrenamiento)
   │      ├── dia_ejercicios      N a 1  ejercicios (catálogo)
   │      └── ejercicios_hechos   N a 1  ejercicios (catálogo)
   ├── ciclo               1 a N   (días de período)
   └── ejercicios_hechos   1 a N
```

Al borrar una cuenta se borran en cadena todos sus datos (`on delete cascade`).

## Tablas

### `perfiles`: datos de cada usuaria
| Columna | Tipo | Qué guarda |
|---|---|---|
| `id` | uuid (clave primaria) | Mismo identificador que la cuenta de inicio de sesión |
| `nombre` | texto | Nombre y apellido |
| `peso` | numérico (5,1) | Peso en kg |
| `objetivo` | texto | Objetivo elegido (por ejemplo, Tonificar) |
| `fecha_inicio` | fecha | Día en que empieza a entrenar |
| `rutina_completa` | booleano | Si ya terminó el registro inicial |
| `creado_en` | fecha y hora | Cuándo se creó |

El perfil se crea solo al registrarse, mediante un *trigger* (`crear_perfil`).

### `ejercicios`: catálogo (igual para todas)
| Columna | Tipo | Qué guarda |
|---|---|---|
| `id` | texto (clave primaria) | Identificador, por ejemplo `sentadilla` |
| `nombre` | texto | Nombre que se muestra |
| `grupos` | lista de textos | Grupos musculares (Piernas, Glúteos, Abdomen, Brazos, Espalda, Cardio) |
| `unidad` | texto | `r` = repeticiones, `s` = segundos |
| `series_sug` / `valor_sug` | enteros | Series y repeticiones (o segundos) sugeridas |

Tiene 25 ejercicios cargados. Las usuarias solo pueden leerlo.

### `dias_rutina`: días de entrenamiento de cada usuaria
| Columna | Tipo | Qué guarda |
|---|---|---|
| `id` | uuid (clave primaria) | Identificador del día |
| `usuaria_id` | uuid | A quién pertenece (cuenta) |
| `dia_semana` | entero 0 a 6 | 0 = lunes … 6 = domingo |

No se puede repetir el mismo día de la semana para una misma usuaria.

### `dia_ejercicios`: ejercicios cargados en cada día
| Columna | Tipo | Qué guarda |
|---|---|---|
| `id` | uuid (clave primaria) | Identificador |
| `dia_id` | uuid | Día al que pertenece (`dias_rutina`) |
| `ejercicio_id` | texto | Ejercicio del catálogo |
| `series` | entero 1 a 10 | Cantidad de series |
| `valor` | entero 1 a 300 | Repeticiones o segundos |
| `descanso_seg` | entero 0 a 300 | Descanso entre series, en segundos |
| `orden` | entero | Posición dentro del día |

### `ciclo`: días de período marcados en el calendario
| Columna | Tipo | Qué guarda |
|---|---|---|
| `usuaria_id` | uuid | A quién pertenece |
| `fecha` | fecha | Día marcado |

La clave primaria es (`usuaria_id`, `fecha`): un día no se puede marcar dos veces.

### `ejercicios_hechos`: ejercicios tildados como hechos
| Columna | Tipo | Qué guarda |
|---|---|---|
| `usuaria_id` | uuid | A quién pertenece |
| `semana` | fecha | Lunes de la semana en que se hizo, así el progreso empieza de cero cada semana |
| `dia_id` | uuid | Día de la rutina |
| `ejercicio_id` | texto | Ejercicio tildado |

## Seguridad

Todas las tablas tienen activado *Row Level Security*. Las reglas dicen:

- `perfiles`, `dias_rutina`, `ciclo` y `ejercicios_hechos`: cada usuaria lee y modifica solo las filas que le pertenecen (`auth.uid()` igual a su identificador).
- `dia_ejercicios`: solo se accede a las filas de días que le pertenecen.
- `ejercicios`: lectura para cualquier usuaria con sesión iniciada; nadie lo modifica desde la app.

Así, aunque la clave pública esté en el código, nadie puede leer ni cambiar los datos de otra persona.

## Dónde verla

En Supabase: **Table Editor** (tablas y filas), **Authentication > Users** (cuentas) y **Authentication > Policies** (reglas de seguridad).
