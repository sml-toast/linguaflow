import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Search, Copy, Check, ExternalLink, Globe, Download, Star, Trash2, ArrowLeft } from 'lucide-react';

interface FavoriteSite {
  url: string;
  name: string;
  icon: string;
}

const defaultFavorites: FavoriteSite[] = [
  { url: 'https://github.com', name: 'GitHub', icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=64' },
  { url: 'https://stackoverflow.com', name: 'Stack Overflow', icon: 'https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=64' },
  { url: 'https://developer.mozilla.org', name: 'MDN', icon: 'https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=64' },
  { url: 'https://www.youtube.com', name: 'YouTube', icon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64' },
  { url: 'https://twitter.com', name: 'Twitter', icon: 'https://www.google.com/s2/favicons?domain=twitter.com&sz=64' },
  { url: 'https://www.zhihu.com', name: '知乎', icon: 'https://www.google.com/s2/favicons?domain=zhihu.com&sz=64' },
];

function extractDomain(url: string): string {
  try {
    const cleanUrl = url.trim().replace(/^https?:\/\//, '').replace(/^www\./, '');
    const domain = cleanUrl.split('/')[0];
    return domain;
  } catch {
    return url;
  }
}

function getSiteName(url: string): string {
  const domain = extractDomain(url);
  const parts = domain.split('.');
  if (parts.length >= 2) {
    const name = parts[parts.length - 2];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return domain;
}

export function IconFinder() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [searchResult, setSearchResult] = useState<FavoriteSite | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteSite[]>(defaultFavorites);
  const [activeSize, setActiveSize] = useState<number>(64);

  const sizes = [16, 32, 48, 64, 128, 256];

  const handleSearch = () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    const domain = extractDomain(url);
    const siteName = getSiteName(url);
    const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
    
    setTimeout(() => {
      setSearchResult({
        url: url.startsWith('http') ? url : `https://${url}`,
        name: siteName,
        icon: iconUrl,
      });
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCopyUrl = () => {
    if (searchResult) {
      navigator.clipboard.writeText(searchResult.icon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const addToFavorites = () => {
    if (searchResult && !favorites.find(f => f.url === searchResult.url)) {
      setFavorites(prev => [searchResult, ...prev]);
    }
  };

  const removeFromFavorites = (siteUrl: string) => {
    setFavorites(prev => prev.filter(f => f.url !== siteUrl));
  };

  const getIconUrl = (domain: string, size: number) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">网站图标获取</h1>
                <p className="text-gray-600 text-sm">快速获取任意网站的 favicon 图标</p>
              </div>
            </div>
            <Badge variant="primary">
              <Globe className="mr-1" size={14} />
              图标工具
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入网站地址，例如 github.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <Button onClick={handleSearch} size="lg" loading={isLoading}>
              <Search className="mr-2" size={20} />
              获取图标
            </Button>
          </div>
        </Card>

        {/* Search Result */}
        {searchResult && (
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <img
                    src={searchResult.icon}
                    alt={searchResult.name}
                    className="w-16 h-16 rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="%23e5e7eb" width="64" height="64" rx="12"/><text x="50%" y="55%" text-anchor="middle" fill="%239ca3af" font-size="24" font-family="sans-serif">?</text></svg>';
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{searchResult.name}</h3>
                <p className="text-gray-600 text-sm mb-3 break-all">{searchResult.url}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyUrl}>
                    {copied ? <Check className="mr-1" size={16} /> : <Copy className="mr-1" size={16} />}
                    {copied ? '已复制' : '复制图标链接'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={addToFavorites}>
                    <Star className="mr-1" size={16} />
                    收藏
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => window.open(searchResult.url, '_blank')}>
                    <ExternalLink className="mr-1" size={16} />
                    访问网站
                  </Button>
                </div>
              </div>
            </div>

            {/* Size Options */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">图标尺寸</h4>
              <div className="flex flex-wrap gap-4">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      activeSize === size
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                      <img
                        src={getIconUrl(extractDomain(searchResult.url), size)}
                        alt={`${size}x${size}`}
                        className="rounded"
                        style={{ width: Math.min(size, 48), height: Math.min(size, 48) }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="%23e5e7eb" width="64" height="64" rx="12"/><text x="50%" y="55%" text-anchor="middle" fill="%239ca3af" font-size="24" font-family="sans-serif">?</text></svg>';
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{size}x{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Usage */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">使用方式</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-sm font-mono">
                  {getIconUrl(extractDomain(searchResult.url), activeSize)}
                </code>
              </div>
            </div>
          </Card>
        )}

        {/* Favorites Section */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">常用网站</h2>
            <span className="text-sm text-gray-500">{favorites.length} 个网站</span>
          </div>
          
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">还没有收藏的网站</p>
              <p className="text-sm text-gray-400 mt-1">搜索并添加你常用的网站</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favorites.map((site) => (
                <div
                  key={site.url}
                  className="group relative bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                  onClick={() => window.open(site.url, '_blank')}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(site.url);
                    }}
                    className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                      <img
                        src={site.icon}
                        alt={site.name}
                        className="w-8 h-8 rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="%23e5e7eb" width="64" height="64" rx="12"/><text x="50%" y="55%" text-anchor="middle" fill="%239ca3af" font-size="24" font-family="sans-serif">?</text></svg>';
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center line-clamp-1">{site.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* API Info */}
        <Card className="mt-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 rounded-xl">
              <Download className="text-primary-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">关于图标获取</h3>
              <p className="text-sm text-gray-600 mb-3">
                通过 Google 的 favicon 服务获取网站图标，支持多种尺寸。你可以直接复制链接在项目中使用。
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs text-gray-600 font-mono">
                  https://www.google.com/s2/favicons?domain=网站域名&sz=尺寸
                </code>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
