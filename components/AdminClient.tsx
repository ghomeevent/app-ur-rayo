"use client";

import React, { useState, useMemo, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  BatteryCharging,
  Zap,
  MapPin,
  Settings,
  Edit2,
  X,
  Upload,
  CheckCircle2,
  Loader2,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  Save,
  RotateCcw,
  ExternalLink,
  Copy,
  AlertTriangle,
  Image as ImageIcon,
  Search,
  Layers,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import type { BatteryProduct, CompanyLocation } from '@/data/rayoData';

export interface RayoCompanyInfoData {
  brandName: string;
  brandSubtitle: string;
  parentCompany: string;
  registeredName: string;
  tagline: string;
  slogan: string;
  phone: string;
  formattedPhone: string;
  email: string;
  salesEmail: string;
  dealerEmail: string;
  websiteUrl: string;
  parentWebsiteUrl?: string;
  address: string;
  primaryAddress: string;
  secondaryAddress: string;
  operatingHours: string;
  description: string;
  story: string;
  certifications: string[];
  brandingAssets: {
    shieldLogo: string;
    rayoBadge: string;
    heroBanner: string;
  };
  legalDisclaimer: string;
  copyright: string;
}

interface AdminClientProps {
  initialProducts: BatteryProduct[];
  initialLocations: CompanyLocation[];
  initialCompanyInfo: RayoCompanyInfoData;
  initialAvailableImages: string[];
}

const emptySubscribe = () => () => {};

type ProductFilter = 'all' | 'battery' | 'charger' | 'incomplete';

export default function AdminClient({
  initialProducts,
  initialLocations,
  initialCompanyInfo,
  initialAvailableImages,
}: AdminClientProps) {
  const router = useRouter();

  const [savedSnapshot, setSavedSnapshot] = useState({
    products: initialProducts,
    locations: initialLocations,
    companyInfo: initialCompanyInfo,
  });

  const [products, setProducts] = useState<BatteryProduct[]>(initialProducts);
  const [locations, setLocations] = useState<CompanyLocation[]>(initialLocations);
  const [companyInfo, setCompanyInfo] = useState<RayoCompanyInfoData>(initialCompanyInfo);
  const [availableImages, setAvailableImages] = useState<string[]>(initialAvailableImages);

  const [activeTab, setActiveTab] = useState<'products' | 'locations' | 'settings'>('products');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Search & Filter for Products
  const [searchQuery, setSearchQuery] = useState('');
  const [productFilter, setProductFilter] = useState<ProductFilter>('all');

  // Product Editor Modal
  const [editingProduct, setEditingProduct] = useState<BatteryProduct | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editorTab, setEditorTab] = useState<'general' | 'specs' | 'features' | 'images'>('general');
  const [newFeatureText, setNewFeatureText] = useState('');
  const [newVehicleText, setNewVehicleText] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Location Editor Modal
  const [editingLocation, setEditingLocation] = useState<CompanyLocation | null>(null);
  const [isNewLocation, setIsNewLocation] = useState(false);

  // Company certifications draft input
  const [newCertText, setNewCertText] = useState('');

  // Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  const isProductIncomplete = useCallback((p: BatteryProduct) => {
    return (
      !p.description?.trim() ||
      !p.voltage?.trim() ||
      (p.features?.length ?? 0) === 0 ||
      (p.idealForVehicles?.length ?? 0) === 0 ||
      (p.images?.length ?? 0) === 0
    );
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      if (productFilter === 'battery' && p.category !== 'battery') return false;
      if (productFilter === 'charger' && p.category !== 'charger') return false;
      if (productFilter === 'incomplete' && !isProductIncomplete(p)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.voltage.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    });
  }, [products, productFilter, searchQuery, isProductIncomplete]);

  const batteryCount = useMemo(
    () => products.filter((p) => p.category === 'battery').length,
    [products]
  );
  const chargerCount = useMemo(
    () => products.filter((p) => p.category === 'charger').length,
    [products]
  );
  const incompleteCount = useMemo(
    () => products.filter(isProductIncomplete).length,
    [products, isProductIncomplete]
  );
  const primaryLocation = useMemo(
    () => locations.find((l) => l.isPrimary) ?? locations[0],
    [locations]
  );

  // Body scroll lock & Escape dismissal for modals
  useEffect(() => {
    const hasModal = Boolean(editingProduct || editingLocation || confirmDialog);
    if (!hasModal) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (confirmDialog) {
          setConfirmDialog(null);
        } else if (editingProduct) {
          setEditingProduct(null);
        } else if (editingLocation) {
          setEditingLocation(null);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [editingProduct, editingLocation, confirmDialog]);

  // Warn on unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSaveAll = useCallback(async () => {
    if (!companyInfo.brandName.trim() || !companyInfo.email.trim() || !companyInfo.phone.trim()) {
      setActiveTab('settings');
      showToast('Brand Name, Phone, and Primary Email are required in Company Settings.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products,
          locations,
          companyInfo,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes.');
      }

      if (Array.isArray(data.availableImages)) {
        setAvailableImages(data.availableImages);
      }

      setSavedSnapshot({
        products,
        locations,
        companyInfo,
      });
      setHasUnsavedChanges(false);
      showToast('Saved changes to data/rayoData.ts', 'success');
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Save failed.';
      showToast(message, 'error');
    } finally {
      setIsSaving(false);
    }
  }, [products, locations, companyInfo, router, showToast]);

  // Ctrl/Cmd + S shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (hasUnsavedChanges && !isSaving) {
          void handleSaveAll();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hasUnsavedChanges, isSaving, handleSaveAll]);

  const handleDiscardAll = () => {
    setConfirmDialog({
      title: 'Discard all unsaved changes?',
      message: 'This will revert all draft edits back to the last saved state of data/rayoData.ts.',
      onConfirm: () => {
        setProducts(savedSnapshot.products);
        setLocations(savedSnapshot.locations);
        setCompanyInfo(savedSnapshot.companyInfo);
        setHasUnsavedChanges(false);
        setConfirmDialog(null);
        showToast('Reverted to last saved data.', 'success');
      },
    });
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed.');
      }
      if (data.url && !availableImages.includes(data.url)) {
        setAvailableImages((prev) => [...prev, data.url].sort());
      }
      showToast(`Uploaded ${data.fileName}`, 'success');
      return data.url as string;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed.';
      showToast(message, 'error');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // --- Product CRUD ---
  const openCreateProduct = () => {
    setIsNewProduct(true);
    setEditorTab('general');
    setNewFeatureText('');
    setNewVehicleText('');
    setEditingProduct({
      id: `rayo-pack-${Date.now().toString().slice(-4)}`,
      name: 'RAYO New Lithium Pack',
      tagline: 'High-Performance Lithium-Ion EV Battery',
      category: 'battery',
      voltage: '60V',
      capacity: '40Ah (2,400Wh)',
      energyWh: '2.4 kWh',
      warranty: 'Standard Warranty',
      cellChemistry: 'Lithium-Ion',
      cycleLife: 'Lithium-Ion Cells',
      connectorType: 'Anderson SB50 Connector Plug',
      weight: '~17.5 kg',
      dimensions: '340mm × 210mm × 260mm',
      enclosure: 'Powder-Coated Steel with Stainless Steel Handle',
      chargingTime: '3 – 4 Hours',
      tag: 'New Model',
      description: '',
      features: [],
      idealForVehicles: [],
      images: availableImages[0] ? [availableImages[0]] : [],
    });
  };

  const openEditProduct = (product: BatteryProduct) => {
    setIsNewProduct(false);
    setEditorTab('general');
    setNewFeatureText('');
    setNewVehicleText('');
    setEditingProduct(JSON.parse(JSON.stringify(product)) as BatteryProduct);
  };

  const handleDuplicateProduct = (product: BatteryProduct) => {
    const copy: BatteryProduct = JSON.parse(JSON.stringify(product));
    copy.id = `${product.id}-copy-${Date.now().toString().slice(-3)}`;
    copy.name = `${product.name} Copy`;
    setProducts((prev) => [...prev, copy]);
    setHasUnsavedChanges(true);
    showToast(`Duplicated ${product.name}. Remember to save changes.`, 'success');
  };

  const handleDeleteProduct = (product: BatteryProduct) => {
    setConfirmDialog({
      title: `Delete ${product.name}?`,
      message: `Remove "${product.name}" (${product.id}) from RAYO_PRODUCTS? Click Save Changes afterwards to persist to data/rayoData.ts.`,
      onConfirm: () => {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        setHasUnsavedChanges(true);
        setConfirmDialog(null);
        showToast(`Removed ${product.name}`, 'success');
      },
    });
  };

  const handleMoveProduct = (productId: string, direction: 'up' | 'down') => {
    const list = [...products];
    const idx = list.findIndex((p) => p.id === productId);
    if (idx === -1) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= list.length) return;
    [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
    setProducts(list);
    setHasUnsavedChanges(true);
  };

  const handleSaveEditingProduct = () => {
    if (!editingProduct) return;
    const cleanId = editingProduct.id.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
    if (!cleanId || !editingProduct.name.trim()) {
      showToast('Product ID and Name are required.', 'error');
      return;
    }

    if (isNewProduct && products.some((p) => p.id === cleanId)) {
      showToast(`A product with ID "${cleanId}" already exists.`, 'error');
      return;
    }

    const normalized: BatteryProduct = {
      ...editingProduct,
      id: cleanId,
      name: editingProduct.name.trim(),
    };

    setProducts((prev) => {
      if (isNewProduct) return [...prev, normalized];
      return prev.map((p) => (p.id === normalized.id ? normalized : p));
    });
    setHasUnsavedChanges(true);
    setEditingProduct(null);
    showToast(`Updated ${normalized.name} in draft. Click "Save Changes" to write to disk.`, 'success');
  };

  // --- Location CRUD ---
  const openCreateLocation = () => {
    setIsNewLocation(true);
    setEditingLocation({
      id: `loc-${Date.now().toString().slice(-4)}`,
      city: '',
      title: '',
      addressLines: [],
      fullAddress: '',
      pincode: '',
      state: 'Telangana',
      country: 'India',
      coordinates: { lat: 17.4, lng: 78.5, dms: '' },
      mapsUrl: '',
      embedUrl: '',
      phone: companyInfo.formattedPhone || '+91 88861 60576',
      email: companyInfo.email || 'info@urbanridegreen.com',
      isPrimary: false,
    });
  };

  const openEditLocation = (loc: CompanyLocation) => {
    setIsNewLocation(false);
    setEditingLocation(JSON.parse(JSON.stringify(loc)) as CompanyLocation);
  };

  const handleSaveEditingLocation = () => {
    if (!editingLocation) return;
    const cleanId = editingLocation.id.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
    if (!cleanId || !editingLocation.title.trim() || !editingLocation.city.trim()) {
      showToast('Location ID, City, and Title are required.', 'error');
      return;
    }

    if (isNewLocation && locations.some((l) => l.id === cleanId)) {
      showToast(`A location with ID "${cleanId}" already exists.`, 'error');
      return;
    }

    const normalized: CompanyLocation = {
      ...editingLocation,
      id: cleanId,
      city: editingLocation.city.trim(),
      title: editingLocation.title.trim(),
    };

    setLocations((prev) => {
      const base = isNewLocation ? [...prev, normalized] : prev.map((l) => (l.id === normalized.id ? normalized : l));
      if (normalized.isPrimary) {
        return base.map((l) => ({ ...l, isPrimary: l.id === normalized.id }));
      }
      return base;
    });
    setHasUnsavedChanges(true);
    setEditingLocation(null);
    showToast(`Updated ${normalized.title} in draft.`, 'success');
  };

  const handleDeleteLocation = (loc: CompanyLocation) => {
    setConfirmDialog({
      title: `Delete ${loc.title}?`,
      message: `Remove "${loc.title}" (${loc.city}) from COMPANY_LOCATIONS?`,
      onConfirm: () => {
        setLocations((prev) => prev.filter((l) => l.id !== loc.id));
        setHasUnsavedChanges(true);
        setConfirmDialog(null);
        showToast(`Removed ${loc.title}`, 'success');
      },
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#070707] text-stone-900 dark:text-stone-100 pb-20">
      {/* Top Sticky Admin Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-600 dark:text-lime-400">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-display font-black tracking-tight text-stone-900 dark:text-white">
                  RAYO Local Admin
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  DEV ONLY
                </span>
                {hasUnsavedChanges && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-lime-500/15 text-lime-700 dark:text-lime-300 border border-lime-500/30 animate-pulse">
                    Unsaved Changes
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Local static data manager for <code className="text-lime-700 dark:text-lime-400">data/rayoData.ts</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:border-lime-500/50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </Link>

            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={handleDiscardAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Discard
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={!hasUnsavedChanges || isSaving}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all ${
                hasUnsavedChanges && !isSaving
                  ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-stone-950 shadow-lg shadow-lime-500/20 hover:brightness-105 cursor-pointer'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* 4-Card KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-4">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span>Total Products</span>
              <Layers className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            </div>
            <div className="text-2xl font-display font-black text-stone-900 dark:text-white">
              {products.length}
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              {batteryCount} batteries • {chargerCount} chargers
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-4">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span>Battery Packs</span>
              <BatteryCharging className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-2xl font-display font-black text-stone-900 dark:text-white">
              {batteryCount}
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              48V / 60V / 72V Lineup
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-4">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span>Facility Locations</span>
              <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="text-2xl font-display font-black text-stone-900 dark:text-white">
              {locations.length}
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
              Primary: {primaryLocation ? primaryLocation.city : 'None'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab('products');
              setProductFilter(incompleteCount > 0 ? 'incomplete' : 'all');
            }}
            className="text-left rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-4 hover:border-lime-500/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span>Data Completeness</span>
              {incompleteCount === 0 ? (
                <ShieldCheck className="w-4 h-4 text-lime-600 dark:text-lime-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="text-2xl font-display font-black text-stone-900 dark:text-white">
              {incompleteCount === 0 ? '100%' : `${incompleteCount} Needs Info`}
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              {incompleteCount === 0 ? 'All products complete' : 'Click to filter incomplete'}
            </div>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-lime-500 text-stone-950 shadow-md shadow-lime-500/20'
                : 'bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-lime-500/40'
            }`}
          >
            <BatteryCharging className="w-4 h-4" />
            Products & Chargers ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('locations')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'locations'
                ? 'bg-lime-500 text-stone-950 shadow-md shadow-lime-500/20'
                : 'bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-lime-500/40'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Locations ({locations.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-lime-500 text-stone-950 shadow-md shadow-lime-500/20'
                : 'bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-lime-500/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            Company & Contact Info
          </button>
        </div>

        {/* TAB 1: PRODUCTS & CHARGERS */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-2xl p-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, ID, voltage, or tag..."
                  className="w-full pl-10 pr-8 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-lime-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {(
                  [
                    { key: 'all', label: 'All' },
                    { key: 'battery', label: 'Batteries' },
                    { key: 'charger', label: 'Chargers' },
                    { key: 'incomplete', label: 'Needs Details' },
                  ] as { key: ProductFilter; label: string }[]
                ).map((pill) => (
                  <button
                    key={pill.key}
                    type="button"
                    onClick={() => setProductFilter(pill.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      productFilter === pill.key
                        ? 'bg-lime-500/20 text-lime-700 dark:text-lime-300 border border-lime-500/40'
                        : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-transparent hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={openCreateProduct}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-lime-500 text-stone-950 text-xs font-display font-bold uppercase tracking-wider hover:brightness-105 cursor-pointer ml-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Product List */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-10 text-center space-y-3">
                <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                  No products match the current filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setProductFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-200 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredProducts.map((product) => {
                  const actualIdx = products.findIndex((p) => p.id === product.id);
                  const incomplete = isProductIncomplete(product);
                  const thumb = product.images?.[0];

                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-lime-500/40 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-4 min-w-0">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shrink-0">
                          {thumb ? (
                            <Image
                              src={thumb}
                              alt={product.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-display font-bold text-stone-900 dark:text-white truncate">
                              {product.name}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                product.category === 'charger'
                                  ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                                  : 'bg-lime-500/15 text-lime-700 dark:text-lime-300 border border-lime-500/30'
                              }`}
                            >
                              {product.category === 'charger' ? (
                                <Zap className="w-2.5 h-2.5" />
                              ) : (
                                <BatteryCharging className="w-2.5 h-2.5" />
                              )}
                              {product.category}
                            </span>
                            {product.tag && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                                {product.tag}
                              </span>
                            )}
                            {incomplete && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                                Needs Details
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                            {product.tagline}
                          </p>

                          <div className="flex items-center gap-3 flex-wrap text-[11px] text-stone-500 dark:text-stone-400 pt-0.5">
                            <span>
                              ID: <code className="text-stone-700 dark:text-stone-300">{product.id}</code>
                            </span>
                            <span>•</span>
                            <span>{product.voltage}</span>
                            <span>•</span>
                            <span>{product.capacity}</span>
                            <span>•</span>
                            <span>{product.features.length} features</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleMoveProduct(product.id, 'up')}
                          disabled={actualIdx <= 0}
                          title="Move Up"
                          className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveProduct(product.id, 'down')}
                          disabled={actualIdx === -1 || actualIdx >= products.length - 1}
                          title="Move Down"
                          className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateProduct(product)}
                          title="Duplicate"
                          className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-lime-600 dark:hover:text-lime-400 cursor-pointer"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditProduct(product)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-lime-500 hover:text-stone-950 text-xs font-semibold text-stone-800 dark:text-stone-100 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product)}
                          title="Delete"
                          className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-red-500 hover:border-red-500/40 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LOCATIONS */}
        {activeTab === 'locations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-2xl p-4">
              <div>
                <h2 className="text-sm font-display font-bold text-stone-900 dark:text-white">
                  Facility & Showroom Locations
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Displayed in Footer, Contact page, and Company Locations section.
                </p>
              </div>
              <button
                type="button"
                onClick={openCreateLocation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-lime-500 text-stone-950 text-xs font-display font-bold uppercase tracking-wider hover:brightness-105 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Location
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-display font-bold text-stone-900 dark:text-white">
                          {loc.title}
                        </h3>
                        {loc.isPrimary && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-lime-500/15 text-lime-700 dark:text-lime-300 border border-lime-500/30">
                            Primary
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                        {loc.city}, {loc.state}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {loc.fullAddress}
                    </p>

                    <div className="text-[11px] text-stone-500 dark:text-stone-400 space-y-0.5 pt-1">
                      <div>Phone: {loc.phone || '—'} • Email: {loc.email || '—'}</div>
                      <div>
                        Coords: {loc.coordinates.lat}, {loc.coordinates.lng} • PIN: {loc.pincode}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                    <button
                      type="button"
                      onClick={() => openEditLocation(loc)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-lime-500 hover:text-stone-950 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteLocation(loc)}
                      className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMPANY & CONTACT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Brand & Contact */}
            <div className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-display font-bold text-stone-900 dark:text-white">
                <Building2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                Brand & Contact Details
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    value={companyInfo.brandName}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, brandName: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Brand Subtitle
                  </label>
                  <input
                    type="text"
                    value={companyInfo.brandSubtitle}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, brandSubtitle: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Registered Name
                  </label>
                  <input
                    type="text"
                    value={companyInfo.registeredName}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, registeredName: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Slogan
                  </label>
                  <input
                    type="text"
                    value={companyInfo.slogan}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, slogan: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Phone (Digits for WhatsApp/tel) *
                  </label>
                  <input
                    type="text"
                    value={companyInfo.phone}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, phone: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Formatted Phone
                  </label>
                  <input
                    type="text"
                    value={companyInfo.formattedPhone}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, formattedPhone: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Primary Email *
                  </label>
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, email: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Sales Email
                  </label>
                  <input
                    type="email"
                    value={companyInfo.salesEmail}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, salesEmail: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Dealer Email
                  </label>
                  <input
                    type="email"
                    value={companyInfo.dealerEmail}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, dealerEmail: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={companyInfo.operatingHours}
                    onChange={(e) => {
                      setCompanyInfo({ ...companyInfo, operatingHours: e.target.value });
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={companyInfo.tagline}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, tagline: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  value={companyInfo.websiteUrl}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, websiteUrl: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                />
              </div>
            </div>

            {/* Narrative, Certifications & Legal */}
            <div className="rounded-2xl bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-display font-bold text-stone-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                Company Narrative & Legal
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={companyInfo.description}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, description: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Brand Story
                </label>
                <textarea
                  rows={3}
                  value={companyInfo.story}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, story: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1.5">
                  Certifications / Architecture Highlights
                </label>
                <div className="space-y-1.5 mb-2">
                  {companyInfo.certifications.map((cert, idx) => (
                    <div
                      key={`${cert}-${idx}`}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    >
                      <span className="truncate">{cert}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCompanyInfo({
                            ...companyInfo,
                            certifications: companyInfo.certifications.filter((_, i) => i !== idx),
                          });
                          setHasUnsavedChanges(true);
                        }}
                        className="text-stone-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertText}
                    onChange={(e) => setNewCertText(e.target.value)}
                    placeholder="Add certification or highlight..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newCertText.trim()) return;
                      setCompanyInfo({
                        ...companyInfo,
                        certifications: [...companyInfo.certifications, newCertText.trim()],
                      });
                      setNewCertText('');
                      setHasUnsavedChanges(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-lime-500 text-stone-950 text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Legal Disclaimer
                </label>
                <textarea
                  rows={2}
                  value={companyInfo.legalDisclaimer}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, legalDisclaimer: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={companyInfo.copyright}
                  onChange={(e) => {
                    setCompanyInfo({ ...companyInfo, copyright: e.target.value });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT EDITOR MODAL */}
      {isMounted &&
        editingProduct &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-[#0d0f12] border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h2 className="text-base sm:text-lg font-display font-black text-stone-900 dark:text-white">
                    {isNewProduct ? 'Add New Product' : `Edit ${editingProduct.name}`}
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    ID: {editingProduct.id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  aria-label="Close modal"
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-2 px-6 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 overflow-x-auto">
                {(
                  [
                    { key: 'general', label: 'General' },
                    { key: 'specs', label: 'Tech Specs' },
                    { key: 'features', label: 'Features & Vehicles' },
                    { key: 'images', label: 'Images' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setEditorTab(t.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                      editorTab === t.key
                        ? 'bg-lime-500 text-stone-950'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {editorTab === 'general' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                          Product ID (Slug) *
                        </label>
                        <input
                          type="text"
                          value={editingProduct.id}
                          disabled={!isNewProduct}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, id: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                          Category *
                        </label>
                        <select
                          value={editingProduct.category}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              category: e.target.value as 'battery' | 'charger',
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                        >
                          <option value="battery">Battery Pack</option>
                          <option value="charger">Charger</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, name: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={editingProduct.tag}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, tag: e.target.value })
                          }
                          placeholder="e.g. Popular EV Bike Battery"
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={editingProduct.tagline}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, tagline: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                      />
                    </div>
                  </div>
                )}

                {editorTab === 'specs' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      [
                        ['voltage', 'Voltage'],
                        ['capacity', 'Capacity'],
                        ['energyWh', 'Energy (Wh / Rating)'],
                        ['cellChemistry', 'Cell Chemistry / Type'],
                        ['cycleLife', 'Cycle Life / Duty'],
                        ['connectorType', 'Connector Type'],
                        ['chargingTime', 'Charging Time'],
                        ['weight', 'Weight'],
                        ['dimensions', 'Dimensions'],
                        ['enclosure', 'Enclosure'],
                        ['warranty', 'Warranty'],
                      ] as const
                    ).map(([field, label]) => (
                      <div key={field}>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                          {label}
                        </label>
                        <input
                          type="text"
                          value={editingProduct[field]}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, [field]: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {editorTab === 'features' && (
                  <div className="space-y-6">
                    {/* Features */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-400">
                        Key Features ({editingProduct.features.length})
                      </label>
                      <div className="space-y-1.5">
                        {editingProduct.features.map((feat, idx) => (
                          <div
                            key={`${feat}-${idx}`}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                          >
                            <span className="flex-1">{feat}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setEditingProduct({
                                  ...editingProduct,
                                  features: editingProduct.features.filter((_, i) => i !== idx),
                                })
                              }
                              className="text-stone-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={newFeatureText}
                          onChange={(e) => setNewFeatureText(e.target.value)}
                          placeholder="Add a key feature..."
                          className="flex-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newFeatureText.trim()) return;
                            setEditingProduct({
                              ...editingProduct,
                              features: [...editingProduct.features, newFeatureText.trim()],
                            });
                            setNewFeatureText('');
                          }}
                          className="px-4 py-2 rounded-xl bg-lime-500 text-stone-950 text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Ideal For Vehicles */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-400">
                        Ideal For Vehicles ({editingProduct.idealForVehicles.length})
                      </label>
                      <div className="space-y-1.5">
                        {editingProduct.idealForVehicles.map((veh, idx) => (
                          <div
                            key={`${veh}-${idx}`}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                          >
                            <span className="flex-1">{veh}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setEditingProduct({
                                  ...editingProduct,
                                  idealForVehicles: editingProduct.idealForVehicles.filter(
                                    (_, i) => i !== idx
                                  ),
                                })
                              }
                              className="text-stone-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={newVehicleText}
                          onChange={(e) => setNewVehicleText(e.target.value)}
                          placeholder="e.g. High-Speed Commuter EV Scooters"
                          className="flex-1 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newVehicleText.trim()) return;
                            setEditingProduct({
                              ...editingProduct,
                              idealForVehicles: [
                                ...editingProduct.idealForVehicles,
                                newVehicleText.trim(),
                              ],
                            });
                            setNewVehicleText('');
                          }}
                          className="px-4 py-2 rounded-xl bg-lime-500 text-stone-950 text-xs font-bold cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {editorTab === 'images' && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xs font-bold text-stone-700 dark:text-stone-200">
                          Assigned Product Images ({editingProduct.images.length})
                        </h3>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                          First image is used as the primary product thumbnail.
                        </p>
                      </div>
                      <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-lime-500 text-stone-950 text-xs font-bold cursor-pointer hover:brightness-105">
                        {uploadingImage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await handleImageUpload(file);
                            if (url) {
                              setEditingProduct((prev) =>
                                prev ? { ...prev, images: [...prev.images, url] } : prev
                              );
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>

                    {editingProduct.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {editingProduct.images.map((imgUrl, idx) => (
                          <div
                            key={`${imgUrl}-${idx}`}
                            className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-stone-50 dark:bg-stone-900"
                          >
                            <div className="relative h-28 w-full">
                              <Image
                                src={imgUrl}
                                alt={`Product image ${idx + 1}`}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <div className="p-2 flex items-center justify-between gap-1 text-[10px]">
                              <span className="truncate text-stone-500 dark:text-stone-400">
                                {idx === 0 ? 'Primary' : `#${idx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    images: editingProduct.images.filter((_, i) => i !== idx),
                                  })
                                }
                                className="text-red-500 font-semibold cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                      <div className="text-xs font-bold text-stone-600 dark:text-stone-400">
                        Quick-Pick from <code className="text-lime-600 dark:text-lime-400">public/images/products/</code>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {availableImages.map((imgUrl) => {
                          const selected = editingProduct.images.includes(imgUrl);
                          return (
                            <button
                              key={imgUrl}
                              type="button"
                              onClick={() => {
                                if (selected) return;
                                setEditingProduct({
                                  ...editingProduct,
                                  images: [...editingProduct.images, imgUrl],
                                });
                              }}
                              disabled={selected}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                                selected
                                  ? 'bg-lime-500/20 border-lime-500/40 text-lime-700 dark:text-lime-300 cursor-default'
                                  : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-lime-500/50'
                              }`}
                            >
                              {imgUrl.replace('/images/products/', '')}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-display font-bold uppercase text-stone-600 dark:text-stone-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditingProduct}
                  className="px-5 py-2 rounded-xl bg-lime-500 text-stone-950 text-xs font-display font-black uppercase tracking-wider cursor-pointer hover:brightness-105"
                >
                  Apply to Draft
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* LOCATION EDITOR MODAL */}
      {isMounted &&
        editingLocation &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-[#0d0f12] border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
                <h2 className="text-base font-display font-black text-stone-900 dark:text-white">
                  {isNewLocation ? 'Add Facility Location' : `Edit ${editingLocation.title}`}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditingLocation(null)}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Location ID *
                    </label>
                    <input
                      type="text"
                      value={editingLocation.id}
                      disabled={!isNewLocation}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, id: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={editingLocation.city}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, city: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={editingLocation.title}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, title: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={editingLocation.pincode}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, pincode: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editingLocation.phone ?? ''}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editingLocation.email ?? ''}
                      onChange={(e) =>
                        setEditingLocation({ ...editingLocation, email: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Address Lines (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={editingLocation.addressLines.join('\n')}
                    onChange={(e) =>
                      setEditingLocation({
                        ...editingLocation,
                        addressLines: e.target.value.split('\n').filter((l) => l.trim().length > 0),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    value={editingLocation.fullAddress}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, fullAddress: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={editingLocation.coordinates.lat}
                      onChange={(e) =>
                        setEditingLocation({
                          ...editingLocation,
                          coordinates: {
                            ...editingLocation.coordinates,
                            lat: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={editingLocation.coordinates.lng}
                      onChange={(e) =>
                        setEditingLocation({
                          ...editingLocation,
                          coordinates: {
                            ...editingLocation.coordinates,
                            lng: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 mb-1">
                    Google Maps URL
                  </label>
                  <input
                    type="text"
                    value={editingLocation.mapsUrl}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, mapsUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                  />
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingLocation.isPrimary)}
                    onChange={(e) =>
                      setEditingLocation({ ...editingLocation, isPrimary: e.target.checked })
                    }
                    className="rounded border-stone-300 text-lime-500 focus:ring-lime-500"
                  />
                  Mark as Primary Location
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                <button
                  type="button"
                  onClick={() => setEditingLocation(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-display font-bold uppercase text-stone-600 dark:text-stone-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditingLocation}
                  className="px-5 py-2 rounded-xl bg-lime-500 text-stone-950 text-xs font-display font-black uppercase tracking-wider cursor-pointer"
                >
                  Apply to Draft
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* CONFIRM DIALOG */}
      {isMounted &&
        confirmDialog &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            role="alertdialog"
            aria-modal="true"
          >
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0d0f12] border border-stone-200 dark:border-stone-800 p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-display font-black text-stone-900 dark:text-white">
                {confirmDialog.title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                {confirmDialog.message}
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-display font-bold uppercase text-stone-600 dark:text-stone-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-display font-black uppercase cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* TOAST */}
      {isMounted &&
        toast &&
        createPortal(
          <div
            role="status"
            className={`fixed bottom-6 right-6 z-[95] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border ${
              toast.type === 'success'
                ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/95 border-red-500/40 text-red-300'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>,
          document.body
        )}
    </div>
  );
}
