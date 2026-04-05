// ── Constants ─────────────────────────────────────────────────────────────────

const THEMES = {
  dark:  { bg:"#0d1117", surface:"#161b22", surface2:"#21262d", border:"#30363d", text:"#e6edf3", muted:"#8b949e", accent:"#58a6ff", inp:{background:"#0d1117",color:"#e6edf3",border:"1.5px solid #30363d"} },
  light: { bg:"#f6f8fa", surface:"#ffffff", surface2:"#f0f3f6", border:"#d0d7de", text:"#1c2128", muted:"#656d76", accent:"#0969da", inp:{background:"#ffffff",color:"#1c2128",border:"1.5px solid #d0d7de"} },
};

const DEST = {
  savings_acct:{label:"Savings Acct.", icon:"🏦",color:"#3fb950",bg:"rgba(63,185,80,0.1)",  border:"rgba(63,185,80,0.3)"},
  credit_card: {label:"Credit Card",   icon:"💳",color:"#ec4899",bg:"rgba(236,72,153,0.12)",border:"rgba(236,72,153,0.3)"},
  rent:        {label:"Rent/Mortgage", icon:"🏠",color:"#3b82f6",bg:"rgba(59,130,246,0.1)", border:"rgba(59,130,246,0.3)"},
  utilities:   {label:"Utilities",     icon:"⚡",color:"#f59e0b",bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.3)"},
  auto:        {label:"Auto Payment",  icon:"🚗",color:"#f97316",bg:"rgba(249,115,22,0.1)", border:"rgba(249,115,22,0.3)"},
  insurance:   {label:"Insurance",     icon:"🛡️",color:"#6366f1",bg:"rgba(99,102,241,0.1)", border:"rgba(99,102,241,0.3)"},
  groceries:   {label:"Groceries",     icon:"🛒",color:"#22c55e",bg:"rgba(34,197,94,0.1)",  border:"rgba(34,197,94,0.3)"},
  subscription:{label:"Subscription",  icon:"📱",color:"#8b5cf6",bg:"rgba(139,92,246,0.1)", border:"rgba(139,92,246,0.3)"},
  gas:         {label:"Gas/Fuel",      icon:"⛽",color:"#ef4444",bg:"rgba(239,68,68,0.1)",  border:"rgba(239,68,68,0.3)"},
  emergency:   {label:"Emergency Fund",icon:"🆘",color:"#06b6d4",bg:"rgba(6,182,212,0.1)",  border:"rgba(6,182,212,0.3)"},
  investment:  {label:"Investment",    icon:"📈",color:"#10b981",bg:"rgba(16,185,129,0.1)", border:"rgba(16,185,129,0.3)"},
  temp:        {label:"Temporary",     icon:"🔄",color:"#d29922",bg:"rgba(210,153,34,0.1)", border:"rgba(210,153,34,0.3)"},
  other:       {label:"Other",         icon:"📌",color:"#8b949e",bg:"transparent",           border:"#21262d"},
};

const POTS = {
  savings_acct:{label:"Savings",    icon:"🏦",color:"#3fb950",bg:"rgba(63,185,80,0.1)"},
  emergency:   {label:"Emergency",  icon:"🆘",color:"#06b6d4",bg:"rgba(6,182,212,0.1)"},
  investment:  {label:"Investment", icon:"📈",color:"#10b981",bg:"rgba(16,185,129,0.1)"},
};

const CC = {
  "BJ's Card":  {color:"#f85149",bg:"rgba(248,81,73,0.12)",  border:"rgba(248,81,73,0.35)",  dot:"🔴"},
  "Quicksilver":{color:"#a78bfa",bg:"rgba(167,139,250,0.12)",border:"rgba(167,139,250,0.35)",dot:"🟣"},
  "Prime Card": {color:"#58a6ff",bg:"rgba(88,166,255,0.12)", border:"rgba(88,166,255,0.35)", dot:"🔵"},
};

const CICONS   = {auto:"🚗",rent:"🏠",subscription:"📱",gas:"⛽",credit_card:"💳",groceries:"🛒",other:"📌",insurance:"🛡️",utilities:"⚡",savings_acct:"🏦",emergency:"🆘",investment:"📈",loan:"🏦"};
const CATCOLORS = {auto:"#f97316",rent:"#3b82f6",subscription:"#8b5cf6",gas:"#ef4444",credit_card:"#ec4899",groceries:"#22c55e",other:"#94a3b8",insurance:"#6366f1",utilities:"#f59e0b",savings_acct:"#3fb950",emergency:"#06b6d4",investment:"#10b981",loan:"#f97316"};
const DORDER   = ["savings_acct","emergency","investment","rent","auto","insurance","utilities","gas","credit_card","groceries","subscription","temp","other"];

// ── Style factories ───────────────────────────────────────────────────────────
const gds    = (d, r) => { if (d==="credit_card"&&r&&CC[r]) return {...DEST.credit_card,...CC[r],label:r}; return DEST[d]||DEST.other; };
const mkINP  = T => ({display:"block",width:"100%",...T.inp,borderRadius:10,fontFamily:"inherit",fontSize:"16px",padding:"11px 14px",outline:"none",WebkitAppearance:"none",boxSizing:"border-box"});
const mkBTN  = ()  => ({cursor:"pointer",border:"none",borderRadius:10,fontFamily:"inherit",fontWeight:600,WebkitTapHighlightColor:"transparent"});
const mkCARD = T => ({background:T.surface,border:`1px solid ${T.border}`,borderRadius:14});

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [data,        setData]        = useState(loadData);
  const [tab,         setTab]         = useState("overview");
  const [toast,       setToast]       = useState(null);
  const [editId,      setEditId]      = useState(null);
  const [accion,      setAccion]      = useState(null);
  const [montoAccion, setMontoAccion] = useState("");
  const [alertDim,    setAlertDim]    = useState(false);
  const [calView,     setCalView]     = useState("list");
  const [addingDebt,  setAddingDebt]  = useState(null);
  const [quickOpen,   setQuickOpen]   = useState(false);
  const [quickNote,   setQuickNote]   = useState("");
  const [quickAmt,    setQuickAmt]    = useState("");
  const [quickPid,    setQuickPid]    = useState("");
  const [moveOpen,    setMoveOpen]    = useState(false);
  const [moveTo,      setMoveTo]      = useState("savings_acct");
  const [moveAmt,     setMoveAmt]     = useState("");
  const [moveNote,    setMoveNote]    = useState("");
  const toastRef    = useRef();
  const swipeStart  = useRef(null);
  const mainRef     = useRef(null);

  const theme = data.theme || "dark";
  const T     = THEMES[theme];
  useEffect(() => { document.body.className = theme; }, [theme]);
  useEffect(() => { saveData(data); }, [data]);

  const toast_ = (msg, type="ok") => {
    setToast({msg, type});
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2800);
  };
  const INP = mkINP(T), BTN = mkBTN(), CARD = mkCARD(T);

  const freq             = data.payFreq || "biweekly";
  const anchor           = data.proximoCobro || "2026-04-03";
  const globalCheckAmount = n(data.checkAmount || 1520);
  const today            = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);

  const monthPeriods  = useMemo(() => buildMonthPeriods(anchor, freq), [anchor, freq, today]);
  const currentPeriod = monthPeriods.find(p => p.isCurrent) || monthPeriods[0];
  const currentPid    = currentPeriod?.id || "";

  const upcomingPaydays = useMemo(() => getUpcomingPaydays(anchor, 8, freq), [anchor, freq, today]);
  const nextPayday      = useMemo(() => getNextPayday(anchor, freq),         [anchor, freq, today]);
  const diasProx        = nextPayday ? Math.ceil((nextPayday - today) / 86400000) : null;

  const getPGastos = pid => (data.periods[pid] || {}).gastos || [];

  const getPeriodAmount = useCallback(pid => {
    const stored = (data.periods[pid] || {}).amount;
    if (stored != null && stored !== undefined && n(stored) > 0) return n(stored);
    return globalCheckAmount;
  }, [data.periods, globalCheckAmount]);

  const setPeriodAmount = useCallback((pid, val) => {
    setData(p => ({...p, periods:{...p.periods,[pid]:{...(p.periods[pid]||{}),amount:parseFloat(val)||0}}}));
  }, []);

  const totalMonthlyIncome = monthPeriods.reduce((s, p) => s + getPeriodAmount(p.id), 0);
  const totalMonthlyExp    = monthPeriods.reduce((s, p) => s + getPGastos(p.id).reduce((ss, g) => ss + n(g.monto), 0), 0);

  const allDebts     = [...data.tarjetas.map(t=>({...t,tipo:"card"})), ...(data.loans||[]).map(l=>({...l,tipo:"loan"}))].sort((a,b)=>n(b.interes)-n(a.interes));
  const totalDebt    = allDebts.reduce((s, d) => s + n(d.balance), 0);
  const interesTotal = allDebts.reduce((s, d) => s + (n(d.interes)/100/12)*n(d.balance), 0);
  const urgentDebts  = allDebts.filter(d => getDU(d.fechaPago) !== null && getDU(d.fechaPago) <= 3);
  const pots         = data.pots || {};

  useEffect(() => { if (!quickPid && currentPid) setQuickPid(currentPid); }, [currentPid]);

  const TABS_ORDER = useMemo(() => ["overview", ...monthPeriods.map(p=>p.id), "debts","calendar","history","settings"], [monthPeriods]);
  const handleSwipeTouchStart = useCallback(e => { const t = e.touches[0]; swipeStart.current = {x:t.clientX, y:t.clientY}; }, []);
  const handleSwipeTouchEnd   = useCallback(e => {
    if (!swipeStart.current) return;
    const t  = e.changedTouches[0];
    const dx = t.clientX - swipeStart.current.x, dy = t.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)*1.5) return;
    const idx = TABS_ORDER.indexOf(tab);
    if (dx < 0 && idx < TABS_ORDER.length-1) setTab(TABS_ORDER[idx+1]);
    if (dx > 0 && idx > 0)                   setTab(TABS_ORDER[idx-1]);
  }, [tab, TABS_ORDER]);

  // ── Period CRUD ──────────────────────────────────────────────────────────────
  const updPeriodGastos = (pid, fn) => setData(p => {
    const cur = (p.periods[pid]||{}).gastos || [];
    return {...p, periods:{...p.periods, [pid]:{...(p.periods[pid]||{}), gastos:fn(cur)}}};
  });

  const cycleState  = useCallback((pid, id) => updPeriodGastos(pid, g => g.map(x => x.id!==id?x:{...x,state:x.state==="paid"?"pending":"paid",pagado:x.state!=="paid"})), []);
  const setReserved = useCallback((pid, id) => updPeriodGastos(pid, g => g.map(x => x.id!==id?x:{...x,state:x.state==="reserved"?"pending":"reserved",pagado:false})), []);
  const updateGasto = useCallback((pid, id, f, v) => updPeriodGastos(pid, g => g.map(x => x.id===id?{...x,[f]:v}:x)), []);
  const removeGasto = useCallback((pid, id) => updPeriodGastos(pid, g => g.filter(x => x.id!==id)), []);
  const reorder     = useCallback((pid, list) => updPeriodGastos(pid, () => list), []);
  const addGasto    = useCallback(pid => {
    const nid = Date.now();
    updPeriodGastos(pid, g => [...g, {id:nid,nombre:"",monto:0,cat:"other",state:"pending",pagado:false,destino:"other",tarjetaRef:"",diaPago:null,_quick:false}]);
    setTimeout(() => setEditId(nid), 30);
  }, []);
  const resetCheck  = useCallback((pid, label) => {
    updPeriodGastos(pid, g => g.filter(x => x.destino!=="temp"&&!x._quick).map(x => ({...x,state:"pending",pagado:false})));
    toast_(`🔄 ${label} reset`);
  }, []);

  // ── Debt helpers ─────────────────────────────────────────────────────────────
  const updateTarjeta = useCallback((id, f, v) => setData(p => ({...p, tarjetas:p.tarjetas.map(t => t.id===id?{...t,[f]:v}:t)})), []);
  const updateLoan    = useCallback((id, f, v) => setData(p => ({...p, loans:(p.loans||[]).map(l => l.id===id?{...l,[f]:v}:l)})), []);
  const removeTarjeta = useCallback(id => { setData(p => ({...p, tarjetas:p.tarjetas.filter(t => t.id!==id)})); toast_("🗑 Removed"); }, []);
  const removeLoan    = useCallback(id => { setData(p => ({...p, loans:(p.loans||[]).filter(l => l.id!==id)})); toast_("🗑 Removed"); }, []);
  const applyAccion   = useCallback((id, tipo) => {
    const m = parseFloat(montoAccion); if (!m||m<=0) return toast_("Invalid amount","err");
    const entry = {fecha:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),tipo:accion.tipo,monto:m};
    if (tipo==="card") setData(p => ({...p, tarjetas:p.tarjetas.map(t => t.id!==id?t:{...t,balance:accion.tipo==="pago"?Math.max(0,n(t.balance)-m):n(t.balance)+m,historial:[entry,...(t.historial||[])].slice(0,10)})}));
    else               setData(p => ({...p, loans:(p.loans||[]).map(l => l.id!==id?l:{...l,balance:accion.tipo==="pago"?Math.max(0,n(l.balance)-m):n(l.balance)+m,historial:[entry,...(l.historial||[])].slice(0,10)})}));
    setAccion(null); setMontoAccion(""); toast_(accion.tipo==="pago"?"✅ Payment recorded":"📝 Charge recorded");
  }, [montoAccion, accion]);
  const addCard = useCallback(() => { const id=Date.now(); setData(p=>({...p,tarjetas:[...p.tarjetas,{id,nombre:"New Card",balance:0,limite:0,minimo:0,interes:0,fechaCorte:"",fechaPago:"",historial:[],tipo:"card"}]})); setAddingDebt({id,tipo:"card"}); }, []);
  const addLoan = useCallback(() => { const id=Date.now(); setData(p=>({...p,loans:[...(p.loans||[]),{id,nombre:"New Loan",balance:0,original:0,minimo:0,interes:0,fechaPago:"",historial:[],tipo:"loan"}]})); setAddingDebt({id,tipo:"loan"}); }, []);

  // ── Quick expense ────────────────────────────────────────────────────────────
  const addQuickExpense = () => {
    const m = parseFloat(quickAmt); if (!m||m<=0||!quickNote.trim()) return toast_("Add name and amount","err");
    const pid = quickPid || currentPid;
    const nid = Date.now();
    updPeriodGastos(pid, g => [...g, {id:nid,nombre:quickNote.trim(),monto:m,cat:"other",state:"paid",pagado:true,destino:"temp",tarjetaRef:"",diaPago:null,_quick:true}]);
    setQuickNote(""); setQuickAmt(""); setQuickOpen(false);
    toast_(`✅ "${quickNote.trim()}" ${fmt(m)} added & paid`);
  };

  // ── Move money ───────────────────────────────────────────────────────────────
  const doMoveMoney = () => {
    const m = parseFloat(moveAmt); if (!m||m<=0) return toast_("Invalid amount","err");
    const mvId = Date.now(), pot = POTS[moveTo];
    setData(p => ({...p, pots:{...p.pots,[moveTo]:n((p.pots||{})[moveTo])+m}, potMovements:[...(p.potMovements||[]),{id:mvId,potKey:moveTo,amount:m,date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"}),note:moveNote||pot?.label||moveTo}]}));
    setMoveAmt(""); setMoveNote(""); setMoveOpen(false);
    toast_(`💸 ${fmt(m)} moved to ${pot?.label||moveTo}`);
  };

  // ── Export / Import ──────────────────────────────────────────────────────────
  const exportData = useCallback(() => {
    const now = new Date();
    const ts  = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}_${String(now.getHours()).padStart(2,"0")}${String(now.getMinutes()).padStart(2,"0")}`;
    const b   = new Blob([JSON.stringify(data,null,2)], {type:"application/json"});
    const u   = URL.createObjectURL(b);
    const a   = document.createElement("a"); a.href=u; a.download=`mybudget_${ts}.json`; a.click();
    toast_("📥 Exported");
  }, [data]);
  const importData = useCallback(e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => { try { setData(migrate(JSON.parse(ev.target.result))); toast_("✅ Imported"); } catch { toast_("❌ Invalid file","err"); } };
    r.readAsText(f);
  }, []);

  // ── Render helpers ───────────────────────────────────────────────────────────
  const renderGrouped = (pid, gastos) => {
    const groups = {};
    gastos.forEach(g => {
      const k = g.destino==="credit_card"?(g.tarjetaRef||"Credit Card"):g.destino;
      if (!groups[k]) groups[k] = {d:g.destino,r:g.tarjetaRef,items:[]};
      groups[k].items.push(g);
    });
    return Object.keys(groups).sort((a,b)=>(DORDER.indexOf(groups[a].d)+1||99)-(DORDER.indexOf(groups[b].d)+1||99)).map(k => {
      const {d,r,items} = groups[k];
      const dst = gds(d,r);
      const sub = items.reduce((s,g)=>s+n(g.monto),0);
      return (
        <div key={k} style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",marginBottom:5,background:dst.bg,borderRadius:9,border:`1px solid ${dst.border}`}}>
            <span style={{fontSize:12,fontWeight:700,color:dst.color}}>{dst.icon} {dst.label}</span>
            <span style={{fontFamily:"monospace",fontSize:13,fontWeight:800,color:dst.color}}>{fmt(sub)}</span>
          </div>
          <DragList items={items} onReorder={newItems=>{const rest=gastos.filter(g=>!items.find(i=>i.id===g.id));reorder(pid,[...newItems,...rest]);}}
            renderItem={(item,_,touch)=>(
              <GastoItem key={item.id} item={item} pid={pid} editId={editId} setEditId={setEditId} tarjetas={data.tarjetas}
                onCycle={id=>cycleState(pid,id)} onLongPress={id=>setReserved(pid,id)}
                onUpdate={(id,f,v)=>updateGasto(pid,id,f,v)} onRemove={id=>removeGasto(pid,id)} touch={touch} T={T}/>
            )}/>
        </div>
      );
    });
  };

  const renderCheckTab = period => {
    const {id:pid, label, isCurrent, payday} = period;
    const gastos = getPGastos(pid);
    const amt    = getPeriodAmount(pid);
    const periodAmountIsCustom = (data.periods[pid]||{}).amount!=null && n((data.periods[pid]||{}).amount)>0 && n((data.periods[pid]||{}).amount)!==globalCheckAmount;
    const total    = gastos.reduce((s,g)=>s+n(g.monto),0);
    const paid     = gastos.filter(g=>g.state==="paid").reduce((s,g)=>s+n(g.monto),0);
    const reserved = gastos.filter(g=>g.state==="reserved").reduce((s,g)=>s+n(g.monto),0);
    const sob      = amt - total;
    const pct      = total > 0 ? Math.round(((paid+reserved)/total)*100) : 0;
    const done     = gastos.length > 0 && gastos.every(g=>g.state==="paid");
    const pdDays   = Math.ceil((payday - today) / 86400000);
    return (
      <div className="anim">
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {isCurrent && <div style={{flex:1,background:"rgba(88,166,255,0.1)",border:"1px solid rgba(88,166,255,0.3)",borderRadius:10,padding:"8px 12px",fontSize:11,color:"#58a6ff",fontWeight:600}}>✓ Active check period</div>}
          {payday && (
            <div style={{flex:1,background:pdDays===0?"rgba(88,166,255,0.1)":"rgba(63,185,80,0.07)",border:`1px solid ${pdDays===0?"rgba(88,166,255,0.3)":"rgba(63,185,80,0.2)"}`,borderRadius:10,padding:"8px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:T.muted}}>📅 Payday</span>
              <div style={{textAlign:"right"}}>
                <span style={{fontFamily:"monospace",fontWeight:700,color:pdDays===0?"#58a6ff":"#3fb950",fontSize:12}}>{fmd(payday)}</span>
                {pdDays===0&&<div style={{fontSize:9,color:"#58a6ff",fontWeight:700}}>TODAY 🎉</div>}
              </div>
            </div>
          )}
        </div>

        {/* Period amount */}
        <div style={{...CARD,padding:"13px 16px",marginBottom:12,borderColor:T.accent}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <div style={{fontSize:10,color:T.accent,fontWeight:700,letterSpacing:1.5}}>{label.toUpperCase()} AMOUNT</div>
            {periodAmountIsCustom && (
              <button style={{...BTN,padding:"2px 8px",fontSize:10,background:"rgba(210,153,34,0.1)",color:"#d29922",border:"1px solid rgba(210,153,34,0.3)"}}
                onClick={()=>setData(p=>{const np={...p.periods};if(np[pid]){const{amount:_,...rest}=np[pid];np[pid]=rest;}return{...p,periods:np};})}>
                ↩ Use default ({fmt(globalCheckAmount)})
              </button>
            )}
          </div>
          <input style={{...INP,fontFamily:"monospace",fontSize:22,fontWeight:700}} type="number" inputMode="decimal"
            value={amt||""} onChange={e=>setPeriodAmount(pid,e.target.value)} placeholder={String(globalCheckAmount)}/>
          {!periodAmountIsCustom && <div style={{fontSize:10,color:T.muted,marginTop:5}}>Using default amount · edit to override for this check only</div>}
        </div>

        {/* Progress */}
        <div style={{...CARD,padding:"13px 16px",marginBottom:12,borderColor:done?"#2ea043":T.border}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:done?"#3fb950":T.text}}>{done?"✅ All paid!":`${fmt(paid)} paid · ${fmt(reserved)} reserved`}</div>
              <div style={{fontSize:11,color:T.muted,marginTop:2}}>Pending: <span style={{color:"#f85149",fontWeight:700}}>{fmt(total-paid-reserved)}</span></div>
            </div>
            <div style={{fontFamily:"monospace",fontSize:20,fontWeight:800,color:done?"#3fb950":"#d29922"}}>{pct}%</div>
          </div>
          <div style={{height:7,background:T.surface2,borderRadius:8,overflow:"hidden",display:"flex"}}>
            <div style={{width:`${total>0?Math.round((paid/total)*100):0}%`,background:"#2ea043",transition:"width 0.5s"}}/>
            <div style={{width:`${total>0?Math.round((reserved/total)*100):0}%`,background:"#d29922",transition:"width 0.5s"}}/>
          </div>
          <div style={{display:"flex",gap:12,marginTop:6,fontSize:10}}><span>Tap ● = paid · Long press ◑ = reserved</span></div>
        </div>

        <DestinoSummary gastos={gastos} T={T}/>
        {renderGrouped(pid, gastos)}
        <button style={{...BTN,width:"100%",marginTop:4,marginBottom:12,padding:"11px",background:"transparent",color:T.accent,fontSize:13,border:`1.5px dashed ${T.border}`}} onClick={()=>addGasto(pid)}>+ Add Expense</button>

        <div style={{...CARD,padding:"13px 16px",marginBottom:10,borderColor:sob>=0?"#238636":"#da3633"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:T.muted}}>Total expenses</span><span style={{fontFamily:"monospace",fontWeight:700,color:"#f85149"}}>{fmt(total)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:14,fontWeight:700}}>Left over</span><span style={{fontFamily:"monospace",fontSize:20,fontWeight:800,color:sob>=0?"#3fb950":"#f85149"}}>{fmt(sob)}</span></div>
        </div>
        <button style={{...BTN,width:"100%",padding:"11px",background:"rgba(248,81,73,0.08)",color:"#f85149",fontSize:13,border:"1px solid rgba(248,81,73,0.25)"}} onClick={()=>resetCheck(pid,label)}>🔄 New Cycle — Reset {label}</button>
      </div>
    );
  };

  // ── Tab definitions ──────────────────────────────────────────────────────────
  const TABS = [
    {id:"overview", icon:"📊", label:"Overview"},
    ...monthPeriods.map(p => ({id:p.id, icon:p.isCurrent?"💰":"📋", label:p.label, statusLabel:p.statusLabel, isCurrent:p.isCurrent})),
    {id:"debts",    icon:"💳", label:"Debts",    urgent:urgentDebts.length>0},
    {id:"calendar", icon:"📅", label:"Calendar"},
    {id:"history",  icon:"📆", label:"History"},
    {id:"settings", icon:"⚙️", label:"Settings"},
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div ref={mainRef} onTouchStart={handleSwipeTouchStart} onTouchEnd={handleSwipeTouchEnd}
      style={{minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      {/* Toast */}
      {toast && <div style={{position:"fixed",top:16,right:16,zIndex:9999,background:toast.type==="err"?"#da3633":"#238636",color:"#fff",padding:"10px 16px",borderRadius:11,fontWeight:600,fontSize:13,boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>{toast.msg}</div>}

      {/* Urgent alert */}
      {urgentDebts.length>0 && !alertDim && (
        <div style={{background:"linear-gradient(135deg,#f85149,#da3633)",padding:"12px 16px",position:"sticky",top:0,zIndex:100}}>
          <div style={{maxWidth:760,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:13,marginBottom:3,animation:"pulse 1.5s infinite"}}>🚨 PAYMENT DUE SOON!</div>
              {urgentDebts.map(d=><div key={d.id} style={{fontSize:12,opacity:0.9}}><strong>{d.nombre}</strong> — <strong>{getDU(d.fechaPago)===0?"TODAY":getDU(d.fechaPago)+"d left"}</strong> · {fmt(d.balance)}</div>)}
            </div>
            <button style={{...BTN,background:"rgba(255,255,255,0.2)",color:"#fff",padding:"4px 10px",fontSize:12,marginLeft:8}} onClick={()=>setAlertDim(true)}>OK</button>
          </div>
        </div>
      )}

      {/* Quick expense FAB */}
      <button style={{...BTN,position:"fixed",bottom:22,right:18,zIndex:200,width:52,height:52,borderRadius:"50%",background:"#238636",color:"#fff",fontSize:26,boxShadow:"0 4px 20px rgba(35,134,54,0.5)",display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setQuickOpen(true)}>+</button>

      {/* Quick expense modal */}
      {quickOpen && (
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.72)",display:"flex",alignItems:"flex-end"}} onClick={e=>{if(e.target===e.currentTarget)setQuickOpen(false);}}>
          <div style={{width:"100%",maxWidth:500,margin:"0 auto",background:T.surface,borderRadius:"20px 20px 0 0",padding:"20px 18px 34px",border:`1px solid ${T.border}`}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>⚡ Quick Expense</div>
            <div style={{marginBottom:10}}><div style={{fontSize:10,color:T.muted,marginBottom:5}}>WHAT WAS IT?</div><input style={INP} value={quickNote} onChange={e=>setQuickNote(e.target.value)} placeholder="e.g. Walmart, gas stop..." autoFocus/></div>
            <div style={{marginBottom:10}}><div style={{fontSize:10,color:T.muted,marginBottom:5}}>AMOUNT ($)</div><input style={INP} type="number" inputMode="decimal" value={quickAmt} onChange={e=>setQuickAmt(e.target.value)} placeholder="0"/></div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:T.muted,marginBottom:5}}>DEDUCT FROM</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {monthPeriods.map(p=>(
                  <button key={p.id} style={{...BTN,flex:1,padding:"9px",fontSize:12,background:quickPid===p.id?"rgba(88,166,255,0.2)":T.surface2,color:quickPid===p.id?T.accent:T.muted,border:`1px solid ${quickPid===p.id?T.accent:T.border}`}} onClick={()=>setQuickPid(p.id)}>
                    {p.isCurrent?"💰":"📋"} {p.label}{p.isCurrent?" ✓":""}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button style={{...BTN,flex:1,padding:"12px",background:"#238636",color:"#fff",fontSize:14}} onClick={addQuickExpense}>✅ Add — Already Paid</button>
              <button style={{...BTN,padding:"12px 16px",background:T.surface2,color:T.muted,fontSize:14}} onClick={()=>setQuickOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Move money modal */}
      {moveOpen && (
        <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.72)",display:"flex",alignItems:"flex-end"}} onClick={e=>{if(e.target===e.currentTarget)setMoveOpen(false);}}>
          <div style={{width:"100%",maxWidth:500,margin:"0 auto",background:T.surface,borderRadius:"20px 20px 0 0",padding:"20px 18px 34px",border:`1px solid ${T.border}`}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:14}}>💸 Move Money</div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,color:T.muted,marginBottom:5}}>MOVE TO</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {Object.entries(POTS).map(([k,p])=>(
                  <button key={k} style={{...BTN,flex:1,minWidth:90,padding:"9px",fontSize:12,background:moveTo===k?p.bg||"rgba(63,185,80,0.1)":T.surface2,color:moveTo===k?p.color:T.muted,border:`1px solid ${moveTo===k?p.color:T.border}`}} onClick={()=>setMoveTo(k)}>{p.icon} {p.label}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:10}}><div style={{fontSize:10,color:T.muted,marginBottom:5}}>AMOUNT ($)</div><input style={INP} type="number" inputMode="decimal" value={moveAmt} onChange={e=>setMoveAmt(e.target.value)} placeholder="0" autoFocus/></div>
            <div style={{marginBottom:14}}><div style={{fontSize:10,color:T.muted,marginBottom:5}}>NOTE (optional)</div><input style={INP} value={moveNote} onChange={e=>setMoveNote(e.target.value)} placeholder="e.g. April savings"/></div>
            <div style={{display:"flex",gap:8}}>
              <button style={{...BTN,flex:1,padding:"12px",background:"#238636",color:"#fff",fontSize:14}} onClick={doMoveMoney}>💸 Move</button>
              <button style={{...BTN,padding:"12px 16px",background:T.surface2,color:T.muted,fontSize:14}} onClick={()=>setMoveOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="c">
        {/* Header */}
        <div style={{marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:9,color:T.accent,letterSpacing:2,marginBottom:3,fontWeight:600}}>FINANCIAL PLANNER</div>
            <div style={{fontSize:22,fontWeight:800,letterSpacing:-0.5}}>My Budget</div>
          </div>
          {diasProx!==null && (
            <div style={{background:"rgba(63,185,80,0.08)",border:"1px solid rgba(63,185,80,0.25)",borderRadius:10,padding:"5px 10px",textAlign:"center",cursor:"pointer"}} onClick={()=>{if(currentPeriod)setTab(currentPeriod.id);}}>
              <div style={{fontSize:9,color:T.muted}}>NEXT CHECK</div>
              <div style={{fontFamily:"monospace",fontWeight:800,color:diasProx===0?"#58a6ff":"#3fb950",fontSize:diasProx===0?10:14}}>{diasProx===0?"TODAY 🎉":`${diasProx}d`}</div>
              <div style={{fontSize:9,color:T.muted}}>{nextPayday?fmd(nextPayday):""}</div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map(t => (
            <button key={t.id} style={{...BTN,padding:"7px 11px",fontSize:10,whiteSpace:"nowrap",flexShrink:0,background:tab===t.id?T.accent:T.surface2,color:tab===t.id?(theme==="dark"?"#0d1117":"#fff"):T.muted,border:`1px solid ${tab===t.id?T.accent:t.urgent?"#f85149":t.isCurrent?"#3fb950":T.border}`,position:"relative"}} onClick={()=>setTab(t.id)}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                <span>{t.icon} {t.label}</span>
                {t.statusLabel && <span style={{fontSize:8,fontWeight:700,letterSpacing:0.5,color:tab===t.id?(theme==="dark"?"#0d1117":"#fff"):t.statusLabel==="Current"?"#3fb950":"#d29922",lineHeight:1}}>{t.statusLabel.toUpperCase()}</span>}
              </div>
              {t.urgent&&tab!==t.id&&<span style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:"50%",background:"#f85149",border:"2px solid "+T.bg}}/>}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab==="overview" && (
          <div className="anim">
            <div className="g2" style={{marginBottom:12}}>
              {[
                {label:"MONTHLY INCOME",   val:totalMonthlyIncome,                       color:"#3fb950", sub:`${monthPeriods.length} checks · ${monthPeriods.map(p=>fmt(getPeriodAmount(p.id))).join(" + ")}`},
                {label:"MONTHLY EXPENSES", val:totalMonthlyExp,                           color:"#f85149", sub:"all checks"},
                {label:"NET SURPLUS",      val:totalMonthlyIncome-totalMonthlyExp,        color:(totalMonthlyIncome-totalMonthlyExp)>=0?"#3fb950":"#f85149", sub:"income − expenses"},
                {label:"TOTAL DEBT",       val:totalDebt,                                 color:"#d29922", sub:`~${fmt(interesTotal)}/mo interest`},
              ].map(s => (
                <div key={s.label} style={{...CARD,padding:"12px 14px"}}>
                  <div style={{fontSize:9,color:T.muted,marginBottom:5,letterSpacing:1}}>{s.label}</div>
                  <div style={{fontFamily:"monospace",fontSize:17,fontWeight:700,color:s.color}}>{fmt(s.val)}</div>
                  <div style={{fontSize:9,color:T.muted,marginTop:2}}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Upcoming paydays */}
            {upcomingPaydays.length>0 && (
              <div style={{...CARD,padding:"13px 16px",marginBottom:12}}>
                <div style={{fontSize:10,color:T.muted,letterSpacing:1.5,fontWeight:700,marginBottom:10}}>💵 UPCOMING PAYDAYS</div>
                {upcomingPaydays.slice(0,4).map((pd,i) => {
                  const dias = Math.ceil((pd-today)/86400000);
                  return (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<3?`1px solid ${T.border}`:"none"}}>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:dias===0?"#58a6ff":i===0?"#3fb950":T.text}}>
                          {dias===0?"Today — Payday! 🎉":i===0?`Next check (${fmd(pd)})`:fmd(pd)}
                          {i===0&&dias>0&&<span style={{fontSize:9,color:"#3fb950",marginLeft:5,fontWeight:700}}>← next</span>}
                        </div>
                        <div style={{fontSize:10,color:T.muted,marginTop:1}}>{pd.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</div>
                      </div>
                      <div style={{fontFamily:"monospace",fontWeight:800,color:dias===0?"#58a6ff":i===0?"#3fb950":T.muted,fontSize:14}}>{dias===0?"Today":dias+"d"}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Debt overview */}
            <div style={{...CARD,padding:"13px 16px",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:10,color:T.muted,letterSpacing:1.5,fontWeight:700}}>💳 DEBT OVERVIEW</div>
                <button style={{...BTN,padding:"3px 9px",background:T.surface2,color:T.muted,fontSize:10,border:`1px solid ${T.border}`}} onClick={()=>setTab("debts")}>View all →</button>
              </div>
              {allDebts.map((d,i) => {
                const dp = getDU(d.fechaPago), isUrgent = dp!==null&&dp<=3;
                const tc = CC[d.nombre]||null;
                const pct2 = d.tipo==="card"&&n(d.limite)>0?Math.min(100,Math.round((n(d.balance)/n(d.limite))*100)):d.tipo==="loan"&&n(d.original)>0?Math.round(((n(d.original)-n(d.balance))/n(d.original))*100):0;
                const barColor = d.tipo==="card"?(pct2>=90?"#f85149":pct2>=70?"#d29922":"#3fb950"):"#58a6ff";
                return (
                  <div key={d.id} style={{marginBottom:i<allDebts.length-1?10:0,paddingBottom:i<allDebts.length-1?10:0,borderBottom:i<allDebts.length-1?`1px solid ${T.border}`:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:13}}>{d.tipo==="card"?(tc?.dot||"💳"):"🚗"}</span>
                        <span style={{fontSize:12,fontWeight:600}}>{d.nombre}</span>
                        {isUrgent&&<span style={{fontSize:9,fontWeight:700,color:"#f85149",background:"rgba(248,81,73,0.1)",border:"1px solid rgba(248,81,73,0.3)",borderRadius:5,padding:"1px 5px"}}>{dp===0?"TODAY":"Due in "+dp+"d"}</span>}
                      </div>
                      <span style={{fontFamily:"monospace",fontWeight:700,fontSize:12,color:isUrgent?"#f85149":T.text}}>{fmt(d.balance)}</span>
                    </div>
                    <div style={{height:5,background:T.surface2,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${pct2}%`,background:barColor,borderRadius:4}}/></div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:T.muted,marginTop:3}}>
                      <span>{n(d.interes)}% APR</span>
                      {dp!==null&&<span style={{color:isUrgent?"#f85149":T.muted}}>Due {gdf(d.fechaPago)?fmd(gdf(d.fechaPago)):""}</span>}
                    </div>
                  </div>
                );
              })}
              <div style={{display:"flex",justifyContent:"space-between",marginTop:10,paddingTop:10,borderTop:`1px solid ${T.border}`}}>
                <span style={{fontSize:11,color:T.muted}}>Total debt</span>
                <span style={{fontFamily:"monospace",fontWeight:800,color:"#f85149",fontSize:14}}>{fmt(totalDebt)}</span>
              </div>
            </div>

            {/* Savings goal */}
            <PotCard data={data} setData={setData} pots={pots} toast_={toast_} T={T} INP={INP} BTN={BTN} CARD={CARD} fmt={fmt} n={n}/>

            {/* Per-period summary cards */}
            {monthPeriods.map(p => {
              const gastos   = getPGastos(p.id);
              const periodAmt = getPeriodAmount(p.id);
              const total    = gastos.reduce((s,g)=>s+n(g.monto),0);
              const paid     = gastos.filter(g=>g.state==="paid").reduce((s,g)=>s+n(g.monto),0);
              const reserved = gastos.filter(g=>g.state==="reserved").reduce((s,g)=>s+n(g.monto),0);
              const sob      = periodAmt - total;
              const done     = gastos.length>0 && gastos.every(g=>g.state==="paid");
              const hasCustomAmt = (data.periods[p.id]||{}).amount!=null && n((data.periods[p.id]||{}).amount)>0 && n((data.periods[p.id]||{}).amount)!==globalCheckAmount;
              return (
                <div key={p.id} style={{...CARD,padding:"13px 16px",marginBottom:10,borderColor:p.isCurrent?"#3fb950":done?"#2ea043":T.border}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{fontSize:10,color:T.muted,letterSpacing:1.5,fontWeight:700}}>{p.label.toUpperCase()} — {fmt(periodAmt)}{hasCustomAmt&&<span style={{color:"#d29922",marginLeft:4}}>✎</span>}</div>
                        {p.isCurrent&&<span style={{fontSize:9,color:"#3fb950",fontWeight:700,background:"rgba(63,185,80,0.1)",border:"1px solid rgba(63,185,80,0.3)",borderRadius:5,padding:"1px 5px"}}>ACTIVE</span>}
                      </div>
                      <div style={{fontSize:9,color:T.muted,marginTop:2}}>Payday: {fmd(p.payday)}</div>
                      {done
                        ? <div style={{fontSize:12,color:"#3fb950",marginTop:2,fontWeight:600}}>✅ All paid</div>
                        : <div style={{fontSize:11,color:T.muted,marginTop:2}}>Pending: <span style={{color:"#f85149",fontWeight:700}}>{fmt(total-paid-reserved)}</span>{reserved>0&&<span style={{color:"#d29922"}}> · Reserved: {fmt(reserved)}</span>}</div>
                      }
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:9,color:T.muted}}>Left over</div>
                      <div style={{fontFamily:"monospace",fontSize:16,fontWeight:800,color:sob>=0?"#3fb950":"#f85149"}}>{fmt(sob)}</div>
                    </div>
                  </div>
                  <div style={{height:6,background:T.surface2,borderRadius:8,overflow:"hidden",marginBottom:10,display:"flex"}}>
                    <div style={{width:`${total>0?Math.round((paid/total)*100):0}%`,background:"#2ea043"}}/>
                    <div style={{width:`${total>0?Math.round((reserved/total)*100):0}%`,background:"#d29922"}}/>
                  </div>
                  {gastos.map(g => {
                    const d = gds(g.destino, g.tarjetaRef);
                    return (
                      <div key={g.id} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",borderBottom:`1px solid ${T.border}`}}>
                        <div style={{fontSize:11,color:g.state==="paid"?"#3fb950":g.state==="reserved"?"#d29922":T.muted}}>{g.state==="paid"?"●":g.state==="reserved"?"◑":"○"}</div>
                        <div style={{fontSize:12,flexShrink:0}}>{CICONS[g.cat]||"📌"}</div>
                        <div style={{flex:1,fontSize:11,color:g.state==="paid"?"#3fb950":T.text,textDecoration:g.state==="paid"?"line-through":"none",opacity:g.state==="paid"?0.7:1}}>{g.nombre}</div>
                        {g.destino!=="other"&&<span style={{fontSize:9,color:d.color}}>{d.icon}</span>}
                        <div style={{fontFamily:"monospace",fontWeight:700,fontSize:11,color:g.state==="paid"?"#3fb950":g.state==="reserved"?"#d29922":d.color||"#f85149",flexShrink:0}}>{fmt(g.monto)}</div>
                      </div>
                    );
                  })}
                  <button style={{...BTN,width:"100%",marginTop:9,padding:"7px",background:T.surface2,color:T.muted,fontSize:11,border:`1px solid ${T.border}`}} onClick={()=>setTab(p.id)}>Go to {p.label} →</button>
                </div>
              );
            })}

            <button style={{...BTN,width:"100%",padding:"12px",background:"#238636",color:"#fff",fontSize:13,border:"1px solid #2ea043"}}
              onClick={()=>{
                const s = {id:Date.now(),fecha:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}),sobrante:totalMonthlyIncome-totalMonthlyExp,deuda:totalDebt,cash:0};
                setData(p=>({...p,snapshots:[s,...p.snapshots].slice(0,12)}));
                toast_("✅ Snapshot saved");
              }}>💾 Save Monthly Snapshot</button>
          </div>
        )}

        {/* ── CHECK TABS ── */}
        {monthPeriods.map(p => tab===p.id && <div key={p.id}>{renderCheckTab(p)}</div>)}

        {/* ── DEBTS ── */}
        {tab==="debts" && (
          <div className="anim">
            <div style={{background:"rgba(210,153,34,0.07)",border:"1px solid rgba(210,153,34,0.2)",borderRadius:11,padding:"10px 13px",marginBottom:12,fontSize:11,color:T.muted}}>
              🎯 Avalanche: pay minimums on all · all extra to <strong style={{color:"#d29922"}}>{allDebts[0]?.nombre}</strong> ({allDebts[0]?.interes}% APR)
            </div>
            {allDebts.map((d,i) => (
              <DebtCard key={d.id} debt={d} idx={i} isFirst={i===0} tipo={d.tipo} accion={accion} setAccion={setAccion} montoAccion={montoAccion} setMontoAccion={setMontoAccion} onApply={applyAccion} onUpdate={d.tipo==="card"?updateTarjeta:updateLoan} onRemove={d.tipo==="card"?removeTarjeta:removeLoan} isAdding={addingDebt?.id===d.id} setAddingDebt={setAddingDebt} T={T}/>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <button style={{...BTN,padding:"11px",background:"transparent",color:T.accent,fontSize:12,border:`1.5px dashed ${T.border}`}} onClick={addCard}>+ Add Card</button>
              <button style={{...BTN,padding:"11px",background:"transparent",color:"#f97316",fontSize:12,border:`1.5px dashed ${T.border}`}} onClick={addLoan}>+ Add Loan</button>
            </div>
            <div style={{...CARD,padding:"13px 17px",background:"rgba(248,81,73,0.04)",borderColor:"#da3633"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:T.muted}}>Total debt</span><span style={{fontFamily:"monospace",fontWeight:800,fontSize:20,color:"#f85149"}}>{fmt(totalDebt)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:T.muted}}>Cards</span><span style={{fontFamily:"monospace",fontWeight:700,color:"#ec4899",fontSize:12}}>{fmt(data.tarjetas.reduce((s,t)=>s+n(t.balance),0))}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:T.muted}}>Loans</span><span style={{fontFamily:"monospace",fontWeight:700,color:"#f97316",fontSize:12}}>{fmt((data.loans||[]).reduce((s,l)=>s+n(l.balance),0))}</span></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:T.muted}}>Monthly interest</span><span style={{fontFamily:"monospace",fontWeight:700,color:"#d29922",fontSize:12}}>{fmt(interesTotal)}/mo</span></div>
            </div>
          </div>
        )}

        {/* ── CALENDAR ── */}
        {tab==="calendar" && (
          <CalendarView T={T} theme={theme} calView={calView} setCalView={setCalView}
            upcomingPaydays={upcomingPaydays} monthPeriods={monthPeriods} getPGastos={getPGastos}
            globalCheckAmount={globalCheckAmount} data={data} BTN={BTN} CARD={CARD}/>
        )}

        {/* ── HISTORY ── */}
        {tab==="history" && <HistoryView data={data} T={T} CARD={CARD}/>}

        {/* ── SETTINGS ── */}
        {tab==="settings" && (
          <div className="anim">
            <div style={{...CARD,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:T.accent,letterSpacing:1.5,fontWeight:700,marginBottom:12}}>🎨 APPEARANCE</div>
              <div style={{display:"flex",gap:8}}>
                {["dark","light"].map(th=>(
                  <button key={th} style={{...BTN,flex:1,padding:"10px",background:theme===th?T.accent:T.surface2,color:theme===th?(th==="dark"?"#0d1117":"#fff"):T.muted,fontSize:12,border:`1px solid ${theme===th?T.accent:T.border}`}} onClick={()=>setData(p=>({...p,theme:th}))}>
                    {th==="dark"?"🌙 Dark":"☀️ Light"}
                  </button>
                ))}
              </div>
            </div>

            <div style={{...CARD,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:T.accent,letterSpacing:1.5,fontWeight:700,marginBottom:12}}>💵 PAYDAY SETTINGS</div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:9,color:T.muted,marginBottom:5}}>DEFAULT PAYCHECK AMOUNT ($)</div>
                <input style={{...INP,fontSize:16,fontFamily:"monospace",fontWeight:700}} type="number" inputMode="decimal" value={data.checkAmount||""} onChange={e=>setData(p=>({...p,checkAmount:parseFloat(e.target.value)||0}))} placeholder="1520"/>
                <div style={{fontSize:10,color:T.muted,marginTop:5}}>Used as the default for all pay periods. You can override each period's amount individually in its own Check tab.</div>
              </div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:9,color:T.muted,marginBottom:5}}>ANCHOR PAYDAY DATE</div>
                <input style={{...INP,fontSize:14,padding:"9px 12px"}} type="date" value={data.proximoCobro||""} onChange={e=>setData(p=>({...p,proximoCobro:e.target.value}))}/>
              </div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:9,color:T.muted,marginBottom:5}}>FREQUENCY</div>
                <select style={{...INP,fontSize:14,padding:"9px 12px"}} value={data.payFreq||"biweekly"} onChange={e=>setData(p=>({...p,payFreq:e.target.value}))}>
                  <option value="weekly">Weekly — every 7 days</option>
                  <option value="biweekly">Biweekly — every 14 days</option>
                  <option value="semimonthly">Semi-monthly — 1st &amp; 15th</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div style={{background:T.surface2,borderRadius:10,padding:"10px 12px",fontSize:11,color:T.muted,lineHeight:1.7}}>
                <div>This month: <strong style={{color:T.accent}}>{monthPeriods.length} pay period{monthPeriods.length!==1?"s":""}</strong> ({monthPeriods.map(p=>fmd(p.payday)).join(", ")})</div>
                <div>Current: <strong style={{color:T.text}}>{currentPeriod?fmd(currentPeriod.payday):"-"}</strong></div>
                <div>Next payday: <strong style={{color:"#3fb950"}}>{nextPayday?fmd(nextPayday):"-"}</strong> ({diasProx===0?"today":diasProx+"d away"})</div>
                {monthPeriods.some(p=>(data.periods[p.id]||{}).amount!=null&&n((data.periods[p.id]||{}).amount)>0&&n((data.periods[p.id]||{}).amount)!==globalCheckAmount) && (
                  <div style={{marginTop:6,paddingTop:6,borderTop:`1px solid ${T.border}`}}>
                    {monthPeriods.filter(p=>(data.periods[p.id]||{}).amount!=null&&n((data.periods[p.id]||{}).amount)>0&&n((data.periods[p.id]||{}).amount)!==globalCheckAmount).map(p=>(
                      <div key={p.id} style={{color:"#d29922"}}>✎ {p.label}: <strong>{fmt(n((data.periods[p.id]||{}).amount))}</strong> (custom)</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{...CARD,padding:"14px 16px",marginBottom:14}}>
              <div style={{fontSize:11,color:T.accent,letterSpacing:1.5,fontWeight:700,marginBottom:12}}>💾 DATA BACKUP</div>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <button style={{...BTN,flex:1,padding:"10px",background:T.surface2,color:T.muted,fontSize:12,border:`1px solid ${T.border}`}} onClick={exportData}>📥 Export</button>
                <label style={{flex:1}}>
                  <input type="file" accept=".json" onChange={importData} style={{display:"none"}}/>
                  <div style={{padding:"10px",background:T.surface2,color:T.muted,fontSize:12,border:`1px solid ${T.border}`,textAlign:"center",cursor:"pointer",borderRadius:10,fontWeight:600}}>📤 Import</div>
                </label>
              </div>
              <div style={{fontSize:10,color:T.muted}}>Export before updating the app. Data is stored locally on this device.</div>
            </div>

            <div style={{background:"rgba(248,81,73,0.04)",border:"1px solid rgba(248,81,73,0.2)",borderRadius:14,padding:"14px 16px"}}>
              <div style={{fontSize:11,color:"#f85149",letterSpacing:1.5,fontWeight:700,marginBottom:12}}>⚠️ DANGER ZONE</div>
              <button style={{...BTN,width:"100%",padding:"11px",background:"rgba(248,81,73,0.1)",color:"#f85149",fontSize:13,border:"1px solid rgba(248,81,73,0.3)"}}
                onClick={()=>{if(window.confirm("Reset ALL data to defaults? Cannot be undone.")){localStorage.removeItem(SK);setData(migrate(DD));setTab("overview");toast_("🔄 App reset");}}}>🗑 Reset All Data</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
