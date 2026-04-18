

Plan: agregar flujo "olvidé mi contraseña".

## Cambios

1. **`src/pages/Auth.tsx`**: agregar enlace "¿Olvidaste tu contraseña?" debajo del formulario de login que abre un diálogo (Dialog) con un input de email y botón "Enviar enlace". Llama a `supabase.auth.resetPasswordForEmail(email, { redirectTo: ${window.location.origin}/reset-password })` y muestra toast de confirmación.

2. **`src/pages/ResetPassword.tsx`** (nuevo): página pública con formulario de nueva contraseña + confirmación. 
   - Detecta el evento `PASSWORD_RECOVERY` vía `supabase.auth.onAuthStateChange` (Supabase procesa automáticamente el token del hash de la URL).
   - Si no hay sesión de recovery, muestra mensaje "Enlace inválido o expirado" con link a `/auth`.
   - Al enviar, llama a `supabase.auth.updateUser({ password })`, muestra toast y redirige a `/`.
   - Valida que las dos contraseñas coincidan y mínimo 6 caracteres.

3. **`src/App.tsx`**: registrar la ruta `/reset-password` antes de la catch-all.

## Notas técnicas

- La URL de reset debe estar en la lista de Redirect URLs permitidas. Lovable Cloud por defecto acepta el origin del preview, así que debería funcionar sin config extra.
- Los emails de auth usarán las plantillas por defecto de Lovable (no hace falta configurar dominio personalizado para que funcione).
- El usuario `alejonm30@gmail.com` recibirá el email en esa casilla.

