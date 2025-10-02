import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { NewsScreen } from './components/NewsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LoginScreen } from './components/LoginScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [previousSection, setPreviousSection] = useState('home');

  const handleLogin = (email: string, password: string) => {
    // En una app real, aquí verificarías las credenciales
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection('home');
  };

  const handleSectionChange = (section: string) => {
    if (section !== activeSection) {
      setPreviousSection(activeSection);
      setActiveSection(section);
    }
  };

  const handleBackToSection = (targetSection?: string) => {
    const sectionToNavigateTo = targetSection || previousSection;
    setActiveSection(sectionToNavigateTo);
    if (targetSection) {
      setPreviousSection('home');
    }
  };

  // Si no está logueado, mostrar pantalla de login
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderActiveScreen = () => {
    switch (activeSection) {
      case 'home':
        return <HomeScreen onSectionChange={handleSectionChange} onNewsClick={(article) => {
          setSelectedArticle(article);
          setPreviousSection('home');
          setActiveSection('news');
        }} />;
      case 'search':
        return <SearchScreen />;
      case 'community':
        return <CommunityScreen 
          onSectionChange={handleSectionChange}
          onNewsClick={(article) => {
            setSelectedArticle(article);
            setPreviousSection('community');
            setActiveSection('news');
          }}
        />;
      case 'profile':
        return <ProfileScreen onBack={() => handleBackToSection('home')} onLogout={handleLogout} />;
      case 'news':
        return <NewsScreen 
          onBack={() => {
            setSelectedArticle(null);
            handleBackToSection();
          }} 
          selectedArticle={selectedArticle}
          onArticleSelect={(article) => setSelectedArticle(article)}
        />;
      default:
        return <HomeScreen onSectionChange={handleSectionChange} onNewsClick={(article) => {
          setSelectedArticle(article);
          setPreviousSection('home');
          setActiveSection('news');
        }} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-md mx-auto bg-white/40 backdrop-blur-sm min-h-screen shadow-2xl border-x border-white/20">
          {renderActiveScreen()}
          <Navigation 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange} 
          />
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}