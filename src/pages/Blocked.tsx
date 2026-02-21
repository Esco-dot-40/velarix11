import React, { useEffect, useState } from 'react';
import { ShieldAlert, Globe, Lock, MapPin, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Blocked = () => {
    const [coords, setCoords] = useState('FETCHING_COORDINATES...');

    useEffect(() => {
        const interval = setInterval(() => {
            const lat = (Math.random() * 180 - 90).toFixed(4);
            const lon = (Math.random() * 360 - 180).toFixed(4);
            setCoords(`LOC: ${lat}N / ${lon}E`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#ff003c] font-mono flex items-center justify-center p-4 overflow-hidden relative selection:bg-[#ff003c] selection:text-black">
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-10 bg-gradient-to-b from-transparent via-[#ff003c]/20 to-transparent h-[100px] animate-[scanline_6s_linear_infinite]" />
            <style>{`
                @keyframes scanline {
                    0% { top: -100px; }
                    100% { top: 100%; }
                }
            `}</style>

            <div className="absolute inset-0 opacity-5 pointer-events-none z-20" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full border-2 border-[#ff003c] bg-[#1a1a1a]/80 p-8 md:p-12 relative backdrop-blur-xl shadow-[0_0_50px_rgba(255,0,60,0.2)]"
            >
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ff003c] -translate-x-2 -translate-y-2" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ff003c] translate-x-2 translate-y-2" />

                <div className="absolute -top-4 left-8 bg-[#050505] px-4 text-[10px] tracking-[0.3em] font-bold">
                    NEXUS_FIREWALL_PROTOCOL_V4.0.2
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <motion.div
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <ShieldAlert className="w-20 h-20" />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                            Transmission Intercepted
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StatusItem label="STATUS" value="REGION_BLOCKED" color="text-white" />
                        <StatusItem label="PROTOCOL" value="GEO-FIREWALL_ACTIVE" color="text-white" />
                        <StatusItem label="THREAT_LEVEL" value="RESTRICTED" color="text-[#ff003c] font-black" />
                        <StatusItem label="ENCRYPTION" value="STEALTH_ACTIVE" color="text-white" />
                    </div>

                    <div className="border-t border-white/10 pt-8 space-y-4 text-sm leading-relaxed text-zinc-400">
                        <p>
                            Your geographic location has been flagged by system security protocols.
                            Access to this infrastructure node from your current region is strictly prohibited by administrative mandate.
                        </p>
                        <div className="bg-red-950/20 border border-red-500/20 p-4 rounded text-[10px] uppercase font-bold text-[#ff003c]/80 flex gap-3 items-center">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            <span>
                                Unauthorized access attempts are logged. Your IP address and regional metadata
                                have been transmitted to the central security hub for forensic analysis.
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center pt-4">
                        <div className="text-[10px] text-zinc-600 mb-8 font-bold tracking-widest">
                            {coords}
                        </div>

                        <button
                            disabled
                            className="px-12 py-4 border border-[#ff003c]/30 text-[#ff003c]/30 uppercase font-black tracking-[0.2em] cursor-not-allowed text-xs"
                        >
                            Access_Denied
                        </button>
                        <p className="mt-4 text-[9px] text-zinc-700 uppercase">Return to local network or contact system administrator.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StatusItem = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className="bg-black/40 border border-white/5 p-4 flex flex-col space-y-1">
        <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase">{label}</span>
        <span className={`text-sm tracking-tight ${color}`}>{value}</span>
    </div>
);

export default Blocked;
