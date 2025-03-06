const Footer = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-screen-xl mt-10">

        <div className="flex flex-col gap-8 py-16 px-5 lg:flex-row  lg:gap-56">
          {/*Vinted*/}
          <div className="flex flex-col gap-3">
            <span className="footerTitle">VendTout</span>
            <span className="footerLink">À propos de VendTout</span>
            <span className="footerLink">Carrière</span>
            <span className="footerLink">Le développement durable</span>
            <span className="footerLink">Presse</span>
            <span className="footerLink">Publicités</span>
          </div>

          {/* Découvrir */}
          <div className="flex flex-col gap-3">
            <span className="footerTitle">Découvrir</span>
            <span className="footerLink">Comment ça marche ?</span>
            <span className="footerLink">Vérification de l&apos;article</span>
            <span className="footerLink">Applications mobiles</span>
            <span className="footerLink">Tableau de bord</span>
            <span className="footerLink">VendTout Pro</span>
            <span className="footerLink">Guide VendTout Pro</span>
          </div>

          {/* Aide */}
          <div className="flex flex-col gap-3">
            <span className="footerTitle">Centre d&apos;aide</span>
            <span className="footerLink">Vendre</span>
            <span className="footerLink">Acheter</span>
            <span className="footerLink">Confiance et sécurité</span>
          </div>
        </div>

        <div className="w-full px-6 py-10 border-t border-b border-gray-200 flex justify-between items-center">
          <div className="flex gap-6">
            <img src="/images/facebook.svg" className="cursor-pointer"></img>
            <img src="/images/linkedin.svg" className="cursor-pointer"></img>
            <img src="/images/instagram.svg" className="cursor-pointer"></img>
          </div>
          <div className="flex gap-6">
            <img src="/images/appstore.svg" className="cursor-pointer"></img>
            <img src="/images/googleplay.svg" className="cursor-pointer"></img>
          </div>
        </div>

        <div className="w-full h-24 p-6 flex gap-6 flex-wrap">
          <span className="footerLink">Politique de condidentialité</span>
          <span className="footerLink">Politique de cookies</span>
          <span className="footerLink">Paramètres de cookies</span>
          <span className="footerLink">Termes et Conditions</span>
          <span className="footerLink">Notre plateforme</span>
          <span className="footerLink">Termes et conditions de VendTout Pro</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
