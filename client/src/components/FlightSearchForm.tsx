import { PlaneTakeoff, PlaneLanding, CalendarDays, User } from 'lucide-react';
import React, { useState } from 'react';
import { Flight } from '../types';
import { mockFlights } from '../utils/mockData';
import { Plane, Clock, MapPin, Users, Heart, Filter, Wifi, Utensils, Monitor, ChevronDown, ChevronUp, Star, Shield } from 'lucide-react';



 function FlightSearchForm() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl mx-auto mt-6">
      {/* Choix du type de voyage */}
      <div className="flex space-x-4 mb-4 text-sm font-medium text-gray-700">
        <label className="flex items-center space-x-2">
          <input type="radio" name="tripType" defaultChecked className="accent-blue-600" />
          <span>Aller-retour</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="tripType" className="accent-blue-600" />
          <span>Aller simple</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="tripType" className="accent-blue-600" />
          <span>Multi-destinations</span>
        </label>
      </div>

      {/* Lignes des champs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Départ */}
        <div className="relative">
          <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ville ou aéroport de départ"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Arrivée */}
        <div className="relative">
          <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ville ou aéroport d'arrivée"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Dates + passager + classe */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>1 passager</option>
            <option>2 passagers</option>
            <option>3 passagers</option>
          </select>
        </div>

        <div>
          <select className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Économique</option>
            <option>Business</option>
            <option>Première classe</option>
          </select>
        </div>
      </div>

      {/* Destinations populaires */}
      <div className="mb-6 text-sm text-gray-600">
        Destinations populaires :
        <div className="flex flex-wrap gap-2 mt-2">
          {["Paris", "Londres", "New York", "Tokyo", "Rome", "Barcelone", "Amsterdam", "Berlin"].map((city) => (
            <span key={city} className="px-3 py-1 bg-gray-100 rounded-full border text-gray-700 cursor-pointer hover:bg-gray-200">
              {city}
            </span>
          ))}
        </div>
      </div>
          {/* Bouton */}
      <div className="text-center">
        <button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:opacity-90 transition">
          🔍 RechercheR
        </button>
      </div>
      
    </div>
  );
};

export default FlightSearchForm;