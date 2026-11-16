"use client";
import {
  Activity, BookOpenCheck, Building2, ClipboardList, FileBarChart2,
  GraduationCap, LayoutDashboard, MapPinned, ShieldCheck, Users, Wallet
} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
const menu = [
  ["Overview", LayoutDashboard],
  ["Schools", GraduationCap],
  ["Beneficiaries", Users],
  ["Infrastructure", Building2],
  ["Workplans & Activities", ClipboardList],
  ["Finance", Wallet],
  ["Monitoring & Evaluation", Activity],
  ["Field Visits", MapPinned],
  ["Safeguarding & GRM", ShieldCheck],
  ["Reports", FileBarChart2]
] as const;

const cards = [
  ["Participating schools", "—", "School register not yet populated", GraduationCap],
  ["Girls supported", "—", "Beneficiary register not yet populated", Users],
  ["Infrastructure projects", "—", "Project register not yet populated", Building2],
  ["Monitoring visits", "—", "Field reports not yet submitted", MapPinned]
] as const;

export default function Home() {
  const [activePage, setActivePage] = useState("Overview");
  const router = useRouter();
  return (
    <main className="min-h-screen md:flex">
      <aside className="w-full bg-[#102b4e] p-5 text-white md:min-h-screen md:w-[250px]">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2"><GraduationCap size={26}/></div>
          <div><div className="text-lg font-bold tracking-wide">AGILE-PMIS</div><div className="text-xs text-blue-100">Zamfara State</div></div>
        </div>
        <div className="mb-3 text-xs uppercase tracking-widest text-blue-200">Programme workspace</div>
        <nav className="grid grid-cols-2 gap-1 md:block">
  {menu.map(([label, Icon]) => (
  <button
    key={label}
    type="button"
    onClick={() => {
  if (label === "Overview") {
    router.push("/");
  } else if (label === "Schools") {
    router.push("/schools");
  } else {
    setActivePage(label);
  }
}}
    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left ${
      activePage === label
        ? "bg-white/20 text-white"
        : "text-blue-100 hover:bg-white/10"
    }`}
  >
    <Icon size={17} />
    {label}
  </button>
))}
        </nav>
        <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-3 text-xs leading-5 text-blue-100">
          Secure programme workspace<br/>Prototype foundation — no live records yet.
        </div>
      </aside>
      <section className="min-w-0 flex-1 p-5 md:p-8">
        {activePage === "Overview" ? (
<>        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div><div className="text-sm text-slate-500">Zamfara State Implementation</div><h1 className="mt-1 text-2xl font-bold text-slate-900">Programme dashboard</h1></div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">System setup mode</div>
        </header>
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#173e68] to-[#245c83] p-6 text-white">
          <div className="text-sm text-blue-100">Adolescent Girls Initiative for Learning and Empowerment</div>
          <h2 className="mt-2 text-2xl font-bold">Welcome to AGILE-PMIS</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">A centralized platform for programme planning, school infrastructure, girls’ empowerment, financial management, field monitoring and results reporting across Zamfara State.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(([title, value, note, Icon]) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-sm text-slate-500">{title}</span><Icon size={20} className="text-blue-700"/></div>
              <div className="mt-4 text-3xl font-bold text-slate-900">{value}</div>
              <div className="mt-2 text-xs text-slate-500">{note}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
            <h3 className="font-semibold text-slate-900">Programme implementation status</h3>
            <p className="mt-1 text-sm text-slate-500">Performance indicators will appear after verified records are entered.</p>
            <div className="mt-6 space-y-5">
              {["Physical implementation", "Financial performance", "Girls’ enrolment and retention", "Field monitoring coverage"].map(x => (
                <div key={x}><div className="mb-2 flex justify-between text-sm"><span>{x}</span><span className="text-slate-400">Awaiting data</span></div><div className="h-2 rounded-full bg-slate-100"/></div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Setup checklist</h3>
            <div className="mt-4 space-y-4 text-sm">
              {["Create project repository", "Connect Neon PostgreSQL", "Configure user authentication", "Register schools and projects", "Onboard programme officers"].map((x, i) => (
                <div key={x} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">{i+1}</span><span className="text-slate-600">{x}</span></div>
              ))}
            </div>
          </div>
        </div>
        <footer className="mt-8 flex items-center gap-2 text-xs text-slate-400"><BookOpenCheck size={14}/> AGILE-PMIS • Initial interface scaffold • Not yet approved for operational data</footer>
      </>
) : (
<div className="min-h-[70vh]">
  <div className="mb-6">
    <p className="text-sm text-slate-500">
      AGILE-PMIS / Zamfara State
    </p>
    <h1 className="mt-2 text-2xl font-bold text-slate-900">
      {activePage}
    </h1>
    <p className="mt-2 text-sm text-slate-600">
      Manage and monitor {activePage.toLowerCase()} activities
      across Zamfara State.
    </p>
  </div>

  <div className="rounded-xl border border-slate-200 bg-white p-6">
    <h2 className="text-lg font-semibold text-slate-800">
      {activePage} Management
    </h2>
    <p className="mt-2 text-sm text-slate-500">
      This module is ready for its functional forms,
      records and database integration.
    </p>
  </div>
</div>
)}
      </section>
    </main>
  );
}
