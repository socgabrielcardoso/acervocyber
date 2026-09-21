"use strict";

(function(){
  const STORAGE_KEY="acervoCyberStateV2";

  function buildSnapshot(){
    return {
      version:2,
      savedAt:new Date().toISOString(),
      modules:catalog.reduce(function(acc,p){
        acc[p.id]={input:state[p.id].input,last:state[p.id].last};
        return acc;
      },{})
    };
  }

  function saveLocal(){
    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify(buildSnapshot()));
    }catch(err){
      console.warn("Persistência local indisponível",err);
    }
  }

  function restoreLocal(){
    try{
      const raw=localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      const parsed=JSON.parse(raw);
      if(!parsed || !parsed.modules) return;
      catalog.forEach(function(p){
        const saved=parsed.modules[p.id];
        if(!saved) return;
        if(typeof saved.input==="string") state[p.id].input=saved.input;
        if(saved.last) state[p.id].last=saved.last;
      });
    }catch(err){
      console.warn("Estado local inválido",err);
    }
  }

  restoreLocal();

  const baseRunAnalysis=runAnalysis;
  runAnalysis=function(p){
    baseRunAnalysis(p);
    saveLocal();
  };

  const baseOpenProject=openProject;
  openProject=function(id){
    baseOpenProject(id);
    saveLocal();
  };

  window.addEventListener("beforeunload",saveLocal);
  window.AcervoEnhancements={buildSnapshot,saveLocal,restoreLocal};
})();


(function(){
  const button=document.getElementById("importButton");
  if(!button) return;

  const input=document.createElement("input");
  input.type="file";
  input.accept=".json,application/json";
  input.hidden=true;
  document.body.appendChild(input);

  button.addEventListener("click",function(){
    input.value="";
    input.click();
  });

  input.addEventListener("change",function(){
    const file=input.files && input.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.onload=function(){
      try{
        const payload=JSON.parse(String(reader.result||"{}"));
        const modules=payload.modules;
        if(!Array.isArray(modules) && (!modules || typeof modules!=="object")){
          throw new Error("estrutura inválida");
        }

        if(Array.isArray(modules)){
          modules.forEach(function(item){
            if(!item || !state[item.id]) return;
            if(typeof item.input==="string") state[item.id].input=item.input;
            if(item.lastResult) state[item.id].last=item.lastResult;
          });
        }else{
          Object.keys(modules).forEach(function(id){
            if(!state[id]) return;
            const item=modules[id];
            if(typeof item.input==="string") state[id].input=item.input;
            if(item.last) state[id].last=item.last;
          });
        }

        if(window.AcervoEnhancements) window.AcervoEnhancements.saveLocal();
        if(activeProject) openProject(activeProject); else renderGrid();
        toast("Sessão importada com sucesso");
      }catch(err){
        toast("Arquivo de sessão inválido");
      }
    };
    reader.readAsText(file);
  });
})();


(function(){
  function refreshStats(){
    const modules=document.getElementById("statModules");
    const analyzed=document.getElementById("statAnalyzed");
    const findings=document.getElementById("statFindings");
    const visible=document.getElementById("statVisible");
    if(modules) modules.textContent=String(catalog.length);
    if(analyzed) analyzed.textContent=String(catalog.filter(function(p){return !!state[p.id].last;}).length);
    if(findings){
      const total=catalog.reduce(function(sum,p){
        const result=state[p.id].last;
        return sum+(result && Array.isArray(result.findings)?result.findings.length:0);
      },0);
      findings.textContent=String(total);
    }
    if(visible) visible.textContent=String(document.querySelectorAll("#projectGrid .project-card").length);
  }

  const renderGridWithStats=renderGrid;
  renderGrid=function(){
    renderGridWithStats();
    refreshStats();
  };

  const runAnalysisWithStats=runAnalysis;
  runAnalysis=function(p){
    runAnalysisWithStats(p);
    refreshStats();
  };

  globalSearch.addEventListener("input",refreshStats);
  categoryFilters.addEventListener("click",function(){setTimeout(refreshStats,0);});
  refreshStats();
  window.AcervoEnhancements.refreshStats=refreshStats;
})();


(function(){
  document.addEventListener("keydown",function(event){
    const tag=(event.target && event.target.tagName || "").toLowerCase();
    const typing=tag==="input" || tag==="textarea" || tag==="select";

    if((event.ctrlKey || event.metaKey) && event.key.toLowerCase()==="k"){
      event.preventDefault();
      globalSearch.focus();
      globalSearch.select();
      return;
    }

    if(event.key==="Escape"){
      if(sidebar.classList.contains("open")){
        sidebar.classList.remove("open");
        return;
      }
      if(activeProject!==null && !typing) openHome();
    }

    if(!typing && event.altKey && /^[1-9]$/.test(event.key)){
      const project=catalog[Number(event.key)-1];
      if(project) openProject(project.id);
    }
  });
})();


(function(){
  let syncingHash=false;

  const projectOpenWithHash=openProject;
  openProject=function(id){
    projectOpenWithHash(id);
    if(!syncingHash) history.replaceState(null,"","#module="+encodeURIComponent(id));
  };

  const homeOpenWithHash=openHome;
  openHome=function(){
    homeOpenWithHash();
    if(!syncingHash) history.replaceState(null,"",location.pathname+location.search);
  };

  function routeFromHash(){
    const match=location.hash.match(/^#module=([^&]+)/);
    if(!match) return;
    const id=decodeURIComponent(match[1]);
    if(!getProject(id)) return;
    syncingHash=true;
    openProject(id);
    syncingHash=false;
  }

  window.addEventListener("hashchange",routeFromHash);
  routeFromHash();
})();


(function(){
  const HISTORY_KEY="acervoCyberHistoryV1";

  function readHistory(){
    try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||"{}")||{};}
    catch(_){return {};}
  }

  function writeHistory(value){
    try{localStorage.setItem(HISTORY_KEY,JSON.stringify(value));}catch(_){}
  }

  function pushHistory(project,result){
    const all=readHistory();
    if(!Array.isArray(all[project.id])) all[project.id]=[];
    all[project.id].unshift({
      at:new Date().toISOString(),
      findings:Array.isArray(result && result.findings)?result.findings.length:0
    });
    all[project.id]=all[project.id].slice(0,5);
    writeHistory(all);
  }

  function renderHistory(projectId){
    const host=document.querySelector(".workspace-layout > div:last-child");
    if(!host) return;
    const previous=document.getElementById("analysisHistoryCard");
    if(previous) previous.remove();

    const items=readHistory()[projectId]||[];
    const card=document.createElement("div");
    card.className="workspace-card";
    card.id="analysisHistoryCard";
    card.style.marginTop="16px";
    card.innerHTML='<h3>Histórico local <span>últimas 5 execuções</span></h3>'+
      (items.length?'<div class="history-list">'+items.map(function(item){
        return '<div class="history-item"><strong>'+new Date(item.at).toLocaleString("pt-BR")+'</strong><span>'+item.findings+' achado(s)</span></div>';
      }).join("")+'</div>':'<div class="empty-state">Nenhuma execução registrada.</div>');
    host.appendChild(card);
  }

  const runAnalysisWithHistory=runAnalysis;
  runAnalysis=function(p){
    runAnalysisWithHistory(p);
    pushHistory(p,state[p.id].last);
    renderHistory(p.id);
  };

  const openProjectWithHistory=openProject;
  openProject=function(id){
    openProjectWithHistory(id);
    renderHistory(id);
  };
})();


(function(){
  function csvCell(value){
    return '"'+String(value==null?"":value).replace(/"/g,'""')+'"';
  }

  function exportCurrentCsv(){
    if(!activeProject || !state[activeProject] || !state[activeProject].last){
      toast("Execute uma análise antes de exportar");
      return;
    }
    const result=state[activeProject].last;
    const rows=[["titulo","detalhe","severidade","valor"]];
    (result.findings||[]).forEach(function(f){
      rows.push([f.title,f.detail,f.severity,f.value]);
    });
    const csv=rows.map(function(row){return row.map(csvCell).join(",");}).join("\r\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download=activeProject+"-achados.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast("Achados exportados em CSV");
  }

  const observer=new MutationObserver(function(){
    const actions=document.querySelector(".workspace-actions");
    if(!actions || document.getElementById("exportCsvButton")) return;
    const button=document.createElement("button");
    button.className="secondary-button";
    button.id="exportCsvButton";
    button.textContent="Exportar CSV";
    button.addEventListener("click",exportCurrentCsv);
    actions.appendChild(button);
  });
  observer.observe(workspaceMount,{childList:true,subtree:true});
})();
