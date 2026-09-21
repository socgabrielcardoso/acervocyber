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
