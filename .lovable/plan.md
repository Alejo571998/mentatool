
## Promover a alejonm30@gmail.com como admin

Encontré el usuario en la base de datos:
- **Email**: alejonm30@gmail.com
- **UUID**: `29ebf269-79d8-45b6-b05c-b0dbfd826bcb`

### Plan
Crear una migración SQL que inserte una fila en `user_roles` asignándole el rol `admin` a este usuario.

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('29ebf269-79d8-45b6-b05c-b0dbfd826bcb', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

Uso `ON CONFLICT DO NOTHING` por seguridad, en caso de que el rol ya exista.

### Después de aprobar
Una vez aplicada la migración, vas a poder:
1. Hacer login en `/auth` con tu cuenta alejonm30@gmail.com
2. El hook `useAuth` detectará `isAdmin = true`
3. Las políticas RLS te permitirán crear/editar/borrar categorías, herramientas y site_settings

### Próximo paso recomendado
Todavía no existe una UI de admin. Después de promoverte, lo lógico es construir un panel en `/admin` con formularios para gestionar el contenido.
