import React from 'react';
import { X, ShieldCheck, FileText, HelpCircle, Smartphone } from 'lucide-react';

interface InfoModalProps {
  type: 'terms' | 'drm' | 'support' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            {type === 'terms' && <FileText className="w-5 h-5 text-[#00236f]" />}
            {type === 'drm' && <ShieldCheck className="w-5 h-5 text-[#0051d5]" />}
            {type === 'support' && <HelpCircle className="w-5 h-5 text-[#00236f]" />}
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f]">
              {type === 'terms' && "Conditions générales d'utilisation"}
              {type === 'drm' && "Dispositif technique de protection des droits (DRM)"}
              {type === 'support' && "Assistance technique Mobile Money"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#444651] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3 font-['Inter'] text-xs text-[#444651] leading-relaxed">
          {type === 'terms' && (
            <>
              <p>
                <strong>MemoFAC</strong> est un portail SaaS académique dédié à l'hébergement et à la consultation sécurisée de résumés, méthodologies et corrigés universitaires pour l'enseignement supérieur francophone.
              </p>
              <p>
                Les documents sont consultables exclusivement au sein de l'environnement in-browser de la plateforme afin de préserver l'intégrité de la propriété intellectuelle des auteurs et des enseignants.
              </p>
              <p>
                Tout auteur publiant sur MemoFAC conserve l'intégralité de ses droits moraux et perçoit 80% des sommes versées par transaction via reversement direct Mobile Money.
              </p>
            </>
          )}

          {type === 'drm' && (
            <>
              <div className="p-3 rounded-xl bg-[#eaedff] text-[#00174b] flex items-center gap-2.5 border border-[#dbe1ff]">
                <ShieldCheck className="w-5 h-5 text-[#0051d5] shrink-0" />
                <span className="font-bold">Dispositif anti-captation et traçabilité nominative</span>
              </div>
              <p>
                Chaque page de document affichée dans le lecteur intègre un filigrane numérique individuel comprenant :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>L'identité officielle de l'étudiant connecté</li>
                <li>Le numéro de téléphone associé à la transaction</li>
                <li>L'identifiant d'autorisation horodaté</li>
              </ul>
              <p>
                Toute reproduction non autorisée ou diffusion illicite fait l'objet d'une traçabilité documentaire immédiate conformément à la législation sur les droits d'auteur.
              </p>
            </>
          )}

          {type === 'support' && (
            <>
              <p>
                Le protocole de paiement s'effectue par déclenchement d'un push USSD directement auprès de votre opérateur téléphonique (Wave, Orange Money, MTN MoMo, Moov Money).
              </p>
              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-1.5">
                <span className="font-bold text-[#00236f]">Contact d'assistance technique :</span>
                <span className="text-sm font-bold text-[#0051d5]">+225 07 00 12 34 56</span>
                <span className="text-[11px] text-[#757682]">Permanence technique universitaire disponible du lundi au samedi.</span>
              </div>
              <p>
                En cas de latence de l'opérateur téléphonique, vérifiez la réception du prompt USSD ou effectuez manuellement la vérification de votre solde via le code dédié de votre opérateur.
              </p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 rounded-xl bg-[#00236f] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-[#1e3a8a] transition-colors mt-2"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};
