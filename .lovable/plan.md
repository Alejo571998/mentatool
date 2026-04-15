

## Plan: Botón de edición protegido con contraseña simple

### Cómo funcionará
- Un botón discreto (ícono de engranaje) en el header
- Al clickearlo, aparece un diálogo pidiendo una contraseña
- Si la contraseña es correcta, se activa el modo edición con todos los controles CRUD
- La contraseña se valida en un edge function del backend para que no quede expuesta en el código del navegador

### Pasos técnicos

1. **Crear un secret** para almacenar la contraseña de admin (ej: `ADMIN_PASSWORD`)

2. **Crear edge function `verify-admin`** que reciba la contraseña, la compare con el secret, y devuelva `{ valid: true/false }`

3. **Modificar `src/pages/Index.tsx`**:
   - Agregar botón de engranaje (Settings icon) en el header
   - Crear diálogo con input de contraseña
   - Al verificar correctamente, activar `editMode`
   - Mostrar los controles de edición (añadir/editar/eliminar categorías y herramientas) solo en modo edición

4. **Agregar página/panel de personalización** (colores e imágenes):
   - Crear tabla `site_settings` en la base de datos para guardar configuraciones de colores e imágenes
   - Crear un panel accesible solo en modo edición para cambiar colores de fondo, colores primarios, y las imágenes/logos
   - Los cambios se guardan en la base de datos y se aplican al cargar la página

### Seguridad
- La contraseña nunca se expone en el frontend
- La validación ocurre server-side en el edge function
- Las RLS de `site_settings` permitirán lectura pública pero escritura solo validando la contraseña (o escritura pública como las demás tablas, dado que el acceso al modo edición ya está protegido)

