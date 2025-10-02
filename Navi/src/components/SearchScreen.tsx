import React, { useState } from 'react';
import { Search, Link2, Sparkles } from 'lucide-react';
import { SmartphoneHeartIcon } from './icons/SmartphoneHeartIcon';
import { PlayCircleIcon } from './icons/PlayCircleIcon';
import { WebSafetyIcon } from './icons/WebSafetyIcon';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ContentSafetyCard } from './ContentSafetyCard';
import { SafetyMeter } from './SafetyMeter';
import newIcon from 'figma:asset/debeae6d3590cb20ea22dd8c31d08728f16de97b.png';

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedResult, setExpandedResult] = useState<number | null>(null);

  // Mock data for demonstration
  const mockResults = [
    {
      title: "TikTok",
      description: "Aplicación de videos cortos muy popular entre adolescentes. Contiene una gran variedad de contenido generado por usuarios.",
      riskLevel: "caution" as const,
      contentType: "Aplicación Social",
      url: "https://tiktok.com",
      reasons: [
        "Contenido no siempre apropiado para menores",
        "Interacciones con desconocidos posibles",
        "Tiempo de pantalla puede ser excesivo"
      ]
    },
    {
      title: "Instagram",
      description: "Red social para compartir fotos y videos. Popular entre adolescentes y adultos jóvenes.",
      riskLevel: "caution" as const,
      contentType: "Red Social",
      url: "https://instagram.com",
      reasons: [
        "Exposición a contenido inapropiado",
        "Presión social y comparaciones",
        "Riesgo de contacto con desconocidos"
      ]
    },
    {
      title: "Khan Academy Kids",
      description: "Aplicación educativa diseñada específicamente para niños con contenido de aprendizaje interactivo y seguro.",
      riskLevel: "safe" as const,
      contentType: "Aplicación Educativa",
      url: "https://khanacademykids.org",
      reasons: [
        "Contenido educativo de alta calidad",
        "Sin anuncios o compras dentro de la app",
        "Apropiado para todas las edades"
      ]
    },
    {
      title: "Minecraft",
      description: "Juego de construcción y aventuras que permite creatividad ilimitada. Muy popular entre niños y jóvenes.",
      riskLevel: "safe" as const,
      contentType: "Videojuego",
      url: "https://minecraft.net",
      reasons: [
        "Fomenta la creatividad y resolución de problemas",
        "Modo offline disponible",
        "Contenido apropiado para todas las edades"
      ]
    },
    {
      title: "Roblox",
      description: "Plataforma de juegos en línea donde los usuarios pueden crear y jugar juegos creados por otros usuarios.",
      riskLevel: "caution" as const,
      contentType: "Plataforma de Juegos",
      url: "https://roblox.com",
      reasons: [
        "Interacción con desconocidos en línea",
        "Contenido variable creado por usuarios",
        "Compras dentro de la plataforma"
      ]
    },
    {
      title: "YouTube Kids",
      description: "Versión de YouTube diseñada específicamente para niños con controles parentales mejorados.",
      riskLevel: "safe" as const,
      contentType: "Plataforma de Video",
      url: "https://youtubekids.com",
      reasons: [
        "Contenido curado para niños",
        "Controles parentales robustos",
        "Sin comentarios públicos"
      ]
    },
    {
      title: "YouTube",
      description: "Plataforma global de videos con contenido muy variado. Requiere supervisión parental para menores.",
      riskLevel: "caution" as const,
      contentType: "Plataforma de Video",
      url: "https://youtube.com",
      reasons: [
        "Contenido no filtrado por defecto",
        "Comentarios públicos sin moderación",
        "Anuncios no siempre apropiados"
      ]
    },
    {
      title: "Discord",
      description: "Plataforma de comunicación por voz, video y texto popular entre gamers y comunidades online.",
      riskLevel: "danger" as const,
      contentType: "Aplicación de Comunicación",
      url: "https://discord.com",
      reasons: [
        "Chat con desconocidos sin filtros",
        "Contenido potencialmente inapropiado",
        "Difícil de supervisar las conversaciones"
      ]
    },
    {
      title: "Duolingo",
      description: "Aplicación para aprender idiomas de forma gamificada y divertida.",
      riskLevel: "safe" as const,
      contentType: "Aplicación Educativa",
      url: "https://duolingo.com",
      reasons: [
        "Contenido educativo de calidad",
        "Interfaz apropiada para niños",
        "Sin interacciones peligrosas"
      ]
    },
    {
      title: "Google",
      description: "Motor de búsqueda más utilizado del mundo. Puede mostrar contenido no filtrado sin configuración parental.",
      riskLevel: "caution" as const,
      contentType: "Sitio Web",
      url: "https://google.com",
      reasons: [
        "Acceso a todo tipo de contenido web",
        "Necesita configuración de búsqueda segura",
        "Requiere supervisión parental"
      ]
    }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let results: any[] = [];
      
      // Check if it's a URL/link
      const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|org|net|edu|gov|mil|int|co|io|app|ly|me|tv|tk|ml|ga|cf))/i;
      const isLink = urlPattern.test(searchQuery);
      
      if (isLink) {
        // Extract platform from URL and find matching app
        let detectedPlatform = '';
        const query = searchQuery.toLowerCase();
        
        if (query.includes('tiktok')) detectedPlatform = 'tiktok';
        else if (query.includes('instagram')) detectedPlatform = 'instagram';
        else if (query.includes('minecraft')) detectedPlatform = 'minecraft';
        else if (query.includes('youtube')) detectedPlatform = 'youtube';
        else if (query.includes('roblox')) detectedPlatform = 'roblox';
        else if (query.includes('discord')) detectedPlatform = 'discord';
        else if (query.includes('duolingo')) detectedPlatform = 'duolingo';
        else if (query.includes('google')) detectedPlatform = 'google';
        
        if (detectedPlatform) {
          results = mockResults.filter(result => 
            result.title.toLowerCase().includes(detectedPlatform)
          );
        }
        
        if (results.length === 0) {
          results.push({
            title: `Enlace detectado: ${searchQuery}`,
            description: "Hemos detectado que pegaste un enlace. Te recomendamos revisar cuidadosamente el contenido antes de permitir acceso a tus hijos.",
            riskLevel: "caution" as const,
            contentType: "Enlace Web",
            url: searchQuery,
            reasons: [
              "Enlace externo no verificado",
              "Se recomienda supervisión parental",
              "Verificar contenido antes del acceso"
            ]
          });
        }
      } else {
        // Regular search
        results = mockResults.filter(result => 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (results.length === 0) {
          // Show default result for unknown searches
          results.push({
            title: searchQuery,
            description: "No pudimos encontrar información específica sobre este contenido. Te recomendamos investigar más antes de permitir su uso.",
            riskLevel: "caution" as const,
            contentType: "Contenido Desconocido",
            reasons: [
              "Información limitada disponible",
              "Se recomienda investigación adicional",
              "Proceder con precaución"
            ]
          });
        }
      }
      
      setSearchResults(results);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickSearch = (category: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let results: any[] = [];
      
      switch (category) {
        case 'apps':
          // Apps populares: tiktok, instagram, roblox, minecraft, duolingo
          results = mockResults.filter(result => 
            ['tiktok', 'instagram', 'roblox', 'minecraft', 'duolingo'].some(app =>
              result.title.toLowerCase().includes(app)
            )
          );
          break;
        case 'video':
          // Plataformas de video: discord, youtube kids
          results = mockResults.filter(result => 
            ['discord', 'youtube'].some(platform =>
              result.title.toLowerCase().includes(platform)
            )
          );
          break;
        case 'web':
          // Sitios web: youtube, google
          results = mockResults.filter(result => 
            ['youtube', 'google'].some(site =>
              result.title.toLowerCase().includes(site)
            )
          );
          break;
      }
      
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };

  const quickSearches = [
    { 
      icon: SmartphoneHeartIcon, 
      label: "Apps populares", 
      category: "apps",
      bgColor: "#e592be",
      textColor: "#af1575"
    },
    { 
      icon: PlayCircleIcon, 
      label: "Plataformas de video", 
      category: "video",
      bgColor: "#ea5730",
      textColor: "#8e1100"
    },
    { 
      icon: WebSafetyIcon, 
      label: "Sitios web", 
      category: "web",
      bgColor: "#fbbb05",
      textColor: "#a55302"
    }
  ];

  return (
    <div className="pb-20 px-4 bg-gradient-to-b from-white to-blue-50/30">
      {/* Header */}
      <div className="py-8 mb-8 text-center">
        <img 
          src={newIcon} 
          alt="Verificar contenido"
          className="w-20 h-20 object-contain mb-4 mx-auto"
        />
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#5c509d' }}>Verificar Contenido</h1>
        <p className="max-w-sm mx-auto leading-relaxed" style={{ color: '#606060' }}>
          Busca aplicaciones, videos, sitios web o pega un enlace para conocer su nivel de seguridad
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                placeholder="Buscar app, video, sitio web o pegar enlace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="text-base h-14 rounded-2xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
              className="h-14 px-8 rounded-2xl bg-transparent hover:bg-transparent border-0 shadow-none"
            >
              <Search className="w-8 h-8" style={{ color: '#b9b1d9', strokeWidth: 3 }} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Searches */}
      {!searchResults.length && (
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Sparkles className="w-5 h-5 mr-2" style={{ color: '#5c509d' }} />
            <h3 className="text-xl font-semibold" style={{ color: '#5c509d' }}>Búsquedas rápidas</h3>
          </div>
          <div className="space-y-3">
            {quickSearches.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg border-0"
                  style={{ backgroundColor: item.bgColor }}
                  onClick={() => handleQuickSearch(item.category)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-white/25 backdrop-blur rounded-xl mr-4">
                        <IconComponent className="w-6 h-6" color={item.textColor} />
                      </div>
                      <span className="font-medium text-lg" style={{ color: item.textColor }}>
                        {item.label}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <Card className="shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <p className="font-medium" style={{ color: '#5c509d' }}>Analizando contenido...</p>
              <p className="text-sm mt-1" style={{ color: '#606060' }}>Esto puede tomar unos segundos</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && !isLoading && (
        <div>
          {/* Fixed Safety Meter Preview */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg mb-6 border border-gray-100">
            <div className="text-center">
              <p className="text-sm font-medium mb-3" style={{ color: '#5c509d' }}>
                Vista previa del nivel de seguridad
              </p>
              <SafetyMeter level={searchResults[0]?.riskLevel || 'caution'} size="md" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-2" style={{ color: '#5c509d' }} />
              <h3 className="text-xl font-semibold" style={{ color: '#5c509d' }}>Resultados de búsqueda</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchResults([]);
                setSearchQuery('');
                setExpandedResult(null);
              }}
              style={{ color: '#5c509d', borderColor: '#5c509d' }}
              className="hover:bg-blue-50"
            >
              Nueva búsqueda
            </Button>
          </div>
          {searchResults.map((result, index) => (
            <ContentSafetyCard
              key={index}
              title={result.title}
              description={result.description}
              riskLevel={result.riskLevel}
              contentType={result.contentType}
              url={result.url}
              reasons={result.reasons}
              isExpanded={expandedResult === index}
              onToggleExpand={() => setExpandedResult(expandedResult === index ? null : index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}