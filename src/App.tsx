import { useEffect, useRef } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ExternalLink,
  FileSpreadsheet,
  Gauge,
  Layers3,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SideFolder } from "@/components/ui/side-folder";
import SilkMeshShaderHero from "@/components/ui/silk-mesh-shader-hero";

const TRACKER_URL = `${import.meta.env.BASE_URL}tracker.html`;
const STANDALONE_TRACKER_URL = `${import.meta.env.BASE_URL}?view=tracker`;

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1p0IT9SCUBapme9S0K92e12GZklH9M4L1JdSbT0dA8SA/edit?gid=0#gid=0";

function App() {
  const trackerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const jumpToTracker = () => {
    trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // The supplied tracker is kept intact in an iframe so its existing Google Sheets
  // sync, project filters, sorting, parts tab and detail drawer continue to work.
  // Resize the same-origin frame to its content height to avoid nested scrollbars.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: ResizeObserver | undefined;
    let timeout = 0;

    const resizeFrame = () => {
      try {
        const doc = frame.contentDocument;
        if (!doc) return;
        const height = Math.max(
          920,
          doc.documentElement.scrollHeight,
          doc.body?.scrollHeight ?? 0,
        );
        frame.style.height = `${height}px`;
      } catch {
        // If the tracker is later hosted on another origin, its own scrolling remains available.
      }
    };

    const onLoad = () => {
      resizeFrame();
      try {
        const doc = frame.contentDocument;
        if (doc?.documentElement && "ResizeObserver" in window) {
          observer = new ResizeObserver(() => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(resizeFrame, 120);
          });
          observer.observe(doc.documentElement);
          if (doc.body) observer.observe(doc.body);
        }
      } catch {
        // Cross-origin fallback: the iframe keeps its viewport scrolling.
      }
    };

    frame.addEventListener("load", onLoad);
    return () => {
      frame.removeEventListener("load", onLoad);
      observer?.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  const standaloneTracker = new URLSearchParams(window.location.search).get("view") === "tracker";

  if (standaloneTracker) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-transparent text-slate-100">
        <SilkMeshShaderHero
          backgroundOnly
          palette={{ colors: ["#020814", "#07314a", "#0b6079", "#9beafa"], text: "#eafcff" }}
          speed={0.52}
          mesh={0.28}
          rings
          className="smh-background-only"
        />
        <div className="pointer-events-none fixed inset-0 z-[1] engineering-grid opacity-25" />
        <iframe
          ref={frameRef}
          src={TRACKER_URL}
          title="SAFEX engineering project and parts tracker"
          className="relative z-10 block w-full border-0 bg-transparent"
          style={{ minHeight: "100vh", background: "transparent" }}
          loading="eager"
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent text-slate-100">
      <SilkMeshShaderHero
        backgroundOnly
        palette={{
          colors: ["#020814", "#07314a", "#0b6079", "#9beafa"],
          text: "#eafcff",
        }}
        speed={0.52}
        mesh={0.28}
        rings
        className="smh-background-only"
      />
      <div className="pointer-events-none fixed inset-0 z-[1] engineering-grid opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-12 pt-5 sm:px-7 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-100/10 pb-5">
          <a href="#" className="group flex items-center gap-3 no-underline">
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,.12)]">
              <Wrench size={21} strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-sm font-black tracking-[0.24em] text-white">SAFEX</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Engineering Operations
              </div>
            </div>
          </a>

          <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            Operations workspace
          </div>
        </header>

        <section className="grid items-center gap-8 py-10 md:grid-cols-[1.2fr_.8fr] md:py-14">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">
              <Activity size={13} />
              Engineering project control
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Every vehicle program.
              <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                One clear view.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              A central workspace for engineering releases, OEM approvals,
              procurement readiness, prototype trials and production handover.
              Keep the work visible, find the next action quickly, and stay
              aligned across FAS, FDAS, FDSS and FAPS programs.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={jumpToTracker}
                className="group inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_8px_30px_rgba(34,211,238,.18)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Open project tracker
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={SHEET_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-500/40 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-200/50 hover:bg-cyan-200/[0.06]"
              >
                <FileSpreadsheet size={16} />
                Open source sheet
                <ExternalLink size={13} className="text-slate-400" />
              </a>
            </div>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              <div className="border-l border-cyan-300/40 pl-3">
                <div className="text-xl font-semibold text-white">08</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Project stages
                </div>
              </div>
              <div className="border-l border-cyan-300/40 pl-3">
                <div className="text-xl font-semibold text-white">05 min</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Auto refresh
                </div>
              </div>
              <div className="border-l border-cyan-300/40 pl-3">
                <div className="text-xl font-semibold text-white">01</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Shared workspace
                </div>
              </div>
            </div>
          </div>

          <aside className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-300/10 via-blue-400/[0.04] to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-cyan-100/15 bg-[#0b1c2d]/90 p-5 shadow-[0_25px_80px_rgba(0,0,0,.35)] backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200">
                    Document control
                  </div>
                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Engineering file vault
                  </h2>
                </div>
                <div className="rounded-lg border border-cyan-200/20 bg-cyan-200/[0.07] p-2 text-cyan-200">
                  <Layers3 size={18} />
                </div>
              </div>

              <div className="mx-auto mt-1 max-w-[330px]">
                <SideFolder
                  label="Glass blue engineering folder with three technical documents"
                />
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {["Drawings", "BOMs", "Wiring"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-500/30 bg-white/[0.035] px-2.5 py-1 text-[10px] font-medium tracking-wide text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-300" />
                  Structured project records
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200/80">
                  SAFEX / ENG
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          ref={trackerRef}
          id="tracker"
          className="scroll-mt-5 overflow-hidden rounded-2xl border border-cyan-100/15 bg-[#0b1a2a]/55 shadow-[0_28px_90px_rgba(0,0,0,.38)] backdrop-blur-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-100/10 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-cyan-200/20 bg-cyan-200/[0.07] p-2 text-cyan-200">
                <Gauge size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white sm:text-base">
                  Live project tracker
                </h2>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Projects, milestones, attention items and new parts
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Google Sheets source
              </span>
              <a
                href={STANDALONE_TRACKER_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-500/30 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-200/40 hover:text-cyan-100"
              >
                <ArrowDownToLine size={13} />
                Open tracker separately
              </a>
            </div>
          </div>

          <iframe
            ref={frameRef}
            src={TRACKER_URL}
            title="SAFEX engineering project and parts tracker"
            className="block w-full border-0 bg-transparent"
            style={{ minHeight: 920, background: "transparent" }}
            loading="eager"
          />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 px-1 pt-6 text-[10px] uppercase tracking-[0.16em] text-slate-500">
          <span>SAFEX Engineering Operations</span>
          <span>Project control · Technical documentation · Supply readiness</span>
        </footer>
      </div>
    </main>
  );
}

export default App;
