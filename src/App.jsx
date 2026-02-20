import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal as TerminalIcon,
  Trophy,
  ChevronRight,
  Settings,
  Cpu,
  Shield,
  Globe,
  Zap,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Command,
  Layout,
  TerminalSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { missions } from './data/missions';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Terminal = ({ onCommand, history, currentMission }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[500px] glass-morphism rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl relative">
      <div className="terminal-overlay opacity-30"></div>

      {/* Terminal Header */}
      <div className="bg-[#1c2128] px-4 py-2 flex items-center justify-between border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs font-mono text-gray-400 ml-2">bash — student@linux-arena</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500">
          <Settings size={14} className="hover:text-gray-300 cursor-pointer transition-colors" />
          <Layout size={14} className="hover:text-gray-300 cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 font-fira text-sm terminal-scroll overflow-y-auto bg-terminal/90 space-y-2"
      >
        <div className="text-accent-primary opacity-80 mb-4 animate-pulse">
          Welcome to RealCloudProjects Linux Arena v2.0.0
          <br />Type 'help' for available commands.
        </div>

        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-accent-secondary font-bold">➜</span>
              <span className="text-accent-primary font-bold">~</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            {item.output && (
              <div className={cn(
                "pl-6",
                item.isError ? "text-red-400" : "text-gray-400"
              )}>
                {item.output}
              </div>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
          <span className="text-accent-secondary font-bold">➜</span>
          <span className="text-accent-primary font-bold">~</span>
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-fira"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

const ProgressCard = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="glass-morphism p-6 rounded-2xl space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Mission Progress</h3>
          <p className="text-2xl font-bold font-outfit">{current} / {total}</p>
        </div>
        <Trophy className="text-yellow-500 animate-bounce" size={24} />
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/30">
          <span className="text-[10px] text-gray-500 block uppercase">Rank</span>
          <span className="text-sm font-semibold text-white">Junior Cloud Engineer</span>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-700/30">
          <span className="text-[10px] text-gray-500 block uppercase">XP Gained</span>
          <span className="text-sm font-semibold text-white">{current * 100} PX</span>
        </div>
      </div>
    </div>
  );
};

const MissionDetails = ({ mission }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mission.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="glass-morphism p-6 rounded-2xl border-l-[6px] border-accent-primary h-full flex flex-col justify-between"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-accent-primary/20 text-accent-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-accent-primary/30">
              Level {mission.id}
            </span>
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded border capitalize",
              mission.difficulty === 'Beginner' ? "text-green-400 border-green-500/30 bg-green-500/10" :
                mission.difficulty === 'Intermediate' ? "text-blue-400 border-blue-500/30 bg-blue-500/10" :
                  "text-purple-400 border-purple-500/30 bg-purple-500/10"
            )}>
              {mission.difficulty}
            </span>
          </div>

          <h2 className="text-2xl font-bold font-outfit text-white leading-tight">
            {mission.question}
          </h2>

          <div className="space-y-3">
            <div className="flex gap-3 text-sm">
              <div className="mt-1 shrink-0 p-1.5 bg-gray-700/50 rounded-lg">
                <Layout size={14} className="text-accent-secondary" />
              </div>
              <div>
                <span className="text-gray-500 text-xs block font-medium uppercase mb-1">Lesson</span>
                <p className="text-gray-200 leading-relaxed font-fira">{mission.lesson}</p>
              </div>
            </div>

            <div className="flex gap-3 text-sm">
              <div className="mt-1 shrink-0 p-1.5 bg-gray-700/50 rounded-lg">
                <Zap size={14} className="text-yellow-500" />
              </div>
              <div>
                <span className="text-gray-500 text-xs block font-medium uppercase mb-1">Why it matters</span>
                <p className="text-gray-400 italic text-xs leading-relaxed">{mission.why}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
            <BarChart3 size={14} />
            <span>Success Rate: 94%</span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <img
                key={i}
                src={`https://ui-avatars.com/api/?name=${i}&background=random&color=fff&size=24`}
                className="w-6 h-6 rounded-full border-2 border-background"
                alt="User"
              />
            ))}
            <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-background flex items-center justify-center text-[8px] font-bold text-gray-400">
              +12k
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [history, setHistory] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleCommand = (cmd) => {
    const mission = missions[currentLevel];
    const isCorrect = cmd.toLowerCase().trim() === mission.answer.toLowerCase();

    if (isCorrect) {
      setHistory(prev => [...prev, { cmd, output: mission.output }]);

      // Flash success
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3fb950', '#2188ff']
      });

      if (currentLevel < missions.length - 1) {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1);
        }, 1000);
      } else {
        setIsGameComplete(true);
      }
    } else {
      setHistory(prev => [...prev, {
        cmd,
        output: "Error: Invalid command for this mission. Hint: " + mission.lesson,
        isError: true
      }]);
    }

    if (cmd === 'help') {
      setHistory(prev => [...prev, { cmd, output: "Available commands mirror real Linux commands tailored for each mission. Complete your current task to proceed." }]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-main selection:bg-accent-primary/30">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-accent-primary/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-accent-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="border-b border-gray-800/50 py-4 px-6 mb-8 flex items-center justify-between glass-morphism sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-accent-primary to-accent-secondary p-2 rounded-xl shadow-lg relative">
            <TerminalSquare className="text-white" size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h1 className="text-lg font-extrabold font-outfit text-white tracking-tight">Linux Arena</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter -mt-1">By RealCloudProjects</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            {['Missions', 'Cloud Labs', 'Leaderboard', 'Docs'].map(item => (
              <a key={item} href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <button className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-accent-secondary hover:text-white transition-all transform active:scale-95 shadow-xl">
            Go Premium
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {!isGameComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Stats & Progress */}
            <div className="lg:col-span-3 space-y-6">
              <ProgressCard current={currentLevel + 1} total={missions.length} />

              <div className="glass-morphism p-6 rounded-2xl border border-gray-700/30">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-accent-secondary" />
                  Skill Tree
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Cloud Architecture', val: 12 },
                    { label: 'Security & Auth', val: 45 },
                    { label: 'Networking', val: 28 },
                    { label: 'Core Linux', val: currentLevel > 15 ? 85 : 45 }
                  ].map(skill => (
                    <div key={skill.label}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-gray-400 uppercase">{skill.label}</span>
                        <span className="text-white">{skill.val}%</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-secondary"
                          style={{ width: `${skill.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-white font-bold text-sm mb-2">Cloud Masterclass</h4>
                  <p className="text-gray-400 text-[10px] leading-relaxed mb-4">Unlock advanced missions and real AWS/Azure environments.</p>
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/10">
                    Learn More
                    <ChevronRight size={12} />
                  </button>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
                  <Globe size={48} className="text-white" />
                </div>
              </div>
            </div>

            {/* Middle Column - Terminal */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent-secondary">
                  <TerminalIcon size={18} />
                  <span className="text-sm font-bold tracking-widest uppercase">Kernel Access Terminal</span>
                </div>
                <Terminal
                  onCommand={handleCommand}
                  history={history}
                  currentMission={missions[currentLevel]}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <Cpu />, label: '8 Cores', val: 'Active' },
                  { icon: <Zap />, label: 'Latency', val: '12ms' },
                  { icon: <Shield />, label: 'Firewall', val: 'Secured' }
                ].map((stat, i) => (
                  <div key={i} className="glass-morphism p-4 rounded-xl flex items-center gap-3">
                    <div className="p-2 bg-gray-800 rounded-lg text-accent-secondary">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase">{stat.label}</div>
                      <div className="text-xs font-bold text-white">{stat.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Mission Details */}
            <div className="lg:col-span-3">
              <MissionDetails mission={missions[currentLevel]} />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20 glass-morphism rounded-3xl border-2 border-accent-primary/30 max-w-2xl mx-auto px-10 relative overflow-hidden"
          >
            <div className="terminal-overlay"></div>
            <div className="p-6 bg-accent-primary/20 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center border-2 border-accent-primary shadow-[0_0_30px_rgba(63,185,80,0.4)]">
              <CheckCircle2 color="#3fb950" size={48} />
            </div>
            <h1 className="text-4xl font-extrabold font-outfit text-white mb-4">Legend Unlocked!</h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Congratulations student. You have successfully completed the 100-mission Linux Arena.
              You are now ready to tackle real-world Cloud Infrastructure.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10 text-left">
              <div className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">XP EARNED</span>
                <span className="text-xl font-bold text-white">100,000</span>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">ACCURACY</span>
                <span className="text-xl font-bold text-white">98.2%</span>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">HOURS</span>
                <span className="text-xl font-bold text-white">14h 2m</span>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-accent-primary text-black font-extrabold rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(63,185,80,0.3)]"
            >
              Reset Terminal
            </button>
          </motion.div>
        )}
      </main>

      <footer className="mt-20 border-t border-gray-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 opacity-60">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TerminalSquare className="text-accent-primary" size={20} />
              <span className="font-outfit font-bold text-white tracking-widest uppercase text-sm italic">RCProjects</span>
            </div>
            <p className="text-xs leading-relaxed">
              Empowering engineers via interactive terminal-driven education. Level up your cloud games.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Platform</h5>
            <ul className="text-xs space-y-2">
              <li><a href="#" className="hover:text-accent-primary transition-colors">Linux Arena</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">DevSecOps Labs</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Career Pathways</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Resources</h5>
            <ul className="text-xs space-y-2">
              <li><a href="#" className="hover:text-accent-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Community Discord</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Technical Blog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Newsletter</h5>
            <p className="text-[10px] mb-4">Get the latest labs and missions delivered weekly.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="email@address.com" className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-[10px] flex-1 outline-none focus:border-accent-primary transition-colors" />
              <button className="p-2 bg-accent-primary text-black rounded-lg"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800/30 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          <p>© 2026 RealCloudProjects. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
