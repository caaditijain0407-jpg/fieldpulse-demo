import { useState, useRef, useEffect } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;
const C = {
  bg:"#F8FAFC",white:"#FFFFFF",border:"#E2E8F0",borderLight:"#F1F5F9",
  indigo:"#4F46E5",indigoBg:"#EEF2FF",indigoRing:"#E0E7FF",
  green:"#059669",greenBg:"#ECFDF5",greenRing:"#D1FAE5",
  amber:"#D97706",amberBg:"#FFFBEB",amberRing:"#FEF3C7",
  red:"#DC2626",redBg:"#FEF2F2",redRing:"#FEE2E2",
  purple:"#9333EA",purpleBg:"#FAF5FF",purpleRing:"#F3E8FF",
  text:"#0F172A",sec:"#334155",muted:"#64748B",label:"#94A3B8",
  shadow:"0 1px 3px rgba(0,0,0,0.06)",shadowMd:"0 4px 12px rgba(0,0,0,0.08)",
};

const USERS = [
  {id:"rm",name:"Rahul Sharma",role:"RM",region:"Mumbai",av:"RS",color:C.indigo},
  {id:"zh",name:"Vikram Deshmukh",role:"Zonal Head",region:"Mumbai & Pune",av:"VD",color:"#0284C7"},
  {id:"bh",name:"Sanjay Kapoor",role:"Business Head",region:"All India",av:"SK",color:C.purple},
  {id:"cr",name:"Ravi Iyer",role:"Credit Team",region:"All India",av:"RI",color:C.red},
];
const DEVS = [
  {id:"d1",name:"Lodha Group",region:"Mumbai",tier:"Platinum",exposure:342,health:85,lastContact:3},
  {id:"d2",name:"Panchshil Realty",region:"Pune",tier:"Platinum",exposure:320,health:90,lastContact:2},
];
const STEPS = [
  {id:1,label:"The Team",icon:"\ud83d\udc65",title:"Meet the Lending Team"},
  {id:2,label:"Field Note",icon:"\ud83d\udcac",title:"RM Logs a Field Note"},
  {id:3,label:"AI Parsing",icon:"\ud83e\udd16",title:"AI Extracts Intelligence"},
  {id:4,label:"RM View",icon:"\u26a1",title:"RM\u2019s Dashboard Updates"},
  {id:5,label:"Zonal Head",icon:"\ud83d\udcca",title:"Zonal Head Sees It Instantly"},
  {id:6,label:"Biz Head",icon:"\ud83c\udf10",title:"Business Head \u2014 Pan-India View"},
  {id:7,label:"Credit Risk",icon:"\ud83d\udee1",title:"Credit Team Risk Loop"},
  {id:8,label:"Pre-RERA",icon:"\ud83d\udfe3",title:"The Killer Feature \u2014 Pre-RERA Intel"},
];

function Pill(props) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600,background:props.bg,color:props.c,letterSpacing:0.2,whiteSpace:"nowrap",...(props.sx||{})}}>{props.children}</span>
  );
}

function HBar(props) {
  var v = props.v;
  var w = props.w || 80;
  var col = v >= 75 ? C.green : v >= 50 ? C.amber : C.red;
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <div style={{width:w,height:5,borderRadius:3,background:C.borderLight}}>
        <div style={{width:v+"%",height:5,borderRadius:3,background:col,transition:"width 0.6s"}} />
      </div>
      <span style={{fontSize:11,fontWeight:700,color:col}}>{v}</span>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [anim, setAnim] = useState(false);
  const mainRef = useRef(null);

  useEffect(function() {
    setAnim(false);
    var t = setTimeout(function() { setAnim(true); }, 60);
    if (mainRef.current) mainRef.current.scrollTop = 0;
    return function() { clearTimeout(t); };
  }, [step]);

  function go(s) { if (s >= 1 && s <= 8) setStep(s); }

  function fade(d) {
    return {
      opacity: anim ? 1 : 0,
      transform: anim ? "translateY(0)" : "translateY(10px)",
      transition: "all 0.4s ease " + (d || 0) + "s"
    };
  }

  function ExplainBox(props) {
    var accent = props.accent || C.indigo;
    return (
      <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,padding:"18px 20px",boxShadow:C.shadow,borderLeft:"4px solid "+accent,...fade(0.15)}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{fontSize:17}}>{props.icon}</span>
          <span style={{fontSize:14,fontWeight:700,color:accent}}>{props.title}</span>
        </div>
        <div style={{fontSize:13,color:C.sec,lineHeight:1.75}}>{props.children}</div>
      </div>
    );
  }

  function UserCard(props) {
    var u = props.user;
    var active = props.active;
    return (
      <div style={{background:C.white,border:"1px solid "+(active?u.color+"40":C.border),borderRadius:14,padding:18,boxShadow:active?C.shadowMd:C.shadow,borderLeft:"4px solid "+(active?u.color:"transparent"),position:"relative",overflow:"hidden",...fade(0.05)}}>
        {active && <div style={{position:"absolute",top:0,right:0,background:u.color,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 12px",borderBottomLeftRadius:8}}>ACTIVE</div>}
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:44,height:44,borderRadius:22,background:u.color+"14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:u.color,flexShrink:0}}>{u.av}</div>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:C.text}}>{u.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
              <Pill bg={u.color+"14"} c={u.color}>{u.role}</Pill>
              <span style={{fontSize:11,color:C.muted}}>{u.region}</span>
            </div>
          </div>
        </div>
        {props.desc && <div style={{marginTop:10,fontSize:12,color:C.muted,lineHeight:1.6,paddingLeft:58}}>{props.desc}</div>}
      </div>
    );
  }

  function DevCard(props) {
    var d = props.dev;
    var signals = props.signals || [];
    var regColor = d.region === "Mumbai" ? "#0284C7" : "#7C3AED";
    var contactColor = d.lastContact > 14 ? C.red : d.lastContact === 0 ? C.green : C.label;
    var contactText = d.lastContact === 0 ? "Today" : d.lastContact + "d ago";
    var initials = d.name.split(" ").map(function(w){return w[0];}).join("").substring(0,2);

    return (
      <div style={{background:C.white,border:"1px solid "+(props.flash?C.green+"60":C.border),borderRadius:12,padding:14,boxShadow:C.shadow,transition:"border 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,borderRadius:9,background:C.indigoBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:C.indigo}}>{initials}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{fontSize:14,fontWeight:700,color:C.text}}>{d.name}</span>
              <Pill bg={C.indigo+"14"} c={C.indigo}>{d.tier}</Pill>
              {props.flash && <span style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:7,height:7,borderRadius:4,background:C.green,animation:"pulse 1s infinite"}} /><span style={{fontSize:10,fontWeight:700,color:C.green}}>Updated just now</span></span>}
            </div>
            <div style={{display:"flex",gap:8,marginTop:2,fontSize:11,color:C.muted}}>
              <span style={{fontWeight:600,color:regColor}}>{d.region}</span>
              <span style={{color:contactColor}}>{contactText}</span>
              {props.showRM && <span style={{background:C.borderLight,padding:"1px 7px",borderRadius:4,fontWeight:500}}>RM: Rahul</span>}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:15,fontWeight:800,color:C.text}}>{"\u20b9"}{d.exposure}Cr</div>
            <HBar v={d.health} w={56} />
          </div>
        </div>
        {signals.length > 0 && (
          <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:4}}>
            {signals.map(function(s, i) {
              var sc = s.type === "cross" ? C.green : s.type === "time" ? C.amber : C.red;
              var sbg = s.type === "cross" ? C.greenBg : s.type === "time" ? C.amberBg : C.redBg;
              var si = s.type === "cross" ? "\u2197" : s.type === "time" ? "\u23f0" : "\u26a0";
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 10px",borderRadius:7,background:sbg,borderLeft:"3px solid "+sc}}>
                  <span style={{fontSize:11}}>{si}</span>
                  <span style={{flex:1,fontSize:11,color:C.sec,fontWeight:500}}>{s.text}</span>
                  {s.pre && <Pill bg={C.purpleRing} c={C.purple}>PRE-RERA · {s.pre}</Pill>}
                  <Pill bg={s.pri==="H"?C.redRing:C.amberRing} c={s.pri==="H"?C.red:C.amber}>{s.pri==="H"?"HIGH":"MED"}</Pill>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  function ChatBubble(props) {
    var isUser = props.from === "user";
    return (
      <div style={{alignSelf:isUser?"flex-end":"flex-start",maxWidth:"88%"}}>
        <div style={{padding:"10px 14px",borderRadius:14,background:isUser?(props.color||C.indigo):C.white,color:isUser?"#fff":C.text,fontSize:13,lineHeight:1.65,whiteSpace:"pre-line",border:isUser?"none":"1px solid "+C.border,boxShadow:isUser?"none":C.shadow}}>{props.children}</div>
      </div>
    );
  }

  function renderStep() {
    if (step === 1) {
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <ExplainBox icon="\ud83c\udfe2" title="The Setup" accent={C.indigo}>
            Aditi Demo Bank's Construction Finance team has RMs across Mumbai and Pune. They meet real estate developers daily. Every conversation contains intelligence worth crores. <strong>Today, most of this intelligence gets lost.</strong> It sits in WhatsApp messages and RM heads. FieldPulse changes that.
          </ExplainBox>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <UserCard user={USERS[0]} desc="Meets developers in the field. Captures intelligence via the FieldPulse bot." />
            <UserCard user={USERS[1]} desc="Manages RMs across zones. Needs visibility into field activity and RM performance." />
            <UserCard user={USERS[2]} desc="Pan-India leader. Needs competitive landscape and portfolio-level decisions." />
            <UserCard user={USERS[3]} desc="Monitors risk on active cases. Risk signals must flow back to RM." />
          </div>
          <ExplainBox icon="\ud83c\udfaf" title="What We'll Walk Through" accent={C.green}>
            We'll follow a single field note from <strong>Rahul (RM)</strong> through the entire system and show how each stakeholder sees exactly what they need, automatically. Then we'll show the <strong>credit risk loop</strong> and the <strong>pre-RERA intelligence</strong> capture — the feature that gives Aditi Demo Bank a 3-6 month head start over every competitor.
          </ExplainBox>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <UserCard user={USERS[0]} active desc="Just finished a meeting with Lodha Group's Rajesh Mehta. Opens FieldPulse bot on his phone." />
          <ExplainBox icon="\ud83d\udca1" title="Why a WhatsApp-Style Bot?" accent={C.amber}>
            RMs are in the field with <strong>30 seconds</strong> between meetings. A system that asks 5 follow-up questions will never get used. FieldPulse uses a <strong>one-turn design</strong>: RM sends one raw message → AI parses everything → dashboard synced. Zero friction. In production, this will be actual WhatsApp — including <strong>voice notes in Hindi/Hinglish</strong>.
          </ExplainBox>
          <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,overflow:"hidden",boxShadow:C.shadowMd,maxWidth:520,...fade(0.2)}}>
            <div style={{background:"linear-gradient(135deg,#4F46E5,#6366F1)",padding:"12px 18px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:18}}>{"\u26a1"}</span>
              <div style={{color:"#fff"}}>
                <div style={{fontSize:14,fontWeight:700}}>FieldPulse Bot</div>
                <div style={{fontSize:11,opacity:0.75}}>One message → AI parses → everyone sees it</div>
              </div>
            </div>
            <div style={{padding:16,background:C.bg,display:"flex",flexDirection:"column",gap:10}}>
              <ChatBubble from="user">Met Rajesh from Lodha. Panvel project — 4.5 acres acquired, no lender yet. Abhishek interested in LAP for Worli flat, ₹45-60 Cr. HDFC and Piramal also pitching on Palava.</ChatBubble>
              <div style={{fontSize:10,color:C.label,textAlign:"right",marginTop:-4}}>Rahul · just now</div>
            </div>
          </div>
          <ExplainBox icon="\ud83d\udd11" title="One Message = Complete Intelligence" accent={C.indigo}>
            In that single message, Rahul captured: a <strong>₹45-60 Cr LAP cross-sell</strong>, a <strong>pre-RERA land acquisition</strong>, and <strong>two competitor names</strong>. No forms. No dropdowns. He just talked naturally. The AI handles the rest.
          </ExplainBox>
        </div>
      );
    }

    if (step === 3) {
      var items = [
        {icon:"\ud83c\udfe2",label:"Developer Matched",value:"Lodha Group",sub:"Auto-matched from 'Rajesh from Lodha'",bg:C.indigoBg,cl:C.indigo},
        {icon:"\ud83c\udfd7",label:"Pre-RERA Intel",value:"Panvel — Land Acquired (4.5 acres)",sub:"No lender yet → FIRST MOVER window for Aditi Demo Bank",bg:C.purpleBg,cl:C.purple},
        {icon:"\ud83c\udfe6",label:"Cross-sell: LAP",value:"Worli flat — ₹45-60 Cr",sub:"Promoter family member interested in Loan Against Property",bg:C.greenBg,cl:C.green},
        {icon:"\ud83d\udcb0",label:"Amount Extracted",value:"₹45-60 Crores",sub:"Auto-tagged for pipeline tracking and reporting",bg:C.amberBg,cl:C.amber},
        {icon:"\u2694\ufe0f",label:"Competitors Detected",value:"HDFC, Piramal",sub:"Pitching on Palava — competitive threat flagged for Business Head",bg:C.redBg,cl:C.red},
        {icon:"\ud83d\udcdd",label:"Activity Log Created",value:"Call with Rajesh Mehta — Feb 14",sub:"Developer last contact updated to today. Health score refreshed.",bg:C.borderLight,cl:C.sec},
      ];
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <ExplainBox icon="\ud83e\udd16" title="AI Processing — Under 2 Seconds" accent={C.purple}>
            The AI engine processes Rahul's raw note and extracts <strong>structured intelligence</strong>. No manual data entry. No forms. The RM typed naturally — the system did the structuring.
          </ExplainBox>
          <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,padding:20,boxShadow:C.shadowMd,...fade(0.1)}}>
            <div style={{fontSize:12,fontWeight:700,color:C.label,letterSpacing:0.5,marginBottom:12}}>AI EXTRACTION RESULTS</div>
            <div style={{background:C.bg,borderRadius:10,padding:14,marginBottom:14,border:"1px dashed "+C.border}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Original message:</div>
              <div style={{fontSize:13,color:C.sec,fontStyle:"italic",lineHeight:1.6}}>
                "Met Rajesh from Lodha. Panvel project — 4.5 acres acquired, no lender yet. Abhishek interested in LAP for Worli flat, ₹45-60 Cr. HDFC and Piramal also pitching on Palava."
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {items.map(function(item, i) {
                return (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:10,background:item.bg,opacity:anim?1:0,transform:anim?"translateX(0)":"translateX(20px)",transition:"all 0.4s ease "+(0.15+i*0.07)+"s"}}>
                    <span style={{fontSize:16,flexShrink:0}}>{item.icon}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,fontWeight:700,color:item.cl}}>{item.label}</div>
                      <div style={{fontSize:13,fontWeight:600,color:C.text}}>{item.value}</div>
                      <div style={{fontSize:11,color:C.muted}}>{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ExplainBox icon="\ud83d\udcb0" title="Business Impact" accent={C.green}>
            From one 30-second message: a <strong>₹45-60 Cr LAP cross-sell</strong>, a <strong>pre-RERA opportunity</strong> where no competitor has pitched yet, and <strong>two competitive threats</strong> tracked. Without FieldPulse, this stays in Rahul's head until the next weekly call — if it comes up at all.
          </ExplainBox>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <UserCard user={USERS[0]} active desc="Opens his dashboard. New signals appeared automatically from the note he just logged." />
          <ExplainBox icon="\u26a1" title="What Changed on Rahul's Screen" accent={C.indigo}>
            Rahul sees <strong>only his developers</strong>. Lodha now shows "Today" for last contact (was "3d ago"), a green "Updated" flash, and 2 new signals. He can <strong>mark signals as "Done"</strong> once he's acted — giving leadership real-time visibility into follow-up.
          </ExplainBox>
          <div style={{background:C.bg,borderRadius:14,padding:16,border:"1px solid "+C.border,...fade(0.15)}}>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              {[{l:"My Developers",v:2},{l:"Exposure",v:"₹662Cr"},{l:"Active Signals",v:4,c:C.amber},{l:"Pre-RERA",v:2,c:C.purple}].map(function(k,i){
                return <div key={i} style={{flex:1,background:C.white,border:"1px solid "+C.border,borderRadius:10,padding:"8px 12px",textAlign:"center",boxShadow:C.shadow}}><div style={{fontSize:9,color:C.label,fontWeight:600,letterSpacing:0.5}}>{k.l.toUpperCase()}</div><div style={{fontSize:16,fontWeight:800,color:k.c||C.text}}>{k.v}</div></div>;
              })}
            </div>
            <DevCard dev={{name:DEVS[0].name,region:DEVS[0].region,tier:DEVS[0].tier,exposure:DEVS[0].exposure,health:DEVS[0].health,lastContact:0}} flash signals={[
              {type:"cross",text:"LAP — Worli flat ₹45-60 Cr. Promoter interested.",pri:"H"},
              {type:"time",text:"Panvel land acquired — no lender yet. First mover window.",pri:"H",pre:"Land"},
            ]} />
            <div style={{marginTop:8}}>
              <DevCard dev={DEVS[1]} signals={[
                {type:"time",text:"Undri 1000 units ₹250+ Cr — March deadline for lead lender.",pri:"H",pre:"Pre-Approval"},
              ]} />
            </div>
          </div>
          <ExplainBox icon="\ud83c\udfaf" title="Signal-First Design" accent={C.green}>
            Developers are <strong>sorted by signal count</strong> — most actionable first. Each card has color-coded inline signals: <span style={{color:C.green,fontWeight:700}}>green = cross-sell</span>, <span style={{color:C.amber,fontWeight:700}}>amber = timing</span>, <span style={{color:C.red,fontWeight:700}}>red = risk</span>. The RM always knows what needs attention right now.
          </ExplainBox>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <UserCard user={USERS[1]} active desc="Didn't do anything. The intelligence from Rahul's field note arrived automatically." />
          <ExplainBox icon="\ud83d\udce1" title="Automatic Cross-Role Notification" accent="#0284C7">
            The moment Rahul logged his note, Vikram's dashboard lit up: "2 new signals from field activity." No email chain. No waiting for the weekly call. Vikram sees field intelligence <strong>in real-time</strong> with full RM attribution.
          </ExplainBox>
          <div style={{background:"linear-gradient(135deg,#EEF2FF,#F0FDF4)",border:"1px solid "+C.green+"30",borderRadius:10,padding:"10px 16px",display:"flex",alignItems:"center",gap:8,...fade(0.15)}}>
            <span style={{width:8,height:8,borderRadius:4,background:C.green,animation:"pulse 1.5s infinite"}} />
            <span style={{fontSize:13,fontWeight:600,color:C.indigo}}>2 new signals from field activity</span>
            <span style={{marginLeft:"auto",fontSize:12,color:C.green,fontWeight:600}}>View Intel →</span>
          </div>
          <div style={{background:C.bg,borderRadius:14,padding:16,border:"1px solid "+C.border,...fade(0.2)}}>
            <div style={{fontSize:11,fontWeight:700,color:C.label,letterSpacing:0.5,marginBottom:8}}>ALL DEVELOPERS — ZONE VIEW</div>
            <DevCard dev={{name:DEVS[0].name,region:DEVS[0].region,tier:DEVS[0].tier,exposure:DEVS[0].exposure,health:DEVS[0].health,lastContact:0}} flash showRM signals={[
              {type:"cross",text:"LAP — Worli flat ₹45-60 Cr. Promoter interested.",pri:"H"},
              {type:"time",text:"Panvel land acquired — no lender yet. First mover window.",pri:"H",pre:"Land"},
            ]} />
            <div style={{marginTop:8}}>
              <DevCard dev={DEVS[1]} showRM signals={[
                {type:"time",text:"Undri 1000 units ₹250+ Cr — March deadline for lead lender.",pri:"H",pre:"Pre-Approval"},
              ]} />
            </div>
          </div>
          <ExplainBox icon="\ud83d\udc65" title="RM Attribution + Team Management" accent={C.amber}>
            Every card shows <strong>"RM: Rahul"</strong>. Vikram also has a <strong>"My Team" tab</strong> showing each RM's log count, pending signals, and developer health. If an RM hasn't logged in days, the Zonal Head sees it immediately — <strong>before relationships go cold</strong>.
          </ExplainBox>
        </div>
      );
    }

    if (step === 6) {
      var comps = [
        {name:"Piramal",mentions:3,threat:"High",ctx:"Faster TAT 7 days vs our 10-12. Active in both Mumbai and Pune.",devs:["Lodha","Panchshil"]},
        {name:"HDFC",mentions:2,threat:"High",ctx:"Aggressive CF rates targeting Mumbai premium developers.",devs:["Lodha"]},
      ];
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <UserCard user={USERS[2]} active desc="Sees ALL developers across Mumbai and Pune. Strategic, pan-India view." />
          <ExplainBox icon="\ud83c\udf10" title="Pan-India Executive View" accent={C.purple}>
            Sanjay sees <strong>every developer, every signal, every RM</strong>. But his unique power is the <strong>Competitive Intelligence</strong> view — automatically aggregated from RM field notes.
          </ExplainBox>
          <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,padding:16,boxShadow:C.shadowMd,...fade(0.15)}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <span style={{fontSize:16}}>{"\u2694\ufe0f"}</span>
              <span style={{fontSize:14,fontWeight:700,color:C.text}}>Competitive Landscape</span>
              <Pill bg={C.redBg} c={C.red}>Live from field intel</Pill>
            </div>
            {comps.map(function(cc, i) {
              return (
                <div key={i} style={{padding:"10px 14px",borderRadius:10,border:"1px solid "+C.border,marginBottom:6,display:"flex",alignItems:"center",gap:12,opacity:anim?1:0,transform:anim?"translateX(0)":"translateX(16px)",transition:"all 0.3s ease "+(0.2+i*0.1)+"s"}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <span style={{fontSize:13,fontWeight:700,color:C.text}}>{cc.name}</span>
                      <Pill bg={C.indigoBg} c={C.indigo}>{cc.mentions} mentions</Pill>
                      <Pill bg={C.redRing} c={C.red}>{cc.threat}</Pill>
                    </div>
                    <div style={{fontSize:11,color:C.muted,marginTop:2}}>{cc.ctx}</div>
                  </div>
                  <div style={{display:"flex",gap:3}}>{cc.devs.map(function(dd){return <Pill key={dd} bg={C.bg} c={C.sec}>{dd}</Pill>;})}</div>
                </div>
              );
            })}
          </div>
          <ExplainBox icon="\ud83d\udca1" title="Intelligence Nobody Asked For — But Everyone Needs" accent={C.green}>
            No one told RMs to track competitors. They mentioned them naturally. The AI <strong>automatically aggregates</strong> these into a competitive picture. Sanjay can now ask: <strong>Should we match Piramal's TAT? Are we losing premium developers to HDFC's rates?</strong>
          </ExplainBox>
        </div>
      );
    }

    if (step === 7) {
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <UserCard user={USERS[3]} active desc="Reviews Panchshil's Towers project. Notices cost overruns. Logs a risk assessment." />
          <ExplainBox icon="\ud83d\udee1" title="The Credit → RM Loop That Didn't Exist" accent={C.red}>
            Today: Credit spots a risk → writes a review document → committee meeting → maybe someone tells the RM → <strong>2-3 weeks pass</strong>. With FieldPulse, Ravi logs it and <strong>Rahul + Vikram are alerted the same day</strong>.
          </ExplainBox>
          <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,overflow:"hidden",boxShadow:C.shadowMd,maxWidth:520,...fade(0.15)}}>
            <div style={{background:"linear-gradient(135deg,#DC2626,#B91C1C)",padding:"12px 18px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:18}}>{"\ud83d\udee1"}</span>
              <div style={{color:"#fff"}}>
                <div style={{fontSize:14,fontWeight:700}}>FieldPulse · Credit Bot</div>
                <div style={{fontSize:11,opacity:0.75}}>Risk assessment → RM + Zonal Head alerted</div>
              </div>
            </div>
            <div style={{padding:16,background:C.bg,display:"flex",flexDirection:"column",gap:10}}>
              <ChatBubble from="user" color={C.red}>Panchshil Towers Kharadi — construction cost overrun ~12%. Cement and steel prices impacting margins. 76% sold but remaining inventory moving slow last 2 months. Monitor closely.</ChatBubble>
              <ChatBubble from="bot">{"✅ Panchshil Realty — Credit Assessment\n\n⚠️ Risk flag: Cost overrun ~12%\n📈 Sales velocity concern noted\n💰 Margin impact flagged\n\nSynced · RM + Zonal Head alerted"}</ChatBubble>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",background:C.redBg,borderRadius:10,border:"1px solid "+C.redRing,...fade(0.3)}}>
            <span style={{width:8,height:8,borderRadius:4,background:C.red,animation:"pulse 1.5s infinite"}} />
            <div>
              <div style={{fontSize:12,fontWeight:600,color:C.red}}>Rahul (RM) + Vikram (ZH) now see this alert:</div>
              <div style={{fontSize:11,color:C.sec}}>"Credit flag: Panchshil Towers — cost overrun, sales velocity concern"</div>
            </div>
          </div>
          <ExplainBox icon="\ud83d\udd04" title="Why This Changes Everything" accent={C.amber}>
            Rahul can now <strong>call Sagar at Panchshil the same day</strong> — "We noticed some cost pressure on Towers. How can we help structure this better?" Instead of the developer hearing silence for 3 weeks. <strong>The relationship stays strong. The risk gets managed early.</strong>
          </ExplainBox>
          <ExplainBox icon="\ud83d\udd12" title="What Credit Does NOT See" accent={C.purple}>
            Credit team sees <strong>only risk signals</strong>. No cross-sell opportunities, no timing windows, no pre-RERA intelligence. Commercially sensitive ground-level intel stays protected while the risk loop still closes.
          </ExplainBox>
        </div>
      );
    }

    if (step === 8) {
      var tl = [
        {l:"Land\nAcquired",t:"-6 mo",c:C.purple},
        {l:"Planning\n& Design",t:"-4 mo",c:C.purple},
        {l:"NA\nConversion",t:"-2 mo",c:C.purple},
        {l:"RERA\nFiled",t:"0",c:C.amber},
        {l:"All lenders\nknow",t:"+1 mo",c:C.label},
      ];
      var examples = [
        {dev:"Lodha Group",text:"Panvel — 4.5 acres acquired. No lender has pitched yet.",stage:"Land",months:"~6 months before RERA"},
        {dev:"Panchshil Realty",text:"Undri 1000 units township. Wants lead lender by March.",stage:"Pre-Approval",months:"~3 months before RERA"},
      ];
      return (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <ExplainBox icon="\ud83d\udfe3" title="Pre-RERA Intelligence — The Competitive Moat" accent={C.purple}>
            This is <strong>the feature no competitor has</strong>. Every other system captures data after RERA registration — by then, every lender knows. FieldPulse captures intelligence <strong>3-6 months earlier</strong>, when it only exists in RM conversations.
          </ExplainBox>
          <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:14,padding:20,boxShadow:C.shadowMd,...fade(0.1)}}>
            <div style={{fontSize:12,fontWeight:700,color:C.label,letterSpacing:0.5,marginBottom:16}}>PROJECT INTELLIGENCE TIMELINE</div>
            <div style={{position:"relative",padding:"0 10px"}}>
              <div style={{position:"absolute",top:28,left:10,right:10,height:3,background:C.borderLight,borderRadius:2}} />
              <div style={{display:"flex",justifyContent:"space-between",position:"relative"}}>
                {tl.map(function(p, i) {
                  return (
                    <div key={i} style={{textAlign:"center",position:"relative",zIndex:1,flex:1,opacity:anim?1:0,transform:anim?"translateY(0)":"translateY(10px)",transition:"all 0.4s ease "+(0.12+i*0.08)+"s"}}>
                      <div style={{fontSize:10,fontWeight:700,color:p.c,whiteSpace:"pre-line",lineHeight:1.3,minHeight:28}}>{p.l}</div>
                      <div style={{width:16,height:16,borderRadius:8,background:p.c,margin:"6px auto",border:"3px solid "+C.white,boxShadow:"0 0 0 2px "+p.c+"40"}} />
                      <div style={{fontSize:10,color:C.label,marginTop:4}}>{p.t}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{position:"absolute",top:-6,left:0,width:"58%",height:66,background:C.purple+"08",border:"1px dashed "+C.purple+"40",borderRadius:8}} />
              <div style={{marginTop:14,display:"flex",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:10,height:10,borderRadius:5,background:C.purple}} />
                  <span style={{fontSize:11,fontWeight:700,color:C.purple}}>FieldPulse captures here</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:10,height:10,borderRadius:5,background:C.label}} />
                  <span style={{fontSize:11,color:C.label}}>Everyone else knows here</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{background:C.purpleBg,border:"1px solid "+C.purpleRing,borderRadius:14,padding:16,...fade(0.25)}}>
            <div style={{fontSize:12,fontWeight:700,color:C.purple,marginBottom:8}}>LIVE EXAMPLES FROM OUR DATA</div>
            {examples.map(function(p, i) {
              return (
                <div key={i} style={{background:C.white,borderRadius:10,padding:12,marginBottom:6,display:"flex",alignItems:"center",gap:10}}>
                  <Pill bg={C.purpleRing} c={C.purple}>PRE-RERA · {p.stage}</Pill>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.text}}>{p.dev}</div>
                    <div style={{fontSize:11,color:C.muted}}>{p.text}</div>
                  </div>
                  <div style={{fontSize:11,fontWeight:600,color:C.purple,flexShrink:0}}>{p.months}</div>
                </div>
              );
            })}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,...fade(0.3)}}>
            <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:12,padding:16,textAlign:"center",boxShadow:C.shadow}}>
              <div style={{fontSize:28,fontWeight:800,color:C.purple}}>3-6 months</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>head start before competitors know a project exists</div>
            </div>
            <div style={{background:C.white,border:"1px solid "+C.border,borderRadius:12,padding:16,textAlign:"center",boxShadow:C.shadow}}>
              <div style={{fontSize:28,fontWeight:800,color:C.green}}>₹500+ Cr</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>potential CF pipeline from pre-RERA intel in this demo alone</div>
            </div>
          </div>
          <ExplainBox icon="\ud83d\udd12" title="Access Control" accent={C.amber}>
            Pre-RERA intelligence is visible to <strong>RM, Zonal Head, and Business Head</strong> only. Credit team does not see these signals — protecting commercially sensitive ground-level intelligence.
          </ExplainBox>
          <ExplainBox icon="\ud83d\ude80" title="What's Next" accent={C.indigo}>
            <strong>Phase 1 (12 weeks, ₹18-22 Lakhs):</strong> Web bot + dashboard for 4 RMs across Mumbai and Pune.<br />
            <strong>Phase 2:</strong> WhatsApp Business API with voice notes, evening nudge system.<br />
            <strong>Phase 3:</strong> MahaRERA auto-validation, broker network, predictive deal scoring.<br /><br />
            The intelligence layer is not limited to Construction Finance — <strong>every product vertical at Aditi Demo Bank has RMs with field conversations</strong>. The pattern scales.
          </ExplainBox>
        </div>
      );
    }

    return null;
  }

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.text}}>
      <style>{FONT}{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}
        button{transition:all 0.15s}button:hover{filter:brightness(0.95)}
      `}</style>

      <div style={{position:"sticky",top:0,zIndex:100,background:C.white,borderBottom:"1px solid "+C.border,padding:"0 24px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,#4F46E5,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:800}}>{"\u26a1"}</div>
          <span style={{fontSize:16,fontWeight:800}}>FieldPulse</span>
          <span style={{fontSize:9,fontWeight:700,color:C.indigo,background:C.indigoBg,padding:"2px 7px",borderRadius:8}}>GUIDED DEMO</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:C.muted,fontWeight:500}}>Step {step}/8</span>
          <div style={{width:80,height:4,borderRadius:2,background:C.borderLight}}>
            <div style={{width:(step/8*100)+"%",height:4,borderRadius:2,background:C.indigo,transition:"width 0.3s"}} />
          </div>
        </div>
      </div>

      <div style={{display:"flex",maxWidth:1100,margin:"0 auto",minHeight:"calc(100vh - 54px)"}}>
        <div style={{width:210,flexShrink:0,borderRight:"1px solid "+C.border,background:C.white,padding:"16px 0",position:"sticky",top:54,height:"calc(100vh - 54px)",overflowY:"auto"}}>
          {STEPS.map(function(s) {
            var a = step === s.id;
            var d = step > s.id;
            return (
              <button key={s.id} onClick={function(){go(s.id);}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 16px",border:"none",background:a?C.indigoBg:"transparent",cursor:"pointer",textAlign:"left",borderRight:a?"3px solid "+C.indigo:"3px solid transparent"}}>
                <span style={{width:28,height:28,borderRadius:14,background:a?C.indigo:d?C.green+"18":C.bg,color:a?"#fff":d?C.green:C.label,display:"flex",alignItems:"center",justifyContent:"center",fontSize:d?11:12,fontWeight:700,flexShrink:0,border:"1px solid "+(a?C.indigo:d?C.greenRing:C.border)}}>
                  {d ? "\u2713" : s.icon}
                </span>
                <span style={{fontSize:12,fontWeight:a?700:500,color:a?C.indigo:d?C.text:C.muted}}>{s.label}</span>
              </button>
            );
          })}
          <div style={{padding:"14px 16px",marginTop:8,borderTop:"1px solid "+C.border}}>
            <div style={{fontSize:10,color:C.label,fontWeight:700,letterSpacing:0.5,marginBottom:5}}>DEMO STORY</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.55}}>Follow one RM field note through the entire system. See the value at each step.</div>
          </div>
        </div>

        <div ref={mainRef} style={{flex:1,padding:"24px 32px",maxWidth:720,overflowY:"auto",height:"calc(100vh - 54px)"}}>
          <div style={{marginBottom:20,...fade(0)}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:26}}>{STEPS[step-1].icon}</span>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:C.label,letterSpacing:0.5}}>STEP {step} OF 8</div>
                <h1 style={{fontSize:22,fontWeight:800,color:C.text,margin:0}}>{STEPS[step-1].title}</h1>
              </div>
            </div>
          </div>

          {renderStep()}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:28,paddingTop:20,paddingBottom:24,borderTop:"1px solid "+C.border}}>
            <button onClick={function(){go(step-1);}} disabled={step===1} style={{padding:"10px 20px",borderRadius:10,background:step===1?C.borderLight:C.white,color:step===1?C.label:C.sec,border:"1px solid "+(step===1?C.borderLight:C.border),fontSize:13,fontWeight:600,cursor:step===1?"default":"pointer"}}>
              ← Previous
            </button>
            <div style={{display:"flex",gap:4}}>
              {STEPS.map(function(s) {
                return <div key={s.id} onClick={function(){go(s.id);}} style={{width:8,height:8,borderRadius:4,background:s.id===step?C.indigo:s.id<step?C.green:C.borderLight,cursor:"pointer",transition:"background 0.2s"}} />;
              })}
            </div>
            <button onClick={function(){go(step+1);}} disabled={step===8} style={{padding:"10px 20px",borderRadius:10,background:step===8?C.borderLight:C.indigo,color:step===8?C.label:"#fff",border:"none",fontSize:13,fontWeight:600,cursor:step===8?"default":"pointer"}}>
              {step === 8 ? "End of Demo" : "Next Step →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
