"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Star, Heart, Filter, X, DollarSign, Calendar, Users, Compass, Plane, Camera, TrendingUp, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const TravelCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showWishlistPage, setShowWishlistPage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const destinations = [
    {
      id: 1,
      name: 'Bali',
      category: 'pantai',
      location: 'Indonesia',
      rating: 4.8,
      reviews: 2340,
      budget: 'medium',
      images: [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/ea/ac/8a/kuta.jpg?w=1200&h=-1&s=1',
        'https://www.arabianknightubud.com/wp-content/uploads/2025/07/tanah-lot-temple.webp',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/54/f4/01/saraswati-temple-in-ubud.jpg?w=600&h=400&s=1',
        'https://static.mybalitrips.com/media/43295/uluwatu-compressed.jpg'
      ],
      description: 'Pulau dewata dengan pantai indah, budaya unik, dan pemandangan sawah terasering yang menakjubkan.',
      highlights: ['Pantai Kuta', 'Tanah Lot', 'Ubud', 'Uluwatu'],
      bestTime: 'April - Oktober',
      duration: '5-7 hari',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-black'
    },
    {
      id: 2,
      name: 'Papua',
      category: 'alam',
      location: 'Papua Barat, Indonesia',
      rating: 4.9,
      reviews: 856,
      budget: 'high',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/8/88/Raja_Ampat%2C_Mutiara_Indah_di_Timur_Indonesia.jpg',
        'https://panoramabelitungtour.com/wp-content/uploads/elementor/thumbs/belitung-1-pzrjv88w1j5x6xchfhea3sn4x6yxhyv87n30mriteq.jpg',
        'https://www.papuaexplorers.com/wp-content/uploads/2016/11/Wayag2-1024x628.jpg',
        'https://zjglidcehtsqqqhbdxyp.supabase.co/storage/v1/object/public/atourin/images/destination/raja-ampat/piaynemo-raja-ampat-profile1640592627.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim'
      ],
      description: 'Surga bawah laut dengan keanekaragaman hayati laut terkaya di dunia. Destinasi diving kelas dunia.',
      highlights: ['Raja Ampat', 'Island Hopping', 'Wayag', 'Piaynemo'],
      bestTime: 'Oktober - April',
      duration: '7-10 hari',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-100'
    },
    {
      id: 3,
      name: 'Yogyakarta',
      category: 'budaya',
      location: 'Indonesia',
      rating: 4.7,
      reviews: 1823,
      budget: 'low',
      images: [
        'https://www.indonesia.travel/contentassets/0d4d0e21bba547a69c7e93ccaab38234/4-2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Prambanan_Temple_Yogyakarta_Indonesia.jpg/1200px-Prambanan_Temple_Yogyakarta_Indonesia.jpg',
        'http://jogjakeren.com/wp-content/uploads/2021/11/Malioboro-2.jpg',
        'https://grandrohanjogja.com/files/uploads/2020/12/Keraton-Yogjakarta-The-Royal-Palace.jpg'
      ],
      description: 'Kota budaya dengan candi megah, keraton bersejarah, dan kuliner khas yang menggugah selera.',
      highlights: ['Borobudur', 'Prambanan', 'Malioboro', 'Keraton'],
      bestTime: 'Sepanjang tahun',
      duration: '3-5 hari',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-100'
    },
    {
      id: 4,
      name: 'Probolinggo',
      category: 'gunung',
      location: 'Jawa Timur, Indonesia',
      rating: 4.8,
      reviews: 1456,
      budget: 'medium',
      images: [
        'https://torch.id/cdn/shop/articles/Artikel_167_-_Preview.webp?v=1713337145&width=1100',
        'https://www.tournesia.com/blog/wp-content/uploads/2025/05/Kawah-Gunung-Bromo.jpg',
        'https://jalankebromo.com/wp-content/uploads/2024/01/Bukit-Teletubbies-Bromo.jpg',
        'https://cdn0-production-images-kly.akamaized.net/zS-stV9HkejgV8JucG8_527mWd8=/500x281/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2523468/original/068068700_1544605153-baluran.jpg'
      ],
      description: 'Gunung berapi aktif dengan pemandangan sunrise spektakuler dan lautan pasir yang dramatis.',
      highlights: ['Sunrise View', 'Kawah Bromo', 'Bukit Teletubbies', 'Savana'],
      bestTime: 'April - Oktober',
      duration: '2-3 hari',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      name: 'Nusa Tenggara Timur',
      category: 'pantai',
      location: 'NTT, Indonesia',
      rating: 4.8,
      reviews: 1129,
      budget: 'medium',
      images: [
        'https://expatindonesia.id/wp-content/uploads/2025/02/pexels-javaistan-15879944-scaled.jpg',
        'https://yachtsourcing.com/wp-content/uploads/Pink_Beach_Padar_Island_Komodo_National_Park-1-1024x1024.jpg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/19/1a/f3/come-and-join-with-us.jpg?w=900&h=500&s=1',
        'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_720,ar_2000:1335/v1634025439/01hkekp742hvezaakh8vhm7g5z.jpg'
      ],
      description: 'Gerbang menuju Komodo dengan pantai pink, pulau eksotis, dan kehidupan laut yang menakjubkan.',
      highlights: ['Labuan Bajo', 'Pink Beach', 'Padar Island', 'Manta Point'],
      bestTime: 'April - Desember',
      duration: '4-6 hari',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-100'
    },
    {
      id: 6,
      name: 'Sumatera',
      category: 'alam',
      location: 'Sumatera Utara, Indonesia',
      rating: 4.6,
      reviews: 892,
      budget: 'low',
      images: [
        'https://unesco.or.id/wp-content/uploads/2025/08/Danau-Toba-1.webp',
        'https://eranusanews.com/wp-content/uploads/2024/09/pasted-image-0-1.png',
        'https://static.wixstatic.com/media/829d90_d526db5e65104a0caa8b23aa8197280b~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/829d90_d526db5e65104a0caa8b23aa8197280b~mv2.jpg',
        'https://travelspromo.com/wp-content/uploads/2020/09/Jalur-Pendakian-menuju-Puncak-Holbung-ANDR-TV-e1601284113791.jpg'
      ],
      description: 'Danau vulkanik terbesar di Asia Tenggara dengan Pulau Samosir di tengahnya dan budaya Batak yang kaya.',
      highlights: ['Danau Toba', 'Air Terjun Sipiso-piso', 'Desa Tomok', 'Bukit Holbung'],
      bestTime: 'Mei - September',
      duration: '3-4 hari',
      color: 'from-sky-500 to-blue-500',
      bgColor: 'bg-sky-100'
    },
    {
      id: 7,
      name: 'Lombok',
      category: 'pantai',
      location: 'NTB, Indonesia',
      rating: 4.7,
      reviews: 1654,
      budget: 'medium',
      images: [
        'https://www.zubludiving.com/images/Indonesia/Lombok/Gili-Islands/Gili-Islands-Scuba-Diving-Trawangan-Air-Lombok-Banner.jpg',
        'https://inlomboktrans.com/img/destinasi/pantai-kuta-lombok.jpg',
        'https://kemenpar.go.id/_next/image?url=https%3A%2F%2Fapi.kemenpar.go.id%2Fstorage%2Fapp%2Fuploads%2Fpublic%2F685%2Fa28%2F726%2F685a287262176605968863.jpeg&w=3840&q=75',
        'https://gerbanglombok.co.id/wp-content/uploads/2018/05/Tiu-Kelep.jpg'
      ],
      description: 'Pulau dengan pantai eksotis, air terjun tersembunyi, dan Gunung Rinjani yang menantang.',
      highlights: ['Gili Islands', 'Pantai Kuta', 'Gunung Rinjani', 'Air Terjun Tiu Kelep'],
      bestTime: 'April - Oktober',
      duration: '5-7 hari',
      color: 'from-lime-500 to-green-500',
      bgColor: 'bg-lime-100'
    },
    {
      id: 8,
      name: 'Bandung',
      category: 'kota',
      location: 'Jawa Barat, Indonesia',
      rating: 4.5,
      reviews: 2156,
      budget: 'low',
      images: [
        'https://dte.telkomuniversity.ac.id/wp-content/uploads/2025/06/62dec6809a479.jpg',
        'https://images.squarespace-cdn.com/content/v1/6400d98ffe02760fa8da2551/5ad91aa6-4925-4945-a956-5a17e610df07/Kawah-Putih-white-crater-lake.jpeg',
        'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/02/04/f12b8d46-03f2-42ad-a620-5e7ad748aec8-1612403518383-adf8c9df733bf89681751d3427f993d7.jpg',
        'https://philipsbekasi.id/wp-content/uploads/2025/05/1.-Jembatan-Pasupati-Bandung-Ikon-Infrastruktur-Modern-dengan-Sejarah-yang-Menarik-Philips-1.jpg'
      ],
      description: 'Kota kembang dengan iklim sejuk, kuliner beragam, dan destinasi belanja yang menarik.',
      highlights: ['Gedung Sate', 'Kawah Putih', 'Tangkuban Parahu', 'Jembatan Pasupati'],
      bestTime: 'Sepanjang tahun',
      duration: '2-3 hari',
      color: 'from-fuchsia-500 to-pink-500',
      bgColor: 'bg-fuchsia-100'
    },
    {
      id: 9,
      name: 'Cimahi',
      category: 'kota',
      location: 'Jawa Barat, Indonesia',
      rating: 4.5,
      reviews: 2156,
      budget: 'low',
      images: [
        'https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/filters:watermark(file/2017/cms/img/watermark.png,-0,0,0)/photo/2023/12/04/1227862706.jpg',
        'https://bandungbergerak.id/cdn/8/6/5/7/gunung_padakasih_2_840x576.jpeg',
        'https://radarcirebon.disway.id/upload/485dcad3592f32aade8ee68be4454833.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOClxsrYC-z29NnM447A1d7OKJaQTOI7hM2w&s'
      ],
      description: 'Kota Tentara dengan iklim sejuk, kuliner beragam, dan destinasi belanja yang menarik.',
      highlights: ['Alun-Alun Cimahi', 'Gunung Padakasih', 'Gunung Bohong', 'Cimahi Mall'],
      bestTime: 'Sepanjang tahun',
      duration: '2-3 hari',
      color: 'from-fuchsia-500 to-pink-500',
      bgColor: 'bg-fuchsia-100'
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua', icon: '🌍', color: 'from-violet-500 to-purple-500', bgHover: 'hover:bg-violet-100' },
    { id: 'pantai', name: 'Pantai', icon: '🏖️', color: 'from-blue-500 to-cyan-500', bgHover: 'hover:bg-blue-100' },
    { id: 'gunung', name: 'Gunung', icon: '⛰️', color: 'from-green-500 to-emerald-500', bgHover: 'hover:bg-green-100' },
    { id: 'budaya', name: 'Budaya', icon: '🏛️', color: 'from-amber-500 to-orange-500', bgHover: 'hover:bg-amber-100' },
    { id: 'alam', name: 'Alam', icon: '🌿', color: 'from-teal-500 to-green-500', bgHover: 'hover:bg-teal-100' },
    { id: 'kota', name: 'Kota', icon: '🏙️', color: 'from-pink-500 to-rose-500', bgHover: 'hover:bg-pink-100' }
  ];

  const budgetOptions = [
    { id: 'all', name: 'Semua Budget', icon: '💰', color: 'from-indigo-500 to-purple-500' },
    { id: 'low', name: 'Hemat', icon: '🎯', color: 'from-green-500 to-emerald-500' },
    { id: 'medium', name: 'Sedang', icon: '💎', color: 'from-yellow-500 to-orange-500' },
    { id: 'high', name: 'Premium', icon: '👑', color: 'from-purple-500 to-pink-500' }
  ];

  useEffect(() => {
    if (selectedDestination && selectedDestination.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % selectedDestination.images.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [selectedDestination]);

  const filteredDestinations = useMemo(() => {
    const filtered = destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
      const matchesBudget = selectedBudget === 'all' || dest.budget === selectedBudget;
      
      return matchesSearch && matchesCategory && matchesBudget;
    });

    if (showWishlistPage) {
      return filtered.filter(dest => wishlist.includes(dest.id));
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, selectedBudget, showWishlistPage, wishlist]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleHighlightClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    if (selectedDestination && selectedDestination.images) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedDestination.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedDestination && selectedDestination.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedDestination.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 via-blue-50 to-cyan-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <header className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-2xl sticky top-0 z-40">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 animate-float">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform">
                <Compass className="w-8 h-8 text-white transform -rotate-12" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-lg">Geosantara ✨</h1>
                <p className="text-sm text-purple-100 font-semibold">Jelajahi Dunia & Temukan Dirimu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-3 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all"
              >
                <Filter className="w-6 h-6" />
              </button>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div 
                  className="relative p-3 bg-white rounded-full cursor-pointer"
                  onClick={() => setShowWishlistPage(!showWishlistPage)}
                >
                  <Heart className={`w-6 h-6 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : 'text-purple-600'}`} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Cari destinasi impian Anda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-2xl focus:border-purple-400 focus:outline-none transition-all text-gray-700 font-medium placeholder-purple-300 shadow-xl"
              />
              <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 space-y-6`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border-2 border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Filter</h3>
                </div>
                <button onClick={() => setShowFilters(false)} className="lg:hidden p-2 hover:bg-purple-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
                  <Camera className="w-4 h-4 mr-2 text-pink-500" />
                  Kategori Wisata
                </h4>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                        selectedCategory === cat.id
                          ? `bg-gradient-to-r ${cat.color} text-white shadow-xl scale-105`
                          : `bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 ${cat.bgHover} shadow-md`
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-sm font-bold">{cat.name}</span>
                      {selectedCategory === cat.id && <Sparkles className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                  Pilih Budget
                </h4>
                <div className="space-y-3">
                  {budgetOptions.map(budget => (
                    <button
                      key={budget.id}
                      onClick={() => setSelectedBudget(budget.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all transform hover:scale-105 ${
                        selectedBudget === budget.id
                          ? `bg-gradient-to-r ${budget.color} text-white shadow-xl scale-105`
                          : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 shadow-md'
                      }`}
                    >
                      <span className="text-xl">{budget.icon}</span>
                      <span className="font-bold">{budget.name}</span>
                      {selectedBudget === budget.id && <Award className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-lg font-black">Statistik</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Total Destinasi</span>
                  <span className="text-2xl font-black">{destinations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Wishlist</span>
                  <span className="text-2xl font-black">{wishlist.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Rating Tertinggi</span>
                  <span className="text-2xl font-black flex items-center">
                    4.9 <Star className="w-4 h-4 ml-1 fill-yellow-300 text-yellow-300" />
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border-2 border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Plane className="w-6 h-6 text-purple-600 animate-pulse" />
                  <p className="text-gray-700 font-semibold">
                    {showWishlistPage ? (
                      <>Destinasi <span className="text-red-500">Favorit</span> Anda! ❤️</>
                    ) : (
                      <>Temukan <span className="text-purple-600">Destinasi</span> Menakjubkan!</>
                    )}
                  </p>
                </div>
                {showWishlistPage && (
                  <button
                    onClick={() => setShowWishlistPage(false)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all"
                  >
                    Kembali ke Semua
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredDestinations.map((dest, idx) => (
                <div
                  key={dest.id}
                  onMouseEnter={() => setHoveredCard(dest.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-purple-500/50 transition-all transform hover:-translate-y-2 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-purple-300"
                  onClick={() => {
                    setSelectedDestination(dest);
                    setCurrentImageIndex(0);
                  }}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${dest.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-300`}></div>
                  
                  <div className="relative">
                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                      <img
                        src={dest.images[0]}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-125 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(dest.id);
                        }}
                        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:scale-125 transition-transform z-10"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            wishlist.includes(dest.id)
                              ? 'fill-red-500 text-red-500 animate-pulse'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                      
                      <div className={`absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${dest.color} text-white text-xs font-black rounded-full shadow-xl flex items-center space-x-2 backdrop-blur-md`}>
                        <span className="text-lg">{categories.find(c => c.id === dest.category)?.icon}</span>
                        <span>{categories.find(c => c.id === dest.category)?.name}</span>
                      </div>

                      {hoveredCard === dest.id && (
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 animate-pulse">
                          {dest.highlights.slice(0, 2).map((highlight, i) => (
                            <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold text-gray-700 rounded-full">
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className={`text-2xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${dest.color}`}>
                        {dest.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-pink-500" />
                        <span className="font-semibold">{dest.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{dest.description}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-black text-gray-800">{dest.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500 font-semibold">({dest.reviews})</span>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-xs font-black shadow-lg ${
                          dest.budget === 'low' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                          dest.budget === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                          'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        }`}>
                          {dest.budget === 'low' ? '🎯 Hemat' : dest.budget === 'medium' ? '💎 Sedang' : '👑 Premium'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-dashed border-purple-300">
                <div className="text-8xl mb-6 animate-bounce">
                  {showWishlistPage ? '💔' : '🔍'}
                </div>
                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  {showWishlistPage ? 'Wishlist masih kosong' : 'Destinasi tidak ditemukan'}
                </h3>
                <p className="text-gray-600 font-semibold">
                  {showWishlistPage ? 'Mulai tambahkan destinasi favorit Anda! ✨' : 'Coba ubah filter atau kata kunci pencarian ✨'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {selectedDestination && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-purple-300 transform scale-95 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 md:h-96">
              <img
                src={selectedDestination.images[currentImageIndex]}
                alt={selectedDestination.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-2xl hover:scale-110 transition-transform z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-2xl hover:scale-110 transition-transform z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {selectedDestination.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImageIndex === index 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-2xl hover:scale-110 transition-transform z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <div className={`absolute top-6 left-6 px-5 py-3 bg-gradient-to-r ${selectedDestination.color} text-white text-sm font-black rounded-full shadow-xl backdrop-blur-md flex items-center space-x-2`}>
                <span className="text-xl">{categories.find(c => c.id === selectedDestination.category)?.icon}</span>
                <span>{categories.find(c => c.id === selectedDestination.category)?.name}</span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className={`text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r ${selectedDestination.color}`}>
                    {selectedDestination.name} ✨
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-6 h-6 mr-2 text-pink-500" />
                    <span className="font-bold text-lg">{selectedDestination.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleWishlist(selectedDestination.id)}
                  className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl hover:from-pink-100 hover:to-purple-100 transition-all hover:scale-110 shadow-xl"
                >
                  <Heart
                    className={`w-8 h-8 ${
                      wishlist.includes(selectedDestination.id)
                        ? 'fill-red-500 text-red-500 animate-pulse'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center space-x-6 mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full shadow-lg">
                  <Star className="w-6 h-6 fill-white text-white" />
                  <span className="font-black text-2xl text-white">{selectedDestination.rating}</span>
                </div>
                <span className="text-gray-500 font-semibold">({selectedDestination.reviews} ulasan)</span>
                <div className={`px-4 py-2 rounded-full font-black text-white shadow-lg ${
                  selectedDestination.budget === 'low' ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  selectedDestination.budget === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {selectedDestination.budget === 'low' ? '🎯 Hemat' : 
                   selectedDestination.budget === 'medium' ? '💎 Sedang' : '👑 Premium'}
                </div>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-lg">{selectedDestination.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                  <div className="relative flex items-center space-x-4 p-5 text-white">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Calendar className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs opacity-90 font-semibold">Waktu Terbaik</p>
                      <p className="font-black text-lg">{selectedDestination.bestTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                  <div className="relative flex items-center space-x-4 p-5 text-white">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs opacity-90 font-semibold">Durasi</p>
                      <p className="font-black text-lg">{selectedDestination.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl transform group-hover:scale-105 transition-transform"></div>
                  <div className="relative flex items-center space-x-4 p-5 text-white">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <DollarSign className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs opacity-90 font-semibold">Budget</p>
                      <p className="font-black text-lg">
                        {selectedDestination.budget === 'low' ? '< 3 Juta' : 
                         selectedDestination.budget === 'medium' ? '3-7 Juta' : '> 7 Juta'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-800 mb-5 flex items-center">
                  <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
                  Highlight Destinasi (Klik untuk lihat foto)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedDestination.highlights.map((highlight: string, idx: number) => (
                    <button
                      key={idx} 
                      onClick={() => handleHighlightClick(idx)}
                      className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${selectedDestination.color} bg-opacity-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
                        currentImageIndex === idx ? 'ring-4 ring-purple-500 scale-105' : ''
                      }`}
                    >
                      <div className={`w-3 h-3 bg-gradient-to-r ${selectedDestination.color} rounded-full ${
                        currentImageIndex === idx ? 'animate-pulse' : ''
                      }`}></div>
                      <span className="text-sm font-bold text-gray-700">{highlight}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className={`py-4 bg-gradient-to-r ${selectedDestination.color} text-white font-black rounded-2xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}>
                  <Plane className="w-5 h-5" />
                  <span>Rencanakan Trip</span>
                </button>
                <button className="py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-black rounded-2xl hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Lihat Galeri</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCatalog;