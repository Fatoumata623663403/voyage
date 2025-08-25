import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard
} from "lucide-react";

interface FooterProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  onFooterToggle: () => void;
}

const Footer: React.FC<FooterProps> = ({
  activeSection,
  setActiveSection,
  onFooterToggle,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Branding / Logo */}
        <div>
          <div className="flex items-center mb-3">
             <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easy-Trip
                </span>
            
          </div>
          <p className="text-gray-400 text-sm">
            Explorez le monde avec nous. Votre partenaire de voyage de confiance.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><button className="hover:underline" onClick={() => setActiveSection("about")}>À propos</button></li>
            <li><button className="hover:underline" onClick={() => setActiveSection("careers")}>Carrières</button></li>
            <li><button className="hover:underline" onClick={() => setActiveSection("press")}>Presse</button></li>
            <li><button className="hover:underline" onClick={() => setActiveSection("blog")}>Blog</button></li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><button className="hover:underline" onClick={() => setActiveSection("faq")}>FAQ / Centre d’aide</button></li>
            <li><button className="hover:underline" onClick={() => setActiveSection("contact")}>Contact</button></li>
            <li><button className="hover:underline" onClick={() => setActiveSection("terms")}>Conditions</button></li>
            <li><button className="hover:underline" onClick={() => setActiveSection("privacy")}>Politique de confidentialité</button></li>
          </ul>
        </div>

        {/* Voyages / Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Voyages</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Destinations populaires</li>
            <li>Guides de voyage</li>
            <li>Offres spéciales</li>
            <li>Last minute / Promotions</li>
          </ul>

          {/* Newsletter */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-2">Recevez nos offres et conseils voyage.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="p-2 rounded-l border-none flex-1 text-black"
              />
              <button className="  bg-gradient-to-r from-blue-600 bg-yellow-500 hover:bg-yellow-600 px-4 rounded-r text-black font-semibold">
                S’inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Contact & Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16}/> Conakry, Guinée</li>
            <li className="flex items-center gap-2"><Phone size={16}/> +224 623 66 34 03</li>
            <li className="flex items-center gap-2"><Mail size={16}/> bahfatoumatadiariou461@gmail.com</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-yellow-400"><Facebook /></a>
            <a href="#" className="hover:text-yellow-400"><Twitter /></a>
            <a href="#" className="hover:text-yellow-400"><Instagram /></a>
            <a href="#" className="hover:text-yellow-400"><Linkedin /></a>
          </div>

          {/* Paiements */}
          <div className="flex items-center gap-2 mt-6 text-gray-400">
            <CreditCard size={16}/> Visa / MasterCard / PayPal
          </div>
        </div>

      </div>

      {/* Bas du footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-2">
        <p>© {currentYear} 2025 Easy-Trip. Tous droits réservés.</p>
        <p>Créer par Fatima. Fait avec ❤️ pour les voyageurs</p>
        <button
          onClick={(e) => { e.stopPropagation(); onFooterToggle(); }}
          className="bg-gradient-to-r from-blue-600 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
        >
          Toggle Footer
        </button>
      </div>
    </footer>
  );
};

export default Footer;
