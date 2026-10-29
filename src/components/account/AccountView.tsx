"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  Edit2,
  Plus,
  X,
  Check,
  User,
  Lock,
  Trash2,
  Map,
} from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";

const tabs = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

interface Address {
  id: string;
  label: string;
  primary: boolean;
  line: string;
  area: string;
  phone: string;
}

interface OrderProduct {
  id: string | number;
  name: string;
  price: number;
  image?: string | null;
}

interface OrderItem {
  product: OrderProduct;
  quantity: number;
}

interface OrderHistoryItem {
  orderId: string;
  date: string;
  items: OrderItem[];
  subtotal?: number;
  deliveryFee?: number;
  total: number;
  customer?: {
    name: string;
    phone: string;
    address: string;
  };
}

interface DisplayOrder {
  id: string;
  date: string;
  status: string;
  statusTone: "gold" | "green";
  items: number;
  total: number;
  eta: string;
  isMock?: boolean;
  originalData?: OrderHistoryItem;
}

const initialMockAddresses: Address[] = [
  {
    id: "a1",
    label: "Home",
    primary: true,
    line: "Road 54, House 12, Floor 4B",
    area: "Gulshan 1, Dhaka 1212",
    phone: "01712-345678",
  },
  {
    id: "a2",
    label: "Office",
    primary: false,
    line: "Plot 12, Road 11, Banani C/A",
    area: "Banani, Dhaka 1213",
    phone: "01712-345678",
  },
];

const mockOrdersFallback: DisplayOrder[] = [
  {
    id: "NK-48291",
    date: "Today · 2:14 PM",
    status: "Out for Delivery",
    statusTone: "gold",
    items: 3,
    total: 1755,
    eta: "Within 28 mins",
    isMock: true,
  },
  {
    id: "NK-48102",
    date: "Yesterday · 6:40 PM",
    status: "Delivered",
    statusTone: "green",
    items: 5,
    total: 2340,
    eta: "Delivered 7:12 PM",
    isMock: true,
  },
];

const statusClass = {
  gold: "bg-amber-50 text-amber-700 border-amber-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  red: "bg-rose-50 text-rose-700 border-rose-200",
};

const emptyAddress: Address = {
  id: "",
  label: "Home",
  primary: false,
  line: "",
  area: "",
  phone: "",
};

export default function AccountView() {
  const router = useRouter();
  const { wishlist, addToCart } = useShop();
  const { user, login, logout } = useAuth();

  // Basic States
  const [mounted, setMounted] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [authForm, setAuthForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("orders");

  // Custom Toast State
  const [toast, setToast] = useState({ show: false, message: "" });
  
  // Data States
  const [realOrders, setRealOrders] = useState<OrderHistoryItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  
  // Modals & Inline Edit States
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<DisplayOrder | null>(null);
  const [addressModal, setAddressModal] = useState<{isOpen: boolean, mode: "add" | "edit", data: Address}>({
    isOpen: false,
    mode: "add",
    data: emptyAddress
  });
  
  // Settings Inline Edit
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [userLang, setUserLang] = useState("English / বাংলা");

  const showToast = (msg: string) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);

      // Load Orders
      try {
        const storedOrders = localStorage.getItem("niketan_orders");
        if (storedOrders) {
          const parsed: OrderHistoryItem[] = JSON.parse(storedOrders);
          setRealOrders([...parsed].reverse());
        }
      } catch (err) {
        console.error("Error loading orders", err);
      }

      // Load Addresses
      try {
        const storedAddrs = localStorage.getItem("niketan_addresses");
        if (storedAddrs) {
          setAddresses(JSON.parse(storedAddrs));
        } else {
          setAddresses(initialMockAddresses);
          localStorage.setItem("niketan_addresses", JSON.stringify(initialMockAddresses));
        }
      } catch (err) {
        console.error("Error loading addresses", err);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [user]);

  if (!mounted) return null;

  // --- Auth Logic ---
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginView) {
      login({
        name: "Tanvir Ahmed",
        email: authForm.email,
        phone: "01712-345678",
      });
      showToast("Signed in successfully!");
    } else {
      login({
        name: authForm.name,
        email: authForm.email,
        phone: authForm.phone,
      });
      showToast("Account created successfully!");
    }
  };

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-12 text-brand-dark">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-brand-dark mb-2">
              {isLoginView ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-stone-500">
              {isLoginView
                ? "Sign in to access your orders and wishlist."
                : "Join Niketan Mart for a fresh experience."}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-stone-400" size={16} />
                  <input required type="text" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} className="w-full border border-stone-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:border-brand-gold outline-none" placeholder="John Doe" />
                </div>
              </div>
            )}
            {!isLoginView && (
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 text-stone-400" size={16} />
                  <input required type="tel" value={authForm.phone} onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })} className="w-full border border-stone-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:border-brand-gold outline-none" placeholder="01712-345678" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-stone-400" size={16} />
                <input required type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="w-full border border-stone-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:border-brand-gold outline-none" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-stone-400" size={16} />
                <input required type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} className="w-full border border-stone-200 rounded-lg pl-10 pr-3 py-2.5 text-sm focus:border-brand-gold outline-none" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-colors mt-2">
              {isLoginView ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-500">
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-brand-gold hover:underline">
              {isLoginView ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Display Preparations ---
  const displayOrders: DisplayOrder[] = realOrders.length > 0
    ? realOrders.map((o, idx) => ({
        id: o.orderId,
        date: o.date,
        status: idx === 0 ? "Processing" : "Delivered",
        statusTone: (idx === 0 ? "gold" : "green") as "gold" | "green",
        items: o.items.reduce((acc, item) => acc + item.quantity, 0),
        total: o.total,
        eta: idx === 0 ? "Awaiting dispatch" : "Successfully delivered",
        isMock: false,
        originalData: o,
      }))
    : mockOrdersFallback;

  // --- Address Handlers ---
  const handleAddressSave = (e: React.FormEvent) => {
    e.preventDefault();
    let newAddrs = [...addresses];
    
    if (addressModal.data.primary) {
      newAddrs = newAddrs.map(a => ({ ...a, primary: false }));
    }

    if (addressModal.mode === "add") {
      const newId = `a${Date.now()}`;
      newAddrs.push({ ...addressModal.data, id: newId });
      showToast("Address added successfully!");
    } else {
      newAddrs = newAddrs.map(a => a.id === addressModal.data.id ? addressModal.data : a);
      showToast("Address updated!");
    }
    
    setAddresses(newAddrs);
    localStorage.setItem("niketan_addresses", JSON.stringify(newAddrs));
    setAddressModal({ isOpen: false, mode: "add", data: emptyAddress });
  };

  const deleteAddress = (id: string) => {
    const newAddrs = addresses.filter(a => a.id !== id);
    setAddresses(newAddrs);
    localStorage.setItem("niketan_addresses", JSON.stringify(newAddrs));
    showToast("Address removed.");
  };

  // --- Settings Handlers ---
  const startEditing = (key: string, currentVal: string) => {
    setEditingField(key);
    setEditValue(currentVal);
  };

  const saveSetting = () => {
    if (!editingField) return;
    if (editingField === "language") {
      setUserLang(editValue);
    } else {
      login({ ...user, [editingField]: editValue });
    }
    setEditingField(null);
    showToast("Setting updated!");
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-brand-dark pb-20 relative">
      
      {/* Global Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-brand-dark text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-bold">
            <Check size={16} className="text-brand-gold" />
            {toast.message}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-360 items-center gap-1.5 px-4 py-2.5 text-xs text-stone-500 lg:px-8">
          <Link href="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-brand-dark">My Account</span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-4 py-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark text-xl font-bold text-white uppercase shadow-inner">
              {user.name.substring(0, 2)}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                Niketan Member
              </p>
              <h1 className="text-xl font-bold text-brand-dark sm:text-2xl">{user.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1"><Phone size={12} /> {user.phone}</span>
                <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/wishlist" className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-brand-dark hover:border-brand-gold">
              <Heart size={14} /> Wishlist
            </Link>
            <button onClick={() => setTab("settings")} className="flex items-center gap-1.5 rounded-full bg-brand-dark px-4 py-2 text-xs font-bold text-white hover:bg-stone-800">
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { n: displayOrders.length.toString(), l: "Total Orders" },
            { n: `৳${displayOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, l: "Lifetime Spent" },
            { n: addresses.length.toString(), l: "Saved Addresses" },
            { n: wishlist.length.toString(), l: "Wishlist Items" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-center shadow-xs">
              <p className="text-lg font-bold text-brand-dark">{s.n}</p>
              <p className="text-[11px] text-stone-500">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
          
          {/* Sidebar */}
          <aside className="h-fit space-y-1 rounded-2xl border border-stone-200 bg-white p-2 shadow-xs">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                  tab === id ? "bg-brand-dark text-white shadow-sm" : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
            <div className="my-2 border-t border-stone-100" />
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </aside>

          {/* Main Content Areas */}
          <section className="min-w-0">
            
            {/* ORDERS TAB */}
            {tab === "orders" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-brand-dark">Order History (অর্ডার ইতিহাস)</h2>
                  <span className="text-xs text-stone-400">{displayOrders.length} orders</span>
                </div>
                {displayOrders.map((o) => (
                  <article key={o.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-bold text-brand-dark">#{o.id}</p>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusClass[o.statusTone]}`}>
                            {o.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-500">{o.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-brand-dark">৳{o.total.toLocaleString()}</p>
                        <p className="text-[11px] text-stone-400">{o.items} items</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3">
                      <p className="flex items-center gap-1.5 text-xs text-stone-600">
                        {o.statusTone === "gold" ? <Truck size={14} className="text-brand-gold" /> : <ShieldCheck size={14} className="text-emerald-600" />}
                        {o.eta}
                      </p>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setSelectedOrder(o)} className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-bold text-brand-dark hover:border-brand-gold">
                          View Details
                        </button>
                        {o.statusTone === "gold" && (
                          <button type="button" onClick={() => setTrackingOrder(o)} className="rounded-full bg-brand-dark px-3 py-1.5 text-xs font-bold text-white hover:bg-stone-800">
                            Track Order
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {tab === "addresses" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-brand-dark">Saved Addresses (ঠিকানা)</h2>
                  <button type="button" onClick={() => setAddressModal({ isOpen: true, mode: "add", data: emptyAddress })} className="flex items-center gap-1.5 rounded-full bg-brand-dark px-3.5 py-1.5 text-xs font-bold text-white hover:bg-stone-800">
                    <Plus size={14} /> Add New
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-2xl border border-stone-200">
                    <Map size={32} className="mx-auto text-stone-300 mb-2" />
                    <p className="text-sm font-bold text-brand-dark">No addresses saved</p>
                    <p className="text-xs text-stone-500 mt-1">Add an address for faster checkout.</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {addresses.map((a) => (
                      <div key={a.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs relative group">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase text-stone-600">{a.label}</span>
                            {a.primary && <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Primary</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => setAddressModal({ isOpen: true, mode: "edit", data: a })} className="text-xs font-bold text-brand-gold hover:underline">Edit</button>
                            <button type="button" onClick={() => deleteAddress(a.id)} className="text-stone-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-brand-dark">{a.line}</p>
                        <p className="mt-0.5 text-xs text-stone-500">{a.area}</p>
                        <p className="mt-2 flex items-center gap-1 text-xs text-stone-500"><Phone size={12} /> {a.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {tab === "wishlist" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-brand-dark">Wishlist (পছন্দের তালিকা)</h2>
                  {wishlist.length > 0 && (
                    <Link href="/wishlist" className="text-xs font-bold text-brand-gold hover:underline">View all →</Link>
                  )}
                </div>
                
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {wishlist.slice(0, 6).map((item) => (
                      <div key={String(item.id)} className="rounded-2xl border border-stone-200 bg-white p-3 shadow-xs">
                        <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image || "/placeholder.png"} alt={item.name} className="object-cover w-full h-full mix-blend-multiply" />
                        </div>
                        <h3 className="mt-2 line-clamp-2 text-xs font-bold text-brand-dark">{item.name}</h3>
                        <p className="mt-1 text-sm font-bold text-brand-dark">৳{item.price}</p>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item, 1);
                            showToast("Item added to bag!");
                          }}
                          className="mt-2 w-full rounded-full bg-brand-dark py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-brand-gold"
                        >
                          Add to Bag
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
                    <Heart size={36} className="mx-auto text-stone-300 mb-3" />
                    <p className="text-base font-bold text-brand-dark">Your wishlist is empty</p>
                    <p className="text-sm text-stone-500 mt-1 mb-5">Save your favorite items to view them later.</p>
                    <Link href="/" className="inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-2.5 text-xs font-bold text-white hover:bg-stone-800 transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {tab === "settings" && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-brand-dark">Account Settings</h2>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
                  {[
                    { key: "name", l: "Full Name", v: user.name },
                    { key: "email", l: "Email Address", v: user.email },
                    { key: "phone", l: "Mobile Number", v: user.phone },
                    { key: "language", l: "Language", v: userLang },
                  ].map((f) => (
                    <div key={f.key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 last:border-0 last:pb-0 gap-2">
                      <div className="flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-stone-400">{f.l}</p>
                        
                        {editingField === f.key ? (
                          <div className="mt-1.5 flex items-center gap-2 max-w-xs">
                            {f.key === "language" ? (
                              <select value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full border border-brand-gold rounded-lg px-2 py-1.5 text-sm outline-none bg-white font-semibold text-brand-dark">
                                <option>English / বাংলা</option>
                                <option>English Only</option>
                                <option>বাংলা (Bengali)</option>
                              </select>
                            ) : (
                              <input 
                                type={f.key === "email" ? "email" : "text"} 
                                value={editValue} 
                                onChange={(e) => setEditValue(e.target.value)} 
                                className="w-full border border-brand-gold rounded-lg px-2 py-1.5 text-sm outline-none font-semibold text-brand-dark bg-stone-50"
                                autoFocus
                              />
                            )}
                          </div>
                        ) : (
                          <p className="mt-0.5 text-sm font-semibold text-brand-dark">{f.v}</p>
                        )}
                      </div>
                      
                      {editingField === f.key ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingField(null)} className="text-xs font-bold text-stone-400 hover:text-stone-600">Cancel</button>
                          <button onClick={saveSetting} className="bg-brand-dark text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-stone-800">Save</button>
                        </div>
                      ) : (
                        <button onClick={() => startEditing(f.key, f.v)} className="text-xs font-bold text-brand-gold hover:underline self-start sm:self-auto">Change</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ADDRESS MODAL */}
      {addressModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">{addressModal.mode === "add" ? "Add New Address" : "Edit Address"}</h3>
              <button type="button" onClick={() => setAddressModal({ isOpen: false, mode: "add", data: emptyAddress })} className="text-stone-400 hover:text-brand-dark">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddressSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">Label</label>
                  <select 
                    value={addressModal.data.label} 
                    onChange={e => setAddressModal({ ...addressModal, data: { ...addressModal.data, label: e.target.value } })}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:border-brand-gold outline-none bg-white"
                  >
                    <option>Home</option>
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">Mobile Number</label>
                  <input required type="text" value={addressModal.data.phone} onChange={e => setAddressModal({ ...addressModal, data: { ...addressModal.data, phone: e.target.value } })} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:border-brand-gold outline-none" placeholder="01712..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1">Address Line</label>
                <input required type="text" value={addressModal.data.line} onChange={e => setAddressModal({ ...addressModal, data: { ...addressModal.data, line: e.target.value } })} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:border-brand-gold outline-none" placeholder="House 12, Road 5..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-1">Area / City</label>
                <input required type="text" value={addressModal.data.area} onChange={e => setAddressModal({ ...addressModal, data: { ...addressModal.data, area: e.target.value } })} className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:border-brand-gold outline-none" placeholder="Gulshan 1, Dhaka" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input type="checkbox" checked={addressModal.data.primary} onChange={e => setAddressModal({ ...addressModal, data: { ...addressModal.data, primary: e.target.checked } })} className="accent-brand-dark w-4 h-4" />
                <span className="text-sm text-brand-dark font-medium">Set as default address</span>
              </label>

              <button type="submit" className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-colors mt-2">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TRACKING MODAL */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-4 pb-0 sm:pb-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-brand-dark">Track Order</h3>
                <p className="text-xs text-stone-500">#{trackingOrder.id}</p>
              </div>
              <button type="button" onClick={() => setTrackingOrder(null)} className="p-2 bg-stone-50 rounded-full text-stone-400 hover:text-brand-dark">
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <div className="relative pl-6 space-y-6 border-l-2 border-brand-gold">
                {[
                  { title: "Order Confirmed", time: trackingOrder.date, done: true },
                  { title: "Processing", time: "Packing your items", done: true },
                  { title: "Out for Delivery", time: trackingOrder.eta, done: true, current: true },
                  { title: "Delivered", time: "Pending", done: false }
                ].map((step, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-4 border-white ${step.done ? "bg-brand-gold" : "bg-stone-200"} ${step.current ? "shadow-[0_0_0_4px_rgba(212,175,55,0.2)]" : ""}`} />
                    <p className={`text-sm font-bold ${step.done ? "text-brand-dark" : "text-stone-400"}`}>{step.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{step.time}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setTrackingOrder(null)} className="mt-8 w-full border border-stone-200 text-brand-dark font-bold py-2.5 rounded-xl hover:border-brand-dark transition-colors">
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div>
                <h3 className="font-bold text-brand-dark">Order #{selectedOrder.id}</h3>
                <p className="text-xs text-stone-500">{selectedOrder.date}</p>
              </div>
              <button type="button" onClick={() => setSelectedOrder(null)} className="p-2 rounded-full bg-white border border-stone-200 text-stone-400 hover:text-brand-dark">
                <X size={16} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto">
              {selectedOrder.originalData?.customer && (
                <div className="mb-5 bg-stone-50 rounded-xl p-4 border border-stone-100">
                  <p className="text-[11px] font-bold uppercase text-stone-400 mb-2">Delivery Details</p>
                  <p className="text-sm font-bold text-brand-dark">{selectedOrder.originalData.customer.name}</p>
                  <p className="text-xs text-stone-500 mt-1">{selectedOrder.originalData.customer.address}</p>
                  <p className="text-xs text-stone-500 mt-1">Phone: {selectedOrder.originalData.customer.phone}</p>
                </div>
              )}

              <p className="text-[11px] font-bold uppercase text-stone-400 mb-3 border-b border-stone-100 pb-2">Items</p>
              <div className="space-y-4 mb-6">
                {selectedOrder.isMock ? (
                  <div className="text-sm text-stone-600 flex justify-between">
                    <span>Assorted Groceries ({selectedOrder.items} items)</span>
                    <span className="font-bold text-brand-dark">৳{selectedOrder.total.toLocaleString()}</span>
                  </div>
                ) : (
                  selectedOrder.originalData?.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-12 h-12 bg-stone-100 rounded border border-stone-200 shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.product.image || "/placeholder.png"} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-bold text-brand-dark line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-brand-dark text-sm">৳{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-stone-100 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-brand-dark">Total Amount</span>
                <span className="text-lg font-bold text-brand-gold">৳{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="p-4 border-t border-stone-100 bg-stone-50">
              <button type="button" onClick={() => setSelectedOrder(null)} className="w-full bg-brand-dark text-white font-bold text-sm py-3 rounded-xl hover:bg-stone-800 transition-colors">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}