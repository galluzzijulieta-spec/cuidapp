import React, { useState } from 'react';
import { Plus, Filter, TrendingUp, Users, Bookmark, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ForumPost } from './ForumPost';
import { CreatePostModal } from './CreatePostModal';

interface CommunityScreenProps {
  onSectionChange?: (section: string) => void;
  onNewsClick?: (article: any) => void;
}

export function CommunityScreen({ onSectionChange, onNewsClick }: CommunityScreenProps = {}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: '¿Es seguro dejar que mi hijo de 10 años use Minecraft?',
      content: 'Mi hijo quiere jugar Minecraft con sus amigos de la escuela. He escuchado que es educativo, pero también me preocupan los chats online. ¿Alguien tiene experiencia con esto?',
      author: 'María González',
      timestamp: 'Hace 2 horas',
      category: 'pregunta' as const,
      likes: 12,
      replies: 8,
      isLiked: false
    },
    {
      id: '2',
      title: '⚠️ CUIDADO con la app "Chat Random"',
      content: 'Encontré esta aplicación en el teléfono de mi hija adolescente. Permite chatear con extraños aleatoriamente y tiene contenido muy inapropiado. Por favor revisen los teléfonos de sus hijos.',
      author: 'Carlos Ruiz',
      timestamp: 'Hace 5 horas',
      category: 'alerta' as const,
      likes: 45,
      replies: 23,
      isLiked: true
    },
    {
      id: '3',
      title: 'Excelentes apps educativas que he probado con mis hijos',
      content: 'Quería compartir algunas aplicaciones que han funcionado muy bien: Khan Academy Kids (gratis y sin anuncios), Duolingo Kids para idiomas, y ScratchJr para programación básica. Todas son seguras y educativas.',
      author: 'Ana Martínez',
      timestamp: 'Hace 1 día',
      category: 'discusion' as const,
      likes: 34,
      replies: 15,
      isLiked: false
    },
    {
      id: '4',
      title: '¿Cómo configurar controles parentales en el router de casa?',
      content: 'Estoy buscando maneras de controlar el acceso a internet desde casa durante ciertas horas. ¿Alguien sabe cómo configurar esto en el router? Mi proveedor es Movistar.',
      author: 'Roberto Silva',
      timestamp: 'Hace 2 días',
      category: 'pregunta' as const,
      likes: 18,
      replies: 12,
      isLiked: false
    },
    {
      id: '5',
      title: 'Mi experiencia con el tiempo de pantalla y reglas familiares',
      content: 'Después de muchos intentos, logramos establecer reglas claras sobre el tiempo de pantalla. Lo que funcionó fue crear un horario visual y premios por cumplirlo. Comparto nuestras estrategias...',
      author: 'Lucia Fernández',
      timestamp: 'Hace 3 días',
      category: 'discusion' as const,
      likes: 67,
      replies: 29,
      isLiked: false
    }
  ]);

  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'pregunta', label: 'Preguntas' },
    { id: 'alerta', label: 'Alertas' },
    { id: 'discusion', label: 'Discusión' }
  ];

  const filteredPosts = showSavedOnly 
    ? posts.filter(post => savedPosts.includes(post.id))
    : activeFilter === 'all' 
      ? posts 
      : posts.filter(post => post.category === activeFilter);

  const handleCreatePost = (newPost: any) => {
    const postWithId = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      replies: 0,
      isLiked: false
    };
    setPosts([postWithId, ...posts]);
  };

  const handleUpdatePost = (postId: string, updates: any) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const handleReportPost = (postId: string) => {
    // En una app real, aquí se enviaría la denuncia al backend
    console.log('Publicación denunciada:', postId);
  };

  const toggleSavedPost = (postId: string) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="pb-20 px-4 bg-gradient-to-b from-white to-green-50/30">
      {/* Header */}
      <div className="py-6 mb-6">
        <div className="flex flex-col items-start">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg" style={{ backgroundColor: '#ea5730' }}>
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#5c509d' }}>Comunidad de Padres</h1>
          <p className="max-w-sm leading-relaxed" style={{ color: '#606060' }}>
            Comparte experiencias, haz preguntas y ayuda a otros padres
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {/* Nueva Publicación Button */}
        <Card 
          className="cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg border-0"
          style={{ backgroundColor: '#f8b87f' }}
          onClick={() => setIsCreatePostModalOpen(true)}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" style={{ color: '#e87e28' }} strokeWidth={2.5} />
              <span className="font-bold text-sm" style={{ color: '#e87e28' }}>Nueva publicación</span>
            </div>
          </CardContent>
        </Card>

        {/* Guardados Button */}
        <Card 
          className="cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg border-0"
          style={{ backgroundColor: '#dbb7d8' }}
          onClick={() => {
            setShowSavedOnly(!showSavedOnly);
            if (!showSavedOnly) setActiveFilter('all');
          }}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-center">
              <Bookmark className={`w-5 h-5 mr-2 ${showSavedOnly ? 'fill-current' : ''}`} style={{ color: '#ad63aa' }} strokeWidth={2.5} />
              <span className="font-bold text-sm" style={{ color: '#ad63aa' }}>Guardados</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      {!showSavedOnly && (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2" style={{ color: '#606060' }} />
            <span className="font-medium" style={{ color: '#606060' }}>Filtrar por:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'text-white shadow-lg' 
                    : 'bg-white/80 hover:bg-blue-50'
                }`}
                style={activeFilter === filter.id 
                  ? { backgroundColor: '#5c509d' }
                  : { color: '#5c509d', borderColor: '#5c509d' }
                }
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Popular Topics */}
      {!showSavedOnly && (
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#606060' }} />
            <span className="font-medium" style={{ color: '#606060' }}>Temas populares hoy</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Control Parental', 'TikTok', 'Roblox', 'Tiempo de Pantalla', 'Apps Educativas'].map((topic) => {
              const topicArticles = {
                'Control Parental': {
                  title: "Guía completa de controles parentales en 2025",
                  summary: "Todo lo que necesitas saber sobre configurar controles parentales efectivos en dispositivos y aplicaciones para proteger a tus hijos en línea.",
                  date: "20 Sep 2025"
                },
                'TikTok': {
                  title: "TikTok y adolescentes: Riesgos y medidas de seguridad",
                  summary: "Análisis detallado de los riesgos de TikTok para menores y cómo configurar la aplicación de manera segura.",
                  date: "18 Sep 2025"
                },
                'Roblox': {
                  title: "Roblox: ¿Es seguro para niños? Guía para padres",
                  summary: "Evaluación completa de la plataforma Roblox, sus riesgos potenciales y cómo supervisar el juego de manera efectiva.",
                  date: "16 Sep 2025"
                },
                'Tiempo de Pantalla': {
                  title: "Gestión saludable del tiempo de pantalla en la familia",
                  summary: "Estrategias respaldadas por expertos para establecer límites saludables de tiempo de pantalla para niños y adolescentes.",
                  date: "14 Sep 2025"
                },
                'Apps Educativas': {
                  title: "Las mejores apps educativas verificadas por CuidApp",
                  summary: "Selección curada de aplicaciones educativas seguras y efectivas, evaluadas por nuestro equipo de expertos.",
                  date: "12 Sep 2025"
                }
              };
              
              return (
                <Badge 
                  key={topic} 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:scale-105 transition-transform duration-200"
                  style={{ backgroundColor: '#fdf9d7', color: '#a3984a' }}
                  onClick={() => {
                    if (onNewsClick && topicArticles[topic as keyof typeof topicArticles]) {
                      onNewsClick(topicArticles[topic as keyof typeof topicArticles]);
                    }
                  }}
                >
                  {topic}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Forum Posts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: '#5c509d' }}>
            {showSavedOnly ? 'Posts Guardados' : activeFilter === 'all' ? 'Todas las publicaciones' : `${filters.find(f => f.id === activeFilter)?.label}`}
            <span className="ml-2 font-normal" style={{ color: '#606060' }}>({filteredPosts.length})</span>
          </h3>
          {showSavedOnly && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSavedOnly(false)}
              style={{ color: '#5c509d', borderColor: '#5c509d' }}
              className="hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          )}
        </div>
        
        {filteredPosts.map((post) => (
          <div key={post.id} className="relative">
            <ForumPost
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              timestamp={post.timestamp}
              category={post.category}
              likes={post.likes}
              replies={post.replies}
              isLiked={post.isLiked}
              savedPosts={savedPosts}
              onToggleSave={toggleSavedPost}
              onDelete={handleDeletePost}
              onReport={handleReportPost}
            />
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}