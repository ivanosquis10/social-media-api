# Migraciones de TypeORM

Este directorio contiene las migraciones para la base de datos.

## Comandos útiles

### Generar una migración automáticamente

```bash
npx typeorm migration:generate -d src/database/cli-config.ts src/migrations/nombre-de-migracion
```

### Crear una migración vacía

```bash
npx typeorm migration:create src/migrations/nombre-de-migracion
```

### Ejecutar migraciones

```bash
npx typeorm migration:run -d src/database/cli-config.ts
```

### Revertir la última migración

```bash
npx typeorm migration:revert -d src/database/cli-config.ts
```

### Ver migraciones pendientes

```bash
npx typeorm migration:show -d src/database/cli-config.ts
```
