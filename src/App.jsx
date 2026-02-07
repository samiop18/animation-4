import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Code, Terminal, Cpu, Globe, Database, Shield, Smartphone, AlertOctagon, CheckCircle, Laptop, Keyboard, Mouse, AppWindow, Settings, X, Minus, Square } from 'lucide-react';
import RegisterButton from './components/RegisterButton';
import NeonSpeederLoader from './components/NeonSpeederLoader';

// Domain options
const DOMAINS = [
  { id: 'web', label: 'Web Dev', icon: Globe },
  { id: 'app', label: 'App Dev', icon: Smartphone },
  { id: 'game', label: 'Game Dev', icon: Cpu },
  { id: 'ai_ml', label: 'AI / ML', icon: Terminal },
  { id: 'cloud', label: 'Cloud', icon: Database },
  { id: 'cyber', label: 'Cybersecurity', icon: Shield },
  { id: 'cp', label: 'Competitive Programming', icon: Code },
  { id: 'outreach', label: 'Outreach', icon: null },
  { id: 'ui_ux', label: 'UI / UX', icon: null },
];

const BRANCHES = ["CSE", "CSE (AIML)", "Chemical", "Civil", "ETC", "EEE", "EE", "Mechanical", "MME", "Production"];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center px-6 md:px-12 fixed top-0 left-0 bg-deep-gray/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Enigma Logo" className="h-8 w-auto" />
        <span className="text-white font-geometric text-xl tracking-normal font-bold">ENIGMA</span>
      </div>
    </nav>
  );
}

const Input = ({ label, type = "text", placeholder, required, name, value, onChange, error, asterisk, font = "font-sans", prefix }) => (
  <motion.div variants={itemVariants} className="flex flex-col gap-1 w-full relative">
    <label className="text-[1.1rem] font-mono text-gray-400 uppercase tracking-widest">{label} {(required || asterisk) && <span className="text-neon">*</span>}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm pointer-events-none select-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-white/5 border-[1.5px] rounded px-3 h-14 leading-normal text-white focus:outline-none transition-all ${font} text-[1.1rem] placeholder-gray-600 w-full ${prefix ? 'pl-12' : ''} ${error ? 'border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : 'border-gray-800 focus:border-neon focus:shadow-[0_0_10px_rgba(0,230,118,0.2)]'}`}
      />
    </div>
    {error && <span className="text-red-500 text-xs font-mono mt-1 absolute -bottom-5 right-0">{error}</span>}
  </motion.div>
);

const Select = ({ label, options, required, name, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-1 w-full relative" ref={containerRef}>
      <label className="text-[1.1rem] font-mono text-gray-400 uppercase tracking-widest">{label} {required && <span className="text-[#3dfc2e]">*</span>}</label>
      <div className="relative">
        {/* Custom Select Trigger */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`appearance-none bg-[#0a0a0a] border-[1.5px] border-[#3dfc2e] rounded p-3 h-14 text-white transition-all font-mono text-[1.1rem] w-full cursor-pointer flex items-center justify-between ${isOpen ? 'shadow-[0_0_8px_#3dfc2e]' : ''}`}
        >
          <span className={value ? "text-white" : "text-gray-500"}>
            {value || `Select ${label}`}
          </span>
          <ChevronDown
            className={`text-[#3dfc2e] w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Dropdown Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full z-50 mt-2 bg-[rgba(10,10,10,0.95)] backdrop-blur-[10px] border border-[#3dfc2e] rounded-md overflow-hidden max-h-60 overflow-y-auto"
            >
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="px-3 py-3 text-[1.1rem] text-gray-300 font-mono cursor-pointer hover:bg-[#3dfc2e] hover:text-black transition-colors duration-200"
                >
                  {opt}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Floating Icons Component - Memoized to prevent re-renders
const FloatingIcons = React.memo(() => {
  const floatingItems = React.useMemo(() => {
    const icons = [
      Laptop, Keyboard, Mouse, Github, Code,
      Terminal, Database, Cpu, Globe, Shield,
      Smartphone, AlertOctagon, CheckCircle,
      AppWindow, Settings
    ];

    // Create 15 instances with random positions
    return Array.from({ length: 15 }).map((_, i) => ({
      Icon: icons[i % icons.length],
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
      size: Math.random() * 20 + 20, // 20-40px
      duration: Math.random() * 20 + 20, // 20-40s
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {floatingItems.map(({ Icon, id, x, y, size, duration, delay }) => (
        <motion.div
          key={id}
          className="absolute text-neon opacity-[0.12]"
          initial={{ x: `${x}vw`, y: `${y}vh`, rotate: 0 }}
          animate={{
            y: [`${y}vh`, `${(y + 50) % 100}vh`, `${y}vh`],
            x: [`${x}vw`, `${(x + 20) % 100}vw`, `${x}vw`],
            rotate: [0, 360],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            delay: delay
          }}
          style={{ width: size, height: size }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  );
});

// New Landing Page Component
const LandingPage = ({ onStart }) => {
  return (
    <motion.div
      className="min-h-screen bg-deep-gray flex flex-col items-center justify-center relative overflow-hidden font-sans z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: '-100vw', filter: "blur(10px)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <FloatingIcons />

      {/* Replicated Form Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-neon rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-3xl px-4 flex flex-col items-center gap-8">

        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <img src="/logo.png" alt="Enigma Logo" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_25px_rgba(0,230,118,0.4)] animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-['Montserrat'] font-bold text-white mt-4 tracking-wider" style={{ textShadow: '0 0 20px rgba(61, 252, 46, 0.6)' }}>
            ENIGMA
          </h1>
        </motion.div>

        {/* Action Area */}
        <div className="h-[120px] flex items-center justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <RegisterButton onClick={onStart} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Dedicated Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[60] bg-deep-gray flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100vw' }}
      transition={{ duration: 0.25, ease: "linear" }}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Background Elements for Continuity */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-neon rounded-full blur-[120px] opacity-20" />

      <NeonSpeederLoader />
    </motion.div>
  );
};

const App = () => {
  const [view, setView] = useState('landing'); // 'landing', 'loading', 'form'
  const [status, setStatus] = useState('form'); // 'form', 'processing', 'success' (internal to form view)
  const [loadingText, setLoadingText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    regDetails: '',
    whatsapp: '',
    email: '',
    branch: '',
    gender: '',
    github: '',
    skills: '',
    primaryDomain: '',
    secondaryDomain: '',
    achievements: '',
    projects: '',
    competitive: ''
  });
  const [errors, setErrors] = useState({});

  const handleCommandSuccess = () => {
    setView('loading');
  };

  const handleLoadingComplete = () => {
    setView('form');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.github) {
      newErrors.github = "Link Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Optional: shake effect or scroll to error could be added here
      return;
    }

    if (!formData.name || !formData.regDetails || !formData.whatsapp || !formData.email || !formData.branch || !formData.gender || !formData.skills || !formData.primaryDomain || !formData.secondaryDomain) {
      alert("Please fill all required fields.");
      return;
    }
    setStatus('processing');
  };

  React.useEffect(() => {
    if (status === 'processing') {
      const texts = ['Analyzing Identity...', 'Verifying GitHub Link...', 'Syncing with Enigma Database...'];
      let msgIndex = 0;
      setLoadingText(texts[0]);

      const interval = setInterval(() => {
        msgIndex++;
        if (msgIndex < texts.length) {
          setLoadingText(texts[msgIndex]);
        }
      }, 800);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setStatus('success');
      }, 2500);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [status]);

  // Main Render with AnimatePresence for Transitions
  return (
    <div className="relative min-h-screen bg-deep-gray font-sans selection:bg-neon selection:text-black overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingPage key="landing" onStart={handleCommandSuccess} />
        )}

        {view === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {view === 'form' && (
          <motion.div
            key="form-page"
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "linear" }}
            style={{ willChange: "transform, opacity" }}
            className="min-h-screen bg-deep-gray pt-28 pb-20 px-4 flex flex-col items-center relative w-full"
          >
            <Navbar />

            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon rounded-full blur-[150px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-neon rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-[1000px] z-10">
              <div className="text-center mb-14">
                <h1 className="text-5xl md:text-[5rem] font-geometric font-bold text-white tracking-normal leading-none block">
                  ENIGMA
                </h1>
                <h2 className="text-5xl md:text-[5rem] font-geometric font-bold text-neon tracking-normal leading-none block">
                  INDUCTION
                </h2>
              </div>

              {/* Form Content */}
              {status === 'form' && (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative group"
                >
                  {/* Animated Glowing Border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon to-green-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                  <div className="relative bg-dark rounded-lg border-[1.5px] border-transparent p-6 md:p-12 shadow-[0_0_40px_rgba(0,230,118,0.1)]">
                    {/* SVG Border Animation */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-lg overflow-visible">
                      <motion.rect
                        x="0.75" y="0.75"
                        width="calc(100% - 1.5px)"
                        height="calc(100% - 1.5px)"
                        rx="8"
                        fill="none"
                        stroke="#3dfc2e"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </svg>

                    <motion.form
                      className="space-y-16"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >

                      {/* Section 1: Core Info */}
                      <motion.div
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.1 } }
                        }}
                      >
                        <motion.h3 variants={itemVariants} className="text-neon font-['Montserrat'] font-semibold text-2xl border-b border-white/10 pb-2">CORE INFO</motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                          <Input label="Registration No" name="regDetails" value={formData.regDetails} onChange={handleChange} placeholder="250XXXXXXX" font="font-mono" required />
                          <Input label="Whatsapp Number" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="XXXXX XXXXX" prefix="+91" required />
                          <Input label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="enigma@gmail.com" required />
                        </div>
                      </motion.div>

                      {/* Section 2: Selection */}
                      <motion.div
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                        }}
                      >
                        <motion.h3 variants={itemVariants} className="text-neon font-['Montserrat'] font-semibold text-2xl border-b border-white/10 pb-2">CLASSIFICATION</motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Select label="Branch" name="branch" options={BRANCHES} value={formData.branch} onChange={handleChange} required />

                          <motion.div variants={itemVariants} className="flex flex-col gap-1 w-full">
                            <label className="text-[1.1rem] font-mono text-gray-400 uppercase tracking-widest">Gender <span className="text-neon">*</span></label>
                            <div className="flex gap-6 mt-3">
                              {['Male', 'Female'].map((g) => (
                                <label key={g} className="flex items-center gap-2 text-white cursor-pointer group">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={g.toLowerCase()}
                                    checked={formData.gender === g.toLowerCase()}
                                    onChange={handleChange}
                                    className="accent-neon w-4 h-4 cursor-pointer"
                                    required
                                  />
                                  <span className="text-[1.1rem] font-sans group-hover:text-neon transition-colors">{g}</span>
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Section 3: Technical */}
                      <motion.div
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
                        }}
                      >
                        <motion.h3 variants={itemVariants} className="text-neon font-['Montserrat'] font-semibold text-2xl border-b border-white/10 pb-2">TECHNICAL SPECS</motion.h3>
                        <Input
                          label="Github Profile"
                          name="github"
                          value={formData.github}
                          onChange={handleChange}
                          placeholder="https://github.com/..."
                          // Removed 'required' attribute to allow custom validation triggering the error state on submit
                          error={errors.github}
                          asterisk
                        />

                        <motion.div variants={itemVariants} className="flex flex-col gap-1 w-full">
                          <label className="text-[1.1rem] font-mono text-gray-400 uppercase tracking-widest">Skills <span className="text-neon">*</span></label>
                          <textarea
                            className="bg-white/5 border-[1.5px] border-gray-800 rounded p-3 text-white focus:border-neon focus:outline-none focus:shadow-[0_0_10px_rgba(0,230,118,0.2)] transition-all font-sans text-[1.1rem] placeholder-gray-600 w-full min-h-[100px]"
                            placeholder="List your programming languages, frameworks, or tools..."
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Select
                            label="Primary Domain"
                            name="primaryDomain"
                            options={DOMAINS.map(d => d.label)}
                            value={formData.primaryDomain}
                            onChange={handleChange}
                            required
                          />
                          <Select
                            label="Secondary Domain"
                            name="secondaryDomain"
                            options={DOMAINS.map(d => d.label)}
                            value={formData.secondaryDomain}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Section 4: Optional */}
                      <motion.div
                        className="space-y-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
                        }}
                      >
                        <motion.h3 variants={itemVariants} className="text-neon font-['Montserrat'] font-semibold text-2xl border-b border-white/10 pb-2">OPTIONAL DATA</motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input label="Academic Achievements" name="achievements" value={formData.achievements} onChange={handleChange} placeholder="Hackathon wins, ranks..." />
                          <Input label="Projects Link" name="projects" value={formData.projects} onChange={handleChange} placeholder="Hosted link or Drive folder" />
                          <Input label="Codeforces/Leetcode" name="competitive" value={formData.competitive} onChange={handleChange} placeholder="Profile Links" />
                        </div>
                      </motion.div>

                      <motion.div className="pt-6" variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
                        <button
                          type="submit"
                          className="w-full bg-neon text-dark font-mono font-bold text-xl h-16 rounded hover:brightness-110 shadow-[0_0_15px_rgba(0,230,118,0.4)] transition-all duration-300 transform active:scale-[0.99] uppercase tracking-[0.15em] relative overflow-hidden group cursor-pointer"
                        >
                          Initialize Registration
                        </button>
                      </motion.div>

                    </motion.form>
                  </div>
                </motion.div>
              )}

              {/* Status Modals */}
              {status === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                  <div className="w-full max-w-md bg-[rgba(30,30,30,0.9)] border border-neon rounded-lg p-8 shadow-[0_0_30px_rgba(0,230,118,0.3)] flex flex-col items-center justify-center min-h-[200px]">
                    <Terminal size={48} className="text-neon mb-6 animate-pulse" />
                    <motion.p
                      key={loadingText}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white font-mono text-lg text-center"
                    >
                      {loadingText}
                    </motion.p>
                    <div className="mt-6 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-neon"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "linear" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                  <div className="w-full max-w-md bg-[rgba(25,25,25,0.95)] border-2 border-[#00e676] rounded-xl p-8 shadow-[0_0_50px_rgba(0,230,118,0.3)] flex flex-col items-center text-center relative overflow-hidden">
                    {/* Glow effect background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-[#00e676] blur-[100px] opacity-20 pointer-events-none"></div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                      className="mb-6 relative"
                    >
                      <div className="absolute inset-0 bg-[#00e676] blur-[30px] opacity-40 rounded-full"></div>
                      <CheckCircle size={56} className="text-[#00e676] relative z-10" />
                    </motion.div>

                    <h2 className="text-xl md:text-2xl font-geometric font-extrabold text-white tracking-wide mb-2 leading-tight">
                      REGISTRATION<br />SUCCESSFUL
                    </h2>

                    <div className="w-full h-px bg-white/10 my-6"></div>

                    <div className="w-full space-y-3">
                      <a
                        href="https://discord.gg/UQdETSgSa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full bg-[#5865F2] hover:bg-[#4752c4] border border-[#5865F2] hover:border-white/30 text-white font-sans font-bold text-lg py-4 rounded-lg shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_40px_rgba(88,101,242,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.976 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                        </svg>
                        JOIN OUR DISCORD
                      </a>
                      <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                        to explore crazy tasks
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
