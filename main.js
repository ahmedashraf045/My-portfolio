(function(){
  var DATA={"social":[{"src":"social-01.jpg","alt":"Chess competition announcement poster","w":960,"h":960},{"src":"social-02.jpg","alt":"Eid al-Fitr greeting post with cookies and tea","w":960,"h":1200},{"src":"social-03.jpg","alt":"Pets Garden event announcement for Monday 27/1","w":960,"h":960},{"src":"social-04.jpg","alt":"Pets Garden event announcement for 16/8 and 20/8","w":960,"h":1200},{"src":"social-05.jpg","alt":"Photography competition poster","w":960,"h":960},{"src":"social-06.jpg","alt":"Solar System educational post","w":960,"h":1200},{"src":"social-07.jpg","alt":"Thank you for attending the competition, Arabic post","w":960,"h":1280},{"src":"social-08.jpg","alt":"Portosystemic shunt educational post with a Yorkshire terrier","w":960,"h":960},{"src":"social-09.jpg","alt":"International Veterinary Day post","w":960,"h":1200},{"src":"social-10.jpg","alt":"World Pet Day Arabic post with a kitten","w":960,"h":1196},{"src":"social-11.jpg","alt":"Thank-you Eid post with a cat and hearts","w":960,"h":1196},{"src":"social-12.jpg","alt":"Chocolate warning for dog owners, Arabic post","w":960,"h":1200},{"src":"social-13.jpg","alt":"Eid greeting post with a minaret and cookies","w":960,"h":1200},{"src":"social-14.jpg","alt":"Eid Mubarak post for a clinic open during Eid days","w":960,"h":1196},{"src":"social-15.jpg","alt":"Ramadan greeting post with a cat in traditional clothes","w":960,"h":1200}],"prints":[{"src":"print-01.jpg","alt":"Histology book cover design","w":1200,"h":816},{"src":"print-02.jpg","alt":"Microbiology department roll-up banner","w":900,"h":2118},{"src":"print-03.jpg","alt":"Liver values in dogs and cats, vet quick reference poster","w":1400,"h":1899}]};
  var COLS=[
    {key:"social",title:"Social media posts",cfg:[2,3,4]},
    {key:"prints",title:"Prints",cfg:[1,2,3]}
  ];
  var host=document.getElementById("collections");
  var state=[];
  var cur={c:0,i:0},opener=null;
  var lb=document.getElementById("lb"),lbimg=document.getElementById("lbimg"),lbcap=document.getElementById("lbcap");

  COLS.forEach(function(c,ci){
    var items=DATA[c.key];
    var box=document.createElement("div");box.className="collection";
    var head=document.createElement("div");head.className="col-title";
    var h=document.createElement("h3");h.textContent=c.title;
    var n=document.createElement("span");n.className="mono";n.textContent=items.length+" pieces";
    head.appendChild(h);head.appendChild(n);
    var grid=document.createElement("div");grid.className="masonry";
    box.appendChild(head);box.appendChild(grid);host.appendChild(box);
    var tiles=items.map(function(it,i){
      var b=document.createElement("button");
      b.type="button";b.className="tile";
      b.style.aspectRatio=it.w+" / "+it.h;
      b.setAttribute("aria-label","Enlarge: "+it.alt);
      var im=new Image();im.src=it.src;im.alt=it.alt;im.width=it.w;im.height=it.h;im.decoding="async";im.loading="lazy";
      b.appendChild(im);
      b.addEventListener("click",function(){openLb(ci,i,b);});
      return b;
    });
    state.push({cfg:c.cfg,items:items,grid:grid,tiles:tiles,n:0});
  });

  function layout(){
    state.forEach(function(s){
      var w=s.grid.clientWidth||window.innerWidth;
      var n=w<560?s.cfg[0]:(w<900?s.cfg[1]:s.cfg[2]);
      if(n===s.n)return;
      s.n=n;
      s.grid.textContent="";
      var cols=[],hs=[];
      for(var k=0;k<n;k++){var d=document.createElement("div");d.className="mcol";s.grid.appendChild(d);cols.push(d);hs.push(0);}
      s.tiles.forEach(function(t,i){
        var m=0;for(var k=1;k<n;k++){if(hs[k]<hs[m])m=k;}
        cols[m].appendChild(t);
        hs[m]+=s.items[i].h/s.items[i].w+0.03;
      });
    });
  }
  layout();
  window.addEventListener("resize",layout);

  function show(){
    var s=state[cur.c],it=s.items[cur.i];
    lbimg.src=it.src;lbimg.alt=it.alt;
    lbcap.textContent=it.alt+"  ·  "+(cur.i+1)+" / "+s.items.length;
  }
  function openLb(c,i,el){
    cur={c:c,i:i};opener=el;show();lb.hidden=false;
    document.documentElement.style.overflow="hidden";
    document.getElementById("lbx").focus();
  }
  function closeLb(){
    lb.hidden=true;document.documentElement.style.overflow="";
    lbimg.removeAttribute("src");
    if(opener)opener.focus();
  }
  function step(d){var n=state[cur.c].items.length;cur.i=(cur.i+d+n)%n;show();}
  document.getElementById("lbx").addEventListener("click",closeLb);
  document.getElementById("lbp").addEventListener("click",function(){step(-1);});
  document.getElementById("lbn").addEventListener("click",function(){step(1);});
  lb.addEventListener("click",function(e){if(e.target===lb||e.target.classList.contains("stage"))closeLb();});
  document.addEventListener("keydown",function(e){
    if(lb.hidden)return;
    if(e.key==="Escape")closeLb();
    else if(e.key==="ArrowRight")step(1);
    else if(e.key==="ArrowLeft")step(-1);
  });
})();
