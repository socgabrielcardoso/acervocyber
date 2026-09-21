"use strict";

const catalog = [
  {
    id:"ssh-bruteforce", number:1, icon:"🔎", title:"Detecção de Brute Force em SSH",
    category:"Identidade", accent:"#35d9ff",
    description:"Analisa eventos de autenticação SSH, agrupa falhas por origem e destaca abuso de credenciais por limiar.",
    tech:["Kali Linux","Metasploit","Nmap","Splunk","auth.log"],
    inputLabel:"auth.log ou eventos SSH",
    hint:"Formato livre. O analisador reconhece linhas comuns de sshd com Failed password e Accepted password.",
    sample:[
      "Sep 21 00:10:01 srv sshd[2011]: Failed password for invalid user admin from 185.44.72.10 port 53301 ssh2",
      "Sep 21 00:10:08 srv sshd[2012]: Failed password for root from 185.44.72.10 port 53306 ssh2",
      "Sep 21 00:10:14 srv sshd[2013]: Failed password for root from 185.44.72.10 port 53308 ssh2",
      "Sep 21 00:10:20 srv sshd[2014]: Failed password for root from 185.44.72.10 port 53311 ssh2",
      "Sep 21 00:10:29 srv sshd[2015]: Failed password for deploy from 185.44.72.10 port 53320 ssh2",
      "Sep 21 00:11:05 srv sshd[2016]: Accepted publickey for ops from 10.20.1.15 port 49811 ssh2",
      "Sep 21 00:13:02 srv sshd[2020]: Failed password for analyst from 172.16.5.33 port 51112 ssh2"
    ].join("\n")
  },
  {
    id:"port-scan", number:2, icon:"🌐", title:"Detecção de Port Scan",
    category:"Rede", accent:"#50e39a",
    description:"Agrupa conexões por origem e identifica reconhecimento por quantidade de portas únicas e taxa de tentativas.",
    tech:["Kali Linux","Nmap","Splunk","ELK"],
    inputLabel:"Fluxos de rede em CSV",
    hint:"timestamp,src,dst,port,status",
    sample:[
      "2026-09-21T00:20:01,10.10.4.55,10.10.9.10,22,SYN",
      "2026-09-21T00:20:02,10.10.4.55,10.10.9.10,23,SYN",
      "2026-09-21T00:20:03,10.10.4.55,10.10.9.10,25,SYN",
      "2026-09-21T00:20:04,10.10.4.55,10.10.9.10,53,SYN",
      "2026-09-21T00:20:05,10.10.4.55,10.10.9.10,80,SYN",
      "2026-09-21T00:20:06,10.10.4.55,10.10.9.10,110,SYN",
      "2026-09-21T00:20:07,10.10.4.55,10.10.9.10,135,SYN",
      "2026-09-21T00:20:08,10.10.4.55,10.10.9.10,139,SYN",
      "2026-09-21T00:20:09,10.10.4.55,10.10.9.10,443,SYN",
      "2026-09-21T00:20:10,10.10.4.55,10.10.9.10,445,SYN",
      "2026-09-21T00:21:10,10.10.4.21,10.10.9.10,443,ESTABLISHED"
    ].join("\n")
  },
  {
    id:"reverse-shell", number:3, icon:"📡", title:"Análise de Shell Reverso",
    category:"Rede", accent:"#9b8cff",
    description:"Inspeciona conexões e contexto de processo para sinalizar saídas incomuns associadas a shells e interpretadores.",
    tech:["Kali Linux","Netcat","Metasploit","Wireshark"],
    inputLabel:"Telemetria de conexão em CSV",
    hint:"timestamp,host,process,parent,dst,port",
    sample:[
      "2026-09-21T00:31:10,ws-01,chrome.exe,explorer.exe,142.250.79.78,443",
      "2026-09-21T00:31:40,ws-01,powershell.exe,winword.exe,198.51.100.24,4444",
      "2026-09-21T00:32:02,lnx-web,bash,apache2,203.0.113.50,9001",
      "2026-09-21T00:33:20,ws-02,teams.exe,explorer.exe,52.112.10.5,443"
    ].join("\n")
  },
  {
    id:"soc-end-to-end", number:4, icon:"🧠", title:"Investigação SOC End-to-End",
    category:"SOC", accent:"#f8c95c",
    description:"Transforma eventos independentes em uma linha do tempo de investigação com severidade, evidências e observações do analista.",
    tech:["Kali","Nmap","Metasploit","Wireshark","Splunk","ELK"],
    inputLabel:"Eventos de investigação",
    hint:"timestamp|origem|evento|detalhe",
    sample:[
      "2026-09-21T00:40:01|EDR|Execução suspeita|powershell.exe iniciado por winword.exe",
      "2026-09-21T00:40:14|DNS|Consulta externa|host consultou update-check.example",
      "2026-09-21T00:40:22|Firewall|Conexão bloqueada|saída para 198.51.100.24:4444",
      "2026-09-21T00:41:03|Identity|Falha de login|5 falhas consecutivas para svc-backup",
      "2026-09-21T00:42:18|EDR|Arquivo isolado|payload.tmp movido para quarentena"
    ].join("\n")
  },
  {
    id:"log-script", number:5, icon:"⚙️", title:"Script de Detecção via Logs",
    category:"Logs", accent:"#35d9ff",
    description:"Aplica uma regra local configurável em logs, conta correspondências e gera um esqueleto de lógica defensiva reutilizável.",
    tech:["Python","Bash","Kali","Splunk","ELK"],
    inputLabel:"Logs para varredura",
    hint:"Cole eventos e ajuste os indicadores no campo lateral.",
    sample:[
      "2026-09-21 00:50:01 INFO service started",
      "2026-09-21 00:50:11 WARN authentication failed user=admin src=10.1.8.55",
      "2026-09-21 00:50:12 WARN authentication failed user=admin src=10.1.8.55",
      "2026-09-21 00:50:14 ALERT blocked suspicious process powershell encodedcommand",
      "2026-09-21 00:50:28 INFO healthcheck ok"
    ].join("\n")
  },
  {
    id:"beaconing-c2", number:6, icon:"📊", title:"Detecção de Beaconing (C2)",
    category:"Rede", accent:"#50e39a",
    description:"Calcula periodicidade de comunicações por par origem e destino e destaca intervalos repetitivos com baixa variação.",
    tech:["Kali","Netcat","Wireshark","Splunk","ELK"],
    inputLabel:"Comunicações em CSV",
    hint:"timestamp,src,dst,bytes",
    sample:[
      "2026-09-21T01:00:00,10.2.5.11,198.51.100.80,284",
      "2026-09-21T01:01:00,10.2.5.11,198.51.100.80,291",
      "2026-09-21T01:02:01,10.2.5.11,198.51.100.80,279",
      "2026-09-21T01:03:00,10.2.5.11,198.51.100.80,287",
      "2026-09-21T01:04:01,10.2.5.11,198.51.100.80,282",
      "2026-09-21T01:00:13,10.2.5.22,8.8.8.8,78",
      "2026-09-21T01:03:47,10.2.5.22,8.8.8.8,82"
    ].join("\n")
  },
  {
    id:"exploit-analysis", number:7, icon:"🕵️", title:"Análise de Exploração",
    category:"Investigação", accent:"#9b8cff",
    description:"Procura rastros comuns de exploração em registros web e de sistema para apoiar triagem e reconstrução de evidências.",
    tech:["Kali","Wireshark","Metasploit"],
    inputLabel:"Logs de aplicação ou servidor",
    hint:"O módulo sinaliza indicadores textuais sem executar payloads.",
    sample:[
      "00:10:01 GET /index.php?id=10 200 src=10.3.1.4",
      "00:10:18 GET /download?file=../../../../etc/passwd 403 src=203.0.113.77",
      "00:10:28 POST /api/search q=normal 200 src=10.3.1.8",
      "00:10:41 GET /?q=%3Cscript%3Ealert(1)%3C/script%3E 400 src=203.0.113.77",
      "00:10:55 APP exception RuntimeError route=/admin"
    ].join("\n")
  },
  {
    id:"web-attacks", number:8, icon:"🌍", title:"Detecção de Ataques Web",
    category:"Aplicação", accent:"#ff667d",
    description:"Classifica requisições suspeitas por assinatura defensiva: SQLi, XSS, path traversal e tentativa de execução remota.",
    tech:["Kali","Metasploit","Splunk","ELK"],
    inputLabel:"Access log ou requisições HTTP",
    hint:"Uma requisição por linha. O parser trabalha com texto bruto.",
    sample:[
      "GET /products?id=14 HTTP/1.1 200 src=10.0.0.8",
      "GET /products?id=14%20UNION%20SELECT%20user,password%20FROM%20users HTTP/1.1 403 src=198.51.100.41",
      "GET /search?q=%3Cscript%3Ealert(1)%3C/script%3E HTTP/1.1 400 src=198.51.100.41",
      "GET /download?file=../../../../windows/win.ini HTTP/1.1 403 src=203.0.113.18",
      "POST /login HTTP/1.1 401 src=10.0.0.15"
    ].join("\n")
  },
  {
    id:"network-baseline", number:9, icon:"📈", title:"Baseline de Rede vs Desvios",
    category:"Rede", accent:"#f8c95c",
    description:"Compara métricas atuais com a linha de base e calcula desvio percentual para destacar mudanças operacionais relevantes.",
    tech:["Kali","Wireshark","Nmap","Splunk","ELK"],
    inputLabel:"Métricas em CSV",
    hint:"metrica,baseline,atual",
    sample:[
      "Conexões por minuto,120,128",
      "DNS por minuto,80,176",
      "Tráfego de saída MB,42,97",
      "Portas únicas destino,18,62",
      "Falhas TCP por minuto,6,7",
      "Latência média ms,22,24"
    ].join("\n")
  },
  {
    id:"siem-tuning", number:10, icon:"🛡️", title:"Tuning de Regras de Segurança",
    category:"SIEM", accent:"#50e39a",
    description:"Calcula precisão de regras a partir de verdadeiros e falsos positivos e sugere prioridade de tuning com base no ruído.",
    tech:["Kali","Nmap","Metasploit","Splunk","ELK"],
    inputLabel:"Desempenho de regras em CSV",
    hint:"regra,true_positive,false_positive",
    sample:[
      "SSH Brute Force,18,4",
      "Port Scan Internal,7,21",
      "PowerShell Encoded,12,2",
      "Impossible Travel,5,14",
      "Web Exploit Signature,22,6",
      "C2 Beaconing,9,1"
    ].join("\n")
  }
];

const state = {};
catalog.forEach(function(p){ state[p.id] = {input:p.sample, last:null}; });

const projectNav = document.getElementById("projectNav");
const projectGrid = document.getElementById("projectGrid");
const homeView = document.getElementById("homeView");
const workspaceView = document.getElementById("workspaceView");
const workspaceMount = document.getElementById("workspaceMount");
const workspaceTitle = document.getElementById("workspaceTitle");
const globalSearch = document.getElementById("globalSearch");
const categoryFilters = document.getElementById("categoryFilters");
const sidebar = document.getElementById("sidebar");
let activeCategory = "Todos";
let activeProject = null;

function escapeHtml(value){
  return String(value == null ? "" : value)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

function toast(message){
  const host = document.getElementById("toastRegion");
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  host.appendChild(node);
  setTimeout(function(){ node.remove(); }, 2800);
}

function renderNav(){
  let html = '<button class="nav-item '+(activeProject===null?'active':'')+'" data-home="1"><span class="nav-icon">⌂</span><span class="nav-copy"><strong>Visão geral</strong><span>Catálogo completo</span></span></button>';
  catalog.forEach(function(p){
    html += '<button class="nav-item '+(activeProject===p.id?'active':'')+'" data-project="'+p.id+'"><span class="nav-icon">'+p.icon+'</span><span class="nav-copy"><strong>'+escapeHtml(p.title)+'</strong><span>'+escapeHtml(p.category)+'</span></span></button>';
  });
  projectNav.innerHTML = html;
}

function renderFilters(){
  const cats = ["Todos"].concat(Array.from(new Set(catalog.map(function(p){return p.category;}))));
  categoryFilters.innerHTML = cats.map(function(c){
    return '<button class="filter-chip '+(activeCategory===c?'active':'')+'" data-category="'+escapeHtml(c)+'">'+escapeHtml(c)+'</button>';
  }).join("");
}

function matchesSearch(p,q){
  if(!q) return true;
  const bag = [p.title,p.category,p.description].concat(p.tech).join(" ").toLowerCase();
  return bag.indexOf(q.toLowerCase()) !== -1;
}

function renderGrid(){
  const q = globalSearch.value.trim();
  const items = catalog.filter(function(p){
    return (activeCategory==="Todos" || p.category===activeCategory) && matchesSearch(p,q);
  });
  projectGrid.innerHTML = items.map(function(p){
    return '<article class="project-card" style="--accent:'+p.accent+'">'+
      '<div class="card-top"><span class="big-icon">'+p.icon+'</span><span class="index">SISTEMA '+String(p.number).padStart(2,"0")+'</span></div>'+
      '<h4>'+escapeHtml(p.title)+'</h4>'+
      '<p>'+escapeHtml(p.description)+'</p>'+
      '<div class="tag-row">'+p.tech.map(function(t){return '<span class="tag">'+escapeHtml(t)+'</span>';}).join("")+'</div>'+
      '<div class="card-footer"><span>'+escapeHtml(p.category)+'</span><button class="card-open" data-project="'+p.id+'">ABRIR →</button></div>'+
    '</article>';
  }).join("");
  if(!items.length){
    projectGrid.innerHTML = '<div class="empty-state">Nenhum sistema corresponde ao filtro atual.</div>';
  }
}

function openHome(){
  activeProject = null;
  workspaceTitle.textContent = "Acervo Cyber";
  homeView.classList.add("active");
  workspaceView.classList.remove("active");
  renderNav();
  sidebar.classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}

function getProject(id){
  return catalog.find(function(p){return p.id===id;});
}

function projectControls(p){
  if(p.id==="ssh-bruteforce") return '<div class="field"><label>Limiar de falhas por IP</label><input class="input" id="threshold" type="number" min="2" value="4"></div>';
  if(p.id==="port-scan") return '<div class="field"><label>Portas únicas para alerta</label><input class="input" id="threshold" type="number" min="2" value="8"></div>';
  if(p.id==="reverse-shell") return '<div class="field"><label>Portas monitoradas</label><input class="input" id="keywords" value="4444,9001,1337,5555"></div>';
  if(p.id==="soc-end-to-end") return '<div class="field"><label>Analista</label><input class="input" id="analyst" value="SOC Analyst"></div><div class="field"><label>Severidade do caso</label><select id="severity"><option>Média</option><option>Alta</option><option>Crítica</option><option>Baixa</option></select></div>';
  if(p.id==="log-script") return '<div class="field"><label>Indicadores separados por vírgula</label><input class="input" id="keywords" value="failed,suspicious,encodedcommand,blocked"></div>';
  if(p.id==="beaconing-c2") return '<div class="field"><label>Jitter máximo para alerta (%)</label><input class="input" id="threshold" type="number" min="1" max="100" value="8"></div>';
  if(p.id==="exploit-analysis") return '<div class="field"><label>Perfil</label><select id="profile"><option>Web + sistema</option><option>Somente web</option></select></div>';
  if(p.id==="web-attacks") return '<div class="field"><label>Sensibilidade</label><select id="sensitivity"><option value="normal">Normal</option><option value="high">Alta</option></select></div>';
  if(p.id==="network-baseline") return '<div class="field"><label>Desvio para alerta (%)</label><input class="input" id="threshold" type="number" min="1" value="40"></div>';
  if(p.id==="siem-tuning") return '<div class="field"><label>Precisão mínima desejada (%)</label><input class="input" id="threshold" type="number" min="1" max="100" value="70"></div>';
  return "";
}

function openProject(id){
  const p = getProject(id);
  if(!p) return;
  activeProject = id;
  homeView.classList.remove("active");
  workspaceView.classList.add("active");
  workspaceTitle.textContent = p.title;
  renderNav();
  sidebar.classList.remove("open");

  workspaceMount.innerHTML =
    '<div class="workspace-wrap">'+
      '<div class="workspace-header">'+
        '<div class="workspace-title-line"><div class="workspace-icon">'+p.icon+'</div><div><span class="eyebrow">SISTEMA '+String(p.number).padStart(2,"0")+' • '+escapeHtml(p.category).toUpperCase()+'</span><h2>'+escapeHtml(p.title)+'</h2><p>'+escapeHtml(p.description)+'</p></div></div>'+
        '<div class="workspace-actions"><button class="secondary-button" id="backHome">Catálogo</button><button class="secondary-button" id="sampleButton">Amostra</button><button class="danger-button" id="resetButton">Limpar</button></div>'+
      '</div>'+
      '<div class="workspace-layout">'+
        '<div>'+
          '<div class="workspace-card"><h3>Entrada de dados <span>'+escapeHtml(p.inputLabel)+'</span></h3><textarea id="dataInput" spellcheck="false">'+escapeHtml(state[p.id].input)+'</textarea><div class="inline-note">'+escapeHtml(p.hint)+'</div><div class="action-row"><button class="primary-button" id="analyzeButton">Executar análise</button><button class="action-button" id="copyButton">Copiar dados</button></div></div>'+
          '<div class="workspace-card" style="margin-top:16px"><h3>Resultados <span id="resultStamp">aguardando análise</span></h3><div id="resultMount"><div class="empty-state">Execute a análise para gerar métricas, achados e evidências.</div></div></div>'+
        '</div>'+
        '<div>'+
          '<div class="workspace-card"><h3>Parâmetros <span>isolados por módulo</span></h3>'+projectControls(p)+'</div>'+
          '<div class="workspace-card" style="margin-top:16px"><h3>Tecnologias <span>referência do projeto</span></h3><div class="tag-row">'+p.tech.map(function(t){return '<span class="tag">'+escapeHtml(t)+'</span>';}).join("")+'</div></div>'+
          '<div class="workspace-card" style="margin-top:16px"><h3>Princípio do módulo <span>Blue Team</span></h3><div class="inline-note">Este sistema analisa dados fornecidos ou amostras locais. Ele não executa exploração, força bruta, varredura ou conexão ofensiva contra alvos reais.</div></div>'+
        '</div>'+
      '</div>'+
    '</div>';

  document.getElementById("backHome").onclick = openHome;
  document.getElementById("sampleButton").onclick = function(){
    document.getElementById("dataInput").value = p.sample;
    state[p.id].input = p.sample;
    toast("Amostra local carregada");
  };
  document.getElementById("resetButton").onclick = function(){
    document.getElementById("dataInput").value = "";
    state[p.id].input = "";
    document.getElementById("resultMount").innerHTML = '<div class="empty-state">Módulo limpo.</div>';
    toast("Dados removidos do módulo");
  };
  document.getElementById("copyButton").onclick = function(){
    navigator.clipboard.writeText(document.getElementById("dataInput").value).then(function(){toast("Dados copiados");}).catch(function(){toast("Não foi possível copiar");});
  };
  document.getElementById("dataInput").addEventListener("input",function(e){ state[p.id].input = e.target.value; });
  document.getElementById("analyzeButton").onclick = function(){ runAnalysis(p); };
  if(state[p.id].last) renderResult(p,state[p.id].last);
  window.scrollTo({top:0,behavior:"smooth"});
}

function lines(){
  return document.getElementById("dataInput").value.split(/\r?\n/).map(function(x){return x.trim();}).filter(Boolean);
}
function numberValue(id,fallback){
  const el = document.getElementById(id);
  return el ? Number(el.value)||fallback : fallback;
}
function severityClass(value){
  const v = String(value).toLowerCase();
  if(v.indexOf("alta")>=0 || v.indexOf("crít")>=0 || v==="high") return "high";
  if(v.indexOf("méd")>=0 || v==="medium") return "medium";
  return "low";
}
function ipFrom(line){
  const m = line.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g);
  return m ? m[m.length-1] : "n/d";
}

function analyzeSSH(){
  const threshold = numberValue("threshold",4);
  const rows = lines();
  const map = {};
  let accepted = 0;
  rows.forEach(function(line){
    if(/Accepted password|Accepted publickey/i.test(line)) accepted++;
    if(/Failed password/i.test(line)){
      const ip = (line.match(/from\s+((?:\d{1,3}\.){3}\d{1,3})/i)||[])[1] || ipFrom(line);
      if(!map[ip]) map[ip]=0;
      map[ip]++;
    }
  });
  const findings = Object.keys(map).map(function(ip){
    const count=map[ip], high=count>=threshold;
    return {title:ip,detail:count+" falhas de autenticação",severity:high?"Alta":"Baixa",value:count};
  }).sort(function(a,b){return b.value-a.value;});
  return {metrics:[
    ["Falhas",findings.reduce(function(s,x){return s+x.value;},0),"bad"],
    ["Sucessos",accepted,"good"],
    ["Origens",findings.length,""],
    ["Alertas",findings.filter(function(x){return x.value>=threshold;}).length,"warn"]
  ],findings:findings,summary:"Limiar atual: "+threshold+" falhas por origem."};
}

function parseCsvRows(){
  return lines().map(function(l){return l.split(",").map(function(v){return v.trim();});}).filter(function(r){return r.length>1;});
}

function analyzePortScan(){
  const threshold=numberValue("threshold",8), rows=parseCsvRows(), map={};
  rows.forEach(function(r){
    if(r.length<4) return;
    const src=r[1], port=r[3];
    if(!map[src]) map[src]={ports:new Set(),events:0,dst:new Set()};
    map[src].ports.add(port); map[src].events++; map[src].dst.add(r[2]);
  });
  const findings=Object.keys(map).map(function(src){
    const x=map[src], n=x.ports.size;
    return {title:src,detail:n+" portas únicas em "+x.events+" eventos para "+x.dst.size+" destino(s)",severity:n>=threshold?"Alta":(n>=Math.ceil(threshold/2)?"Média":"Baixa"),value:n};
  }).sort(function(a,b){return b.value-a.value;});
  return {metrics:[["Eventos",rows.length,""],["Origens",findings.length,""],["Maior amplitude",findings[0]?findings[0].value:0,"warn"],["Alertas",findings.filter(function(x){return x.value>=threshold;}).length,"bad"]],findings:findings,summary:"Detecção baseada em portas únicas por origem. Limiar: "+threshold+"."};
}

function analyzeReverse(){
  const monitored=(document.getElementById("keywords").value||"").split(",").map(function(x){return x.trim();});
  const rows=parseCsvRows(), suspiciousParents=["winword.exe","excel.exe","apache2","nginx","w3wp.exe"];
  const findings=[];
  rows.forEach(function(r){
    if(r.length<6) return;
    const process=r[2].toLowerCase(), parent=r[3].toLowerCase(), port=r[5];
    const shell=/powershell|cmd\.exe|bash|sh$|nc|netcat|python/.test(process);
    const portHit=monitored.indexOf(port)>=0;
    const parentHit=suspiciousParents.indexOf(parent)>=0;
    if(shell && (portHit||parentHit)){
      findings.push({title:r[1]+" • "+r[2],detail:"Destino "+r[4]+":"+port+" | parent "+r[3],severity:(portHit&&parentHit)?"Alta":"Média",value:port});
    }
  });
  return {metrics:[["Conexões",rows.length,""],["Suspeitas",findings.length,"bad"],["Portas vigiadas",monitored.filter(Boolean).length,""],["Hosts afetados",new Set(findings.map(function(x){return x.title.split(" • ")[0];})).size,"warn"]],findings:findings,summary:"Correlação local entre processo, processo pai e porta de saída."};
}

function analyzeSOC(){
  const rows=lines(), findings=[];
  rows.forEach(function(line){
    const p=line.split("|");
    if(p.length<4) return;
    let sev="Baixa";
    if(/suspeit|bloquead|falha|isolado|quarentena/i.test(line)) sev="Média";
    if(/powershell|4444|payload/i.test(line)) sev="Alta";
    findings.push({title:(p[0]||"")+" • "+(p[1]||""),detail:(p[2]||"")+" | "+(p[3]||""),severity:sev,value:p[0]});
  });
  const analyst=(document.getElementById("analyst").value||"SOC Analyst");
  const caseSeverity=document.getElementById("severity").value;
  return {metrics:[["Eventos",findings.length,""],["Alta prioridade",findings.filter(function(x){return x.severity==="Alta";}).length,"bad"],["Fontes",new Set(rows.map(function(x){return (x.split("|")[1]||"").trim();})).size,""],["Caso",caseSeverity,severityClass(caseSeverity)]],findings:findings,summary:"Investigação atribuída a "+analyst+". Eventos ordenados conforme entrada."};
}

function analyzeLogScript(){
  const keys=(document.getElementById("keywords").value||"").split(",").map(function(x){return x.trim().toLowerCase();}).filter(Boolean);
  const rows=lines(), findings=[];
  rows.forEach(function(line,i){
    const hit=keys.filter(function(k){return line.toLowerCase().indexOf(k)>=0;});
    if(hit.length) findings.push({title:"Linha "+(i+1),detail:"Indicadores: "+hit.join(", ")+" | "+line,severity:hit.length>1?"Alta":"Média",value:hit.length});
  });
  const rule="for line in log_file:\n    text = line.lower()\n    if any(i in text for i in indicators):\n        alert(line)";
  return {metrics:[["Linhas",rows.length,""],["Correspondências",findings.length,"warn"],["Indicadores",keys.length,""],["Cobertura",rows.length?Math.round(findings.length/rows.length*100)+"%":"0%",""]],findings:findings,summary:"Regra defensiva gerada:\n"+rule};
}

function stddev(values){
  if(!values.length) return 0;
  const avg=values.reduce(function(a,b){return a+b;},0)/values.length;
  return Math.sqrt(values.reduce(function(s,v){return s+Math.pow(v-avg,2);},0)/values.length);
}
function analyzeBeacon(){
  const threshold=numberValue("threshold",8), rows=parseCsvRows(), groups={};
  rows.forEach(function(r){
    if(r.length<4) return;
    const key=r[1]+" → "+r[2], ts=new Date(r[0]).getTime();
    if(!isFinite(ts)) return;
    if(!groups[key]) groups[key]=[];
    groups[key].push(ts);
  });
  const findings=[];
  Object.keys(groups).forEach(function(key){
    const arr=groups[key].sort(function(a,b){return a-b;});
    if(arr.length<3) return;
    const intervals=[];
    for(let i=1;i<arr.length;i++) intervals.push((arr[i]-arr[i-1])/1000);
    const avg=intervals.reduce(function(a,b){return a+b;},0)/intervals.length;
    const jitter=avg?stddev(intervals)/avg*100:100;
    findings.push({title:key,detail:"Intervalo médio "+avg.toFixed(1)+"s | jitter "+jitter.toFixed(1)+"% | "+arr.length+" eventos",severity:jitter<=threshold?"Alta":"Baixa",value:Number(jitter.toFixed(1))});
  });
  return {metrics:[["Fluxos",rows.length,""],["Pares",Object.keys(groups).length,""],["Candidatos C2",findings.filter(function(x){return x.severity==="Alta";}).length,"bad"],["Jitter máx.",threshold+"%","warn"]],findings:findings.sort(function(a,b){return a.value-b.value;}),summary:"Quanto menor o jitter, maior a regularidade temporal observada."};
}

function signatureHits(line){
  const tests=[
    ["Path Traversal",/(\.\.\/|\.\.\\|%2e%2e%2f)/i],
    ["XSS",/(<script|%3cscript|javascript:|onerror=)/i],
    ["SQLi",/(union(?:%20|\s)+select|or(?:%20|\s)+1=1|sleep\(|information_schema)/i],
    ["Execução remota",/(cmd=|powershell|\/bin\/sh|%24%7bjndi|\$\{jndi)/i],
    ["Arquivo sensível",/(etc\/passwd|win\.ini|shadow)/i]
  ];
  return tests.filter(function(x){return x[1].test(line);}).map(function(x){return x[0];});
}
function analyzeExploit(){
  const rows=lines(), findings=[];
  rows.forEach(function(line,i){
    const hits=signatureHits(line);
    if(hits.length) findings.push({title:hits.join(" + "),detail:"Linha "+(i+1)+" | "+line,severity:hits.length>1?"Alta":"Média",value:hits.length});
  });
  return {metrics:[["Eventos",rows.length,""],["Evidências",findings.length,"bad"],["Categorias",new Set(findings.flatMap(function(x){return x.title.split(" + ");})).size,""],["Cobertura","texto + URI","good"]],findings:findings,summary:"Análise estática de rastros. Nenhum conteúdo é executado."};
}
function analyzeWeb(){
  const rows=lines(), findings=[], high=document.getElementById("sensitivity").value==="high";
  rows.forEach(function(line,i){
    const hits=signatureHits(line);
    if(hits.length || (high && /\s(4\d\d|5\d\d)\s/.test(line))){
      findings.push({title:hits.length?hits.join(" + "):"Resposta anormal",detail:"Requisição "+(i+1)+" | "+line,severity:hits.length?"Alta":"Média",value:hits.length||1});
    }
  });
  return {metrics:[["Requisições",rows.length,""],["Suspeitas",findings.length,"bad"],["Taxa",rows.length?Math.round(findings.length/rows.length*100)+"%":"0%","warn"],["Sensibilidade",high?"Alta":"Normal",""]],findings:findings,summary:"Assinaturas locais para SQLi, XSS, traversal, RCE e arquivos sensíveis."};
}
function analyzeBaseline(){
  const threshold=numberValue("threshold",40), rows=parseCsvRows(), findings=[];
  rows.forEach(function(r){
    if(r.length<3) return;
    const base=Number(r[1]), current=Number(r[2]);
    if(!isFinite(base)||!isFinite(current)||base===0) return;
    const deviation=(current-base)/base*100;
    findings.push({title:r[0],detail:"Baseline "+base+" | atual "+current+" | desvio "+deviation.toFixed(1)+"%",severity:Math.abs(deviation)>=threshold?"Alta":(Math.abs(deviation)>=threshold/2?"Média":"Baixa"),value:Math.abs(deviation)});
  });
  return {metrics:[["Métricas",findings.length,""],["Desvios críticos",findings.filter(function(x){return x.severity==="Alta";}).length,"bad"],["Maior desvio",findings.length?Math.max.apply(null,findings.map(function(x){return x.value;})).toFixed(1)+"%":"0%","warn"],["Limiar",threshold+"%",""]],findings:findings.sort(function(a,b){return b.value-a.value;}),summary:"Comparação percentual entre linha de base e valor atual."};
}
function analyzeTuning(){
  const threshold=numberValue("threshold",70), rows=parseCsvRows(), findings=[], precisions=[];
  rows.forEach(function(r){
    if(r.length<3) return;
    const tp=Number(r[1]), fp=Number(r[2]), total=tp+fp;
    if(!isFinite(tp)||!isFinite(fp)||total===0) return;
    const precision=tp/total*100; precisions.push(precision);
    findings.push({title:r[0],detail:"TP "+tp+" | FP "+fp+" | precisão "+precision.toFixed(1)+"%",severity:precision<threshold?"Alta":(precision<threshold+15?"Média":"Baixa"),value:precision});
  });
  const avg=precisions.length?precisions.reduce(function(a,b){return a+b;},0)/precisions.length:0;
  return {metrics:[["Regras",findings.length,""],["Precisão média",avg.toFixed(1)+"%",avg>=threshold?"good":"warn"],["Prioridade tuning",findings.filter(function(x){return x.severity==="Alta";}).length,"bad"],["Meta",threshold+"%",""]],findings:findings.sort(function(a,b){return a.value-b.value;}),summary:"Priorize regras com baixa precisão e alto volume de falso positivo."};
}

function runAnalysis(p){
  let result;
  if(p.id==="ssh-bruteforce") result=analyzeSSH();
  else if(p.id==="port-scan") result=analyzePortScan();
  else if(p.id==="reverse-shell") result=analyzeReverse();
  else if(p.id==="soc-end-to-end") result=analyzeSOC();
  else if(p.id==="log-script") result=analyzeLogScript();
  else if(p.id==="beaconing-c2") result=analyzeBeacon();
  else if(p.id==="exploit-analysis") result=analyzeExploit();
  else if(p.id==="web-attacks") result=analyzeWeb();
  else if(p.id==="network-baseline") result=analyzeBaseline();
  else result=analyzeTuning();
  state[p.id].last=result;
  state[p.id].input=document.getElementById("dataInput").value;
  renderResult(p,result);
  toast("Análise concluída em "+p.title);
}

function renderResult(p,result){
  const mount=document.getElementById("resultMount");
  if(!mount) return;
  const metrics='<div class="kpi-strip">'+result.metrics.map(function(m){return '<div class="metric '+(m[2]||"")+'"><span>'+escapeHtml(m[0])+'</span><strong>'+escapeHtml(m[1])+'</strong></div>';}).join("")+'</div>';
  const list=result.findings.length ? '<div class="results-list">'+result.findings.map(function(f){
    const cls=severityClass(f.severity);
    return '<div class="result-item"><span class="result-dot '+cls+'"></span><div><strong>'+escapeHtml(f.title)+'</strong><p>'+escapeHtml(f.detail)+'</p></div><span class="badge '+cls+'">'+escapeHtml(f.severity)+'</span></div>';
  }).join("")+'</div>' : '<div class="empty-state">Nenhum achado relevante com os parâmetros atuais.</div>';
  const summary='<div class="rule-box" style="margin-top:12px">'+escapeHtml(result.summary)+'</div>';
  mount.innerHTML=metrics+list+summary;
  const stamp=document.getElementById("resultStamp");
  if(stamp) stamp.textContent="analisado agora";
}

function exportSession(){
  const payload={
    product:"Acervo Cyber",
    exportedAt:new Date().toISOString(),
    modules:catalog.map(function(p){return {id:p.id,title:p.title,input:state[p.id].input,lastResult:state[p.id].last};})
  };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url; a.download="acervo-cyber-session.json"; a.click();
  URL.revokeObjectURL(url);
  toast("Sessão exportada em JSON");
}

projectNav.addEventListener("click",function(e){
  const button=e.target.closest("button");
  if(!button) return;
  if(button.dataset.home) openHome();
  if(button.dataset.project) openProject(button.dataset.project);
});
projectGrid.addEventListener("click",function(e){
  const button=e.target.closest("[data-project]");
  if(button) openProject(button.dataset.project);
});
categoryFilters.addEventListener("click",function(e){
  const b=e.target.closest("[data-category]");
  if(!b) return;
  activeCategory=b.dataset.category;
  renderFilters(); renderGrid();
});
globalSearch.addEventListener("input",function(){
  if(activeProject!==null) openHome();
  renderGrid();
});
document.getElementById("openFirst").onclick=function(){openProject(catalog[0].id);};
document.getElementById("loadSamples").onclick=function(){
  catalog.forEach(function(p){state[p.id].input=p.sample;});
  toast("As 10 amostras locais foram restauradas");
};
document.getElementById("exportButton").onclick=exportSession;
document.getElementById("menuButton").onclick=function(){sidebar.classList.toggle("open");};

renderNav();
renderFilters();
renderGrid();
