import { useRouteError } from "react-router-dom";
import { Button } from "primereact/button";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="w-screen h-screen grid place-content-center">
      <h1>Oops!</h1>
      <p>Une erreur est survenue.</p>
      <p>Tentez de recharger la page ! si l'erreur persiste réessayez ultérieurement.</p>
      <Button label="Recharger" onClick={() => window.location.reload()} />
    </div>
  );
}