import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
  Switch,
  Dimensions,
  Modal,
  StatusBar
} from 'react-native';

// Configuración de la API de TMDB
const TMDB_API_KEY = 'c48b534753847572879d97e2fb6f318d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const { width, height } = Dimensions.get('window');

// Componente de Splash Screen
const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(() => {
      onFinish();
    }, 3000);
  }, []);

  return (
      <View style={styles.splash}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <View style={styles.splashContent}>
          <Text style={styles.splashIcon}>🎬</Text>
          <Text style={styles.splashTitle}>Busca Películas</Text>
          <Text style={styles.splashSubtitle}>Descubre películas increíbles</Text>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </View>
      </View>
  );
};

// Componente de Detalle de Película
const MovieDetail = ({ movie, onBack }) => {
  const [cast, setCast] = useState([]);
  const [loadingCast, setLoadingCast] = useState(false);

  useEffect(() => {
    fetchCast();
  }, [movie.id]);

  const fetchCast = async () => {
    setLoadingCast(true);
    try {
      const response = await fetch(
          `${TMDB_BASE_URL}/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();
      setCast(data.cast.slice(0, 5)); // Solo primeros 5 actores
    } catch (error) {
      console.error('Error fetching cast:', error);
    } finally {
      setLoadingCast(false);
    }
  };

  const renderRating = (rating) => {
    const stars = Math.round(rating / 2);
    return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
      <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={onBack}
      >
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <ImageBackground
            source={{
              uri: movie.backdrop_path
                  ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
                  : 'https://images.unsplash.com/photo-1489599328109-5a4e4be9e52e'
            }}
            style={styles.background}
            resizeMode="cover"
        >
          <View style={styles.overlay}>
            <ScrollView style={styles.detailContainer}>
              {/* Header con botón de regreso */}
              <View style={styles.detailHeader}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                  <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
              </View>

              {/* Poster y información básica */}
              <View style={styles.movieDetailCard}>
                <View style={styles.posterSection}>
                  <Image
                      source={{
                        uri: movie.poster_path
                            ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                            : 'https://via.placeholder.com/300x450?text=No+Image'
                      }}
                      style={styles.detailPoster}
                      resizeMode="cover"
                  />
                  <View style={styles.detailRatingBadge}>
                    <Text style={styles.detailRatingText}>
                      {movie.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.movieDetailInfo}>
                  <Text style={styles.detailTitle}>{movie.title}</Text>
                  <Text style={styles.detailYear}>
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Año no disponible'}
                  </Text>
                  <View style={styles.detailRatingContainer}>
                    <Text style={styles.detailRatingStars}>
                      {renderRating(movie.vote_average)}
                    </Text>
                    <Text style={styles.detailVotes}>
                      ({movie.vote_count} votos)
                    </Text>
                  </View>
                </View>
              </View>

              {/* Sinopsis */}
              <View style={styles.synopsisCard}>
                <Text style={styles.sectionTitle}>📖 Sinopsis</Text>
                <Text style={styles.synopsisText}>
                  {movie.overview || 'No hay sinopsis disponible'}
                </Text>
              </View>

              {/* Información adicional */}
              <View style={styles.additionalInfoCard}>
                <Text style={styles.sectionTitle}>ℹ️ Información</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Idioma Original:</Text>
                  <Text style={styles.infoValue}>{movie.original_language.toUpperCase()}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Popularidad:</Text>
                  <Text style={styles.infoValue}>{movie.popularity.toFixed(1)}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Fecha de Estreno:</Text>
                  <Text style={styles.infoValue}>
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'No disponible'}
                  </Text>
                </View>
              </View>

              {/* Reparto */}
              <View style={styles.castCard}>
                <Text style={styles.sectionTitle}>🎭 Reparto Principal</Text>
                {loadingCast ? (
                    <ActivityIndicator size="large" color="#FF6B6B" />
                ) : (
                    <FlatList
                        data={cast}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.castItem}>
                              <Image
                                  source={{
                                    uri: item.profile_path
                                        ? `${TMDB_IMAGE_BASE_URL}${item.profile_path}`
                                        : 'https://via.placeholder.com/150x200?text=No+Photo'
                                  }}
                                  style={styles.castImage}
                                  resizeMode="cover"
                              />
                              <Text style={styles.castName} numberOfLines={2}>
                                {item.name}
                              </Text>
                              <Text style={styles.castCharacter} numberOfLines={1}>
                                {item.character}
                              </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </Modal>
  );
};

// Componente de Búsqueda (Pantalla Principal)
const SearchScreen = ({ onMoviePress }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exactSearch, setExactSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMovies = async (query, isExact = false) => {
    if (!query.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de una película');
      return;
    }

    setSearchLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      let url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;

      if (isExact) {
        url += '&include_adult=false&page=1';
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error al conectar con la API');
      }

      const data = await response.json();

      let results = data.results || [];

      if (isExact) {
        results = results.filter(movie =>
            movie.title.toLowerCase() === query.toLowerCase()
        );
      }

      setMovies(results);

      if (results.length === 0) {
        setError('No se encontraron películas con ese nombre');
      }

    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = () => {
    searchMovies(searchQuery, exactSearch);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setMovies([]);
    setError(null);
    setHasSearched(false);
  };

  const renderRating = (rating) => {
    const stars = Math.round(rating / 2);
    return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  const renderMovie = ({ item }) => (
      <TouchableOpacity
          style={styles.movieCard}
          onPress={() => onMoviePress(item)}
          activeOpacity={0.8}
      >
        <View style={styles.posterContainer}>
          <Image
              source={{
                uri: item.poster_path
                    ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
              }}
              style={styles.moviePoster}
              resizeMode="cover"
          />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>
              {item.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.movieYear}>
            {item.release_date ? new Date(item.release_date).getFullYear() : 'Año no disponible'}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              {renderRating(item.vote_average)}
            </Text>
          </View>
          <Text style={styles.movieOverview} numberOfLines={3}>
            {item.overview || 'No hay descripción disponible'}
          </Text>
          <View style={styles.tapHintContainer}>
            <Text style={styles.tapHint}>👆 Toca para ver más detalles</Text>
          </View>
        </View>
      </TouchableOpacity>
  );

  return (
      <ImageBackground
          source={{uri: 'https://images.unsplash.com/photo-1489599328109-5a4e4be9e52e'}}
          style={styles.background}
          resizeMode="cover"
      >
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.75)" translucent />
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerIcon}>🎬</Text>
              <Text style={styles.headerTitle}>Busca Películas</Text>
              <Text style={styles.headerSubtitle}>Encuentra tu próxima película favorita</Text>
            </View>

            {/* Búsqueda */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="¿Qué película buscas?"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                <TouchableOpacity style={styles.searchIconButton} onPress={handleSearch}>
                  <Text style={styles.searchIcon}>🔍</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.switchContainer}>
                <View style={styles.switchLabelContainer}>
                  <Text style={styles.switchLabel}>Búsqueda Exacta</Text>
                  <Text style={styles.switchSubLabel}>
                    {exactSearch ? 'Resultados precisos' : 'Resultados amplios'}
                  </Text>
                </View>
                <Switch
                    value={exactSearch}
                    onValueChange={setExactSearch}
                    trackColor={{ false: '#767577', true: '#FF6B6B' }}
                    thumbColor={exactSearch ? '#ffffff' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.searchButton]}
                    onPress={handleSearch}
                    disabled={searchLoading}
                >
                  <Text style={styles.buttonText}>
                    {searchLoading ? '⏳ Buscando...' : '🔍 Buscar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.clearButton]}
                    onPress={clearSearch}
                >
                  <Text style={styles.buttonText}>🗑️ Limpiar</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Loading */}
            {searchLoading && (
                <View style={styles.searchLoadingContainer}>
                  <ActivityIndicator size="large" color="#FF6B6B" />
                  <Text style={styles.searchLoadingText}>
                    Explorando el universo cinematográfico...
                  </Text>
                </View>
            )}

            {/* Error */}
            {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorIcon}>😔</Text>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {/* Resultados */}
            {!searchLoading && hasSearched && movies.length > 0 && (
                <View style={styles.resultsHeader}>
                  <Text style={styles.resultsIcon}>🎭</Text>
                  <Text style={styles.resultsText}>
                    {movies.length} película{movies.length !== 1 ? 's' : ''} encontrada{movies.length !== 1 ? 's' : ''}
                  </Text>
                </View>
            )}

            {/* Lista de películas */}
            <FlatList
                data={movies}
                renderItem={renderMovie}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                    !searchLoading && hasSearched && !error && (
                        <View style={styles.emptyContainer}>
                          <Text style={styles.emptyIcon}>🎪</Text>
                          <Text style={styles.emptyTitle}>No hay resultados</Text>
                          <Text style={styles.emptyText}>
                            Intenta con otro título o cambia el modo de búsqueda
                          </Text>
                        </View>
                    )
                )}
            />
          </View>
        </View>
      </ImageBackground>
  );
};

// Componente Principal de la App
export default function MovieSearchApp() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSplashFinish = () => {
    setCurrentScreen('search');
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setCurrentScreen('detail');
  };

  const handleBackToSearch = () => {
    setSelectedMovie(null);
    setCurrentScreen('search');
  };

  // Navegación por pantallas
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'search':
        return <SearchScreen onMoviePress={handleMoviePress} />;
      case 'detail':
        return <MovieDetail movie={selectedMovie} onBack={handleBackToSearch} />;
      default:
        return <SearchScreen onMoviePress={handleMoviePress} />;
    }
  };

  return renderCurrentScreen();
}

const styles = StyleSheet.create({
  // Splash Screen
  splash: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    padding: 40,
  },
  splashIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  splashTitle: {
    color: '#FF6B6B',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  splashSubtitle: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 15,
    opacity: 0.8,
  },

  // Background y Container
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },

  // Header
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  headerTitle: {
    color: '#FF6B6B',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },

  // Búsqueda
  searchContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchInput: {
    flex: 1,
    height: 55,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  searchIconButton: {
    padding: 15,
    marginRight: 5,
  },
  searchIcon: {
    fontSize: 20,
  },

  // Switch
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
  },
  switchLabelContainer: {
    flex: 1,
  },
  switchLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchSubLabel: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },

  // Botones
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchButton: {
    backgroundColor: '#FF6B6B',
  },
  clearButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Loading
  searchLoadingContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    marginBottom: 20,
  },
  searchLoadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },

  // Error
  errorContainer: {
    backgroundColor: 'rgba(255,107,107,0.2)',
    borderColor: '#FF6B6B',
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },

  // Resultados
  resultsHeader: {
    backgroundColor: 'rgba(78,205,196,0.3)',
    borderColor: '#4ECDC4',
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  resultsText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Lista
  listContainer: {
    paddingBottom: 20,
  },

  // Película Card
  movieCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  posterContainer: {
    position: 'relative',
  },
  moviePoster: {
    width: 130,
    height: 195,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  movieInfo: {
    flex: 1,
    padding: 20,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 24,
  },
  movieYear: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
  },
  movieOverview: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 10,
  },
  tapHintContainer: {
    marginTop: 'auto',
  },
  tapHint: {
    fontSize: 12,
    color: '#FF6B6B',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  // Detalle de Película
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  detailHeader: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieDetailCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  posterSection: {
    position: 'relative',
    marginRight: 20,
  },
  detailPoster: {
    width: 150,
    height: 225,
    borderRadius: 15,
  },
  detailRatingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  detailRatingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  movieDetailInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  detailYear: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  detailRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailRatingStars: {
    fontSize: 18,
    marginRight: 10,
  },
  detailVotes: {
    fontSize: 14,
    color: '#7f8c8d',
  },

  // Secciones de información
  synopsisCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  additionalInfoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  castCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  synopsisText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },

  // Reparto
  castItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 80,
  },
  castImage: {
    width: 60,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  castName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 4,
  },
  castCharacter: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },
});