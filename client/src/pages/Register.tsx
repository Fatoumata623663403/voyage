import React, { useState } from "react";

import { Eye, EyeOff, Globe, Mail, Lock, User } from "lucide-react";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration attempt:", formData);
    // Ici tu peux ajouter ton appel API pour registration
     try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Compte créé avec succès ✅");
      // Ici tu peux rediriger vers la page de login
      // navigate("/login");
    } else {
      alert(data.message || "Erreur lors de la création du compte ❌");
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
    alert("Impossible de se connecter au serveur 🚨");
  }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo et header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
           
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easy-Trip
                </span>      
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Rejoignez l'aventure</h2>
          <p className="mt-2 text-gray-600">Créez votre compte et commencez à explorer le monde</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nom"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div>
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 mt-1"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  required
                />
                <span className="text-sm text-gray-600">
                  J'accepte les{" "}
                  <p className="text-blue-500 hover:underline">conditions d'utilisation</p> et la{" "}
                  <p className="text-blue-500 hover:underline">politique de confidentialité</p>
                </span>
              </label>
            </div>

            {/* Bouton Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Créer mon compte
            </button>
          </form>

          <div className="my-6 border-t border-gray-200"></div>

          {/* Social Registration */}
          <div className="space-y-3">
            <button className="w-full py-2 px-4 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 bg-blue-50 transition">
              S'inscrire avec Google
            </button>
            <button className="w-full py-2 px-4 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 bg-blue-50 transition">
              S'inscrire avec Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Déjà un compte ?{" "}
            <p className="text-blue-500 hover:underline font-medium">
              Se connecter
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}
