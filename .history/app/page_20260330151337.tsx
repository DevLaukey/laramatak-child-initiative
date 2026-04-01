import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

// ── MOBILE DETECTION ─────────────────────────────────────────
// Reactive hook — subscribes to resize events, triggers re-renders on breakpoint change
function useMobile(){
  const [mob,setMob]=useState(()=>typeof window!=="undefined"&&window.innerWidth<=768);
  useEffect(()=>{
    const check=()=>setMob(window.innerWidth<=768);
    window.addEventListener("resize",check,{passive:true});
    return()=>window.removeEventListener("resize",check);
  },[]);
  return mob;
}
// Static snapshot — only for use OUTSIDE of reactive component trees (e.g. SSR fallback)
const isMob=()=>typeof window!=="undefined"&&window.innerWidth<=768;

const C = {
  // Core brand — deep purple to silver
  navy:"#1A0A2E",        // deep near-black purple (replaces navy)
  navyMid:"#2D1458",     // rich mid purple
  navyLight:"#4A1F8A",   // vivid purple (the scrub color)
  blue:"#7B3FCC",        // primary action — purple
  accent:"#C0A8E0",      // silver-lavender accent
  accentGlow:"rgba(192,168,224,0.18)",
  // Silver tones
  silver:"#B8C4D4",
  silverMid:"#8B9DB5",
  silverBg:"rgba(184,196,212,0.12)",
  // Functional colors kept
  green:"#0A8F5E",  greenBg:"rgba(10,143,94,0.10)",
  yellow:"#C97A06", yellowBg:"rgba(201,122,6,0.10)",
  purple:"#7B3FCC", purpleBg:"rgba(123,63,204,0.12)",
  red:"#C42B2B",    redBg:"rgba(196,43,43,0.09)",
  sky:"#5B9BD5",    skyBg:"rgba(91,155,213,0.12)",
  // Surface
  surface:"#F5F3FA",   surfaceAlt:"#EDE8F5",
  card:"#FFFFFF",      border:"#DDD6EE",
  muted:"#6B5F8A",     mutedLight:"#9B90B8",
  text:"#1A0A2E",      textSoft:"#3D2D5C",
};

const STATUS={
  "Not Contacted":{ color:C.muted,  bg:"#EDF0F5" },
  "Contacted":    { color:C.purple, bg:C.purpleBg },
  "Meeting Set":  { color:C.yellow, bg:C.yellowBg },
  "Onboarding":   { color:C.sky,    bg:C.skyBg },
  "Live":         { color:C.green,  bg:C.greenBg },
  "Declined":     { color:C.red,    bg:C.redBg },
};

const CONTACT_TYPES=["MD","Owner","Employee","Nurse","Other"];
const PAY_METHODS=["Automated","Cash","Zelle","Wire Transfer","Other"];
const TASK_PRIORITIES=["High","Medium","Low"];

const ACCOUNTS=[
  {id:"u0",email:"admin@nudgeworld.io",  password:"admin123",name:"Admin",        role:"admin",     roleLabel:"Administrator"},
  {id:"u1",email:"maureen@nudgeworld.io",password:"sdr123",  name:"Maureen Mutio",role:"sdr",       roleLabel:"Sales Development Rep"},
  {id:"u2",email:"carlos@nudgeworld.io", password:"amb123",  name:"Carlos Rivera",role:"ambassador",roleLabel:"Territory Ambassador"},
];

const INIT_PAY={
  // SDR: $300 flat per live clinic + 0.4% of clinic rev
  sdr_flat:300, sdr_pct:0.4,
  // Ambassador: $0 flat + 0.5% of clinic rev
  amb_flat:0,   amb_pct:0.5,
  avg_order_value:200,
  auto_pay_day:1,
};

// Users: territory_rates keyed by territory id, each {flat, pct} or null = use global default
const INIT_USERS=[
  {id:"u1",name:"Maureen Mutio",role:"sdr",       email:"maureen@nudgeworld.io",phone:"(702) 555-0101",whatsapp:"",instagram:"",tiktok:"",pay_method:"Automated",territory_rates:{},payments:[],tasks:[]},
  {id:"u2",name:"Carlos Rivera",role:"ambassador", email:"carlos@nudgeworld.io", phone:"(305) 555-0202",whatsapp:"13055550202",instagram:"carlosrivera",tiktok:"carlosriveara",pay_method:"Automated",territory_rates:{},payments:[],tasks:[]},
  {id:"u3",name:"Jasmine Cole", role:"ambassador", email:"jasmine@nudgeworld.io",phone:"(480) 555-0303",whatsapp:"14805550303",instagram:"jasminecole",tiktok:"",pay_method:"Cash",territory_rates:{},payments:[],tasks:[]},
];

const INIT_TERRITORIES=[
  {id:"t1",city:"Miami",     state:"FL",sdr_id:"u1",amb_id:"u2",status:"Active"},
  {id:"t2",city:"Nashville", state:"TN",sdr_id:"u1",amb_id:null,status:"Active"},
  {id:"t3",city:"Scottsdale",state:"AZ",sdr_id:null,amb_id:"u3",status:"Pending"},
  {id:"t4",city:"Denver",    state:"CO",sdr_id:"u1",amb_id:null,status:"Active"},
];

// Ambassador events/activities
// status: "pending_approval" | "approved" | "rejected"
// expense_approved: boolean (admin approves expense reimbursement)
const INIT_EVENTS=[];

const fmtNow=()=>new Date().toISOString();
const fmtDate=(iso)=>{ try{ const d=new Date(iso); return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); }catch{return iso;} };
const fmtTime=(iso)=>{ try{ const d=new Date(iso); return d.toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",hour12:true}); }catch{return iso;} };
const mo=(offset)=>{ const d=new Date(); d.setMonth(d.getMonth()+offset); return d.toISOString().slice(0,10); };
const nid=()=>Math.random().toString(36).slice(2,9);
const sdrNote=(text)=>[{id:nid(),author:"Maureen Mutio",date:fmtNow(),text}];
const ambNote=(text)=>text?[{id:nid(),author:"Carlos Rivera",date:fmtNow(),text}]:[];

// Generate realistic hourly order distribution (0-23h) for a clinic
function genHourly(peakHour=14, scale=1){
  return Array.from({length:24},(_,h)=>{
    const dist=Math.exp(-0.5*Math.pow((h-peakHour)/3,2));
    const val=Math.round(dist*scale*(0.7+Math.random()*0.6));
    return{hour:h,orders:val,revenue:val*200};
  });
}

const INIT_CLINICS=[
  {id:"c1",name:"Glow Medspa",city:"Miami",state:"FL",territory_id:"t1",
   lat:25.7588,lng:-80.1918,
   open:"09:00",close:"20:00",
   address:"1200 Brickell Ave, Miami, FL 33131",phone:"(305) 881-2200",email:"admin@glowmedspa.com",
   contact:"Dr. Sandra Vega",contact_type:"MD",hasMD:true,hasNurses:true,nurse_count:3,
   status:"Live",sdr_notes:sdrNote("Signed 6/12. MD on staff. Priority hub."),amb_notes:ambNote("Introduced via referral from local event. Owner loves the concept."),
   added_by:"u1",enterprise_id:"ENT-001",
   monthly_history:[{month:mo(-3),orders:22},{month:mo(-2),orders:31},{month:mo(-1),orders:38}],
   hourly_data:genHourly(15,8),
   changelog:[{date:mo(-4)+"T09:00:00Z",user:"Maureen Mutio",action:"Clinic created"},{date:mo(-3)+"T14:22:00Z",user:"Maureen Mutio",action:"Status → Contacted"},{date:mo(-2)+"T11:05:00Z",user:"Carlos Rivera",action:"Ambassador note added"},{date:mo(-1)+"T16:44:00Z",user:"Maureen Mutio",action:"Status → Live"}]},
  {id:"c2",name:"Revive Wellness Studio",city:"Miami",state:"FL",territory_id:"t1",
   lat:25.7637,lng:-80.2000,
   open:"10:00",close:"18:00",
   address:"801 S Miami Ave #201, Miami, FL 33130",phone:"(305) 774-9910",email:"hello@revivewellness.com",
   contact:"Maria Chen",contact_type:"Owner",hasMD:false,hasNurses:false,nurse_count:0,
   status:"Onboarding",sdr_notes:sdrNote("Attorney reviewed. Agreement executed."),amb_notes:ambNote("Carlos attended signing meeting."),
   added_by:"u1",enterprise_id:"",monthly_history:[],hourly_data:[],
   changelog:[{date:mo(-2)+"T10:00:00Z",user:"Maureen Mutio",action:"Clinic created"},{date:mo(-1)+"T09:15:00Z",user:"Carlos Rivera",action:"Status → Meeting Set"},{date:mo(0)+"T13:30:00Z",user:"Maureen Mutio",action:"Status → Onboarding"}]},
  {id:"c3",name:"Aria Aesthetics",city:"Miami",state:"FL",territory_id:"t1",
   lat:25.8020,lng:-80.1900,
   open:"09:00",close:"17:00",
   address:"3250 NE 1st Ave, Miami, FL 33137",phone:"(305) 520-4411",email:"contact@ariaaesthetics.com",
   contact:"Dr. Paul Osei",contact_type:"MD",hasMD:true,hasNurses:true,nurse_count:2,
   status:"Meeting Set",sdr_notes:sdrNote("Follow-up call booked for Friday."),amb_notes:ambNote("Carlos doing walk-in intro Tuesday."),
   added_by:"u1",enterprise_id:"",monthly_history:[],hourly_data:[],
   changelog:[{date:mo(-1)+"T08:00:00Z",user:"Maureen Mutio",action:"Clinic created"},{date:mo(0)+"T10:20:00Z",user:"Maureen Mutio",action:"Status → Contacted"}]},
  {id:"c4",name:"Pulse IV Lounge",city:"Nashville",state:"TN",territory_id:"t2",
   lat:36.1612,lng:-86.7775,
   open:"08:00",close:"22:00",
   address:"501 Church St, Nashville, TN 37219",phone:"(615) 200-3345",email:"info@pulseivlounge.com",
   contact:"Tony Wallace",contact_type:"Owner",hasMD:false,hasNurses:true,nurse_count:4,
   status:"Live",sdr_notes:sdrNote("Using Regional MD Program. Active."),amb_notes:[],
   added_by:"u1",enterprise_id:"ENT-004",
   monthly_history:[{month:mo(-3),orders:15},{month:mo(-2),orders:19},{month:mo(-1),orders:22}],
   hourly_data:genHourly(13,5),
   changelog:[{date:mo(-3)+"T11:00:00Z",user:"Maureen Mutio",action:"Clinic created"},{date:mo(-2)+"T15:10:00Z",user:"Maureen Mutio",action:"Status → Live"}]},
  {id:"c5",name:"Lumina Wellness",city:"Nashville",state:"TN",territory_id:"t2",
   lat:36.1627,lng:-86.7816,
   open:"10:00",close:"19:00",
   address:"222 2nd Ave N, Nashville, TN 37201",phone:"(615) 448-1122",email:"lumina@wellnessnash.com",
   contact:"Ashley Park",contact_type:"Employee",hasMD:false,hasNurses:false,nurse_count:0,
   status:"Contacted",sdr_notes:sdrNote("Left VM. Text sent."),amb_notes:[],
   added_by:"u1",enterprise_id:"",monthly_history:[],hourly_data:[],
   changelog:[{date:mo(-1)+"T09:00:00Z",user:"Maureen Mutio",action:"Clinic created"},{date:mo(0)+"T12:00:00Z",user:"Maureen Mutio",action:"Status → Contacted"}]},
  {id:"c6",name:"Form + Function Clinic",city:"Denver",state:"CO",territory_id:"t4",
   lat:39.7455,lng:-104.9881,
   open:"07:00",close:"19:00",
   address:"1700 Lincoln St, Denver, CO 80203",phone:"(720) 310-8830",email:"dr.ricci@formfunctionclinic.com",
   contact:"Dr. James Ricci",contact_type:"MD",hasMD:true,hasNurses:true,nurse_count:2,
   status:"Live",sdr_notes:sdrNote("Strong partner. Altitude market angle."),amb_notes:[],
   added_by:"u1",enterprise_id:"ENT-006",
   monthly_history:[{month:mo(-3),orders:11},{month:mo(-2),orders:14},{month:mo(-1),orders:17}],
   hourly_data:genHourly(11,4),
   changelog:[{date:mo(-3)+"T09:30:00Z",user:"Maureen Mutio",action:"Clinic created"},{date:mo(-2)+"T14:00:00Z",user:"Maureen Mutio",action:"Status → Live"}]},
  {id:"c7",name:"Skin Theory Denver",city:"Denver",state:"CO",territory_id:"t4",
   lat:39.7476,lng:-104.9965,
   open:"",close:"",
   address:"900 16th St Mall, Denver, CO 80202",phone:"(720) 559-2210",email:"info@skintheorydenver.com",
   contact:"Nicole Bauer",contact_type:"Owner",hasMD:false,hasNurses:false,nurse_count:0,
   status:"Not Contacted",sdr_notes:[],amb_notes:[],
   added_by:"u1",enterprise_id:"",monthly_history:[],hourly_data:[],
   changelog:[{date:mo(0)+"T08:45:00Z",user:"Maureen Mutio",action:"Clinic created"}]},
];

// helpers
const uName=(users,id)=>{ const u=users.find(u=>u.id===id); return u?u.name:"—"; };
const uObj =(users,id)=>users.find(u=>u.id===id)||null;
const lastMoOrders=(c)=>c.monthly_history.length?c.monthly_history[c.monthly_history.length-1].orders:0;
const prevMoOrders=(c)=>c.monthly_history.length>1?c.monthly_history[c.monthly_history.length-2].orders:null;
const totalOrders =(c)=>c.monthly_history.reduce((s,m)=>s+m.orders,0);
const momChange   =(c)=>{const l=lastMoOrders(c),p=prevMoOrders(c);if(p===null||p===0)return null;return Math.round(((l-p)/p)*100);};
const latestNote  =(arr)=>arr&&arr.length?arr[arr.length-1]:null;
const totalPaid   =(u)=>(u.payments||[]).reduce((s,p)=>s+p.amount,0);

// ── PAY HELPERS ──────────────────────────────────────────────
// Returns {flat, pct} for a user in a specific territory
// territory-level override → global default for that role
const effRates=(u, tid, ps)=>{
  const tr=u.territory_rates?.[tid];
  return {
    flat: tr?.flat ?? (u.role==="sdr" ? ps.sdr_flat : ps.amb_flat),
    pct:  tr?.pct  ?? (u.role==="sdr" ? ps.sdr_pct  : ps.amb_pct),
  };
};

// ── USER RATE ROW — proper component to avoid hooks-in-map violation ──────────
function UserRateRow({u, territory, paySettings, onSaveRates, onResetRates}){
  const defFlat = u.role==="sdr" ? paySettings.sdr_flat : paySettings.amb_flat;
  const defPct  = u.role==="sdr" ? paySettings.sdr_pct  : paySettings.amb_pct;
  const tr      = u.territory_rates?.[territory.id];
  const isCustom= tr?.flat!==undefined || tr?.pct!==undefined;
  const curFlat = tr?.flat ?? defFlat;
  const curPct  = tr?.pct  ?? defPct;

  const [editing, setEditing] = useState(false);
  const [rFlat,   setRFlat]   = useState(String(curFlat));
  const [rPct,    setRPct]    = useState(String(curPct));

  function save(){
    onSaveRates(territory.id, {flat: parseFloat(rFlat)||0, pct: parseFloat(rPct)||0});
    setEditing(false);
  }
  function reset(){
    onResetRates(territory.id);
    setEditing(false);
  }
  function startEdit(){
    setRFlat(String(curFlat));
    setRPct(String(curPct));
    setEditing(true);
  }

  return(
    <div style={{background:isCustom?C.purpleBg:C.surface,borderRadius:8,padding:"9px 12px",border:`1px solid ${isCustom?C.purple:C.border}`}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}}>
        <div>
          <div style={{fontWeight:700,fontSize:12,color:C.text}}>{territory.city}, {territory.state}</div>
          <div style={{display:"flex",gap:6,marginTop:3}}>
            <span style={{background:C.yellowBg,color:C.yellow,padding:"1px 7px",borderRadius:20,fontSize:10,fontWeight:700}}>{curPct}% rev</span>
            <span style={{background:C.skyBg,color:C.sky,padding:"1px 7px",borderRadius:20,fontSize:10,fontWeight:700}}>{"$"}{curFlat}/clinic</span>
            {isCustom&&<span style={{background:C.purpleBg,color:C.purple,padding:"1px 7px",borderRadius:20,fontSize:10,fontWeight:700}}>Custom</span>}
          </div>
        </div>
        {!editing&&(
          <button onClick={startEdit} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 10px",fontSize:11,color:C.muted,cursor:"pointer"}}>
            {isCustom?"Edit":"Set Custom"}
          </button>
        )}
      </div>
      {editing&&(
        <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,marginBottom:3,textTransform:"uppercase"}}>Flat / clinic ($)</div>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <span style={{fontSize:12,color:C.muted}}>$</span>
                <input type="number" min={0} step={10} value={rFlat} onChange={e=>setRFlat(e.target.value)}
                  style={{width:72,border:`1px solid ${C.blue}`,borderRadius:6,padding:"6px 8px",fontSize:13,fontWeight:700,textAlign:"center"}}/>
                <span style={{fontSize:10,color:C.mutedLight}}>default: {"$"}{defFlat}</span>
              </div>
            </div>
            <div>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,marginBottom:3,textTransform:"uppercase"}}>Rev share (%)</div>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <input type="number" min={0} max={100} step={0.1} value={rPct} onChange={e=>setRPct(e.target.value)}
                  style={{width:72,border:`1px solid ${C.blue}`,borderRadius:6,padding:"6px 8px",fontSize:13,fontWeight:700,textAlign:"center"}}/>
                <span style={{fontSize:12,color:C.muted}}>%</span>
                <span style={{fontSize:10,color:C.mutedLight}}>default: {defPct}%</span>
              </div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <Btn small variant="success" onClick={save}>Save</Btn>
              {isCustom&&<Btn small variant="danger" onClick={reset}>Reset</Btn>}
              <Btn small variant="ghost" onClick={()=>setEditing(false)}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const BLANK={name:"",territory_id:"",address:"",phone:"",email:"",contact:"",contact_type:"Owner",hasMD:false,hasNurses:false,nurse_count:1,open:"",close:"",sdr_notes_text:""};

//  UI atoms 
const Badge=({status})=>{const s=STATUS[status]||STATUS["Not Contacted"];return <span style={{background:s.bg,color:s.color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{status}</span>;};
function Card({children,style={},onClick}){ const m=useMobile(); return <div onClick={onClick} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:m?"12px 12px":"18px 20px",cursor:onClick?"pointer":"default",...style}}>{children}</div>; };
const Sec  =({children})=><div style={{fontSize:10,fontWeight:800,color:C.muted,textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:12}}>{children}</div>;
const IBox =({children,color=C.accent,bg=C.accentGlow})=><div style={{background:bg,border:`1px solid ${color}`,borderRadius:9,padding:"10px 13px",fontSize:12,color:C.text,lineHeight:1.6}}>{children}</div>;
function PH({title,sub,action}){ const m=useMobile(); return <div style={{display:"flex",alignItems:m?"flex-start":"flex-start",flexDirection:m?"column":"row",justifyContent:"space-between",gap:m?8:0,marginBottom:m?14:20}}><div><h1 style={{margin:0,fontSize:m?17:19,fontWeight:800,color:C.text}}>{title}</h1>{sub&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>{sub}</div>}</div>{action&&<div style={{flexShrink:0}}>{action}</div>}</div>; };
const StatCard=({label,value,sub,accent,icon})=><div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",minWidth:0,overflow:"hidden"}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>{icon&&<span style={{fontSize:15}}>{icon}</span>}<span style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</span></div><div style={{fontSize:18,fontWeight:800,color:accent||C.text,lineHeight:1,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{value}</div>{sub&&<div style={{fontSize:11,color:C.mutedLight}}>{sub}</div>}</div>;
const SNav =({tabs,active,onSelect,badges={}})=><div style={{display:"flex",marginBottom:18,borderBottom:`1px solid ${C.border}`,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>{tabs.map(t=>{const ct=badges[t.id]||0;return(<button key={t.id} onClick={()=>onSelect(t.id)} style={{background:"none",border:"none",padding:"9px 14px",fontWeight:700,fontSize:12,cursor:"pointer",color:active===t.id?C.blue:C.muted,borderBottom:active===t.id?`2px solid ${C.blue}`:"2px solid transparent",marginBottom:-1,whiteSpace:"nowrap",flexShrink:0,position:"relative"}}>{t.label}{ct>0&&<span style={{position:"absolute",top:6,right:4,minWidth:16,height:16,borderRadius:8,background:C.red,color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px",lineHeight:1}}>{ct}</span>}</button>);})}</div>;
const Btn  =({children,onClick,variant="primary",small})=>{const v={primary:{background:C.blue,color:"#fff",border:"none"},ghost:{background:"transparent",color:C.muted,border:`1px solid ${C.border}`},success:{background:C.greenBg,color:C.green,border:`1px solid ${C.green}`},danger:{background:C.redBg,color:C.red,border:`1px solid ${C.red}`}};return <button onClick={onClick} style={{...v[variant],borderRadius:7,padding:small?"5px 12px":"9px 16px",fontWeight:700,fontSize:small?11:12,cursor:"pointer",whiteSpace:"nowrap",minHeight:small?32:38,touchAction:"manipulation",WebkitTapHighlightColor:"transparent"}}>{children}</button>;};
const FI   =({label,value,onChange,placeholder,type="text"})=><div>{label&&<div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>}<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder||label||""} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,outline:"none",boxSizing:"border-box",background:"#fff",color:C.text}}/></div>;
const FS   =({label,value,onChange,options})=><div>{label&&<div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>}<select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,background:"#fff",color:C.text}}>{options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}</select></div>;

//  MODAL 
function Modal({title,onClose,children,wide,narrow}){
  const mob=useMobile();
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(11,24,41,0.65)",zIndex:1000,display:"flex",alignItems:mob?"flex-end":"center",justifyContent:"center",padding:mob?0:20}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:C.card,borderRadius:mob?"18px 18px 0 0":14,width:"100%",maxWidth:mob?"100%":narrow?460:wide?Math.min(820,window.innerWidth-32):560,maxHeight:mob?"92vh":"90vh",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(0,0,0,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:mob?"13px 16px":"15px 20px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{fontWeight:800,fontSize:mob?14:15,color:C.text}}>{title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:C.muted,cursor:"pointer",lineHeight:1,padding:"0 4px"}}>×</button>
        </div>
        <div style={{padding:mob?"14px 14px":"18px 20px",overflowY:"auto",flex:1}}>{children}</div>
      </div>
    </div>
  );
}

//  NOTE THREAD 
function NoteThread({notes,authorName,accentColor,onSave,canEdit,label}){
  const [editId,setEditId]=useState(null);
  const [draft,setDraft]=useState("");
  const color=accentColor||C.blue;

  function save(){
    if(!draft.trim())return;
    const updated=editId==="new"
      ?[...(notes||[]),{id:nid(),author:authorName,date:fmtNow(),text:draft.trim()}]
      :(notes||[]).map(n=>n.id===editId?{...n,text:draft.trim()}:n);
    onSave(updated);setEditId(null);setDraft("");
  }

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,color}}>{label}</div>
        {canEdit&&editId===null&&<button onClick={()=>{setEditId("new");setDraft("");}} style={{background:"none",border:`1px solid ${color}`,borderRadius:6,padding:"2px 9px",fontSize:10,fontWeight:700,color,cursor:"pointer"}}>+ Add Note</button>}
      </div>
      {(notes||[]).length===0&&editId!=="new"&&<div style={{fontSize:11,color:C.mutedLight,fontStyle:"italic",marginBottom:6}}>No notes yet.{canEdit?" Click + Add Note.":""}</div>}
      <div style={{display:"flex",flexDirection:"column",gap:5}}>
        {[...(notes||[])].reverse().map(n=>(
          <div key={n.id} style={{background:C.surface,borderRadius:8,padding:"9px 11px",border:`1px solid ${C.border}`}}>
            {editId===n.id?(
              <div>
                <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={3} autoFocus style={{width:"100%",border:`1px solid ${color}`,borderRadius:6,padding:"7px 9px",fontSize:12,resize:"vertical",boxSizing:"border-box",outline:"none"}}/>
                <div style={{display:"flex",gap:6,marginTop:5}}><Btn small variant="success" onClick={save}>Save</Btn><Btn small variant="ghost" onClick={()=>setEditId(null)}>Cancel</Btn></div>
              </div>
            ):(
              <div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
                  <div style={{display:"flex",gap:7,alignItems:"center"}}>
                    <span style={{fontSize:10,fontWeight:700,color}}>{n.author}</span>
                    <span style={{fontSize:10,color:C.mutedLight,cursor:"default"}} title={fmtTime(n.date)}>{fmtDate(n.date)}</span>
                  </div>
                  {canEdit&&<button onClick={()=>{setEditId(n.id);setDraft(n.text);}} style={{background:"none",border:"none",fontSize:10,color:C.mutedLight,cursor:"pointer",textDecoration:"underline"}}>edit</button>}
                </div>
                <div style={{fontSize:12,color:C.textSoft,lineHeight:1.5,whiteSpace:"pre-wrap"}}>{n.text}</div>
              </div>
            )}
          </div>
        ))}
        {editId==="new"&&(
          <div style={{background:C.surface,borderRadius:8,padding:"9px 11px",border:`2px solid ${color}`}}>
            <textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={3} autoFocus placeholder="Write a note…" style={{width:"100%",border:`1px solid ${color}`,borderRadius:6,padding:"7px 9px",fontSize:12,resize:"vertical",boxSizing:"border-box",outline:"none"}}/>
            <div style={{display:"flex",gap:6,marginTop:5}}><Btn small variant="success" onClick={save}>Save Note</Btn><Btn small variant="ghost" onClick={()=>setEditId(null)}>Cancel</Btn></div>
          </div>
        )}
      </div>
    </div>
  );
}

//  AMBASSADOR CONTACT CARD 
function AmbassadorCard({user,onClose}){
  if(!user)return null;
  const socials=[
    {icon:"WA",label:"WhatsApp", show:!!user.whatsapp, href:`https://wa.me/${user.whatsapp}`},
    {icon:"IG",label:"Instagram",show:!!user.instagram,href:`https://www.instagram.com/${user.instagram}/`},
    {icon:"TT",label:"TikTok",   show:!!user.tiktok,   href:`https://www.tiktok.com/@${user.tiktok}`},
  ].filter(s=>s.show);
  return(
    <Modal title="Ambassador Contact" onClose={onClose} narrow>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,background:C.purpleBg,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,color:C.purple,flexShrink:0}}>{user.name.charAt(0)}</div>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:C.text}}>{user.name}</div>
            <span style={{background:C.purpleBg,color:C.purple,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>Ambassador</span>
          </div>
        </div>

        <div style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:10}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Email</div>
            <div style={{fontSize:13,fontWeight:600}}><TapEmail v={user.email}/></div>
          </div>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.05em"}}>Phone</div>
            <div style={{fontSize:13,fontWeight:600}}><PhoneMenu phone={user.phone} user={user}/></div>
          </div>
        </div>

        {socials.length>0&&(
          <div style={{background:C.surface,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Social &amp; Messaging</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {socials.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:C.card,borderRadius:8,border:`1px solid ${C.border}`,textDecoration:"none",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt}
                  onMouseLeave={e=>e.currentTarget.style.background=C.card}>
                  <span style={{width:28,height:28,borderRadius:7,background:C.purpleBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:C.purple,flexShrink:0}}>{s.icon}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:C.text}}>{s.label}</div>
                    <div style={{fontSize:11,color:C.muted}}>
                      {s.label==="WhatsApp"?`+${user.whatsapp}`:s.label==="Instagram"?`@${user.instagram}`:`@${user.tiktok}`}
                    </div>
                  </div>
                  <span style={{marginLeft:"auto",fontSize:11,color:C.mutedLight}}>→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {socials.length===0&&(
          <div style={{fontSize:11,color:C.mutedLight,textAlign:"center",padding:"6px 0"}}>No social accounts set up. They can add them in their profile.</div>
        )}

        <Btn variant="ghost" onClick={onClose}>Close</Btn>
      </div>
    </Modal>
  );
}

//  TERRITORY DETAIL MODAL 
function TerritoryModal({territory,users,clinics,onClose,onUpdate,onLogAdmin}){
  const [sdrId,setSdrId]=useState(territory.sdr_id||"");
  const [ambId,setAmbId]=useState(territory.amb_id||"");
  const [status,setStatus]=useState(territory.status);
  const tc=clinics.filter(c=>c.territory_id===territory.id);
  const tl=tc.filter(c=>c.status==="Live");

  function save(){
    onUpdate({...territory,sdr_id:sdrId||null,amb_id:ambId||null,status});
    onLogAdmin&&onLogAdmin(`Territory ${territory.city} updated`);
    onClose();
  }

  return(
    <Modal title={`${territory.city}, ${territory.state}`} onClose={onClose} narrow>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,background:C.surface,borderRadius:9,padding:"12px 14px",border:`1px solid ${C.border}`}}>
          {[["Clinics",tc.length,C.text],["Live",tl.length,C.green],["Status",territory.status,territory.status==="Active"?C.green:C.yellow]].map(([l,v,ac])=>(
            <div key={l}><div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:3}}>{l}</div><div style={{fontSize:16,fontWeight:800,color:ac}}>{v}</div></div>
          ))}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <FS label="Assigned SDR" value={sdrId} onChange={setSdrId}
            options={[{value:"",label:"Unassigned"},...users.filter(u=>u.role==="sdr").map(u=>({value:u.id,label:u.name}))]}/>
          <FS label="Assigned Ambassador" value={ambId} onChange={setAmbId}
            options={[{value:"",label:"Unassigned"},...users.filter(u=>u.role==="ambassador").map(u=>({value:u.id,label:u.name}))]}/>
          <FS label="Status" value={status} onChange={setStatus}
            options={["Active","Pending","Inactive"]}/>
        </div>

        {sdrId&&(()=>{const u=uObj(users,sdrId);return u?<div style={{background:C.skyBg,borderRadius:8,padding:"10px 13px",border:`1px solid ${C.sky}`,fontSize:12}}><div style={{fontWeight:700,color:C.sky,marginBottom:2}}>SDR</div><div style={{color:C.text}}>{u.name}</div><div style={{color:C.muted,fontSize:11}}>{u.email} · {u.phone}</div></div>:null;})()}
        {ambId&&(()=>{const u=uObj(users,ambId);return u?<div style={{background:C.purpleBg,borderRadius:8,padding:"10px 13px",border:`1px solid ${C.purple}`,fontSize:12}}><div style={{fontWeight:700,color:C.purple,marginBottom:2}}>Ambassador</div><div style={{color:C.text}}>{u.name}</div><div style={{color:C.muted,fontSize:11}}>{u.email} · {u.phone}</div></div>:null;})()}

        <div style={{display:"flex",gap:8,paddingTop:4}}><Btn onClick={save}>Save Changes</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
      </div>
    </Modal>
  );
}

//  CLINIC DETAIL 
function ClinicDetail({clinic,onClose,territories,users,role,onSaveNotes,onUpdateAssignment}){
  const mob=useMobile();
  const t=territories.find(t=>t.id===clinic.territory_id);
  const [sdrAssign,setSdrAssign]=useState(t?.sdr_id||"");
  const [ambAssign,setAmbAssign]=useState(t?.amb_id||"");
  const [showTimestamp,setShowTimestamp]=useState({});
  const lm=lastMoOrders(clinic);const mom=momChange(clinic);const total=totalOrders(clinic);
  const canEditSdr=role==="sdr"||role==="admin";
  const canEditAmb=role==="ambassador"||role==="admin";
  const sdrAuthor=role==="sdr"?"Maureen Mutio":"Admin";
  const ambAuthor=role==="ambassador"?"Carlos Rivera":"Admin";

  return(
    <Modal title={clinic.name} onClose={onClose} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,marginBottom:16}}>
        {/* LEFT */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
            <Sec>Location &amp; Contact</Sec>
            <div style={{display:"flex",flexDirection:"column",gap:7,fontSize:12}}>
              <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Address</div><TapAddress v={clinic.address}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Phone</div><PhoneMenu phone={clinic.phone} user={null}/></div>
                <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Email</div><TapEmail v={clinic.email}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Contact</div><div style={{color:C.textSoft}}>{clinic.contact||"—"}</div></div>
                <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Type</div><span style={{background:C.purpleBg,color:C.purple,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>{clinic.contact_type}</span></div>
              </div>
            </div>
          </div>

          <div style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
            <Sec>Clinic Info</Sec>
            <div style={{display:"flex",gap:12,fontSize:12,flexWrap:"wrap"}}>
              <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Has MD</div>{clinic.hasMD?<span style={{color:C.green,fontWeight:700}}>Yes</span>:<span style={{color:C.muted}}>No</span>}</div>
              <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Nurses</div>{clinic.hasNurses?<span style={{color:C.green,fontWeight:700}}>Yes ({clinic.nurse_count})</span>:<span style={{color:C.muted}}>No</span>}</div>
              <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Status</div><Badge status={clinic.status}/></div>
              <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Enterprise</div>{clinic.enterprise_id?<span style={{color:C.green,fontWeight:700}}>{clinic.enterprise_id}</span>:<span style={{color:C.mutedLight,fontStyle:"italic"}}>Pending</span>}</div>
              {(clinic.open||clinic.close)&&<div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Hours</div><span style={{color:C.textSoft}}>{clinic.open||"—"} – {clinic.close||"—"}</span></div>}
            </div>
          </div>

          <div style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
            <Sec>Team Assignment</Sec>
            {role==="admin"?(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <FS label="SDR" value={sdrAssign} onChange={v=>{setSdrAssign(v);onUpdateAssignment&&onUpdateAssignment(clinic.id,"sdr_id",v);}}
                  options={[{value:"",label:"Unassigned"},...users.filter(u=>u.role==="sdr").map(u=>({value:u.id,label:u.name}))]}/>
                <FS label="Ambassador" value={ambAssign} onChange={v=>{setAmbAssign(v);onUpdateAssignment&&onUpdateAssignment(clinic.id,"amb_id",v);}}
                  options={[{value:"",label:"Unassigned"},...users.filter(u=>u.role==="ambassador").map(u=>({value:u.id,label:u.name}))]}/>
              </div>
            ):(
              <div style={{display:"flex",gap:16,fontSize:12}}>
                <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>SDR</div><div style={{color:C.sky}}>{t?.sdr_id?uName(users,t.sdr_id):"—"}</div></div>
                <div><div style={{fontWeight:700,color:C.text,fontSize:11,marginBottom:2}}>Ambassador</div><div style={{color:C.purple}}>{t?.amb_id?uName(users,t.amb_id):"—"}</div></div>
              </div>
            )}
          </div>

          <div style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`,flex:1}}>
            <NoteThread notes={clinic.sdr_notes} authorName={sdrAuthor} accentColor={C.sky} label="SDR Notes" canEdit={canEditSdr} onSave={updated=>onSaveNotes(clinic.id,"sdr_notes",updated)}/>
            <div style={{borderTop:`1px solid ${C.border}`,margin:"12px 0"}}/>
            <NoteThread notes={clinic.amb_notes} authorName={ambAuthor} accentColor={C.purple} label="Ambassador Notes" canEdit={canEditAmb} onSave={updated=>onSaveNotes(clinic.id,"amb_notes",updated)}/>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {clinic.status==="Live"?(
            <div style={{background:C.greenBg,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.green}`}}>
              <Sec>Revenue &amp; Orders</Sec>
              {(()=>{
                const [expandedStat,setExpandedStat]=useState(null);
                const statRows=[
                  {key:"lm_orders",label:"Last Month Orders",val:lm,color:C.green,note:mom!==null?`${mom>=0?"▲":"▼"} ${Math.abs(mom)}% MoM`:null},
                  {key:"lm_rev",label:"Last Month Revenue",val:`$${(lm*200).toLocaleString()}`,color:C.blue,note:"@ $200 avg"},
                  {key:"total_orders",label:"Total Orders",val:total,color:C.text,note:null},
                  {key:"total_rev",label:"Total Revenue",val:`$${(total*200).toLocaleString()}`,color:C.text,note:null},
                ];
                // Monthly chart data for expanded view
                const monthlyData=clinic.monthly_history.map((m,i)=>({
                  name:m.month?.slice(0,7)||`Mo ${i+1}`,
                  orders:m.orders,
                  revenue:m.orders*200,
                }));
                const chartKey=expandedStat?.startsWith("lm_rev")||expandedStat?.startsWith("total_rev")?"revenue":"orders";
                return(
                  <>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                      {statRows.map(s=>(
                        <div key={s.key} onClick={()=>setExpandedStat(expandedStat===s.key?null:s.key)}
                          style={{background:C.card,borderRadius:8,padding:"10px 12px",border:`1px solid ${expandedStat===s.key?C.purple:C.border}`,cursor:clinic.monthly_history.length>0?"pointer":"default",transition:"border-color 0.15s"}}>
                          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:3,lineHeight:1.3}}>{s.label}</div>
                          <div style={{fontSize:18,fontWeight:800,color:s.color}}>{s.val}</div>
                          {s.note&&<div style={{fontSize:10,color:mom!==null&&mom<0?C.red:C.green,fontWeight:700,marginTop:2}}>{s.note}</div>}
                          {clinic.monthly_history.length>0&&<div style={{fontSize:9,color:C.mutedLight,marginTop:3}}>Tap to expand</div>}
                        </div>
                      ))}
                    </div>
                    {expandedStat&&monthlyData.length>0&&(
                      <div style={{background:C.card,borderRadius:9,padding:"12px 14px",border:`1px solid ${C.purple}`,marginBottom:10}}>
                        <div style={{fontSize:11,fontWeight:700,color:C.purple,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>
                          Monthly {chartKey==="revenue"?"Revenue":"Orders"} History
                        </div>
                        <ResponsiveContainer width="100%" height={140}>
                          <BarChart data={monthlyData} margin={{top:4,right:4,left:0,bottom:0}}>
                            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                            <XAxis dataKey="name" tick={{fontSize:9,fill:C.muted}} tickLine={false}/>
                            <YAxis tick={{fontSize:9,fill:C.muted}} tickLine={false} axisLine={false} width={chartKey==="revenue"?44:24}
                              tickFormatter={v=>chartKey==="revenue"?`$${v>=1000?Math.round(v/100)/10+"k":v}`:v}/>
                            <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,fontSize:11}}
                              formatter={(v)=>chartKey==="revenue"?[`$${v.toLocaleString()}`,"Revenue"]:[v,"Orders"]}/>
                            <Bar dataKey={chartKey} fill={chartKey==="revenue"?C.green:C.purple} radius={[3,3,0,0]}/>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ):(
            <div style={{background:C.surface,borderRadius:10,padding:"20px",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",minHeight:80}}>
              <div style={{textAlign:"center",color:C.mutedLight,fontSize:12}}>Revenue available once clinic is Live</div>
            </div>
          )}

          <div style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`,flex:1}}>
            <Sec>Activity Log</Sec>
            <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:260,overflowY:"auto"}}>
              {clinic.changelog?[...clinic.changelog].reverse().map((e,i)=>(
                <div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",fontSize:11,padding:"5px 7px",background:i%2===0?C.card:"transparent",borderRadius:6}}>
                  <span title={fmtTime(e.date)} onClick={()=>setShowTimestamp(p=>({...p,[i]:!p[i]}))} style={{color:C.mutedLight,whiteSpace:"nowrap",flexShrink:0,fontSize:10,minWidth:72,cursor:"pointer",textDecoration:"underline dotted"}}>{showTimestamp[i]?fmtTime(e.date):fmtDate(e.date)}</span>
                  <span style={{color:C.blue,fontWeight:600,flexShrink:0,whiteSpace:"nowrap"}}>{e.user}</span>
                  <span style={{color:C.textSoft}}>{e.action}</span>
                </div>
              )):<div style={{color:C.mutedLight,fontSize:12}}>No history</div>}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

//  MARK PAID MODAL 
function MarkPaidModal({user,owed,onConfirm,onClose}){
  const [type,setType]=useState("full");
  const [amount,setAmount]=useState(String(owed.toFixed(0)));
  const finalAmt=type==="full"?owed:(parseFloat(amount)||0);
  return(
    <Modal title={`Record Payment — ${user.name}`} onClose={onClose} narrow>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:13,color:C.textSoft,marginBottom:14}}>Earnings due: <strong style={{color:C.green}}>{"$"}{owed.toFixed(0)}</strong> · Paid to date: <strong style={{color:C.blue}}>{"$"}{totalPaid(user).toFixed(0)}</strong></div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>Payment Type</div>
          <div style={{display:"flex",gap:8}}>
            {[["full","Full Amount"],["partial","Partial"]].map(([val,lbl])=>(
              <button key={val} onClick={()=>{setType(val);if(val==="full")setAmount(String(owed.toFixed(0)));}}
                style={{flex:1,padding:"8px",border:`2px solid ${type===val?C.blue:C.border}`,borderRadius:8,background:type===val?"#EEF5FF":"#fff",color:type===val?C.blue:C.muted,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
        {type==="partial"&&(
          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Amount ($)</div>
            <input type="number" min={0} max={owed} value={amount} onChange={e=>setAmount(e.target.value)}
              style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"9px 11px",fontSize:14,outline:"none",boxSizing:"border-box",fontWeight:700,color:C.text}}/>
            {parseFloat(amount)>owed&&<div style={{fontSize:11,color:C.red,marginTop:4}}>Exceeds earnings due (${owed.toFixed(0)})</div>}
          </div>
        )}
        <div style={{background:C.surface,borderRadius:8,padding:"10px 13px",border:`1px solid ${C.border}`,fontSize:12,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:C.muted}}>Recording payment</span><strong style={{color:C.green}}>{"$"}{finalAmt.toFixed(0)}</strong></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{color:C.muted}}>Remaining after</span><strong style={{color:Math.max(0,owed-finalAmt)>0?C.yellow:C.green}}>{"$"}{Math.max(0,owed-finalAmt).toFixed(0)}</strong></div>
        </div>
        <div style={{display:"flex",gap:8}}><Btn variant="success" onClick={()=>{if(finalAmt>0&&finalAmt<=owed)onConfirm(finalAmt);}}>Confirm</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
      </div>
    </Modal>
  );
}

//  CLINIC FORM 
function ClinicForm({title,territories,users,onSave,onClose,adminMode}){
  const [f,setF]=useState({...BLANK,territory_id:territories[0]?.id||""});
  const up=(k,v)=>setF(p=>({...p,[k]:v}));
  const nurseLabel=f.nurse_count>=10?"10+":String(f.nurse_count);
  return(
    <Modal title={title} onClose={onClose} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <FI label="Clinic Name" value={f.name} onChange={v=>up("name",v)}/>
        <FS label="Territory" value={f.territory_id} onChange={v=>up("territory_id",v)} options={territories.map(t=>({value:t.id,label:`${t.city}, ${t.state}`}))}/>
        <div style={{gridColumn:"1/-1"}}><FI label="Address" value={f.address} onChange={v=>up("address",v)} placeholder="Full street address"/></div>
        <FI label="Phone" value={f.phone} onChange={v=>up("phone",v)}/>
        <FI label="Email" value={f.email} onChange={v=>up("email",v)} type="email"/>
        <FI label="Contact Name" value={f.contact} onChange={v=>up("contact",v)}/>
        <FS label="Contact Type" value={f.contact_type} onChange={v=>up("contact_type",v)} options={CONTACT_TYPES}/>
        {adminMode&&<>
          <FS label="Override SDR" value={f.sdr_override||""} onChange={v=>up("sdr_override",v)} options={[{value:"",label:"From territory"},...(users||[]).filter(u=>u.role==="sdr").map(u=>({value:u.id,label:u.name}))]}/>
          <FS label="Override Ambassador" value={f.amb_override||""} onChange={v=>up("amb_override",v)} options={[{value:"",label:"From territory"},...(users||[]).filter(u=>u.role==="ambassador").map(u=>({value:u.id,label:u.name}))]}/>
        </>}
      </div>
      <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,cursor:"pointer",fontWeight:600,color:C.textSoft}}><input type="checkbox" checked={f.hasMD} onChange={e=>up("hasMD",e.target.checked)}/> Has Own MD</label>
        <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,cursor:"pointer",fontWeight:600,color:C.textSoft}}><input type="checkbox" checked={f.hasNurses} onChange={e=>up("hasNurses",e.target.checked)}/> Has Own Nurses</label>
      </div>
      {f.hasNurses&&(
        <div style={{marginBottom:12,background:C.surface,borderRadius:9,padding:"12px 14px",border:`1px solid ${C.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>Number of Nurses on Staff</div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <input type="range" min={1} max={10} value={Math.min(f.nurse_count,10)} onChange={e=>up("nurse_count",parseInt(e.target.value))} style={{flex:1,accentColor:C.blue}}/>
            <div style={{minWidth:36,textAlign:"center",fontWeight:800,fontSize:16,color:C.blue}}>{nurseLabel}</div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.mutedLight,marginTop:4}}>
            <span>1</span>{[3,5,7].map(n=><span key={n}>{n}</span>)}<span>10+</span>
          </div>
        </div>
      )}
      <div style={{marginBottom:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Opening Time</div>
          <input type="time" value={f.open||""} onChange={e=>up("open",e.target.value)} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,background:"#fff",color:C.text,boxSizing:"border-box"}}/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Closing Time</div>
          <input type="time" value={f.close||""} onChange={e=>up("close",e.target.value)} style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,background:"#fff",color:C.text,boxSizing:"border-box"}}/>
        </div>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Initial Note</div>
        <textarea value={f.sdr_notes_text||""} onChange={e=>up("sdr_notes_text",e.target.value)} rows={2} placeholder="Notes…" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,resize:"vertical",boxSizing:"border-box"}}/>
      </div>
      <div style={{display:"flex",gap:8}}><Btn onClick={()=>onSave(f)}>Save Clinic</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

//  CREATE USER MODAL 
function CreateUserModal({onSave,onClose}){
  const [f,setF]=useState({name:"",email:"",phone:"",role:"sdr",pay_method:"Automated",password:""});
  const up=(k,v)=>setF(p=>({...p,[k]:v}));
  function save(){
    if(!f.name||!f.email||!f.password)return;
    onSave({id:"u"+Date.now(),...f,territory_rates:{},payments:[],tasks:[]});
    onClose();
  }
  return(
    <Modal title="Create New User" onClose={onClose} narrow>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        <FI label="Full Name" value={f.name} onChange={v=>up("name",v)}/>
        <FI label="Email" value={f.email} onChange={v=>up("email",v)} type="email"/>
        <FI label="Phone" value={f.phone} onChange={v=>up("phone",v)}/>
        <FI label="Password" value={f.password} onChange={v=>up("password",v)} type="password"/>
        <FS label="Role" value={f.role} onChange={v=>up("role",v)} options={["sdr","ambassador"]}/>

        <FS label="Pay Method" value={f.pay_method} onChange={v=>up("pay_method",v)} options={PAY_METHODS}/>
      </div>
      <div style={{display:"flex",gap:8}}><Btn onClick={save}>Create User</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

//  TASK MODAL 
function TaskModal({users,onSave,onClose}){
  const [f,setF]=useState({assigned_to:"u1",title:"",notes:"",priority:"Medium",due:""});
  const up=(k,v)=>setF(p=>({...p,[k]:v}));
  function save(){
    if(!f.title||!f.assigned_to)return;
    onSave({id:nid(),...f,created:fmtNow(),done:false});
    onClose();
  }
  return(
    <Modal title="Add Task" onClose={onClose} narrow>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        <FS label="Assign To" value={f.assigned_to} onChange={v=>up("assigned_to",v)} options={users.map(u=>({value:u.id,label:`${u.name} (${u.role})`}))}/>
        <FI label="Task Title" value={f.title} onChange={v=>up("title",v)} placeholder="e.g. Follow up with Aria Aesthetics"/>
        <FS label="Priority" value={f.priority} onChange={v=>up("priority",v)} options={TASK_PRIORITIES}/>
        <FI label="Due Date (optional)" value={f.due} onChange={v=>up("due",v)} type="date"/>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Notes</div>
          <textarea value={f.notes} onChange={e=>up("notes",e.target.value)} rows={2} placeholder="Additional context…" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,resize:"vertical",boxSizing:"border-box"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}><Btn onClick={save}>Add Task</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

//  CLINIC ROW 
function ClinicRow({c,territories,users,role,onUpdateStatus,onSaveNotes,onUpdateAssignment,even}){
  const [open,setOpen]=useState(false);
  const t=territories.find(t=>t.id===c.territory_id);
  const amb=t?.amb_id?uObj(users,t.amb_id):null;
  const lm=lastMoOrders(c);const mom=momChange(c);
  const ambOnly=role==="ambassador";
  const statusOpts=ambOnly?["Not Contacted","Contacted","Meeting Set","Onboarding"]:Object.keys(STATUS);
  const canUpdate=!ambOnly||["Not Contacted","Contacted","Meeting Set","Onboarding"].includes(c.status);
  const previewNote=ambOnly?latestNote(c.amb_notes):latestNote(c.sdr_notes);

  return(
    <>
      <tr style={{background:even?C.card:C.surface,borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}
        onClick={()=>setOpen(true)}
        onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt}
        onMouseLeave={e=>e.currentTarget.style.background=even?C.card:C.surface}>
        <td style={{padding:"9px 12px",fontWeight:700,color:C.text,fontSize:12,whiteSpace:"nowrap"}}>{c.name}</td>
        <td style={{padding:"9px 12px",color:C.muted,fontSize:12,whiteSpace:"nowrap"}}>{c.city}, {c.state}</td>
        <td style={{padding:"9px 12px",fontSize:12}}>
          <div style={{color:C.textSoft,whiteSpace:"nowrap"}}>{c.contact}</div>
          <div style={{fontSize:10,color:C.mutedLight}}>{c.contact_type}</div>
        </td>
        <td style={{padding:"9px 12px"}}><Badge status={c.status}/></td>
        {!ambOnly&&(
          <td style={{padding:"9px 12px",fontSize:11}} onClick={e=>{e.stopPropagation();}}>
            {amb
              ?<button onClick={e=>{e.stopPropagation();setOpen("amb");}} style={{background:C.purpleBg,border:"none",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:C.purple,cursor:"pointer"}}>{amb.name}</button>
              :<span style={{color:C.mutedLight,fontStyle:"italic"}}>—</span>}
          </td>
        )}
        <td style={{padding:"9px 12px",fontSize:11,maxWidth:170}}>
          {previewNote
            ?<div><div style={{fontWeight:600,fontSize:10,color:ambOnly?C.purple:C.sky,marginBottom:1}}>{previewNote.author} · {fmtDate(previewNote.date)}</div><div style={{color:C.textSoft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:155}}>{previewNote.text}</div></div>
            :<span style={{color:C.mutedLight,fontStyle:"italic"}}>No notes</span>}
        </td>
        <td style={{padding:"9px 12px",fontSize:12}}>
          {c.status==="Live"?<div><div style={{fontWeight:700,color:C.green,whiteSpace:"nowrap"}}>{lm} orders</div>{mom!==null&&<div style={{fontSize:10,color:mom>=0?C.green:C.red,fontWeight:700}}>{mom>=0?"▲":"▼"}{Math.abs(mom)}% MoM</div>}</div>:<span style={{color:C.mutedLight}}>—</span>}
        </td>
        <td style={{padding:"9px 12px"}} onClick={e=>e.stopPropagation()}>
          {canUpdate
            ?<select value={c.status} onChange={e=>onUpdateStatus(c.id,e.target.value)} style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 7px",fontSize:11,background:"#fff",color:C.text}}>
               {statusOpts.map(s=><option key={s}>{s}</option>)}
             </select>
            :<span style={{fontSize:11,color:C.mutedLight,fontStyle:"italic"}}>Locked</span>}
        </td>
      </tr>
      {open===true&&<ClinicDetail clinic={c} onClose={()=>setOpen(false)} territories={territories} users={users} role={role} onSaveNotes={onSaveNotes} onUpdateAssignment={onUpdateAssignment}/>}
      {open==="amb"&&amb&&<AmbassadorCard user={amb} onClose={()=>setOpen(false)}/>}
    </>
  );
}

//  TAPPABLE CONTACT 
// ── TAPPABLE CONTACT LINKS ───────────────────────────────────
// All links use plain hrefs — no JS, no popover wrapping, no conflicting target attributes
// tel: / sms: / mailto: must have NO target so the OS intercepts them natively

const TapEmail=({v})=>v
  ?<a href={`mailto:${v}`} style={{color:C.blue,fontWeight:600,textDecoration:"none",display:"inline-block"}}>{v}</a>
  :<span style={{color:C.mutedLight}}>—</span>;

const TapAddress=({v})=>v
  ?<a href={`https://maps.google.com/?q=${encodeURIComponent(v)}`} target="_blank" rel="noreferrer"
      style={{color:C.blue,fontWeight:600,textDecoration:"none",display:"inline-block"}}>{v}</a>
  :<span style={{color:C.mutedLight}}>—</span>;

// PhoneMenu — on mobile shows inline action buttons instead of a popover
function PhoneMenu({phone, user}){
  const mob=useMobile();
  const [open,setOpen]=useState(false);
  if(!phone) return <span style={{color:C.mutedLight}}>—</span>;
  const digits=phone.replace(/\D/g,"");

  // On mobile: render compact inline action row — no popover, direct native links
  if(mob){
    return(
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        <a href={`tel:${digits}`}
          style={{color:C.blue,fontWeight:700,fontSize:13,textDecoration:"none",display:"block"}}>
          {phone}
        </a>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <a href={`tel:${digits}`}
            style={{background:C.purpleBg,color:C.purple,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,textDecoration:"none"}}>
            Call
          </a>
          <a href={`sms:${digits}`}
            style={{background:C.skyBg,color:C.sky,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,textDecoration:"none"}}>
            Text
          </a>
          {user?.whatsapp&&(
            <a href={`https://wa.me/${user.whatsapp}`} target="_blank" rel="noreferrer"
              style={{background:C.greenBg,color:C.green,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,textDecoration:"none"}}>
              WhatsApp
            </a>
          )}
          {user?.instagram&&(
            <a href={`https://www.instagram.com/${user.instagram}/`} target="_blank" rel="noreferrer"
              style={{background:C.purpleBg,color:C.purple,padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,textDecoration:"none"}}>
              IG
            </a>
          )}
          {user?.tiktok&&(
            <a href={`https://www.tiktok.com/@${user.tiktok}`} target="_blank" rel="noreferrer"
              style={{background:"#f0f0f0",color:"#000",padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:700,textDecoration:"none"}}>
              TikTok
            </a>
          )}
        </div>
      </div>
    );
  }

  // Desktop: popover
  const actions=[
    {icon:"Call",  label:"Call",      href:`tel:${digits}`},
    {icon:"Text",  label:"Text",      href:`sms:${digits}`},
    ...(user?.whatsapp?[{icon:"WA",  label:"WhatsApp",  href:`https://wa.me/${user.whatsapp}`}]:[]),
    ...(user?.instagram?[{icon:"IG", label:"Instagram", href:`https://www.instagram.com/${user.instagram}/`}]:[]),
    ...(user?.tiktok?[{icon:"TT",    label:"TikTok",    href:`https://www.tiktok.com/@${user.tiktok}`}]:[]),
  ];

  return(
    <div style={{position:"relative",display:"inline-block"}}>
      <button onClick={e=>{e.stopPropagation();setOpen(o=>!o);}}
        style={{background:"none",border:"none",color:C.blue,fontWeight:600,fontSize:12,cursor:"pointer",padding:0,textDecoration:"underline dotted"}}>
        {phone}
      </button>
      {open&&(
        <>
          <div style={{position:"fixed",inset:0,zIndex:999}} onClick={()=>setOpen(false)}/>
          <div style={{position:"absolute",top:"100%",left:0,marginTop:6,zIndex:1000,
            background:C.card,border:`1px solid ${C.border}`,borderRadius:12,
            boxShadow:"0 8px 32px rgba(26,10,46,0.2)",minWidth:160,overflow:"hidden"}}>
            <div style={{padding:"8px 12px 6px",fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:`1px solid ${C.border}`}}>
              {phone}
            </div>
            {actions.map(a=>(
              <a key={a.label} href={a.href}
                target={a.href.startsWith("http")?"_blank":undefined}
                rel={a.href.startsWith("http")?"noreferrer":undefined}
                onClick={()=>setOpen(false)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",textDecoration:"none",color:C.text,fontSize:13,fontWeight:600}}>
                <span style={{width:28,height:28,borderRadius:7,background:C.purpleBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:C.purple,flexShrink:0}}>{a.icon}</span>
                <span>{a.label}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

//  PROFILE MODAL 
function ProfileModal({user,onSave,onClose}){
  const [name,setName]=useState(user.name);
  const [email,setEmail]=useState(user.email||"");
  const [phone,setPhone]=useState(user.phone||"");
  const [whatsapp,setWhatsapp]=useState(user.whatsapp||"");
  const [instagram,setInstagram]=useState(user.instagram||"");
  const [tiktok,setTiktok]=useState(user.tiktok||"");
  const [pw,setPw]=useState("");
  const [pw2,setPw2]=useState("");
  const [err,setErr]=useState("");
  function save(){
    if(pw&&pw!==pw2){setErr("Passwords do not match.");return;}
    const updates={name,email,phone,whatsapp,instagram,tiktok};
    if(pw)updates.password=pw;
    onSave(updates);
    onClose();
  }
  return(
    <Modal title="Edit Profile" onClose={onClose} narrow>
      <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:14}}>
        <FI label="Name" value={name} onChange={setName}/>
        <FI label="Email" value={email} onChange={setEmail} type="email"/>
        <FI label="Phone" value={phone} onChange={setPhone}/>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>
             Contact Options
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>WhatsApp Number</div>
              <input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="e.g. 13055550202 (digits only, with country code)"
                style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,outline:"none",boxSizing:"border-box",background:"#fff",color:C.text}}/>
              <div style={{fontSize:10,color:C.mutedLight,marginTop:3}}>Digits only with country code. Leave blank to hide.</div>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Instagram Handle</div>
              <div style={{display:"flex",alignItems:"center",gap:0,border:`1px solid ${C.border}`,borderRadius:7,overflow:"hidden",background:"#fff"}}>
                <span style={{padding:"8px 10px",fontSize:12,color:C.mutedLight,background:C.surface,borderRight:`1px solid ${C.border}`,flexShrink:0}}>@</span>
                <input value={instagram} onChange={e=>setInstagram(e.target.value.replace(/^@/,""))} placeholder="username"
                  style={{flex:1,border:"none",padding:"8px 10px",fontSize:12,outline:"none",color:C.text}}/>
              </div>
            </div>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>TikTok Handle</div>
              <div style={{display:"flex",alignItems:"center",gap:0,border:`1px solid ${C.border}`,borderRadius:7,overflow:"hidden",background:"#fff"}}>
                <span style={{padding:"8px 10px",fontSize:12,color:C.mutedLight,background:C.surface,borderRight:`1px solid ${C.border}`,flexShrink:0}}>@</span>
                <input value={tiktok} onChange={e=>setTiktok(e.target.value.replace(/^@/,""))} placeholder="username"
                  style={{flex:1,border:"none",padding:"8px 10px",fontSize:12,outline:"none",color:C.text}}/>
              </div>
            </div>
          </div>
        </div>

        <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10}}>
          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Change Password (leave blank to keep current)</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <FI label="New Password" value={pw} onChange={setPw} type="password"/>
            <FI label="Confirm Password" value={pw2} onChange={setPw2} type="password"/>
          </div>
        </div>
        {err&&<div style={{background:C.redBg,color:C.red,borderRadius:7,padding:"8px 11px",fontSize:12}}>{err}</div>}
      </div>
      <div style={{display:"flex",gap:8}}><Btn onClick={save}>Save Changes</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

//  ANALYTICS VIEW 
const fmtHour=(h)=>{if(h===0)return"12am";if(h<12)return`${h}am`;if(h===12)return"12pm";return`${h-12}pm`;};

// ── EVENT FORM MODAL ─────────────────────────────────────────
function EventForm({ambId, ambName, territories, onSave, onClose}){
  const myT=territories.filter(t=>t.amb_id===ambId);
  const [name,setName]=useState("");
  const [date,setDate]=useState("");
  const [loc, setLoc] =useState("");
  const [notes,setNotes]=useState("");
  const [expense,setExpense]=useState("");
  const [territory_id,setTerritoryId]=useState(myT[0]?.id||"");
  function save(){
    if(!name||!date)return;
    onSave({
      id:nid(), amb_id:ambId, amb_name:ambName,
      name, date, location:loc, notes,
      expense: expense?parseFloat(expense)||0:null,
      territory_id,
      status:"pending_approval", expense_approved:false,
      created:fmtNow(),
    });
    onClose();
  }
  return(
    <Modal title="Log Event / Activity" onClose={onClose} narrow>
      <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:14}}>
        <FI label="Event / Activity Name" value={name} onChange={setName} placeholder="e.g. Networking mixer at Wynwood"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Date</div>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)}
              style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,background:"#fff",color:C.text,boxSizing:"border-box"}}/>
          </div>
          {myT.length>1&&<FS label="Territory" value={territory_id} onChange={setTerritoryId}
            options={myT.map(t=>({value:t.id,label:`${t.city}, ${t.state}`}))}/>}
        </div>
        <FI label="Location" value={loc} onChange={setLoc} placeholder="Venue name or address"/>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Notes</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="What happened, who attended, outcomes..."
            style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,resize:"vertical",boxSizing:"border-box"}}/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.06em"}}>Billable Expense ($) — optional</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:13,color:C.muted,fontWeight:600}}>$</span>
            <input type="number" min={0} step={0.01} value={expense} onChange={e=>setExpense(e.target.value)}
              placeholder="0.00" style={{flex:1,border:`1px solid ${C.border}`,borderRadius:7,padding:"8px 10px",fontSize:13,background:"#fff",color:C.text}}/>
          </div>
          <div style={{fontSize:11,color:C.mutedLight,marginTop:4}}>Submit for admin approval. Approved expenses are added to your owed balance.</div>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}><Btn onClick={save}>Log Event</Btn><Btn variant="ghost" onClick={onClose}>Cancel</Btn></div>
    </Modal>
  );
}

// ── EVENT LOG VIEW ───────────────────────────────────────────
// role: "ambassador" (own events, no expense $), "admin" (all events, can approve expense), "sdr" (see events no expense)
function EventLogView({events, setEvents, ambId, role, territories, users, logA}){
  const [showForm,setShowForm]=useState(false);
  const ambUser=users?.find(u=>u.id===ambId);

  const visible = role==="ambassador"
    ? events.filter(e=>e.amb_id===ambId)
    : role==="sdr"
      ? events.filter(e=>{ const t=territories.find(t=>t.id===e.territory_id); return t?.sdr_id===ambId; })
      : events; // admin sees all

  const isPast=(d)=>new Date(d)<=new Date();

  function approveExpense(evtId){
    setEvents(p=>p.map(e=>{
      if(e.id!==evtId)return e;
      return{...e,expense_approved:true,status:"approved"};
    }));
    logA&&logA(`Expense approved for event: ${events.find(e=>e.id===evtId)?.name}`);
  }
  function rejectExpense(evtId){
    setEvents(p=>p.map(e=>e.id===evtId?{...e,expense_approved:false,status:"rejected"}:e));
    logA&&logA(`Expense rejected for event: ${events.find(e=>e.id===evtId)?.name}`);
  }
  function deleteEvent(evtId){
    setEvents(p=>p.filter(e=>e.id!==evtId));
  }

  const sortedEvents=[...visible].sort((a,b)=>b.date.localeCompare(a.date));
  const pendingExpenses=events.filter(e=>e.expense&&e.expense>0&&!e.expense_approved&&e.status!=="rejected");

  return(
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <Sec>Events &amp; Activities{pendingExpenses.length>0&&role==="admin"?` · ${pendingExpenses.length} expense${pendingExpenses.length>1?"s":""} pending approval`:""}</Sec>
        </div>
        {role==="ambassador"&&(
          <Btn small onClick={()=>setShowForm(true)}>+ Log Event</Btn>
        )}
      </div>

      {/* Admin pending expense alert */}
      {role==="admin"&&pendingExpenses.length>0&&(
        <div style={{background:C.yellowBg,border:`1px solid ${C.yellow}`,borderRadius:9,padding:"10px 14px",fontSize:12}}>
          <strong style={{color:C.yellow}}>{pendingExpenses.length} pending expense{pendingExpenses.length>1?"s":""}</strong>
          <span style={{color:C.textSoft}}> — review and approve in the event cards below.</span>
        </div>
      )}

      {sortedEvents.length===0&&(
        <div style={{textAlign:"center",padding:"30px 20px",color:C.muted,fontSize:12}}>
          {role==="ambassador"?"No events logged yet. Tap + Log Event to add one.":"No events recorded."}
        </div>
      )}

      {sortedEvents.map(evt=>{
        const t=territories.find(t=>t.id===evt.territory_id);
        const hasExpense=evt.expense&&evt.expense>0;
        const past=isPast(evt.date);
        const statusColor=evt.status==="approved"?C.green:evt.status==="rejected"?C.red:C.yellow;
        const statusBg=evt.status==="approved"?C.greenBg:evt.status==="rejected"?C.redBg:C.yellowBg;
        return(
          <div key={evt.id} style={{background:C.card,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10,marginBottom:8}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                  <div style={{fontWeight:700,fontSize:13,color:C.text}}>{evt.name}</div>
                  <span style={{background:past?"#EDF0F5":C.greenBg,color:past?C.muted:C.green,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>{past?"Past":"Upcoming"}</span>
                  {t&&<span style={{background:C.skyBg,color:C.sky,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>{t.city}</span>}
                  {role!=="ambassador"&&<span style={{background:C.purpleBg,color:C.purple,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>{evt.amb_name}</span>}
                </div>
                <div style={{display:"flex",gap:14,fontSize:11,color:C.muted,flexWrap:"wrap"}}>
                  <span>{evt.date}</span>
                  {evt.location&&<span>{evt.location}</span>}
                </div>
              </div>
              {role==="ambassador"&&(
                <button onClick={()=>deleteEvent(evt.id)} style={{background:"none",border:"none",fontSize:16,color:C.mutedLight,cursor:"pointer",flexShrink:0,lineHeight:1,padding:"0 2px"}}>×</button>
              )}
            </div>

            {evt.notes&&<div style={{fontSize:12,color:C.textSoft,marginBottom:10,lineHeight:1.5}}>{evt.notes}</div>}

            {/* Expense row — hide $ amount from SDR */}
            {hasExpense&&role!=="sdr"&&(
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:evt.expense_approved?C.greenBg:evt.status==="rejected"?C.redBg:C.yellowBg,borderRadius:8,border:`1px solid ${statusColor}`}}>
                <div style={{flex:1}}>
                  <span style={{fontWeight:700,fontSize:12,color:statusColor}}>
                    {role==="ambassador"?"Expense submitted":""} {"$"}{evt.expense?.toFixed(2)}
                  </span>
                  <span style={{marginLeft:8,fontSize:11,color:statusColor,fontWeight:600}}>
                    {evt.expense_approved?"Approved — added to owed":evt.status==="rejected"?"Rejected":"Pending admin approval"}
                  </span>
                </div>
                {role==="admin"&&!evt.expense_approved&&evt.status!=="rejected"&&(
                  <div style={{display:"flex",gap:6}}>
                    <Btn small variant="success" onClick={()=>approveExpense(evt.id)}>Approve</Btn>
                    <Btn small variant="danger"  onClick={()=>rejectExpense(evt.id)}>Reject</Btn>
                  </div>
                )}
              </div>
            )}

            {/* SDR sees event but not expense amount */}
            {hasExpense&&role==="sdr"&&(
              <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>Expense submitted — pending admin review.</div>
            )}
          </div>
        );
      })}

      {showForm&&ambUser&&(
        <EventForm
          ambId={ambId} ambName={ambUser.name}
          territories={territories}
          onSave={evt=>{setEvents(p=>[...p,evt]);logA&&logA(`Event logged by ${ambUser.name}: ${evt.name}`);}}
          onClose={()=>setShowForm(false)}
        />
      )}
    </div>
  );
}

// ── PAY REPORT MODAL ─────────────────────────────────────────
const PRINT_CSS=`
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:Arial,sans-serif;font-size:12px;color:#1A0A2E;padding:32px 40px;}
.report-title{font-size:20px;font-weight:800;color:#2D1458;margin-bottom:4px;}
.report-meta{font-size:11px;color:#6B5F8A;margin-bottom:28px;}
.person{margin-bottom:28px;page-break-inside:avoid;}
.ph{background:#2D1458;color:#fff;padding:9px 14px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center;}
.ph-name{font-size:14px;font-weight:800;}
.ph-sub{font-size:10px;opacity:0.65;text-transform:uppercase;letter-spacing:0.06em;margin-top:2px;}
.ph-right{text-align:right;}
table{width:100%;border-collapse:collapse;font-size:11px;}
th{background:#F5F3FA;padding:6px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:#6B5F8A;border-bottom:1px solid #DDD6EE;}
td{padding:7px 10px;border-bottom:1px solid #EDE8F5;}
.subtotal td{font-weight:700;background:#F5F3FA;border-top:2px solid #DDD6EE;}
.exp-row td{color:#C97A06;background:#FFFBF0;}
.no-clinics{padding:14px 16px;background:#F5F3FA;font-size:11px;color:#9B90B8;border-bottom:1px solid #DDD6EE;font-style:italic;}
.summary{display:flex;border:1px solid #DDD6EE;border-top:none;border-radius:0 0 8px 8px;overflow:hidden;}
.s-cell{flex:1;padding:10px 14px;border-right:1px solid #DDD6EE;}
.s-cell:last-child{border-right:none;}
.s-label{font-size:9px;text-transform:uppercase;letter-spacing:0.06em;color:#6B5F8A;margin-bottom:3px;}
.s-value{font-size:17px;font-weight:800;}
.s-owed{background:#FFFBF0;}
.grand{border-top:2px solid #DDD6EE;padding-top:16px;margin-top:8px;}
.grand-title{font-size:13px;font-weight:800;color:#2D1458;margin-bottom:10px;}
.grand-grid{display:flex;gap:10px;}
.grand-cell{flex:1;background:#F5F3FA;border-radius:8px;padding:12px 14px;border:1px solid #DDD6EE;}
.grand-label{font-size:9px;text-transform:uppercase;letter-spacing:0.06em;color:#6B5F8A;margin-bottom:4px;}
.grand-value{font-size:18px;font-weight:800;}
.footer{font-size:10px;color:#9B90B8;text-align:center;margin-top:28px;padding-top:10px;border-top:1px solid #DDD6EE;}
@media print{body{padding:18px 24px;}@page{margin:15mm;}}
`;

function PayReportModal({users, clinics, territories, paySettings, events, onClose}){
  const mob=useMobile();
  const now=new Date();
  const month=now.toLocaleString("en-US",{month:"long",year:"numeric"});
  const field=[...users].sort((a,b)=>({sdr:0,ambassador:1}[a.role]??2)-({sdr:0,ambassador:1}[b.role]??2));
  const [selectedId,setSelectedId]=useState("all");

  function getPerClinicRows(u){
    return clinics.filter(c=>{
      const t=territories.find(t=>t.id===c.territory_id);
      return c.status==="Live"&&(t?.sdr_id===u.id||t?.amb_id===u.id);
    }).map(c=>{
      const t=territories.find(t=>t.id===c.territory_id);
      const {flat,pct}=effRates(u,t?.id||"",paySettings);
      const orders=lastMoOrders(c);
      const rev=orders*paySettings.avg_order_value;
      return{clinic:c.name,territory:`${t?.city||"—"}, ${t?.state||""}`,orders,rev,flat,pct,earn:rev*(pct/100)+flat};
    });
  }

  function userSummary(u){
    const rows=getPerClinicRows(u);
    const grossClinics=rows.reduce((s,r)=>s+r.earn,0);
    const approvedExp=(events||[]).filter(e=>e.amb_id===u.id&&e.expense_approved).reduce((s,e)=>s+(e.expense||0),0);
    const gross=grossClinics+approvedExp;
    const paid=totalPaid(u);
    const owed=Math.max(0,gross-paid);
    return{rows,grossClinics,approvedExp,gross,paid,owed};
  }

  // Build clean HTML string for printing — no DOM dependency
  function buildHTML(targetUsers, title){
    const lines=[];
    lines.push(`<div class="report-title">HubTrack — ${title}</div>`);
    lines.push(`<div class="report-meta">${month} &nbsp;·&nbsp; Generated ${fmtDate(fmtNow())} &nbsp;·&nbsp; NudgeWorld, Inc.</div>`);

    targetUsers.forEach(u=>{
      const {rows,grossClinics,approvedExp,gross,paid,owed}=userSummary(u);
      const terrs=territories.filter(t=>t.sdr_id===u.id||t.amb_id===u.id);
      const roleLabel=u.role==="sdr"?"Sales Development Rep":"Territory Ambassador";
      lines.push(`<div class="person">`);
      lines.push(`<div class="ph"><div><div class="ph-name">${u.name}</div><div class="ph-sub">${roleLabel} &nbsp;&middot;&nbsp; ${terrs.map(t=>t.city).join(", ")||"No territory"}</div></div><div class="ph-right"><div class="ph-sub">Pay method</div><div style="font-size:12px;font-weight:700;margin-top:2px;">${u.pay_method}</div></div></div>`);
      if(rows.length>0){
        lines.push(`<table><thead><tr><th>Clinic</th><th>Territory</th><th>Orders</th><th>Clinic Rev</th><th>Rate</th><th>Earnings</th></tr></thead><tbody>`);
        rows.forEach((r,i)=>{
          const bg=i%2===1?'background:#F5F3FA;':'';
          lines.push(`<tr style="${bg}"><td style="font-weight:600">${r.clinic}</td><td style="color:#6B5F8A">${r.territory}</td><td>${r.orders}</td><td>$${r.rev.toLocaleString()}</td><td style="color:#7B3FCC">${r.pct}%${r.flat>0?` + $${r.flat}`:""}</td><td style="font-weight:700;color:#0A8F5E">$${r.earn.toFixed(2)}</td></tr>`);
        });
        lines.push(`<tr class="subtotal"><td colspan="4">Clinic subtotal</td><td></td><td style="color:#0A8F5E">$${grossClinics.toFixed(2)}</td></tr>`);
        if(approvedExp>0) lines.push(`<tr class="exp-row"><td colspan="4">Approved expense reimbursements</td><td></td><td>$${approvedExp.toFixed(2)}</td></tr>`);
        lines.push(`</tbody></table>`);
      } else {
        lines.push(`<div class="no-clinics">No live clinics this month.</div>`);
      }
      const owedClass=owed>0?"s-owed":"";
      lines.push(`<div class="summary"><div class="s-cell"><div class="s-label">Gross Earned</div><div class="s-value" style="color:#1A0A2E">$${gross.toFixed(2)}</div></div><div class="s-cell"><div class="s-label">Total Paid</div><div class="s-value" style="color:#0A8F5E">$${paid.toFixed(2)}</div></div><div class="s-cell ${owedClass}"><div class="s-label">Still Owed</div><div class="s-value" style="color:${owed>0?"#C97A06":"#0A8F5E"}">$${owed.toFixed(2)}</div></div><div class="s-cell"><div class="s-label">Live Clinics</div><div class="s-value" style="color:#2D1458">${rows.length}</div></div></div>`);
      lines.push(`</div>`);
    });

    if(targetUsers.length>1){
      const totGross=targetUsers.reduce((s,u)=>s+userSummary(u).gross,0);
      const totPaid =targetUsers.reduce((s,u)=>s+userSummary(u).paid,0);
      const totOwed =targetUsers.reduce((s,u)=>s+userSummary(u).owed,0);
      lines.push(`<div class="grand"><div class="grand-title">Summary &mdash; All Field Team</div><div class="grand-grid"><div class="grand-cell"><div class="grand-label">Total Gross Payroll</div><div class="grand-value" style="color:#2D1458">$${totGross.toFixed(2)}</div></div><div class="grand-cell"><div class="grand-label">Total Paid to Date</div><div class="grand-value" style="color:#0A8F5E">$${totPaid.toFixed(2)}</div></div><div class="grand-cell" style="${totOwed>0?"background:#FFFBF0":""}"><div class="grand-label">Total Outstanding</div><div class="grand-value" style="color:${totOwed>0?"#C97A06":"#0A8F5E"}">$${totOwed.toFixed(2)}</div></div></div></div>`);
    }

    lines.push(`<div class="footer">HubTrack &nbsp;&middot;&nbsp; NudgeWorld, Inc. &nbsp;&middot;&nbsp; Confidential &nbsp;&middot;&nbsp; ${month}</div>`);
    return lines.join("\n");
  }

  function doPrint(){
    const targetUsers=selectedId==="all"?field:[field.find(u=>u.id===selectedId)].filter(Boolean);
    const title=selectedId==="all"?"Monthly Pay Report":`Pay Report &mdash; ${targetUsers[0]?.name}`;
    const html=buildHTML(targetUsers, title);
    const w=window.open("","_blank","width=900,height=700");
    if(!w){alert("Pop-up blocked. Please allow pop-ups for this site and try again.");return;}
    w.document.open();
    w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>HubTrack Pay Report &mdash; ${month}</title><style>${PRINT_CSS}</style></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(()=>{w.print();},600);
  }

  const viewUsers=selectedId==="all"?field:[field.find(u=>u.id===selectedId)].filter(Boolean);

  return(
    <Modal title={`Monthly Pay Report \u2014 ${month}`} onClose={onClose} wide>
      {/* Controls */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:1,display:"flex",gap:6,flexWrap:"wrap"}}>
          {/* User selector tabs */}
          <button onClick={()=>setSelectedId("all")} style={{padding:"6px 13px",borderRadius:20,border:`1px solid ${selectedId==="all"?C.purple:C.border}`,background:selectedId==="all"?C.purpleBg:"#fff",color:selectedId==="all"?C.purple:C.muted,fontWeight:700,fontSize:11,cursor:"pointer"}}>All Team</button>
          {field.map(u=>(
            <button key={u.id} onClick={()=>setSelectedId(u.id)} style={{padding:"6px 13px",borderRadius:20,border:`1px solid ${selectedId===u.id?C.purple:C.border}`,background:selectedId===u.id?C.purpleBg:"#fff",color:selectedId===u.id?C.purple:C.muted,fontWeight:700,fontSize:11,cursor:"pointer"}}>
              {u.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <Btn onClick={doPrint}>
          {selectedId==="all"?"Print All":"Print "+field.find(u=>u.id===selectedId)?.name.split(" ")[0]}
        </Btn>
      </div>

      {/* Preview */}
      <div style={{background:"#F5F3FA",borderRadius:10,border:`1px solid ${C.border}`,padding:mob?"12px 10px":"20px 24px",overflowX:"hidden",width:"100%",boxSizing:"border-box"}}>
        {/* Report header */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:800,color:"#2D1458",marginBottom:3}}>HubTrack \u2014 {selectedId==="all"?"Monthly Pay Report":`Pay Report \u2014 ${field.find(u=>u.id===selectedId)?.name}`}</div>
          <div style={{fontSize:11,color:"#6B5F8A"}}>{month} &nbsp;\u00b7&nbsp; Generated {fmtDate(fmtNow())} &nbsp;\u00b7&nbsp; NudgeWorld, Inc.</div>
        </div>

        {viewUsers.map(u=>{
          const {rows,grossClinics,approvedExp,gross,paid,owed}=userSummary(u);
          const myTerrs=territories.filter(t=>t.sdr_id===u.id||t.amb_id===u.id);
          const roleLabel=u.role==="sdr"?"Sales Development Rep":"Territory Ambassador";
          return(
            <div key={u.id} style={{marginBottom:22}}>
              <div style={{background:"#2D1458",color:"#fff",padding:"9px 14px",borderRadius:"8px 8px 0 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:14,fontWeight:800}}>{u.name}</div>
                  <div style={{fontSize:10,opacity:0.65,textTransform:"uppercase",letterSpacing:"0.06em",marginTop:2}}>{roleLabel} &nbsp;\u00b7&nbsp; {myTerrs.map(t=>t.city).join(", ")||"No territory"}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:10,opacity:0.65,textTransform:"uppercase",letterSpacing:"0.06em"}}>Pay method</div>
                  <div style={{fontSize:12,fontWeight:700,marginTop:2}}>{u.pay_method}</div>
                </div>
              </div>
              {rows.length>0?(
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,background:"#fff"}}>
                    <thead>
                      <tr style={{background:"#F5F3FA"}}>{["Clinic","Territory","Orders","Clinic Rev","Rate","Earnings"].map(h=><th key={h} style={{padding:"6px 10px",textAlign:"left",fontSize:10,textTransform:"uppercase",letterSpacing:"0.05em",color:"#6B5F8A",borderBottom:"1px solid #DDD6EE"}}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {rows.map((r,i)=>(
                        <tr key={i} style={{background:i%2===1?"#F5F3FA":"#fff"}}>
                          <td style={{padding:"7px 10px",borderBottom:"1px solid #EDE8F5",fontWeight:600}}>{r.clinic}</td>
                          <td style={{padding:"7px 10px",borderBottom:"1px solid #EDE8F5",color:"#6B5F8A"}}>{r.territory}</td>
                          <td style={{padding:"7px 10px",borderBottom:"1px solid #EDE8F5"}}>{r.orders}</td>
                          <td style={{padding:"7px 10px",borderBottom:"1px solid #EDE8F5"}}>{"$"}{r.rev.toLocaleString()}</td>
                          <td style={{padding:"7px 10px",borderBottom:"1px solid #EDE8F5",color:"#7B3FCC"}}>{r.pct}%{r.flat>0?` + $${r.flat}`:""}</td>
                          <td style={{padding:"7px 10px",borderBottom:"1px solid #EDE8F5",fontWeight:700,color:"#0A8F5E"}}>{"$"}{r.earn.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr style={{background:"#F5F3FA"}}>
                        <td colSpan={4} style={{padding:"7px 10px",fontWeight:700,borderTop:"2px solid #DDD6EE",fontSize:11}}>Clinic subtotal</td>
                        <td style={{padding:"7px 10px",borderTop:"2px solid #DDD6EE"}}/>
                        <td style={{padding:"7px 10px",fontWeight:800,color:"#0A8F5E",borderTop:"2px solid #DDD6EE"}}>{"$"}{grossClinics.toFixed(2)}</td>
                      </tr>
                      {approvedExp>0&&(
                        <tr style={{background:"#FFFBF0"}}>
                          <td colSpan={4} style={{padding:"7px 10px",fontWeight:700,fontSize:11,color:"#C97A06"}}>Approved expense reimbursements</td>
                          <td/>
                          <td style={{padding:"7px 10px",fontWeight:800,color:"#C97A06"}}>{"$"}{approvedExp.toFixed(2)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ):(
                <div style={{padding:"14px 16px",background:"#fff",fontSize:11,color:"#9B90B8",borderBottom:"1px solid #DDD6EE",fontStyle:"italic"}}>No live clinics this month.</div>
              )}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:"1px solid #DDD6EE",borderTop:"none",borderRadius:"0 0 8px 8px",overflow:"hidden"}}>
                {[["Gross Earned",`$${gross.toFixed(2)}`,"#1A0A2E",false],["Total Paid",`$${paid.toFixed(2)}`,"#0A8F5E",false],["Still Owed",`$${owed.toFixed(2)}`,owed>0?"#C97A06":"#0A8F5E",owed>0],["Live Clinics",`${rows.length}`,"#2D1458",false]].map(([label,value,color,warn],i)=>(
                  <div key={label} style={{flex:1,padding:"9px 12px",borderRight:i<3?"1px solid #DDD6EE":"none",background:warn?"#FFFBF0":"#fff"}}>
                    <div style={{fontSize:9,textTransform:"uppercase",letterSpacing:"0.06em",color:"#6B5F8A",marginBottom:2}}>{label}</div>
                    <div style={{fontSize:mob?14:16,fontWeight:800,color}}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Grand total — all team only */}
        {selectedId==="all"&&(()=>{
          const totGross=field.reduce((s,u)=>s+userSummary(u).gross,0);
          const totPaid =field.reduce((s,u)=>s+userSummary(u).paid,0);
          const totOwed =field.reduce((s,u)=>s+userSummary(u).owed,0);
          return(
            <div style={{borderTop:"2px solid #DDD6EE",paddingTop:14,marginTop:4}}>
              <div style={{fontSize:13,fontWeight:800,color:"#2D1458",marginBottom:10}}>Summary \u2014 All Field Team</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {[["Total Gross Payroll",`$${totGross.toFixed(2)}`,"#2D1458",false],["Total Paid to Date",`$${totPaid.toFixed(2)}`,"#0A8F5E",false],["Total Outstanding",`$${totOwed.toFixed(2)}`,totOwed>0?"#C97A06":"#0A8F5E",totOwed>0]].map(([l,v,c,warn])=>(
                  <div key={l} style={{background:warn?"#FFFBF0":"#F5F3FA",borderRadius:8,padding:"11px 13px",border:"1px solid #DDD6EE"}}>
                    <div style={{fontSize:9,color:"#6B5F8A",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{l}</div>
                    <div style={{fontSize:mob?16:19,fontWeight:800,color:c}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <div style={{fontSize:10,color:"#9B90B8",textAlign:"center",marginTop:20,paddingTop:8,borderTop:"1px solid #DDD6EE"}}>
          HubTrack &nbsp;\u00b7&nbsp; NudgeWorld, Inc. &nbsp;\u00b7&nbsp; Confidential &nbsp;\u00b7&nbsp; {month}
        </div>
      </div>
    </Modal>
  );
}

// ── INCOME PANEL ─────────────────────────────────────────────
function IncomePanel({userId,users,clinics,territories,paySettings,events,onClose}){
  const mob=useMobile();
  const u=users.find(u=>u.id===userId);
  if(!u)return null;
  const myTs=territories.filter(t=>t.sdr_id===userId||t.amb_id===userId);
  const liveClinics=clinics.filter(c=>{
    const t=territories.find(t=>t.id===c.territory_id);
    return c.status==="Live"&&(t?.sdr_id===userId||t?.amb_id===userId);
  });
  const approvedExpenses=(events||[]).filter(e=>e.amb_id===userId&&e.expense_approved).reduce((s,e)=>s+(e.expense||0),0);
  const paid=totalPaid(u);
  const grossEarned=liveClinics.reduce((s,c)=>{
    const t=territories.find(t=>t.id===c.territory_id);
    const {flat,pct}=effRates(u,t?.id||"",paySettings);
    return s+lastMoOrders(c)*paySettings.avg_order_value*(pct/100)+flat;
  },0);
  const grossWithExpenses=grossEarned+approvedExpenses;
  const owed=Math.max(0,grossWithExpenses-paid);
  const allTimeEarned=liveClinics.reduce((s,c)=>{
    const t=territories.find(t=>t.id===c.territory_id);
    const {flat,pct}=effRates(u,t?.id||"",paySettings);
    return s+totalOrders(c)*paySettings.avg_order_value*(pct/100)+flat;
  },0);

  // Month by month estimated earnings from history
  const allMonths={};
  liveClinics.forEach(c=>{
    (c.monthly_history||[]).forEach(m=>{
      if(!allMonths[m.month])allMonths[m.month]=0;
      const tc=territories.find(t=>t.id===c.territory_id);
      const {flat:ef,pct:ep}=effRates(u,tc?.id||"",paySettings);
      allMonths[m.month]+=m.orders*paySettings.avg_order_value*(ep/100);
    });
  });
  const earningsHistory=Object.entries(allMonths).sort((a,b)=>a[0].localeCompare(b[0])).map(([month,earned])=>({month:month.slice(0,7),earned:Math.round(earned)}));

  return(
    <Modal title={`Income — ${u.name}`} onClose={onClose} wide>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {/* Summary row */}
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?8:12}}>
          {[
            ["Last Mo. Earnings",`$${grossWithExpenses.toFixed(0)}`,C.blue,approvedExpenses>0?`Incl. $${approvedExpenses.toFixed(0)} expenses`:"Rates set per territory"],
            ["Total Paid to Date",`$${paid.toFixed(0)}`,C.green,`${(u.payments||[]).length} payment(s)`],
            ["Still Owed",`$${owed.toFixed(0)}`,owed>0?C.yellow:C.green,owed>0?"Pending payment":"Fully paid"],
            ["Approved Expenses",`$${approvedExpenses.toFixed(0)}`,C.purple,approvedExpenses>0?"Added to owed":"None this month"],
            ["All-Time Estimated",`$${allTimeEarned.toFixed(0)}`,C.purple,"Since first clinic signed"],
          ].map(([l,v,ac,sub])=>(
            <div key={l} style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5}}>{l}</div>
              <div style={{fontSize:20,fontWeight:800,color:ac}}>{v}</div>
              <div style={{fontSize:11,color:C.mutedLight,marginTop:3}}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Per-clinic breakdown */}
        <Card>
          <Sec>Per-Clinic Breakdown — Last Month</Sec>
          {liveClinics.length===0
            ?<div style={{color:C.muted,fontSize:12}}>No live clinics generating revenue yet.</div>
            :(
              <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",borderRadius:8,border:`1px solid ${C.border}`}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr style={{background:C.navyMid}}>
                    {["Clinic","City","Last Mo. Orders","Clinic Rev","Your Share"].map(h=><th key={h} style={{padding:"8px 12px",textAlign:"left",color:"rgba(255,255,255,0.8)",fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>{liveClinics.map((c,i)=>{
                    const lm=lastMoOrders(c);
                    const clinicRev=lm*paySettings.avg_order_value;
                    const tcc=territories.find(t=>t.id===c.territory_id);
                    const {flat:sf,pct:sp}=effRates(u,tcc?.id||"",paySettings);
                    const myShare=clinicRev*(sp/100)+sf;
                    return(
                      <tr key={c.id} style={{background:i%2===0?C.card:C.surface,borderBottom:`1px solid ${C.border}`}}>
                        <td style={{padding:"9px 12px",fontWeight:700,color:C.text}}>{c.name}</td>
                        <td style={{padding:"9px 12px",color:C.muted}}>{c.city}, {c.state}</td>
                        <td style={{padding:"9px 12px",fontWeight:600,color:C.textSoft}}>{lm}</td>
                        <td style={{padding:"9px 12px",color:C.blue,fontWeight:600}}>{"$"}{clinicRev.toLocaleString()}</td>
                        <td style={{padding:"9px 12px",color:C.green,fontWeight:800}}>{"$"}{myShare.toFixed(0)}</td>
                      </tr>
                    );
                  })}</tbody>
                </table>
              </div>
            )
          }
        </Card>

        {/* Earnings history chart */}
        {earningsHistory.length>1&&(
          <Card>
            <Sec>Monthly Earnings History (Estimated)</Sec>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={earningsHistory} margin={{top:4,right:8,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:9,fill:C.muted}} tickLine={false}/>
                <YAxis tick={{fontSize:10,fill:C.muted}} tickLine={false} axisLine={false} width={40} tickFormatter={v=>`$${v}`}/>
                <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:7,fontSize:11}}
                  formatter={(v)=>[`$${v}`,"Estimated Earnings"]}/>
                <Bar dataKey="earned" fill={C.purple} radius={[3,3,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Payment log */}
        {(u.payments||[]).length>0&&(
          <Card>
            <Sec>Payment History</Sec>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[...(u.payments||[])].reverse().map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:C.surface,borderRadius:8,border:`1px solid ${C.border}`}}>
                  <div>
                    <span style={{fontWeight:700,color:C.green,fontSize:13}}>{"$"}{p.amount.toFixed(0)}</span>
                    <span style={{marginLeft:8,fontSize:11,color:C.muted}}>{p.type}</span>
                  </div>
                  <span style={{fontSize:11,color:C.mutedLight}}>{fmtDate(p.date)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Modal>
  );
}

function AnalyticsView({clinics,territories,myTerritoryIds,role}){
  const mob=useMobile();
  const isAdmin=role==="admin";
  // Territory filter — admin can switch, others see all their territories combined
  const myTerrs=territories.filter(t=>myTerritoryIds.includes(t.id));
  const [selectedTerritory,setSelectedTerritory]=useState("all");
  const [metric,setMetric]=useState("orders");

  const activeTIds=selectedTerritory==="all"?myTerritoryIds:[selectedTerritory];
  const myClinics=clinics.filter(c=>activeTIds.includes(c.territory_id));
  const liveClinics=myClinics.filter(c=>c.status==="Live"&&c.hourly_data?.length>0);
  const [selectedClinic,setSelectedClinic]=useState(null);

  // Aggregate hourly
  const aggHourly=Array.from({length:24},(_,h)=>({
    hour:h,label:fmtHour(h),
    orders:liveClinics.reduce((s,c)=>s+(c.hourly_data[h]?.orders||0),0),
    revenue:liveClinics.reduce((s,c)=>s+(c.hourly_data[h]?.revenue||0),0),
  }));

  const effectiveMetric=isAdmin?metric:"orders";
  const peakHour=aggHourly.reduce((best,h)=>h[effectiveMetric]>best[effectiveMetric]?h:best,aggHourly[0]);
  const quietHour=aggHourly.filter(h=>h[effectiveMetric]>0).reduce((best,h)=>h[effectiveMetric]<best[effectiveMetric]?h:best,aggHourly.find(h=>h[effectiveMetric]>0)||aggHourly[0]);
  const totalToday=aggHourly.reduce((s,h)=>s+h[effectiveMetric],0);

  const selectedC=liveClinics.find(c=>c.id===selectedClinic)||liveClinics[0]||null;
  const selectedHourly=selectedC?.hourly_data?.map((d,i)=>({...d,label:fmtHour(i),hour:i}))||[];

  const parseTime=(t)=>{ if(!t)return null; const[h,m]=t.split(":").map(Number); return h+(m||0)/60; };
  const coverageMap=Array.from({length:24},(_,h)=>{
    const open=myClinics.filter(c=>{ const o=parseTime(c.open),cl=parseTime(c.close); return o!==null&&cl!==null&&h>=o&&h<cl; });
    return{hour:h,label:fmtHour(h),count:open.length,clinics:open.map(c=>c.name)};
  });
  const gaps=coverageMap.filter(h=>h.count===0);

  const maxVal=Math.max(...aggHourly.map(h=>h[effectiveMetric]),1);
  const barColor=(val)=>{ const r=val/maxVal; return r>0.7?C.green:r>0.35?C.blue:C.mutedLight; };

  if(liveClinics.length===0&&!myClinics.length) return(
    <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
      <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>No analytics data yet</div>
      <div style={{fontSize:13}}>Analytics appear once clinics are Live and connected to Enterprise.</div>
    </div>
  );

  return(
    <div style={{display:"flex",flexDirection:"column",gap:18}}>

      {/* Territory filter — admin and multi-territory users */}
      {myTerrs.length>1&&(
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>Territory:</span>
          {[{id:"all",city:"All Territories"},...myTerrs].map(t=>(
            <button key={t.id} onClick={()=>setSelectedTerritory(t.id)}
              style={{background:selectedTerritory===t.id?C.navyMid:C.surface,color:selectedTerritory===t.id?"#fff":C.muted,border:`1px solid ${selectedTerritory===t.id?C.navyMid:C.border}`,borderRadius:20,padding:"5px 13px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              {t.city||t.id}
            </button>
          ))}
        </div>
      )}

      {/* Summary stat cards */}
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?8:12}}>
        <StatCard label="Peak Hour" value={fmtHour(peakHour.hour)} sub={`${peakHour.orders} orders${isAdmin?` · $${peakHour.revenue.toLocaleString()}`:""}`} accent={C.green}/>
        <StatCard label="Slowest Active Hour" value={fmtHour(quietHour.hour)} sub={`${quietHour.orders} orders`} accent={C.muted}/>
        <StatCard label="Total (Today)" value={effectiveMetric==="orders"?`${totalToday} orders`:`$${totalToday.toLocaleString()}`} sub={`${liveClinics.length} live clinic${liveClinics.length!==1?"s":""}`} accent={C.blue}/>
        <StatCard label="Coverage Gaps" value={`${gaps.length}h`} sub={gaps.length>0?`No clinic open at ${gaps.slice(0,2).map(g=>fmtHour(g.hour)).join(", ")}${gaps.length>2?` +${gaps.length-2} more`:""}` :"Full coverage"} accent={gaps.length>3?C.red:C.green}/>
      </div>

      {/* Metric toggle — admin only */}
      {isAdmin&&(
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em"}}>Metric:</span>
          {[["orders","Hourly Orders"],["revenue","Hourly Revenue"]].map(([k,l])=>(
            <button key={k} onClick={()=>setMetric(k)} style={{background:metric===k?C.purple:C.surface,color:metric===k?"#fff":C.muted,border:`1px solid ${metric===k?C.purple:C.border}`,borderRadius:20,padding:"5px 14px",fontSize:12,fontWeight:600,cursor:"pointer"}}>{l}</button>
          ))}
        </div>
      )}

      {/* Combined hourly bar chart */}
      {liveClinics.length>0&&(
        <Card>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <Sec>All Live Clinics — Hourly {effectiveMetric==="orders"?"Orders":"Revenue"}</Sec>
            <span style={{fontSize:10,color:C.mutedLight}}>Enterprise feed · updated hourly</span>
          </div>
          <div style={{display:"flex",gap:12,marginBottom:10}}>
            {[["High",C.green],["Medium",C.blue],["Low",C.mutedLight]].map(([l,c])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.muted}}>
                <div style={{width:10,height:10,borderRadius:2,background:c}}/>
                {l}
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={aggHourly} margin={{top:4,right:8,left:0,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="label" tick={{fontSize:9,fill:C.muted}} tickLine={false} interval={1}/>
              <YAxis tick={{fontSize:10,fill:C.muted}} tickLine={false} axisLine={false} width={isAdmin&&effectiveMetric==="revenue"?44:30}
                tickFormatter={v=>effectiveMetric==="revenue"?`$${v>=1000?Math.round(v/100)/10+"k":v}`:v}/>
              <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12}}
                formatter={(v)=>effectiveMetric==="revenue"?[`$${v.toLocaleString()}`,"Revenue"]:[v,"Orders"]}/>
              <Bar dataKey={effectiveMetric} radius={[3,3,0,0]}>
                {aggHourly.map((h,i)=><Cell key={i} fill={barColor(h[effectiveMetric])}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Per-clinic hourly breakdown */}
      {liveClinics.length>0&&(
        <Card>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <Sec>Per-Clinic Hourly Orders</Sec>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {liveClinics.map(c=>(
                <button key={c.id} onClick={()=>setSelectedClinic(c.id)}
                  style={{background:(selectedC?.id===c.id)?C.navyMid:C.surface,color:(selectedC?.id===c.id)?"#fff":C.muted,border:`1px solid ${(selectedC?.id===c.id)?C.navyMid:C.border}`,borderRadius:20,padding:"4px 11px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          {selectedC&&(
            <div>
              <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
                {[selectedC.open&&["Opens",selectedC.open],selectedC.close&&["Closes",selectedC.close]].filter(Boolean).map(([l,v])=>(
                  <div key={l} style={{background:C.surface,borderRadius:8,padding:"6px 12px",fontSize:12,border:`1px solid ${C.border}`}}>
                    <span style={{color:C.muted,marginRight:5}}>{l}</span><strong style={{color:C.text}}>{v}</strong>
                  </div>
                ))}
                {isAdmin&&<span style={{fontSize:11,color:C.mutedLight,marginLeft:"auto"}}>Switch to Revenue in metric toggle above to see revenue view</span>}
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={selectedHourly} margin={{top:4,right:8,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                  <XAxis dataKey="label" tick={{fontSize:9,fill:C.muted}} tickLine={false} interval={1}/>
                  <YAxis tick={{fontSize:10,fill:C.muted}} tickLine={false} axisLine={false} width={28}/>
                  <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12}}/>
                  <Line type="monotone" dataKey="orders" stroke={C.purple} strokeWidth={2.5} dot={false} activeDot={{r:4,fill:C.purple}}/>
                </LineChart>
              </ResponsiveContainer>
              {isAdmin&&effectiveMetric==="revenue"&&(
                <div style={{marginTop:12}}>
                  <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Hourly Revenue</div>
                  <ResponsiveContainer width="100%" height={130}>
                    <LineChart data={selectedHourly} margin={{top:4,right:8,left:0,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                      <XAxis dataKey="label" tick={{fontSize:9,fill:C.muted}} tickLine={false} interval={1}/>
                      <YAxis tick={{fontSize:10,fill:C.muted}} tickLine={false} axisLine={false} width={44} tickFormatter={v=>`$${v>=1000?Math.round(v/100)/10+"k":v}`}/>
                      <Tooltip contentStyle={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,fontSize:12}} formatter={(v)=>[`$${v.toLocaleString()}`,"Revenue"]}/>
                      <Line type="monotone" dataKey="revenue" stroke={C.green} strokeWidth={2.5} dot={false} activeDot={{r:4,fill:C.green}}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Coverage grid */}
      <Card>
        <Sec>Coverage by Hour — Clinics Open</Sec>
        <div style={{fontSize:11,color:C.muted,marginBottom:12}}>Number of clinics open each hour. Red = no coverage. Hover for clinic names.</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {coverageMap.map(h=>{
            const isEmpty=h.count===0;
            const bg=isEmpty?C.redBg:h.count===1?C.skyBg:C.greenBg;
            const bc=isEmpty?`1px solid ${C.red}`:h.count>=2?`1px solid ${C.green}`:`1px solid ${C.border}`;
            return(
              <div key={h.hour} title={isEmpty?"No clinics open":h.clinics.join(", ")}
                style={{flex:"0 0 calc(8.33% - 3px)",minWidth:0,background:bg,border:bc,borderRadius:6,padding:"6px 2px",textAlign:"center",cursor:"default"}}>
                <div style={{fontSize:9,fontWeight:700,color:isEmpty?C.red:C.muted}}>{h.label}</div>
                <div style={{fontSize:13,fontWeight:800,color:isEmpty?C.red:C.green,marginTop:2}}>{h.count}</div>
              </div>
            );
          })}
        </div>
        {gaps.length>0&&(
          <div style={{marginTop:10,background:C.redBg,border:`1px solid ${C.red}`,borderRadius:8,padding:"9px 13px",fontSize:12}}>
            <strong style={{color:C.red}}>Coverage gap{gaps.length>1?"s":""}: </strong>
            <span style={{color:C.textSoft}}>{gaps.map(g=>fmtHour(g.hour)).join(", ")} — no clinic is open during these hours. Consider targeting a clinic with extended hours.</span>
          </div>
        )}
      </Card>
    </div>
  );
}

//  MAP VIEW 
function MapView({clinics,myTerritoryIds}){
  const mob=useMobile();
  const [selected,setSelected]=useState(null);
  const myClinics=clinics.filter(c=>myTerritoryIds.includes(c.territory_id)&&c.lat&&c.lng);
  if(myClinics.length===0) return(
    <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
      <div style={{fontWeight:700,fontSize:15}}>No clinics with coordinates in this territory.</div>
    </div>
  );

  // Compute bounding box for simple projection
  const lats=myClinics.map(c=>c.lat), lngs=myClinics.map(c=>c.lng);
  const minLat=Math.min(...lats)-0.02, maxLat=Math.max(...lats)+0.02;
  const minLng=Math.min(...lngs)-0.03, maxLng=Math.max(...lngs)+0.03;
  const W=700, H=360;
  const proj=(lat,lng)=>({
    x:((lng-minLng)/(maxLng-minLng))*W,
    y:H-((lat-minLat)/(maxLat-minLat))*H
  });

  const pinColor=(c)=>c.status==="Live"?C.green:c.status==="Onboarding"?C.sky:c.status==="Meeting Set"?C.yellow:C.muted;

  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Legend */}
      <div style={{display:"flex",gap:16,flexWrap:"wrap",alignItems:"center"}}>
        {[["Live",C.green],["Onboarding",C.sky],["Meeting Set",C.yellow],["Other",C.muted]].map(([l,c])=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:12}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`}}/>
            <span style={{color:C.muted}}>{l}</span>
          </div>
        ))}
        <span style={{fontSize:11,color:C.mutedLight,marginLeft:"auto"}}>Tap any pin for details · Opens Google Maps on address tap</span>
      </div>

      <Card style={{padding:0,overflow:"hidden",position:"relative"}}>
        {/* Map background — styled SVG grid */}
        <div style={{position:"relative",width:"100%",paddingBottom:`${(H/W)*100}%`,background:`linear-gradient(135deg,#e8f0f8 0%,#f0f4fc 100%)`}}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox={`0 0 ${W} ${H}`}>
            {/* Grid lines */}
            {Array.from({length:8},(_,i)=>(
              <line key={`v${i}`} x1={(i/7)*W} y1={0} x2={(i/7)*W} y2={H} stroke="#dde4f0" strokeWidth={1}/>
            ))}
            {Array.from({length:5},(_,i)=>(
              <line key={`h${i}`} x1={0} y1={(i/4)*H} x2={W} y2={(i/4)*H} stroke="#dde4f0" strokeWidth={1}/>
            ))}

            {/* Clinic pins */}
            {myClinics.map(c=>{
              const{x,y}=proj(c.lat,c.lng);
              const color=pinColor(c);
              const isSel=selected?.id===c.id;
              return(
                <g key={c.id} onClick={()=>setSelected(isSel?null:c)} style={{cursor:"pointer"}}>
                  {/* Glow ring for Live */}
                  {c.status==="Live"&&<circle cx={x} cy={y} r={isSel?22:16} fill={color} opacity={0.15}/>}
                  {/* Pin circle */}
                  <circle cx={x} cy={y} r={isSel?11:8} fill={color} stroke="#fff" strokeWidth={isSel?3:2}/>
                  {/* Status dot */}
                  {c.status==="Live"&&<circle cx={x} cy={y} r={3} fill="#fff"/>}
                  {/* Label */}
                  <text x={x} y={y+22} textAnchor="middle" fontSize={isSel?11:9} fontWeight={isSel?"800":"600"} fill={C.textSoft}
                    style={{paintOrder:"stroke",stroke:"#fff",strokeWidth:3}}>
                    {c.name.length>14?c.name.slice(0,13)+"…":c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected clinic card overlay */}
        {selected&&(
          <div style={{position:"absolute",bottom:12,left:12,right:12,background:"rgba(255,255,255,0.97)",borderRadius:12,padding:"14px 16px",boxShadow:"0 8px 32px rgba(26,10,46,0.2)",border:`1px solid ${C.border}`,display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <div style={{fontWeight:800,fontSize:14,color:C.text}}>{selected.name}</div>
                <Badge status={selected.status}/>
              </div>
              <div style={{fontSize:12,color:C.muted,marginBottom:3}}><TapAddress v={selected.address}/></div>
              <div style={{display:"flex",gap:12,fontSize:12,flexWrap:"wrap"}}>
                {selected.phone&&<PhoneMenu phone={selected.phone} user={null}/>}
                {(selected.open||selected.close)&&<span style={{color:C.muted}}> {selected.open||"?"} – {selected.close||"?"}</span>}
                {selected.enterprise_id&&<span style={{color:C.green,fontWeight:700}}> {selected.enterprise_id}</span>}
              </div>
            </div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",fontSize:18,color:C.muted,cursor:"pointer",flexShrink:0,lineHeight:1,padding:"0 2px"}}>×</button>
          </div>
        )}
      </Card>

      {/* Clinic list below map */}
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(auto-fill,minmax(220px,1fr))",gap:mob?8:10}}>
        {myClinics.map(c=>(
          <div key={c.id} onClick={()=>setSelected(selected?.id===c.id?null:c)}
            style={{background:selected?.id===c.id?C.purpleBg:C.card,border:`1px solid ${selected?.id===c.id?C.purple:C.border}`,borderRadius:10,padding:"11px 14px",cursor:"pointer",transition:"all 0.15s"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:pinColor(c),flexShrink:0}}/>
              <div style={{fontWeight:700,fontSize:12,color:C.text}}>{c.name}</div>
            </div>
            <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{c.city}, {c.state}</div>
            {(c.open||c.close)&&<div style={{fontSize:11,color:C.muted}}> {c.open||"?"} – {c.close||"?"}</div>}
            {!c.open&&!c.close&&<div style={{fontSize:11,color:C.mutedLight,fontStyle:"italic"}}>Hours not set</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

//  LOGIN 
function LoginScreen({onLogin}){
  const mob=useMobile();
  const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [err,setErr]=useState("");const [loading,setLoading]=useState(false);
  function go(){setErr("");setLoading(true);setTimeout(()=>{const a=ACCOUNTS.find(a=>a.email===email.trim().toLowerCase()&&a.password===pw);if(a)onLogin(a);else setErr("Invalid email or password.");setLoading(false);},350);}
  return(
    <div style={{minHeight:"100vh",fontFamily:"'DM Sans','Segoe UI',sans-serif",display:"flex",flexDirection:mob?"column":"row",position:"relative",overflow:"hidden",
      background:`radial-gradient(ellipse at 20% 50%, #3D1478 0%, #1A0A2E 50%, #0D0618 100%)`}}>

      {/* Decorative silver orbs */}
      <div style={{position:"absolute",top:-80,right:-80,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(192,168,224,0.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-60,left:-60,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(123,63,204,0.25) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"30%",right:"10%",width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(192,168,224,0.10) 0%,transparent 70%)",pointerEvents:"none"}}/>

      {/* Left panel — branding */}
      <div style={{flex:1,display:mob?"none":"flex",flexDirection:"column",justifyContent:"center",padding:"60px 48px",position:"relative",zIndex:1}}>
        {/* Logo mark */}
        <div style={{marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:14,marginBottom:32}}>
            <div style={{width:52,height:52,borderRadius:14,
              background:"linear-gradient(135deg,#C0A8E0 0%,#7B3FCC 100%)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontWeight:900,fontSize:18,color:"#1A0A2E",
              boxShadow:"0 8px 32px rgba(192,168,224,0.35),0 2px 8px rgba(0,0,0,0.4)"}}>HT</div>
            <div>
              <div style={{color:"#fff",fontWeight:800,fontSize:22,letterSpacing:"-0.03em",lineHeight:1}}>HubTrack</div>
              <div style={{color:"rgba(192,168,224,0.5)",fontSize:11,marginTop:3,letterSpacing:"0.04em"}}>by NudgeWorld · Field Operations Platform</div>
            </div>
          </div>
          <div style={{maxWidth:360}}>
            <h1 style={{color:"#fff",fontWeight:800,fontSize:32,lineHeight:1.2,margin:"0 0 16px",letterSpacing:"-0.02em"}}>
              Manage your<br/>
              <span style={{background:"linear-gradient(90deg,#C0A8E0,#9B70E8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>field team</span><br/>
              from one place.
            </h1>
            <p style={{color:"rgba(192,168,224,0.55)",fontSize:13,lineHeight:1.6,margin:0}}>
              Territory assignments, clinic pipeline, ambassador coordination, and pay tracking — all in one platform.
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:320}}>
          {["Territory & Clinic Management","SDR + Ambassador Sync","Automated Pay Tracking"].map(text=>(
            <div key={text} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(192,168,224,0.07)",border:"1px solid rgba(192,168,224,0.15)",borderRadius:10,padding:"10px 14px"}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"rgba(192,168,224,0.6)",flexShrink:0}}/>
              <span style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontWeight:600}}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — login form */}
      <div style={{width:"100%",maxWidth:mob?"none":420,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",padding:mob?"20px 16px 40px":32,position:"relative",zIndex:1}}>
        <div style={{width:"100%"}}>
          {/* Card */}
          <div style={{
            background:"rgba(255,255,255,0.05)",
            backdropFilter:"blur(20px)",
            border:"1px solid rgba(192,168,224,0.2)",
            borderRadius:20,
            padding:mob?"24px 18px 22px":"36px 32px 28px",
            boxShadow:"0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)"
          }}>
            <div style={{marginBottom:28}}>
              <div style={{color:"#fff",fontWeight:800,fontSize:18,marginBottom:6}}>Welcome back</div>
              <div style={{color:"rgba(192,168,224,0.5)",fontSize:13}}>Sign in to HubTrack by NudgeWorld</div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:18}}>
              {[["Email","email",email,setEmail],["Password","password",pw,setPw]].map(([label,type,val,set])=>(
                <div key={label}>
                  <div style={{fontSize:10,color:"rgba(192,168,224,0.6)",fontWeight:700,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</div>
                  <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={type==="email"?"you@nudgeworld.io":"••••••••"} onKeyDown={e=>e.key==="Enter"&&go()}
                    style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(192,168,224,0.2)",borderRadius:10,padding:"11px 13px",fontSize:13,color:"#fff",outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"}}
                    onFocus={e=>e.target.style.borderColor="rgba(192,168,224,0.5)"}
                    onBlur={e=>e.target.style.borderColor="rgba(192,168,224,0.2)"}/>
                </div>
              ))}
            </div>

            {err&&<div style={{background:"rgba(196,43,43,0.2)",border:"1px solid rgba(196,43,43,0.4)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"#FCA5A5",marginBottom:14}}>{err}</div>}

            <button onClick={go} disabled={loading} style={{
              width:"100%",
              background:loading?"rgba(123,63,204,0.5)":"linear-gradient(135deg,#9B60E8 0%,#7B3FCC 50%,#5A1FA0 100%)",
              color:"#fff",border:"none",borderRadius:10,padding:"12px",
              fontWeight:800,fontSize:14,cursor:loading?"not-allowed":"pointer",
              boxShadow:loading?"none":"0 4px 20px rgba(123,63,204,0.45)",
              letterSpacing:"-0.01em",transition:"all 0.2s"
            }}>{loading?"Signing in…":"Sign In →"}</button>
          </div>

          {/* Mock accounts hint */}
          <div style={{marginTop:16,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(192,168,224,0.1)",borderRadius:12,padding:"14px 16px"}}>
            <div style={{fontSize:10,color:"rgba(192,168,224,0.35)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Demo accounts</div>
            {[{l:"Admin",e:"admin@nudgeworld.io",p:"admin123",role:"admin"},
              {l:"SDR — Maureen",e:"maureen@nudgeworld.io",p:"sdr123",role:"sdr"},
              {l:"Ambassador — Carlos",e:"carlos@nudgeworld.io",p:"amb123",role:"amb"}].map(h=>(
              <button key={h.l} onClick={()=>{setEmail(h.e);setPw(h.p);setErr("");}}
                style={{width:"100%",background:"rgba(123,63,204,0.08)",border:"1px solid rgba(192,168,224,0.12)",borderRadius:8,padding:"8px 11px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5,transition:"background 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(123,63,204,0.18)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(123,63,204,0.08)"}>
                <span style={{fontWeight:700,fontSize:12,color:"rgba(255,255,255,0.8)"}}>{h.l}</span>
                <span style={{fontSize:10,color:"rgba(192,168,224,0.4)",fontFamily:"monospace"}}>{h.e}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//  SHELL 
function Shell({user,setUser,onLogout,children}){
  const [showProfile,setShowProfile]=useState(false);
  const mobile=useMobile();
  const roleColor = user.role==="admin" ? "#C0A8E0" : user.role==="sdr" ? C.sky : C.purple;
  return(
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:C.surface,minHeight:"100vh",maxWidth:"100vw",overflowX:"hidden"}}>
      {/* Header */}
      <div style={{
        background:"linear-gradient(90deg,#2D1458 0%,#1A0A2E 100%)",
        padding:mobile?"0 12px":"0 24px",display:"flex",alignItems:"center",gap:mobile?10:18,
        position:"sticky",top:0,zIndex:100,height:mobile?48:54,
        boxShadow:"0 1px 0 rgba(192,168,224,0.1),0 4px 24px rgba(0,0,0,0.4)"
      }}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
          <div style={{width:28,height:28,borderRadius:7,
            background:"linear-gradient(135deg,#C0A8E0 0%,#7B3FCC 100%)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontWeight:900,fontSize:11,color:"#1A0A2E"}}>HT</div>
          {!mobile&&<div>
            <div style={{color:"#fff",fontWeight:800,fontSize:13,letterSpacing:"-0.02em",lineHeight:1.1}}>HubTrack</div>
            <div style={{color:"rgba(192,168,224,0.4)",fontSize:9,letterSpacing:"0.03em"}}>Field Operations</div>
          </div>}
        </div>

        {!mobile&&<div style={{width:1,height:24,background:"rgba(192,168,224,0.15)",marginLeft:4}}/>}

        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:mobile?8:10}}>
          {!mobile&&<span style={{fontSize:10,background:"rgba(10,143,94,0.2)",color:"#34D399",padding:"3px 9px",borderRadius:20,fontWeight:700,border:"1px solid rgba(10,143,94,0.3)"}}>● Enterprise</span>}

          {/* User pill */}
          <button onClick={()=>setShowProfile(true)} style={{
            display:"flex",alignItems:"center",gap:7,
            background:"rgba(192,168,224,0.08)",
            border:"1px solid rgba(192,168,224,0.18)",
            borderRadius:9,padding:mobile?"4px 8px 4px 4px":"5px 11px 5px 6px",cursor:"pointer",
          }}>
            <div style={{width:22,height:22,borderRadius:6,
              background:`linear-gradient(135deg,${roleColor} 0%,${C.purple} 100%)`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:10,fontWeight:800,color:"#fff"}}>
              {user.name.charAt(0)}
            </div>
            {!mobile&&<div style={{textAlign:"left"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#fff",lineHeight:1.1}}>{user.name}</div>
              <div style={{fontSize:9,color:"rgba(192,168,224,0.45)"}}>{user.roleLabel}</div>
            </div>}
            {mobile&&<div style={{fontSize:11,fontWeight:700,color:"#fff"}}>{user.name.split(" ")[0]}</div>}
          </button>

          <button onClick={onLogout} style={{
            background:"rgba(192,168,224,0.06)",color:"rgba(192,168,224,0.5)",
            border:"1px solid rgba(192,168,224,0.14)",
            borderRadius:7,padding:mobile?"5px 9px":"6px 12px",fontSize:11,fontWeight:600,cursor:"pointer"
          }}>{mobile?"Out":"Sign out"}</button>
        </div>
      </div>

      <div style={{maxWidth:1320,margin:"0 auto",padding:mobile?"12px 10px 60px":"20px 20px 40px",boxSizing:"border-box",width:"100%"}}>{children}</div>
      {showProfile&&<ProfileModal user={user} onSave={updates=>setUser(u=>({...u,...updates}))} onClose={()=>setShowProfile(false)}/>}
    </div>
  );
}

//  ADMIN 
function AdminView({territories,setTerritories,clinics,setClinics,users,setUsers,paySettings,setPaySettings,events,setEvents,adminNotices,setAdminNotices,pushNotice}){
  const mob=useMobile();
  const [tab,setTab]=useState("territories");
  const [showAddT,setShowAddT]=useState(false);
  const [nT,setNT]=useState({city:"",state:"",sdr_id:"",amb_id:""});
  const [editPay,setEditPay]=useState(false);
  const [draft,setDraft]=useState({...paySettings});
  const [showCF,setShowCF]=useState(false);
  const [showCU,setShowCU]=useState(false);
  const [showTask,setShowTask]=useState(false);
  const [payModal,setPayModal]=useState(null);
  const [incomeModal,setIncomeModal]=useState(null);
  const [showPayReport,setShowPayReport]=useState(false);
  const [adminLog,setAdminLog]=useState([]);
  const [territoryModal,setTerritoryModal]=useState(null);

  const notices=adminNotices||[];
  const addNotice=(type,message,ntab)=>pushNotice&&pushNotice(type,message,ntab);
  const dismissNotice=(id)=>setAdminNotices&&setAdminNotices(p=>p.filter(n=>n.id!==id));
  const dismissTab=(ntab)=>setAdminNotices&&setAdminNotices(p=>p.filter(n=>n.tab!==ntab));

  const live=clinics.filter(c=>c.status==="Live");
  const totRev=live.reduce((s,c)=>s+lastMoOrders(c)*paySettings.avg_order_value,0);
  const logA=(action)=>setAdminLog(p=>[...p,{date:fmtNow(),user:"Admin",action,clinic:"—"}]);

  function addT(){if(!nT.city||!nT.state)return;setTerritories(p=>[...p,{id:"t"+Date.now(),...nT,sdr_id:nT.sdr_id||null,amb_id:nT.amb_id||null,status:"Pending"}]);logA(`Territory assigned: ${nT.city}, ${nT.state}`);setNT({city:"",state:"",sdr_id:"",amb_id:""});setShowAddT(false);}

  function saveClinic(form){
    const t=territories.find(t=>t.id===form.territory_id);
    const initNotes=form.sdr_notes_text?.trim()?[{id:nid(),author:"Admin",date:fmtNow(),text:form.sdr_notes_text.trim()}]:[];
    setClinics(p=>[...p,{id:"c"+Date.now(),...form,city:t?.city||"",state:t?.state||"",status:"Not Contacted",added_by:"u0",enterprise_id:"",monthly_history:[],sdr_notes:initNotes,amb_notes:[],changelog:[{date:fmtNow(),user:"Admin",action:"Clinic created by Admin"}]}]);
    logA(`Clinic created: ${form.name}`);setShowCF(false);
  }

  function updateAssignment(clinicId,field,userId){
    const c=clinics.find(c=>c.id===clinicId);if(!c)return;
    setTerritories(p=>p.map(t=>t.id===c.territory_id?{...t,[field]:userId||null}:t));
    const role=field==="sdr_id"?"SDR":"Ambassador";
    const newName=userId?uName(users,userId):"Unassigned";
    setClinics(p=>p.map(x=>x.id===clinicId?{...x,changelog:[...(x.changelog||[]),{date:fmtNow(),user:"Admin",action:`${role} reassigned to ${newName}`}]}:x));
    logA(`${role} on ${c.name} → ${newName}`);
  }

  function saveNotes(clinicId,field,updated){
    const c=clinics.find(c=>c.id===clinicId);
    const label=field==="sdr_notes"?"SDR note":"Ambassador note";
    setClinics(p=>p.map(x=>x.id===clinicId?{...x,[field]:updated,changelog:[...(x.changelog||[]),{date:fmtNow(),user:"Admin",action:`${label} updated`}]}:x));
    logA(`${label} updated on ${c?.name}`);
  }

  function updateStatus(id,status){
    const c=clinics.find(c=>c.id===id);
    setClinics(p=>p.map(x=>x.id===id?{...x,status,changelog:[...(x.changelog||[]),{date:fmtNow(),user:"Admin",action:`Status → ${status}`}]}:x));
    logA(`Status → ${status} on ${c?.name}`);
  }

  function handlePayConfirm(userId,amount){
    const u=users.find(u=>u.id===userId);
    const gross=userPay(u).gross;
    setUsers(p=>p.map(x=>x.id===userId?{...x,payments:[...(x.payments||[]),{id:nid(),date:fmtNow(),amount,type:amount>=gross?"Full":"Partial"}]}:x));
    logA(`Payment $${amount.toFixed(0)} recorded for ${u?.name}`);
    setPayModal(null);
  }

  function addTask(task){
    setUsers(p=>p.map(u=>u.id===task.assigned_to?{...u,tasks:[...(u.tasks||[]),task]}:u));
    logA(`Task added for ${uName(users,task.assigned_to)}: "${task.title}"`);
  }

  function toggleTask(userId,taskId){
    setUsers(p=>p.map(u=>u.id===userId?{...u,tasks:(u.tasks||[]).map(t=>t.id===taskId?{...t,done:!t.done}:t)}:u));
  }

  function deleteTask(userId,taskId){
    setUsers(p=>p.map(u=>u.id===userId?{...u,tasks:(u.tasks||[]).filter(t=>t.id!==taskId)}:u));
  }

  function userPay(u){
    const liveClinics=clinics.filter(c=>{
      const t=territories.find(t=>t.id===c.territory_id);
      return c.status==="Live"&&(t?.sdr_id===u.id||t?.amb_id===u.id);
    });
    let gross=0, rev=0;
    liveClinics.forEach(c=>{
      const t=territories.find(t=>t.id===c.territory_id);
      const {flat,pct}=effRates(u, t?.id||"", paySettings);
      const cRev=lastMoOrders(c)*paySettings.avg_order_value;
      rev+=cRev;
      gross+=cRev*(pct/100)+flat;
    });
    // Add admin-approved expenses
    const approvedExpenses=(events||[]).filter(e=>e.amb_id===u.id&&e.expense_approved).reduce((s,e)=>s+(e.expense||0),0);
    gross+=approvedExpenses;
    const paid=totalPaid(u);
    return{rev,gross,pay:gross,paid,owed:Math.max(0,gross-paid),approvedExpenses};
  }

  const allChanges=[...clinics.flatMap(c=>(c.changelog||[]).map(e=>({...e,clinic:c.name}))), ...adminLog].sort((a,b)=>b.date.localeCompare(a.date));

  const priColor=(p)=>p==="High"?C.red:p==="Medium"?C.yellow:C.muted;
  const priBg=(p)=>p==="High"?C.redBg:p==="Medium"?C.yellowBg:"#F0F4FC";

  return(
    <div>
      <PH title="Admin Dashboard" sub="Territory management · Field team oversight · Pay configuration"
        action={<div style={{display:"flex",gap:8}}><Btn onClick={()=>setShowTask(true)}>+ Add Task</Btn><Btn onClick={()=>setShowCF(true)}>+ Create Clinic</Btn></div>}/>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?8:12,marginBottom:16}}>
        <StatCard label="Active Territories" value={territories.filter(t=>t.status==="Active").length} sub="cities assigned"/>
        <StatCard label="Live Clinics" value={live.length} sub="generating orders" accent={C.green}/>
        <StatCard label="Last Mo. Revenue" value={`$${totRev.toLocaleString()}`} sub="from Enterprise" accent={C.blue}/>
        <StatCard label="Field Team" value={users.length} sub={`${users.filter(u=>u.role==="sdr").length} SDR · ${users.filter(u=>u.role==="ambassador").length} Amb`}/>
      </div>

      <SNav
        tabs={[{id:"territories",label:"Territories"},{id:"clinics",label:"All Clinics"},{id:"analytics",label:"Analytics"},{id:"map",label:"Network Map"},{id:"pay",label:"Pay & Earnings"},{id:"users",label:"Users & Tasks"},{id:"history",label:"Change History"},{id:"events",label:"Events"}]}
        active={tab}
        onSelect={t=>{setTab(t);dismissTab(t);}}
        badges={{
          clinics: notices.filter(n=>n.tab==="clinics").length,
          events:  notices.filter(n=>n.tab==="events").length,
        }}
      />

      {/* ── Notification panel ── */}
      {notices.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {notices.map(n=>{
            const accent=n.type==="live"?C.green:n.type==="clinic"?C.blue:n.type==="event"?C.purple:n.type==="expense"?C.yellow:C.muted;
            const bg=n.type==="live"?C.greenBg:n.type==="clinic"?C.skyBg:n.type==="event"?C.purpleBg:n.type==="expense"?C.yellowBg:"#F0F4FC";
            return(
              <div key={n.id} style={{display:"flex",alignItems:"center",gap:10,background:bg,border:`1px solid ${accent}`,borderRadius:9,padding:"9px 13px"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:accent,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.text}}>{n.message}</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:1}}>{fmtTime(n.date)}</div>
                </div>
                {n.tab&&tab!==n.tab&&(
                  <button onClick={()=>{setTab(n.tab);dismissNotice(n.id);}} style={{background:accent,color:"#fff",border:"none",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>
                    View
                  </button>
                )}
                <button onClick={()=>dismissNotice(n.id)} style={{background:"none",border:"none",fontSize:15,color:C.mutedLight,cursor:"pointer",lineHeight:1,flexShrink:0,padding:"0 2px"}}>×</button>
              </div>
            );
          })}
          {notices.length>1&&(
            <div style={{textAlign:"right"}}>
              <button onClick={()=>setAdminNotices&&setAdminNotices([])} style={{background:"none",border:"none",fontSize:11,color:C.mutedLight,cursor:"pointer",textDecoration:"underline"}}>
                Dismiss all
              </button>
            </div>
          )}
        </div>
      )}

      {tab==="territories"&&(
        <div>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}><Btn onClick={()=>setShowAddT(true)}>+ Assign Territory</Btn></div>
          {showAddT&&(
            <Card style={{marginBottom:14,borderColor:C.accent,boxShadow:`0 0 0 2px ${C.accentGlow}`}}>
              <Sec>New Territory</Sec>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:12}}>
                <FI label="City" value={nT.city} onChange={v=>setNT(p=>({...p,city:v}))}/>
                <FI label="State" value={nT.state} onChange={v=>setNT(p=>({...p,state:v}))} placeholder="e.g. FL"/>
                <FS label="SDR" value={nT.sdr_id} onChange={v=>setNT(p=>({...p,sdr_id:v}))} options={[{value:"",label:"Unassigned"},...users.filter(u=>u.role==="sdr").map(u=>({value:u.id,label:u.name}))]}/>
                <FS label="Ambassador" value={nT.amb_id} onChange={v=>setNT(p=>({...p,amb_id:v}))} options={[{value:"",label:"Unassigned"},...users.filter(u=>u.role==="ambassador").map(u=>({value:u.id,label:u.name}))]}/>
              </div>
              <div style={{display:"flex",gap:8}}><Btn onClick={addT}>Assign</Btn><Btn variant="ghost" onClick={()=>setShowAddT(false)}>Cancel</Btn></div>
            </Card>
          )}
          {/* Territory table — no inline dropdowns, click row to edit */}
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",borderRadius:8,border:`1px solid ${C.border}`}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:C.navyMid}}>
                {["City","State","SDR","Ambassador","Clinics","Live","Last Mo. Rev","Status"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",color:"rgba(255,255,255,0.8)",fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>{territories.map((t,i)=>{
                const tc=clinics.filter(c=>c.territory_id===t.id);
                const tl=tc.filter(c=>c.status==="Live");
                const tr2=tl.reduce((s,c)=>s+lastMoOrders(c)*paySettings.avg_order_value,0);
                const sc=t.status==="Active"?C.green:t.status==="Pending"?C.yellow:C.muted;
                const sb=t.status==="Active"?C.greenBg:t.status==="Pending"?C.yellowBg:"#EDF0F5";
                return(
                  <tr key={t.id} style={{background:i%2===0?C.card:C.surface,borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}
                    onClick={()=>setTerritoryModal(t)}
                    onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?C.card:C.surface}>
                    <td style={{padding:"9px 12px",fontWeight:700,color:C.text}}>{t.city}</td>
                    <td style={{padding:"9px 12px",color:C.muted}}>{t.state}</td>
                    <td style={{padding:"9px 12px",color:t.sdr_id?C.sky:C.mutedLight,fontStyle:t.sdr_id?"normal":"italic"}}>{t.sdr_id?uName(users,t.sdr_id):"Unassigned"}</td>
                    <td style={{padding:"9px 12px",color:t.amb_id?C.purple:C.mutedLight,fontStyle:t.amb_id?"normal":"italic"}}>{t.amb_id?uName(users,t.amb_id):"Unassigned"}</td>
                    <td style={{padding:"9px 12px",color:C.textSoft}}>{tc.length}</td>
                    <td style={{padding:"9px 12px",color:C.green,fontWeight:700}}>{tl.length}</td>
                    <td style={{padding:"9px 12px",color:C.blue,fontWeight:700}}>{tr2>0?`$${tr2.toLocaleString()}/mo`:<span style={{color:C.mutedLight}}>—</span>}</td>
                    <td style={{padding:"9px 12px"}}><span style={{background:sb,color:sc,padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{t.status}</span></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
          <div style={{fontSize:11,color:C.mutedLight,marginTop:8,textAlign:"center"}}>Click any territory row to edit SDR, Ambassador, and status</div>
        </div>
      )}

      {tab==="clinics"&&(
        <div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",borderRadius:8,border:`1px solid ${C.border}`}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{background:C.navyMid}}>
                {["Clinic","City","Contact","Status","Latest SDR Note","Last Mo. Orders","Update Status"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",color:"rgba(255,255,255,0.8)",fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>{clinics.map((c,i)=><ClinicRow key={c.id} c={c} territories={territories} users={users} role="admin" onUpdateStatus={updateStatus} onSaveNotes={saveNotes} onUpdateAssignment={updateAssignment} even={i%2===0}/>)}</tbody>
            </table>
          </div>
          <div style={{fontSize:11,color:C.mutedLight,marginTop:8,textAlign:"center"}}>Click any row for full detail and to reassign SDR/Ambassador</div>
        </div>
      )}

      {tab==="analytics"&&(
        <AnalyticsView clinics={clinics} territories={territories} myTerritoryIds={territories.map(t=>t.id)} role="admin"/>
      )}

      {tab==="map"&&(
        <MapView clinics={clinics} myTerritoryIds={territories.map(t=>t.id)}/>
      )}

      {tab==="pay"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <Btn variant="ghost" onClick={()=>setShowPayReport(true)}>Print Pay Report</Btn>
            {editPay?<div style={{display:"flex",gap:8}}><Btn variant="success" onClick={()=>{setPaySettings(draft);logA("Pay rates updated");setEditPay(false);}}>Save</Btn><Btn variant="ghost" onClick={()=>{setEditPay(false);setDraft({...paySettings});}}>Cancel</Btn></div>:<Btn onClick={()=>setEditPay(true)}>Edit Global Defaults</Btn>}
          </div>
          <IBox style={{marginBottom:14}}><strong>Shared-credit model:</strong> SDR and Ambassador both earn off every live clinic. Individual rates override these defaults per user.</IBox>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
            {[
              {title:"SDR Default Rates",fields:[["Flat per live clinic","sdr_flat","$"],["Rev share %","sdr_pct","%"]]},
              {title:"Ambassador Default Rates",fields:[["Flat per live clinic","amb_flat","$"],["Rev share %","amb_pct","%"]]},
            ].map(sec=>(
              <Card key={sec.title}>
                <Sec>{sec.title}</Sec>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  {sec.fields.map(([label,key,prefix])=>(
                    <div key={key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                      <span style={{fontSize:12,color:C.textSoft,flex:1}}>{label}</span>
                      {editPay
                        ?<div style={{display:"flex",alignItems:"center",gap:4}}>
                           <span style={{fontSize:11,color:C.muted}}>{prefix}</span>
                           <input type="number" min={0} step={prefix==="%"?0.1:10} value={draft[key]} onChange={e=>setDraft(p=>({...p,[key]:parseFloat(e.target.value)||0}))} style={{width:72,border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 8px",fontSize:13,textAlign:"right"}}/>
                         </div>
                        :<strong style={{color:C.blue,fontSize:15}}>{prefix}{paySettings[key]}{prefix==="%"?"%":""}</strong>
                      }
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <Card style={{marginBottom:16}}>
            <Sec>Automated Payment Settings</Sec>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{flex:1,fontSize:12,color:C.textSoft}}>Users with pay method set to <strong>Automated</strong> will have their full earnings paid on this day each month.</div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <span style={{fontSize:12,color:C.text,fontWeight:600}}>Day of month:</span>
                {editPay
                  ?<input type="number" min={1} max={28} value={draft.auto_pay_day||1} onChange={e=>setDraft(p=>({...p,auto_pay_day:parseInt(e.target.value)||1}))} style={{width:60,border:`1px solid ${C.border}`,borderRadius:7,padding:"6px 8px",fontSize:14,textAlign:"center",fontWeight:700}}/>
                  :<div style={{background:C.accentGlow,border:`1px solid ${C.accent}`,borderRadius:8,padding:"6px 14px",fontWeight:800,fontSize:16,color:C.accent}}>{paySettings.auto_pay_day}</div>
                }
              </div>
              <div>
                <Btn small variant="success" onClick={()=>{
                  const autoUsers=users.filter(u=>u.pay_method==="Automated");
                  if(!autoUsers.length)return;
                  const today=new Date();
                  const payDate=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(paySettings.auto_pay_day).padStart(2,"0")}`;
                  setUsers(p=>p.map(u=>{
                    if(u.pay_method!=="Automated")return u;
                    const{gross}=userPay(u);
                    const paid2=totalPaid(u);
                    const owed2=Math.max(0,gross-paid2);
                    if(owed2<=0)return u;
                    return{...u,payments:[...(u.payments||[]),{id:nid(),date:fmtNow(),amount:owed2,type:"Full (Automated)"}]};
                  }));
                  logA(`Automated payments executed for ${payDate} — ${autoUsers.length} user(s)`);
                }}>Execute Automated Payments Now</Btn>
              </div>
            </div>
          </Card>
          <Card>
            <Sec>Last Month Earnings &amp; Payments</Sec>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {users.map(u=>{
                const{rev,gross,paid,owed}=userPay(u);
                const recent=(u.payments||[]).slice(-3).reverse();
                const myTerrs=territories.filter(t=>t.sdr_id===u.id||t.amb_id===u.id);
                const hasAnyCustom=myTerrs.some(t=>{const tr=u.territory_rates?.[t.id];return tr?.flat!==undefined||tr?.pct!==undefined;});
                return(
                  <div key={u.id} style={{background:C.surface,borderRadius:10,padding:"14px 16px",border:`2px solid ${hasAnyCustom?C.purple:C.border}`}}>
                    {/* Header row */}
                    <div style={{display:"flex",alignItems:"flex-start",gap:12,flexWrap:"wrap",marginBottom:12}}>
                      <div style={{minWidth:140}}>
                        <div style={{fontWeight:700,fontSize:13,color:C.text,marginBottom:2}}>{u.name}</div>
                        <div style={{fontSize:11,color:C.muted}}>{u.role}{hasAnyCustom?" · Custom rates on some territories":""}</div>
                      </div>
                      {[["Territory Rev",rev,C.blue],["Gross Earned",gross,C.text],["Total Paid",paid,C.green],["Still Owed",owed,owed>0?C.yellow:C.green]].map(([l,v,ac])=>(
                        <div key={l} style={{textAlign:"center",minWidth:80}}>
                          <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:2}}>{l}</div>
                          <div style={{fontSize:15,fontWeight:800,color:ac}}>{"$"}{Math.round(v).toLocaleString()}</div>
                        </div>
                      ))}
                      <div style={{minWidth:120}}>
                        <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:4}}>Pay Method</div>
                        <select value={u.pay_method} onChange={e=>{setUsers(p=>p.map(x=>x.id===u.id?{...x,pay_method:e.target.value}:x));logA(`Pay method for ${u.name} → ${e.target.value}`);}} style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 8px",fontSize:11,background:"#fff",color:C.text}}>
                          {PAY_METHODS.map(m=><option key={m}>{m}</option>)}
                        </select>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:6,marginLeft:"auto",alignItems:"flex-end"}}>
                        {owed>0
                          ? u.pay_method==="Automated"
                            ? <div style={{background:C.accentGlow,border:`1px solid ${C.accent}`,borderRadius:8,padding:"5px 12px",fontSize:11,fontWeight:700,color:C.accent}}>Auto on day {paySettings.auto_pay_day}</div>
                            : <Btn variant="success" onClick={()=>setPayModal(u.id)}>Record Payment</Btn>
                          : <div style={{background:C.greenBg,color:C.green,padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:700}}>Fully Paid</div>
                        }
                        <Btn small variant="ghost" onClick={()=>setIncomeModal(u.id)}>Income</Btn>
                      </div>
                    </div>

                    {/* Per-territory rate rows */}
                    {myTerrs.length>0&&(
                      <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10}}>
                        <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Rates by Territory</div>
                        <div style={{display:"flex",flexDirection:"column",gap:6}}>
                          {myTerrs.map(t=>(
                            <UserRateRow
                              key={t.id}
                              u={u}
                              territory={t}
                              paySettings={paySettings}
                              onSaveRates={(tid,rates)=>{
                                setUsers(p=>p.map(x=>x.id===u.id?{...x,territory_rates:{...(x.territory_rates||{}),[tid]:rates}}:x));
                                logA(`Rates set for ${u.name} in ${t.city}: $${rates.flat}/clinic + ${rates.pct}%`);
                              }}
                              onResetRates={(tid)=>{
                                setUsers(p=>p.map(x=>{
                                  if(x.id!==u.id)return x;
                                  const tr={...(x.territory_rates||{})};
                                  delete tr[tid];
                                  return{...x,territory_rates:tr};
                                }));
                                logA(`Rates reset to default for ${u.name} in ${t.city}`);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {myTerrs.length===0&&<div style={{fontSize:11,color:C.mutedLight,fontStyle:"italic"}}>No territories assigned.</div>}

                    {/* Recent payments */}
                    {recent.length>0&&(
                      <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                        <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:5}}>Recent Payments</div>
                        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                          {recent.map(p=><div key={p.id} style={{background:C.greenBg,borderRadius:7,padding:"4px 10px",fontSize:11}}><span style={{color:C.green,fontWeight:700}}>{"$"}{p.amount.toFixed(0)}</span><span style={{color:C.muted,marginLeft:5}}>{p.type} · {fmtDate(p.date)}</span></div>)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {tab==="users"&&(
        <div>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:12}}>
            <Btn onClick={()=>setShowCU(true)}>+ Create User</Btn>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {users.map(u=>{
              const ut=territories.filter(t=>t.sdr_id===u.id||t.amb_id===u.id);
              const{gross,owed}=userPay(u);
              const openTasks=(u.tasks||[]).filter(t=>!t.done);
              const doneTasks=(u.tasks||[]).filter(t=>t.done);
              return(
                <Card key={u.id}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:(u.tasks||[]).length>0?12:0}}>
                    <div style={{width:40,height:40,background:u.role==="sdr"?C.skyBg:C.purpleBg,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:u.role==="sdr"?C.sky:C.purple,flexShrink:0}}>{u.name.charAt(0)}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:14,color:C.text,marginBottom:2}}>{u.name}</div>
                      <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{u.email} · {u.phone||"No phone"}</div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        <span style={{background:u.role==="sdr"?C.skyBg:C.purpleBg,color:u.role==="sdr"?C.sky:C.purple,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{u.role}</span>
                        <span style={{background:C.yellowBg,color:C.yellow,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>Rates by territory</span>
                        <span style={{background:C.surface,color:C.muted,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{u.pay_method}</span>
                        {ut.length>0&&<span style={{background:C.accentGlow,color:C.accent,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{ut.map(t=>t.city).join(", ")}</span>}
                        <span style={{background:C.greenBg,color:C.green,padding:"2px 9px",borderRadius:20,fontSize:10,fontWeight:700}}>{"Owed: $"}{owed.toFixed(0)}</span>
                      </div>
                    </div>
                    <Btn small variant="ghost" onClick={()=>setIncomeModal(u.id)}>Income</Btn>
                  </div>
                  {(u.tasks||[]).length>0&&(
                    <div style={{borderTop:`1px solid ${C.border}`,paddingTop:10}}>
                      <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7}}>Tasks ({openTasks.length} open)</div>
                      <div style={{display:"flex",flexDirection:"column",gap:5}}>
                        {[...openTasks,...doneTasks].map(task=>(
                          <div key={task.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:task.done?C.surface:"#fff",borderRadius:7,border:`1px solid ${C.border}`,opacity:task.done?0.6:1}}>
                            <input type="checkbox" checked={task.done} onChange={()=>toggleTask(u.id,task.id)} style={{cursor:"pointer",flexShrink:0}}/>
                            <div style={{flex:1}}>
                              <div style={{fontSize:12,fontWeight:600,color:task.done?C.muted:C.text,textDecoration:task.done?"line-through":"none"}}>{task.title}</div>
                              {task.notes&&<div style={{fontSize:11,color:C.mutedLight}}>{task.notes}</div>}
                              {task.due&&<div style={{fontSize:10,color:C.muted}}>Due: {task.due}</div>}
                            </div>
                            <span style={{background:priBg(task.priority),color:priColor(task.priority),padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700,flexShrink:0}}>{task.priority}</span>
                            <button onClick={()=>deleteTask(u.id,task.id)} style={{background:"none",border:"none",color:C.mutedLight,cursor:"pointer",fontSize:14,lineHeight:1,flexShrink:0,padding:"0 2px"}} title="Delete task">×</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {tab==="history"&&(
        <Card>
          <Sec>Change History — All Actions</Sec>
          <div style={{display:"flex",flexDirection:"column",gap:4,maxHeight:500,overflowY:"auto"}}>
            {allChanges.slice(0,80).map((e,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 10px",background:i%2===0?C.surface:C.card,borderRadius:6,fontSize:11}}>
                <span style={{color:C.mutedLight,whiteSpace:"nowrap",flexShrink:0,minWidth:130,fontSize:10}}>{fmtTime(e.date)}</span>
                <span style={{color:C.blue,fontWeight:600,flexShrink:0,whiteSpace:"nowrap",minWidth:100}}>{e.user}</span>
                {e.clinic!=="—"&&<span style={{color:C.text,fontWeight:600,flexShrink:0,whiteSpace:"nowrap"}}>on {e.clinic}</span>}
                <span style={{color:C.textSoft}}>— {e.action}</span>
              </div>
            ))}
          </div>
        </Card>
      )}


      {tab==="events"&&(
        <Card>
          <EventLogView
            events={events}
            setEvents={(updater)=>{
              setEvents(prev=>{
                const next=typeof updater==="function"?updater(prev):updater;
                next.forEach(n=>{
                  const o=prev.find(p=>p.id===n.id);
                  if(o&&!o.expense_approved&&n.expense_approved){
                    addNotice("expense",`Expense approved: ${n.amb_name} — "${n.name}" ($${n.expense?.toFixed(2)})`, "events");
                  }
                });
                return next;
              });
            }}
            ambId={null} role="admin"
            territories={territories} users={users} logA={logA}
          />
        </Card>
      )}

      {showCF&&<ClinicForm title="Create New Clinic" territories={territories} users={users} onSave={saveClinic} onClose={()=>setShowCF(false)} adminMode/>}
      {showCU&&<CreateUserModal onSave={u=>{setUsers(p=>[...p,u]);logA(`User created: ${u.name} (${u.role})`);}} onClose={()=>setShowCU(false)}/>}
      {showTask&&<TaskModal users={users} onSave={addTask} onClose={()=>setShowTask(false)}/>}
      {payModal&&users.find(u=>u.id===payModal)&&<MarkPaidModal user={users.find(u=>u.id===payModal)} owed={userPay(users.find(u=>u.id===payModal)).owed} onConfirm={amt=>handlePayConfirm(payModal,amt)} onClose={()=>setPayModal(null)}/>}
      {incomeModal&&<IncomePanel userId={incomeModal} users={users} clinics={clinics} territories={territories} paySettings={paySettings} events={events} onClose={()=>setIncomeModal(null)}/>}
      {showPayReport&&<PayReportModal users={users} clinics={clinics} territories={territories} paySettings={paySettings} events={events} onClose={()=>setShowPayReport(false)}/>}
      {territoryModal&&<TerritoryModal territory={territoryModal} users={users} clinics={clinics} onClose={()=>setTerritoryModal(null)} onUpdate={updated=>{setTerritories(p=>p.map(t=>t.id===updated.id?updated:t));setTerritoryModal(null);}} onLogAdmin={logA}/>}
    </div>
  );
}

//  SDR 
function SDRView({clinics,setClinics,territories,users,paySettings,events}){
  const mob=useMobile();
  const ME="u1";const ME_NAME="Maureen Mutio";
  const myT=territories.filter(t=>t.sdr_id===ME);
  const myTIds=myT.map(t=>t.id);
  const myC=clinics.filter(c=>myTIds.includes(c.territory_id));
  const live=myC.filter(c=>c.status==="Live");
  const totRev=live.reduce((s,c)=>s+lastMoOrders(c)*paySettings.avg_order_value,0);
  const myUser=uObj(users,ME);
  const myPay=live.reduce((s,c)=>{
    const t=territories.find(t=>t.id===c.territory_id);
    const {flat,pct}=effRates(myUser||{role:"sdr",territory_rates:{}},t?.id||"",paySettings);
    return s+lastMoOrders(c)*paySettings.avg_order_value*(pct/100)+flat;
  },0);
  const [fc,setFc]=useState("All");
  const [showAdd,setShowAdd]=useState(false);
  const [showIncome,setShowIncome]=useState(false);
  const [mainTab,setMainTab]=useState("pipeline");
  const myTasks=(myUser?.tasks||[]).filter(t=>!t.done);

  function saveClinic(form){
    const t=territories.find(t=>t.id===form.territory_id);
    const initNotes=form.sdr_notes_text?.trim()?[{id:nid(),author:ME_NAME,date:fmtNow(),text:form.sdr_notes_text.trim()}]:[];
    setClinics(p=>[...p,{id:"c"+Date.now(),...form,city:t?.city||"",state:t?.state||"",status:"Not Contacted",added_by:ME,enterprise_id:"",monthly_history:[],hourly_data:[],sdr_notes:initNotes,amb_notes:[],changelog:[{date:fmtNow(),user:ME_NAME,action:"Clinic created"}]}]);
    setShowAdd(false);
  }
  function updateStatus(id,status){setClinics(p=>p.map(c=>c.id===id?{...c,status,changelog:[...(c.changelog||[]),{date:fmtNow(),user:ME_NAME,action:`Status → ${status}`}]}:c));}
  function saveNotes(clinicId,field,updated){setClinics(p=>p.map(c=>c.id===clinicId?{...c,[field]:updated,changelog:[...(c.changelog||[]),{date:fmtNow(),user:ME_NAME,action:`${field==="sdr_notes"?"SDR":"Ambassador"} note updated`}]}:c));}

  const displayed=fc==="All"?myC:myC.filter(c=>c.city===fc);

  return(
    <div>
      <PH title="SDR Dashboard" sub={`${ME_NAME} · ${myT.map(t=>`${t.city} ${t.state}`).join(" · ")}`} action={
        <div style={{display:"flex",gap:8}}>
          <Btn variant="ghost" onClick={()=>setShowIncome(true)}>My Income</Btn>
          {mainTab==="pipeline"&&<Btn onClick={()=>setShowAdd(true)}>+ Add Clinic</Btn>}
        </div>
      }/>

      {myTasks.length>0&&(
        <div style={{marginBottom:16,background:C.yellowBg,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.yellow}`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.yellow,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7}}>Your Tasks ({myTasks.length} open)</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {myTasks.map(t=><div key={t.id} style={{display:"flex",gap:10,alignItems:"center",fontSize:12}}><span style={{background:t.priority==="High"?C.redBg:C.yellowBg,color:t.priority==="High"?C.red:C.yellow,padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700,flexShrink:0}}>{t.priority}</span><span style={{color:C.text,fontWeight:600}}>{t.title}</span>{t.due&&<span style={{color:C.muted,fontSize:11}}>Due {t.due}</span>}</div>)}
          </div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?8:12,marginBottom:16}}>
        <StatCard label="My Territories" value={myT.length} sub="active cities"/>
        <StatCard label="Pipeline" value={myC.length} sub="total clinics"/>
        <StatCard label="Live Clinics" value={live.length} sub="on Enterprise" accent={C.green}/>
        <StatCard label="Est. Monthly Pay" value={`$${myPay.toFixed(0)}`} sub="from live clinic territory rates" accent={C.blue}/>
      </div>

      <SNav tabs={[{id:"pipeline",label:"Pipeline"},{id:"analytics",label:"Analytics"},{id:"map",label:"Territory Map"},{id:"events",label:"Events"}]} active={mainTab} onSelect={setMainTab}/>

      {mainTab==="analytics"&&<AnalyticsView clinics={clinics} territories={territories} myTerritoryIds={myTIds} role={ME==="u1"?"sdr":"ambassador"}/>}
      {mainTab==="map"&&<MapView clinics={clinics} myTerritoryIds={myTIds}/>}

      {mainTab==="pipeline"&&<>
      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <Sec>Clinic Pipeline</Sec>
          <div style={{display:"flex",gap:5}}>{["All",...myT.map(t=>t.city)].map(c2=><button key={c2} onClick={()=>setFc(c2)} style={{background:fc===c2?C.navyMid:C.surface,color:fc===c2?"#fff":C.muted,border:`1px solid ${fc===c2?C.navyMid:C.border}`,borderRadius:20,padding:"4px 11px",fontSize:11,fontWeight:600,cursor:"pointer"}}>{c2}</button>)}</div>
        </div>
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch",borderRadius:8,border:`1px solid ${C.border}`}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:C.navyMid}}>
              {["Clinic","City","Contact","Status","Ambassador","Latest Note","Last Mo. Orders","Update Status"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",color:"rgba(255,255,255,0.8)",fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>)}
            </tr></thead>
            <tbody>{displayed.map((c,i)=><ClinicRow key={c.id} c={c} territories={territories} users={users} role="sdr" onUpdateStatus={updateStatus} onSaveNotes={saveNotes} even={i%2===0}/>)}</tbody>
          </table>
        </div>
        <div style={{fontSize:11,color:C.mutedLight,marginTop:6,textAlign:"center"}}>Click any row to open full detail · Click the ambassador badge to view contact info</div>
      </Card>

      {live.length>0&&(
        <Card>
          <Sec>Live Clinics — Pay Breakdown</Sec>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:mob?8:12,marginBottom:12}}>
            {live.map(c=>{
              const lm=lastMoOrders(c);
              const rev=lm*paySettings.avg_order_value;
              const tc=territories.find(t=>t.id===c.territory_id);
              const {flat:cf,pct:cp}=effRates(myUser||{role:"sdr",territory_rates:{}},tc?.id||"",paySettings);
              const pay=rev*(cp/100)+cf;
              const mom2=momChange(c);
              return(
              <div key={c.id} style={{background:C.surface,borderRadius:9,padding:"12px 14px",border:`1px solid ${C.border}`}}>
                <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:2}}>{c.name}</div>
                <div style={{fontSize:11,color:C.muted,marginBottom:1}}>{c.city} · {lm} orders last mo.</div>
                {mom2!==null&&<div style={{fontSize:10,color:mom2>=0?C.green:C.red,fontWeight:700,marginBottom:6}}>{mom2>=0?"▲":"▼"}{Math.abs(mom2)}% MoM</div>}
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:10,background:C.greenBg,color:C.green,padding:"2px 7px",borderRadius:20,fontWeight:700}}>Enterprise</span>
                  <span style={{fontSize:13,color:C.green,fontWeight:800}}>{"+$"}{pay.toFixed(0)}/mo</span>
                </div>
              </div>
            );})}
          </div>
          <div style={{padding:"11px 14px",background:C.accentGlow,borderRadius:8,border:`1px solid ${C.accent}`,fontSize:13,fontWeight:800,color:C.blue}}>
            {"Estimated: $"}{myPay.toFixed(0)}{"/mo from live clinics"}
          </div>
        </Card>
      )}
      {showAdd&&<ClinicForm title="Add Clinic to Pipeline" territories={myT} onSave={saveClinic} onClose={()=>setShowAdd(false)}/>}
      </>}
      
      {mainTab==="events"&&(
        <Card>
          <EventLogView events={events} setEvents={()=>{}} ambId={ME} role="sdr" territories={territories} users={users} logA={null}/>
        </Card>
      )}
      {showIncome&&<IncomePanel userId={ME} users={users} clinics={clinics} territories={territories} paySettings={paySettings} events={events} onClose={()=>setShowIncome(false)}/>}
    </div>
  );
}

//  AMBASSADOR 
function AmbassadorView({clinics,setClinics,territories,users,paySettings,events,setEvents}){
  const mob=useMobile();
  const ME="u2";const ME_NAME="Carlos Rivera";
  const myT=territories.filter(t=>t.amb_id===ME);
  const myTIds=myT.map(t=>t.id);
  const myC=clinics.filter(c=>myTIds.includes(c.territory_id));
  const live=myC.filter(c=>c.status==="Live");
  const totRev=live.reduce((s,c)=>s+lastMoOrders(c)*paySettings.avg_order_value,0);
  const totalEver=live.reduce((s,c)=>s+totalOrders(c)*paySettings.avg_order_value,0);
  const myUser=uObj(users,ME);
  const myPay=live.reduce((s,c)=>{
    const t=territories.find(t=>t.id===c.territory_id);
    const {flat,pct}=effRates(myUser||{role:"ambassador",territory_rates:{}},t?.id||"",paySettings);
    return s+lastMoOrders(c)*paySettings.avg_order_value*(pct/100)+flat;
  },0);
  const totalEarned=live.reduce((s,c)=>{
    const t=territories.find(t=>t.id===c.territory_id);
    const {flat,pct}=effRates(myUser||{role:"ambassador",territory_rates:{}},t?.id||"",paySettings);
    return s+totalOrders(c)*paySettings.avg_order_value*(pct/100)+flat;
  },0);
  const [openClinic,setOpenClinic]=useState(null);
  const [mainTab,setMainTab]=useState("overview");
  const [showIncome,setShowIncome]=useState(false);
  const myTasks=(myUser?.tasks||[]).filter(t=>!t.done);

  function updateStatus(id,status){setClinics(p=>p.map(c=>c.id===id?{...c,status,changelog:[...(c.changelog||[]),{date:fmtNow(),user:ME_NAME,action:`Status → ${status}`}]}:c));}
  function saveNotes(clinicId,field,updated){setClinics(p=>p.map(c=>c.id===clinicId?{...c,[field]:updated,changelog:[...(c.changelog||[]),{date:fmtNow(),user:ME_NAME,action:"Ambassador note updated"}]}:c));}

  return(
    <div>
      <PH title="Ambassador Dashboard" sub={`${ME_NAME} · ${myT.map(t=>`${t.city} ${t.state}`).join(" · ")}`}
        action={<Btn variant="ghost" onClick={()=>setShowIncome(true)}>My Income</Btn>}/>

      {myTasks.length>0&&(
        <div style={{marginBottom:16,background:C.yellowBg,borderRadius:10,padding:"12px 16px",border:`1px solid ${C.yellow}`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.yellow,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:7}}>Your Tasks ({myTasks.length} open)</div>
          <div style={{display:"flex",flexDirection:"column",gap:5}}>
            {myTasks.map(t=><div key={t.id} style={{display:"flex",gap:10,alignItems:"center",fontSize:12}}><span style={{background:t.priority==="High"?C.redBg:C.yellowBg,color:t.priority==="High"?C.red:C.yellow,padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700,flexShrink:0}}>{t.priority}</span><span style={{color:C.text,fontWeight:600}}>{t.title}</span>{t.due&&<span style={{color:C.muted,fontSize:11}}>Due {t.due}</span>}</div>)}
          </div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?8:12,marginBottom:16}}>
        <StatCard label="My Territory" value={myT.map(t=>t.city).join(", ")} sub="assigned by Admin"/>
        <StatCard label="Territory Clinics" value={myC.length} sub="shared pipeline"/>
        <StatCard label="Live Clinics" value={live.length} sub="generating orders" accent={C.green}/>
        <StatCard label="Est. Monthly Pay" value={`$${myPay.toFixed(0)}`} sub="from live clinic territory rates" accent={C.blue}/>
      </div>

      <SNav tabs={[{id:"overview",label:"Overview"},{id:"pipeline",label:"Pipeline"},{id:"analytics",label:"Analytics"},{id:"map",label:"Territory Map"},{id:"events",label:"My Events"}]} active={mainTab} onSelect={setMainTab}/>

      {mainTab==="analytics"&&<AnalyticsView clinics={clinics} territories={territories} myTerritoryIds={myTIds} role={ME==="u1"?"sdr":"ambassador"}/>}
      {mainTab==="map"&&<MapView clinics={clinics} myTerritoryIds={myTIds}/>}

      {mainTab==="overview"&&(
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10,marginBottom:16}}>
        <Card>
          <Sec>Your Role</Sec>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              ["Outreach Support","Work alongside the SDR — walk into clinics, attend meetings, assist with introductions."],
              ["Onboarding Assist","Join onboarding calls or in-person setup. Local presence builds trust."],
              ["Community Building","Events, referrals, warm intros. Represent NudgeWorld in your territory."],
              ["Shared Credit","You earn on every live clinic in your territory. Team effort, shared reward."],
            ].map(([title,desc])=>(
              <div key={title} style={{display:"flex",gap:10}}>
                <div style={{width:3,borderRadius:2,background:C.purple,flexShrink:0,marginTop:2}}/>
                <div>
                  <div style={{fontWeight:700,fontSize:12,color:C.text,marginBottom:1}}>{title}</div>
                  <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <Sec>Live Clinics — Earnings</Sec>
          {live.length===0?<div style={{color:C.muted,fontSize:12}}>No live clinics yet.</div>:(
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {live.map(c=>{
                const lm=lastMoOrders(c);
                const ct=territories.find(t=>t.id===c.territory_id);
                const {flat:cf2,pct:cp2}=effRates(myUser||{role:"ambassador",territory_rates:{}},ct?.id||"",paySettings);
                const lmPay=(lm*paySettings.avg_order_value)*(cp2/100)+cf2;
                const total2=totalOrders(c);
                const totalPay2=(total2*paySettings.avg_order_value)*(cp2/100)+cf2;
                const mom2=momChange(c);
                return(
                  <div key={c.id} onClick={()=>setOpenClinic(c)} style={{background:C.surface,borderRadius:9,padding:"10px 13px",border:`1px solid ${C.border}`,cursor:"pointer"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div><div style={{fontWeight:700,fontSize:12,color:C.text}}>{c.name}</div><div style={{fontSize:11,color:C.muted}}>{lm} orders last mo.{mom2!==null&&<span style={{marginLeft:6,color:mom2>=0?C.green:C.red,fontWeight:700}}>{mom2>=0?"▲":"▼"}{Math.abs(mom2)}% MoM</span>}</div></div>
                      <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}><div style={{fontSize:13,color:C.green,fontWeight:800}}>{"+$"}{lmPay.toFixed(0)}/mo</div><div style={{fontSize:10,color:C.mutedLight}}>{"All time: $"}{totalPay2.toFixed(0)}</div></div>
                    </div>
                  </div>
                );
              })}
              <div style={{padding:"10px 12px",background:C.accentGlow,borderRadius:8,border:`1px solid ${C.accent}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:2}}>Last Month</div><div style={{fontSize:14,fontWeight:800,color:C.blue}}>{"$"}{myPay.toFixed(0)}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",marginBottom:2}}>All Time Earned</div><div style={{fontSize:14,fontWeight:800,color:C.green}}>{"$"}{totalEarned.toFixed(0)}</div></div>
              </div>
            </div>
          )}
        </Card>
      </div>
      )}

      {mainTab==="pipeline"&&(
      <Card>
        <Sec>Territory Pipeline</Sec>
        <IBox color={C.blue} bg="#EEF5FF" style={{marginBottom:12}}>
          Click any clinic row to view full details, address, and contact info. Add your ambassador notes and update status directly.
        </IBox>
        <div style={{overflowX:"auto",borderRadius:8,border:`1px solid ${C.border}`,marginTop:10}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:C.navyMid}}>
              {["Clinic","City","Contact","Status","Latest Note","Last Mo. Orders","Update Status"].map(h=><th key={h} style={{padding:"9px 12px",textAlign:"left",color:"rgba(255,255,255,0.8)",fontWeight:700,fontSize:10,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>)}
            </tr></thead>
            <tbody>{myC.map((c,i)=><ClinicRow key={c.id} c={c} territories={territories} users={users} role="ambassador" onUpdateStatus={updateStatus} onSaveNotes={saveNotes} even={i%2===0}/>)}</tbody>
          </table>
        </div>
      </Card>
      )}

      {openClinic&&<ClinicDetail clinic={openClinic} onClose={()=>setOpenClinic(null)} territories={territories} users={users} role="ambassador" onSaveNotes={saveNotes}/>}
      {mainTab==="events"&&(
        <Card>
          <EventLogView events={events} setEvents={setEvents} ambId={ME} role="ambassador" territories={territories} users={users} logA={null}/>
        </Card>
      )}
      {showIncome&&<IncomePanel userId={ME} users={users} clinics={clinics} territories={territories} paySettings={paySettings} events={events} onClose={()=>setShowIncome(false)}/>}
    </div>
  );
}

//  ROOT 
export default function App(){
  const [user,setUser]=useState(null);
  // Inject viewport meta and prevent horizontal overflow globally
  useEffect(()=>{
    // Viewport meta — essential for mobile scaling
    if(!document.querySelector('meta[name="viewport"]')){
      const m=document.createElement('meta');
      m.name='viewport';
      m.content='width=device-width, initial-scale=1, maximum-scale=1';
      document.head.appendChild(m);
    }
    // Prevent any element from causing horizontal scroll
    const style=document.createElement('style');
    style.textContent=`
      html,body{max-width:100vw;overflow-x:hidden;-webkit-text-size-adjust:100%;}
      *{-webkit-tap-highlight-color:transparent;}
      input,select,textarea{font-size:16px!important;}
    `;
    style.id='hubtrack-global';
    if(!document.getElementById('hubtrack-global')) document.head.appendChild(style);
  },[]);
  const [territories,setTerritories]=useState(INIT_TERRITORIES);
  const [clinics,setClinics]=useState(INIT_CLINICS);
  const [users,setUsers]=useState(INIT_USERS);
  const [pay,setPay]=useState(INIT_PAY);
  const [events,setEvents]=useState(INIT_EVENTS);
  // Admin notices — generated by any role, consumed only by Admin
  const [adminNotices,setAdminNotices]=useState([]);
  const pushNotice=(type,message,tab)=>setAdminNotices(p=>[{id:nid(),type,message,tab,date:fmtNow()},...p].slice(0,30));

  // Wrap setEvents so notices fire regardless of which role adds/edits events
  function setEventsWithNotice(updater){
    setEvents(prev=>{
      const next=typeof updater==="function"?updater(prev):updater;
      if(next.length>prev.length){
        const newest=next[next.length-1];
        pushNotice("event",`New event: "${newest.name}" by ${newest.amb_name}${newest.expense?` · $${newest.expense} expense`:""}`, "events");
      }
      return next;
    });
  }

  // Wrap setClinics so notices fire regardless of which role mutates clinics
  function setClinicsWithNotice(updater){
    setClinics(prev=>{
      const next=typeof updater==="function"?updater(prev):updater;
      // New clinic added
      if(next.length>prev.length){
        const newest=next[next.length-1];
        pushNotice("clinic",`New clinic added: ${newest.name} (${newest.city||"Unknown"})`, "clinics");
      }
      // Any clinic flipped to Live
      next.forEach(n=>{
        const o=prev.find(p=>p.id===n.id);
        if(o&&o.status!=="Live"&&n.status==="Live"){
          pushNotice("live",`${n.name} is now Live!`, "clinics");
        }
      });
      return next;
    });
  }

  if(!user)return <LoginScreen onLogin={setUser}/>;
  return(
    <Shell user={user} setUser={setUser} onLogout={()=>setUser(null)}>
      {user.role==="admin"&&<AdminView territories={territories} setTerritories={setTerritories} clinics={clinics} setClinics={setClinicsWithNotice} users={users} setUsers={setUsers} paySettings={pay} setPaySettings={setPay} events={events} setEvents={setEventsWithNotice} adminNotices={adminNotices} setAdminNotices={setAdminNotices} pushNotice={pushNotice}/>}
      {user.role==="sdr"&&<SDRView clinics={clinics} setClinics={setClinicsWithNotice} territories={territories} users={users} paySettings={pay} events={events}/>}
      {user.role==="ambassador"&&<AmbassadorView clinics={clinics} setClinics={setClinicsWithNotice} territories={territories} users={users} paySettings={pay} events={events} setEvents={setEventsWithNotice}/>}
    </Shell>
  );
}
