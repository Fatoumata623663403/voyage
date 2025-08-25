import React from "react";

import { useState } from "react";
import { Link,useNavigate }  from "react-router-dom";
import { Eye, EyeOff, Globe, Mail, Lock } from "lucide-react";



interface Login{
  email: string;
  password: string;
  agreeToTerms: boolean;
}





export default function Login() {
  
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    const navigate = useNavigate();
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", formData);
     
     try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Connexion réussie ✅");
      localStorage.setItem("token", data.token); // si ton backend renvoie un token
      navigate("/home"); // redirection vers la page d'accueil
    } else {
      alert(data.message || "Échec de la connexion ❌");
    }
  } catch (error) {
    console.error("Erreur serveur :", error);
    alert("Impossible de se connecter au serveur 🚨");
  }
    
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easy-Trip
                </span>
           
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Bon retour parmi nous
          </h2>
          <p className="mt-2 text-gray-600">
            Connectez-vous à votre compte pour continuer vos aventures
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
           <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  required
                  />

                  
                  <span className="ml-2 text-sm text-gray-600">
                    Se souvenir de moi
                  </span>
                </label>
                <p
                 
                  className="text-sm text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </p>
              </div>

              <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
               >
                Se connecter
              </button>

              
            </form>

            <p className="my-6" />

            {/* Social Login */}
            <div className="space-y-3">
              <button  className="w-full py-2 px-4 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 bg-blue-50  transition ">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuer avec Google
              </button>

              <button  className="w-full py-2 px-4 border rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 bg-blue-50 transition">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuer avec Facebook
              </button>
            </div>

            <a className="mt-6 text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              
              
            </a>
             <button className="text-blue-500 hover:underline font-medium">
                Créer un compte
                
              </button>
            {/* Exemple d'utilisation de Link */}
   
         </div>
      </div>
    </div>
  );
}

