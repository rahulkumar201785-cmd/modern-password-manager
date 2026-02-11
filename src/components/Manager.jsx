import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit2, 
  Save, 
  Search, 
  Shield, 
  Plus, 
  Download, 
  Upload,
  RefreshCw,
  Check,
  X,
  Lock,
  Globe,
  User
} from 'lucide-react';

const Manager = () => {
  const passwordRef = useRef(null);
  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
    category: "social"
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Categories with colors
  const categories = {
    social: { color: "bg-blue-100 text-blue-700", icon: "👥" },
    banking: { color: "bg-green-100 text-green-700", icon: "🏦" },
    shopping: { color: "bg-purple-100 text-purple-700", icon: "🛒" },
    work: { color: "bg-orange-100 text-orange-700", icon: "💼" },
    other: { color: "bg-gray-100 text-gray-700", icon: "📁" }
  };

  useEffect(() => {
    const loadPasswords = () => {
      try {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
          setPasswordArray(JSON.parse(passwords));
        }
      } catch (error) {
        console.error("Error loading passwords:", error);
        toast.error('Error loading data', { theme: "dark" });
      }
      setIsLoaded(true);
    };
    loadPasswords();
  }, []);

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let validChars = chars;
    if (includeNumbers) validChars += nums;
    if (includeSymbols) validChars += syms;
    
    let generated = "";
    for (let i = 0; i < passwordLength; i++) {
      generated += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    
    setForm({ ...form, password: generated });
    toast.success('Password generated!', { theme: "dark", autoClose: 2000 });
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength++;
    if (password.length > 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const levels = [
      { text: "Very Weak", color: "bg-red-500", width: "20%" },
      { text: "Weak", color: "bg-orange-500", width: "40%" },
      { text: "Medium", color: "bg-yellow-500", width: "60%" },
      { text: "Strong", color: "bg-blue-500", width: "80%" },
      { text: "Very Strong", color: "bg-green-500", width: "100%" }
    ];
    return levels[strength] || levels[0];
  };

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied! ✅`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const savePassword = () => {
    if (!form.website || !form.username || !form.password) {
      toast.error('Please fill all fields ❌', {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    const newEntry = { 
      ...form, 
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    const updatedArray = [...passwordArray, newEntry];
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));

    setForm({ website: "", username: "", password: "", category: "social" });
    setShowGenerator(false);

    toast.success('Password saved securely! 🔒', {
      position: "top-right",
      theme: "dark",
      transition: Bounce,
    });
  };

  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      const updated = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updated);
      localStorage.setItem("passwords", JSON.stringify(updated));
      
      toast.success('Password deleted! 🗑️', {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const editPassword = (id) => {
    const item = passwordArray.find(item => item.id === id);
    if (item) {
      setForm({
        website: item.website,
        username: item.username,
        password: item.password,
        category: item.category || "social"
      });
      setPasswordArray(passwordArray.filter(item => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(passwordArray, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'passwords_backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Backup downloaded! 💾', { theme: "dark" });
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setPasswordArray(imported);
          localStorage.setItem("passwords", JSON.stringify(imported));
          toast.success('Data imported! 📥', { theme: "dark" });
        } catch (error) {
          toast.error('Invalid file format ❌', { theme: "dark" });
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredPasswords = passwordArray.filter(item => 
    item.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const strength = getPasswordStrength(form.password);

  if (!isLoaded) {
    return (
      <div className="min-h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">

        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="inline-flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-sm font-medium text-gray-300">Secure & Encrypted</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight pb-2">
            PassManager
          </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Your secure vault for managing passwords. Military-grade encryption for your peace of mind.
          </p>
        </div>

        {/* Main Input Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 md:p-8 mb-8 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
          <div className="grid gap-6">
            {/* Website Input */}
            <div className="relative group">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors" />
              <input 
                value={form.website} 
                onChange={handleChange} 
                placeholder='Enter Website URL' 
                className='w-full bg-slate-800/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all'
                type="text" 
                name="website" 
                id="website" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Username Input */}
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                <input 
                  value={form.username} 
                  onChange={handleChange} 
                  placeholder='Enter Username' 
                  className='w-full bg-slate-800/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all'
                  type="text" 
                  name="username" 
                  id="username" 
                />
              </div>

              {/* Password Input with Generator */}
              <div className="relative">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-400 transition-colors" />
                  <input 
                    ref={passwordRef}
                    value={form.password} 
                    onChange={handleChange} 
                    placeholder='Enter Password' 
                    className='w-full bg-slate-800/50 border border-white/10 rounded-xl py-4 pl-12 pr-24 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all'
                    type="text" 
                    name="password" 
                    id="password" 
                  />
                  <button
                    onClick={() => setShowGenerator(!showGenerator)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-all"
                    title="Generate Password"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Password Strength Bar */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Strength: {strength.text}</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strength.color} transition-all duration-500`} 
                        style={{ width: strength.width }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Password Generator Panel */}
            {showGenerator && (
              <div className="bg-slate-800/80 rounded-xl p-4 border border-white/10 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Password Generator</span>
                  <button onClick={generatePassword} className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
                    <RefreshCw className="w-4 h-4" /> Generate New
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-400">Length: {passwordLength}</span>
                  <input 
                    type="range" 
                    min="6" 
                    max="32" 
                    value={passwordLength} 
                    onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                    className="flex-1 accent-green-500"
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeNumbers} 
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="accent-green-500"
                    />
                    <span className="text-sm">Numbers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={includeSymbols} 
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="accent-green-500"
                    />
                    <span className="text-sm">Symbols</span>
                  </label>
                </div>
              </div>
            )}

            {/* Category Select */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, { color, icon }]) => (
                <button
                  key={key}
                  onClick={() => setForm({ ...form, category: key })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    form.category === key 
                      ? color + ' ring-2 ring-offset-2 ring-offset-slate-900 ring-white' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={savePassword} 
                className="flex-1 md:flex-none bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-200"
              >
                <Save className="w-5 h-5" />
                Save Password
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={exportData}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 px-6 rounded-xl flex items-center gap-2 transition-all"
                  title="Export Backup"
                >
                  <Download className="w-5 h-5" />
                </button>
                <label className="bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 px-6 rounded-xl flex items-center gap-2 transition-all cursor-pointer" title="Import Backup">
                  <Upload className="w-5 h-5" />
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search passwords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
          />
        </div>

        {/* Passwords Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Lock className="w-6 h-6 text-green-400" />
              Your Vault
              <span className="text-sm font-normal text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                {filteredPasswords.length} items
              </span>
            </h2>
          </div>

          {filteredPasswords.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 border-dashed">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-12 h-12 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No passwords found</p>
              <p className="text-gray-600 text-sm">Add your first password to get started</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPasswords.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categories[item.category]?.color || categories.other.color}`}>
                          {categories[item.category]?.icon || categories.other.icon} {item.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Website</label>
                          <div className="flex items-center gap-2 group/item">
                            <a href={item.website.startsWith('http') ? item.website : `https://${item.website}`} 
                               target="_blank" 
                               rel="noreferrer"
                               className="text-green-400 hover:text-green-300 font-medium truncate max-w-[200px]">
                              {item.website}
                            </a>
                            <button 
                              onClick={() => copyText(item.website, 'Website')}
                              className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Username</label>
                          <div className="flex items-center gap-2 group/item">
                            <span className="font-medium text-white">{item.username}</span>
                            <button 
                              onClick={() => copyText(item.username, 'Username')}
                              className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Password</label>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-white">
                              {visiblePasswords[item.id] ? item.password : '••••••••'}
                            </span>
                            <button 
                              onClick={() => togglePasswordVisibility(item.id)}
                              className="p-1 hover:bg-white/10 rounded transition-all"
                            >
                              {visiblePasswords[item.id] ? 
                                <EyeOff className="w-4 h-4 text-gray-400" /> : 
                                <Eye className="w-4 h-4 text-gray-400" />
                              }
                            </button>
                            <button 
                              onClick={() => copyText(item.password, 'Password')}
                              className="p-1 hover:bg-white/10 rounded transition-all"
                            >
                              <Copy className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => editPassword(item.id)}
                        className="p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deletePassword(item.id)}
                        className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Manager;