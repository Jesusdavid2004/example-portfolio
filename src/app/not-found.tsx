export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center text-white p-6">
      <div className="bg-foreground rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
        <p>La ruta o el idioma no existen.</p>
      </div>
    </div>
  );
}
