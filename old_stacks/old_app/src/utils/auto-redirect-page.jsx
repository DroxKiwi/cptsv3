
export default function AutoRedirectPage() {  
  return (
    <div id="error-page" className="w-screen h-screen grid place-content-center">
      <h1>Chargement ...</h1>
      <p>Si vous n'êtes pas automatiquement redirigé dans quelques instants, cliquez ici</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}