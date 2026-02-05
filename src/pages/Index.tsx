import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, UserCircle, Settings, ArrowRight, ArrowLeft, Mail, Phone, User, AlertTriangle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import heroBg from '@/assets/hero-bg.jpg';

type Mode = 'landing' | 'tourist-register' | 'tourist-login' | 'admin';

const Index = () => {
  const [mode, setMode] = useState<Mode>('landing');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerTourist, loginTourist, loginAdmin } = useApp();
  const navigate = useNavigate();

  // Tourist registration form
  const [regForm, setRegForm] = useState({
    name: '', email: '', phone: '', emergencyContact: '', emergencyPhone: '',
  });
  const [loginEmail, setLoginEmail] = useState('');

  const handleRegister = async () => {
    setError('');
    if (!regForm.name || !regForm.email || !regForm.phone || !regForm.emergencyContact || !regForm.emergencyPhone) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    await registerTourist(regForm);
    setLoading(false);
    navigate('/tourist');
  };

  const handleLogin = () => {
    setError('');
    if (!loginEmail) {
      setError('Email is required');
      return;
    }
    const success = loginTourist(loginEmail);
    if (success) {
      navigate('/tourist');
    } else {
      setError('Tourist not found. Please register first.');
    }
  };

  const handleAdminLogin = () => {
    loginAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {mode === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-3xl"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 glow-primary mb-6"
              >
                <Shield className="h-12 w-12 text-primary" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
                Smart Tourist Safety
                <span className="block text-gradient-primary">Monitoring System</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
                Real-time monitoring, automated incident detection, geo-fencing, and blockchain-verified digital identity for tourist safety.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <button
                  onClick={() => setMode('tourist-register')}
                  className="group bg-card border border-border rounded-xl p-6 text-left hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <UserCircle className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-foreground font-semibold mb-1">Tourist Portal</h3>
                  <p className="text-xs text-muted-foreground mb-3">Register or login as a tourist</p>
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Get Started <ArrowRight className="h-3 w-3" />
                  </span>
                </button>

                <button
                  onClick={handleAdminLogin}
                  className="group bg-card border border-border rounded-xl p-6 text-left hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <Settings className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-foreground font-semibold mb-1">Admin Portal</h3>
                  <p className="text-xs text-muted-foreground mb-3">Local authority dashboard</p>
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Enter Dashboard <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {(mode === 'tourist-register' || mode === 'tourist-login') && (
            <motion.div
              key="tourist-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <button
                onClick={() => { setMode('landing'); setError(''); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <UserCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Tourist Portal</h2>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-secondary/50 rounded-lg mb-5">
                  <button
                    onClick={() => { setMode('tourist-register'); setError(''); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                      mode === 'tourist-register' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Register
                  </button>
                  <button
                    onClick={() => { setMode('tourist-login'); setError(''); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                      mode === 'tourist-login' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Login
                  </button>
                </div>

                {error && (
                  <p className="text-sm text-danger bg-danger/10 border border-danger/20 rounded-md p-2 mb-4">{error}</p>
                )}

                {mode === 'tourist-register' ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="John Doe"
                          value={regForm.name}
                          onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={regForm.email}
                          onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="+1-555-0123"
                          value={regForm.phone}
                          onChange={e => setRegForm(p => ({ ...p, phone: e.target.value }))}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Emergency Contact Name</Label>
                      <div className="relative">
                        <AlertTriangle className="absolute left-3 top-2.5 h-4 w-4 text-warning" />
                        <Input
                          placeholder="Jane Doe"
                          value={regForm.emergencyContact}
                          onChange={e => setRegForm(p => ({ ...p, emergencyContact: e.target.value }))}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Emergency Contact Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-warning" />
                        <Input
                          placeholder="+1-555-0124"
                          value={regForm.emergencyPhone}
                          onChange={e => setRegForm(p => ({ ...p, emergencyPhone: e.target.value }))}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <Button onClick={handleRegister} disabled={loading} className="w-full bg-primary text-primary-foreground">
                      {loading ? 'Creating Digital Identity...' : 'Register & Get Digital ID'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={loginEmail}
                          onChange={e => setLoginEmail(e.target.value)}
                          className="pl-9"
                          onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        />
                      </div>
                    </div>
                    <Button onClick={handleLogin} className="w-full bg-primary text-primary-foreground">
                      Login
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Demo: try <span className="text-primary font-mono">alice@demo.com</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
