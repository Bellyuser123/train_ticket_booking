import { useEffect, useState } from "react";
import { checkHealth } from "../services/api";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Check Availability",
    desc: "View trains and see seats marked available after departure.",
  },
  {
    number: "02",
    title: "Request a Seat",
    desc: "Join the queue for a vacant seat on your current train.",
  },
  {
    number: "03",
    title: "Get Approved",
    desc: "The TTE verifies and assigns the seat to you in real time.",
  },
];

const Home = () => {
  const [health, setHealth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkHealth()
      .then((response) => {
        setHealth({ ok: true, msg: response.data || "Backend reachable" });
      })
      .catch(() => {
        setHealth({ ok: false, msg: "Cannot connect to backend at http://localhost:5000" });
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#080D1A] text-white font-sans">

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden">
        {/* subtle grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* amber glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-500/10 blur-[100px]" />

        <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-medium tracking-widest uppercase text-amber-400">
          Real-Time · Seat Reallocation · Live System
        </span>

        <h1
          className="text-6xl sm:text-7xl font-black tracking-tight leading-none mb-5"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Rapid<span className="text-amber-400">Sella</span>
        </h1>

        <p className="max-w-lg text-lg text-slate-300 mb-3 leading-relaxed">
          Real-time train seat reallocation system
        </p>
        <p className="max-w-md text-sm text-slate-500 mb-10 leading-relaxed">
          Find and claim vacant seats during your journey — verified and assigned
          by the TTE in real time.
        </p>

        <div className="flex flex-wrap gap-6 justify-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 mx-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 mx-2 rounded-lg border border-slate-600 hover:border-amber-500/50 hover:bg-white/5 text-slate-200 font-medium text-sm transition-colors"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/trains")}
            className="px-8 py-3 mx-2 rounded-lg border border-slate-700/60 hover:border-slate-600 text-slate-400 hover:text-slate-300 font-medium text-sm transition-colors"
          >
            Browse Trains →
          </button>
        </div>

        {/* backend status pill */}
        {health && (
          <div
            className={`mt-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border ${
              health.ok
                ? "bg-emerald-950/60 border-emerald-700/40 text-emerald-400"
                : "bg-red-950/60 border-red-700/40 text-red-400"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                health.ok ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {typeof health.msg === "string" ? health.msg : JSON.stringify(health.msg)}
          </div>
        )}
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 py-20 border-t border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-10 text-center">
            How it works
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-amber-500/30 transition-colors"
              >
                <span className="block text-3xl font-black text-amber-500/30 mb-4 leading-none">
                  {step.number}
                </span>
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Exists ── */}
      <section className="px-6 py-20 border-t border-slate-800/60">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-6">
            Why this exists
          </p>
          <p className="text-2xl font-light text-slate-200 leading-relaxed">
            Unused reserved seats go to waste{" "}
            <span className="text-slate-500">every day.</span>
          </p>
          <p className="mt-4 text-slate-400 leading-relaxed">
            RapidSella makes them accessible — fairly, transparently, and in real
            time. No more empty berths beside waiting passengers.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 py-8 text-center">
        <p className="text-xs text-slate-600">
          Built for real-time decision making inside live train systems.
        </p>
      </footer>
    </div>
  );
};

export default Home;