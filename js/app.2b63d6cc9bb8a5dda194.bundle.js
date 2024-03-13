(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,a)=>{const s=a(89),{lightningChart:o,UIElementBuilders:n,UIOrigins:l,PalettedFill:i,LUT:r,ColorRGBA:d,regularColorSteps:c,emptyLine:m,AxisTickStrategies:u,Themes:p}=s,g=o().ChartXY({theme:p[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0}).setTitle("Loading example data ...").setAutoCursor((e=>e.setTickMarkerXVisible(!1).setTickMarkerYVisible(!1))),h=g.getTheme(),k=g.getDefaultAxisX(),x=g.getDefaultAxisY();g.getDefaultAxes().forEach((e=>e.setTickStrategy(u.Empty).setStrokeStyle(m)));const T=g.addLineSeries({individualLookupValuesEnabled:!0}).setCursorSolveBasis("nearest").setCursorInterpolationEnabled(!1).setStrokeStyle((e=>e.setThickness(10))),f=g.addUIElement(n.TextBox,{x:k,y:x}).setVisible(!1),S=[{name:"Speed",file:"demo-data-speed.json",lut:new r({steps:c(0,50,h.examples.intensityColorPalette),interpolate:!0,units:"km/h"}),format:e=>`${e.toFixed(1)} km/h`},{name:"Steering",file:"demo-data-steering.json",lut:new r({steps:[{value:-100,color:d(255,255,0)},{value:0,color:d(255,255,255)},{value:100,color:d(0,0,255)}],interpolate:!0,units:"%"}),format:e=>`${e.toFixed(1)} %`},{name:"Throttle",file:"demo-data-throttle.json",lut:new r({steps:c(0,100,h.examples.intensityColorPalette),interpolate:!0,units:"%"}),format:e=>`${e.toFixed(1)} %`}];let y;const C=async e=>{y&&(y.dispose(),y=void 0);const t=S.find((t=>t.name===e));let a=t.data;a||(console.time(`Load data set ${e}`),a=await fetch(document.head.baseURI+`examples/assets/0052/${t.file}`).then((e=>e.json())),t.data=a,console.timeEnd(`Load data set ${e}`)),T.clear().setName(e).add(a).setStrokeStyle((e=>e.setFillStyle(new i({lut:t.lut})))).setCursorResultTableFormatter(((a,s,o,n,l)=>a.addRow(e).addRow(l.value?t.format(l.value):"")));const s=a[0];f.setVisible(!0).setPosition(s).setOrigin(l.CenterBottom).setMargin(10).setText("START"),g.setTitle(`Racecar ${e} progression during 1 lap`),y=g.addLegendBox().add(g)};C("Speed");const w=document.createElement("div");g.engine.container.append(w),w.style.position="absolute",w.style.top=`${g.getTitleMargin().top}px`,w.style.right=`${g.getPadding().right}px`;const b=document.createElement("select");w.append(b),S.forEach((e=>{const t=document.createElement("option");b.append(t),t.innerHTML=e.name})),b.onchange=e=>{C(e.target.value)}}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);