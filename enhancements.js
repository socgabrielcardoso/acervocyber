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
