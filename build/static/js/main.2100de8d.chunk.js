(this["webpackJsonpchill-vibes-music"]=this["webpackJsonpchill-vibes-music"]||[]).push([[0],{15:function(e,t,c){},22:function(e,t,c){"use strict";c.r(t);var a=c(2),n=c.n(a),o=c(10),i=c.n(o),r=c(3),s=c(6),l=(c(15),c(5)),p=c(4),d=function(e,t){if(e){var c=t.current.play();void 0!==c&&c.then((function(e){t.current.play()}))}},u=c(0),h=function(e){var t=e.songs,c=e.currentSong,n=e.isPlaying,o=(e.setIsPlaying,e.audioRef),i=e.setSongInfo,s=e.songInfo,h=e.playSongHandler,b=e.setCurrentSong,j=e.setSongs;Object(a.useEffect)((function(){var e=t.map((function(e){return e.id===c.id?Object(r.a)(Object(r.a)({},e),{},{active:!0}):Object(r.a)(Object(r.a)({},e),{},{active:!1})}));j(e)}),[c]);var m=function(e){return Math.floor(e/60)+":"+("0"+Math.floor(e%60)).slice(-2)},f=function(e){var a=t.findIndex((function(e){return e.id===c.id}));if("skip-forward"===e&&b(t[(a+1)%t.length]),"skip-back"===e){if((a-1)%t.length===-1)return void b(t[t.length-1]);b(t[(a-1)%t.length])}d(n,o)};return Object(u.jsxs)("div",{className:"player",children:[Object(u.jsxs)("div",{className:"time-control",children:[Object(u.jsx)("p",{children:m(s.currentTime)}),Object(u.jsx)("input",{type:"range",min:0,max:s.duration||0,value:s.currentTime,onChange:function(e){o.current.currentTime=e.target.value,i(Object(r.a)(Object(r.a)({},s),{},{currentTime:e.target.value}))}}),Object(u.jsx)("p",{children:s.duration?m(s.duration):"0:00"})]}),Object(u.jsxs)("div",{className:"play-control",children:[Object(u.jsx)(l.a,{onClick:function(){return f("skip-back")},className:"skip-back",size:"2x",icon:p.a}),Object(u.jsx)(l.a,{className:"play",size:"2x",icon:n?p.d:p.e,onClick:h}),Object(u.jsx)(l.a,{onClick:function(){return f("skip-forward")},className:"skip-forward",size:"2x",icon:p.b})]})]})},b=function(e){var t=e.currentSong;return Object(u.jsxs)("div",{className:"song-container",children:[Object(u.jsx)("img",{alt:t.name,src:t.cover}),Object(u.jsx)("h2",{children:t.name}),Object(u.jsx)("h3",{children:t.artist})]})},j=function(e){var t=e.song,c=e.songs,a=e.setCurrentSong,n=e.id,o=e.audioRef,i=e.isPlaying,s=e.setSongs;return Object(u.jsxs)("div",{onClick:function(){a(t);var e=c.map((function(e){return e.id===n?Object(r.a)(Object(r.a)({},e),{},{active:!0}):Object(r.a)(Object(r.a)({},e),{},{active:!1})}));s(e),d(i,o)},className:"library-song ".concat(t.active?"selected":""),children:[Object(u.jsx)("img",{alt:t.name,src:t.cover}),Object(u.jsxs)("div",{className:"song-description",children:[Object(u.jsx)("h3",{children:t.name}),Object(u.jsx)("h4",{children:t.artist})]})]})},m=function(e){var t=e.setCurrentSong,c=e.songs,a=e.audioRef,n=e.isPlaying,o=e.setSongs,i=e.libraryStatus;return Object(u.jsxs)("div",{className:"library ".concat(i?"active-library":""),children:[Object(u.jsx)("h2",{children:"Library"}),Object(u.jsx)("div",{className:"library-songs",children:c.map((function(e){return Object(u.jsx)(j,{setCurrentSong:t,song:e,songs:c,id:e.id,audioRef:a,isPlaying:n,setSongs:o},e.id)}))})]})},f=c(24),v=function(){return[{name:"Home Court",cover:"https://chillhop.com/wp-content/uploads/2021/02/08cbb0848f669e1bd8b5a5152c4b7d20edf1b499-1024x1024.jpg",artist:["Blue Wednesday ","Shopan "],color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=11233",id:Object(f.a)(),active:!0},{name:"Snowstalgia",cover:"https://chillhop.com/wp-content/uploads/2020/10/0e5bb63f838ff92eeac142aae944e9f678df13c9-1024x1024.jpg",artist:"invention_",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=10305",id:Object(f.a)(),active:!1},{name:"ny90",cover:"https://chillhop.com/wp-content/uploads/2020/12/7e98d3028a22ee7f16f6a9bfcdc2089f089777a5-1024x1024.jpg",artist:"Ezzy",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=9331",id:Object(f.a)(),active:!1},{name:"Going Back",cover:"https://chillhop.com/wp-content/uploads/2020/10/0e5bb63f838ff92eeac142aae944e9f678df13c9-1024x1024.jpg",artist:"Sw\xf8rn",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=10310",id:Object(f.a)(),active:!1},{name:"Doin It",cover:"https://chillhop.com/wp-content/uploads/2021/02/08cbb0848f669e1bd8b5a5152c4b7d20edf1b499-1024x1024.jpg",artist:"Tesk",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=8927",id:Object(f.a)(),active:!1},{name:"After Dark",cover:"https://chillhop.com/wp-content/uploads/2020/12/7e98d3028a22ee7f16f6a9bfcdc2089f089777a5-1024x1024.jpg",artist:"Sugi.wa",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=8105",id:Object(f.a)(),active:!1},{name:"What Was Before",cover:"https://chillhop.com/wp-content/uploads/2020/12/7e98d3028a22ee7f16f6a9bfcdc2089f089777a5-1024x1024.jpg",artist:["Philanthrope ","Leavv "],color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=9923",id:Object(f.a)(),active:!1},{name:"5 am",cover:"https://chillhop.com/wp-content/uploads/2020/10/0e5bb63f838ff92eeac142aae944e9f678df13c9-1024x1024.jpg",artist:["Ruck P ","Shuko "],color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=10309",id:Object(f.a)(),active:!1},{name:"Today Feels Like Everyday",cover:"https://chillhop.com/wp-content/uploads/2021/02/08cbb0848f669e1bd8b5a5152c4b7d20edf1b499-1024x1024.jpg",artist:"Mama Aiuto",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=12128",id:Object(f.a)(),active:!1},{name:"Going Back",cover:"https://chillhop.com/wp-content/uploads/2020/10/737bb830d34592344eb4a2a1d2c006cdbfc811d9-1024x1024.jpg",artist:"Sw\xf8rn",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=10310",id:Object(f.a)(),active:!1},{name:"Lost Love",cover:"https://chillhop.com/wp-content/uploads/2020/10/efaa848553d09b4d9fc0752844456e41b34de276-1024x1024.jpg",artist:"Toonorth",color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=7837",id:Object(f.a)(),active:!1},{name:"Day One",cover:"https://chillhop.com/wp-content/uploads/2020/12/33a2a875828118a3ff260638a88362936104879a-1024x1024.jpg",artist:["Blue Wednesday ","Shopan "],color:["#CCB3C8","#9B3134"],audio:"https://mp3.chillhop.com/serve.php/?mp3=11231",id:Object(f.a)(),active:!1}]},g=function(e){var t=e.libraryStatus,c=e.setLibraryStatus;return Object(u.jsxs)("nav",{children:[Object(u.jsx)("h1",{children:"Chill Vibes"}),Object(u.jsxs)("button",{onClick:function(){return c(!t)},children:["Library",Object(u.jsx)(l.a,{icon:p.c})]})]})};var O=function(){var e=Object(a.useRef)(null),t=Object(a.useState)(v()),c=Object(s.a)(t,2),n=c[0],o=c[1],i=Object(a.useState)(n[0]),l=Object(s.a)(i,2),p=l[0],d=l[1],j=Object(a.useState)(!1),f=Object(s.a)(j,2),O=f[0],C=f[1],x=Object(a.useState)(!1),S=Object(s.a)(x,2),y=S[0],B=S[1],k=Object(a.useState)({currentTime:0,duration:0}),w=Object(s.a)(k,2),T=w[0],N=w[1],P=function(e){var t=e.target.currentTime,c=e.target.duration;N(Object(r.a)(Object(r.a)({},T),{},{currentTime:t,duration:c}))};return Object(u.jsxs)("div",{className:"App ".concat(y?"library-active":""),children:[Object(u.jsx)(g,{libraryStatus:y,setLibraryStatus:B}),Object(u.jsx)(b,{currentSong:p,setCurrentSong:d}),Object(u.jsx)(h,{songs:n,setSongInfo:N,songInfo:T,audioRef:e,playSongHandler:function(){O?(e.current.pause(),C(!O)):(e.current.play(),C(!O))},isPlaying:O,setIsPlaying:C,currentSong:p,setCurrentSong:d,setSongs:o}),Object(u.jsx)(m,{setCurrentSong:d,songs:n,audioRef:e,isPlaying:O,setSongs:o,libraryStatus:y}),Object(u.jsx)("audio",{onTimeUpdate:P,ref:e,src:p.audio,onLoadedMetadata:P})]})},C=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,25)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,o=t.getLCP,i=t.getTTFB;c(e),a(e),n(e),o(e),i(e)}))};i.a.render(Object(u.jsx)(n.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),C()}},[[22,1,2]]]);
//# sourceMappingURL=main.2100de8d.chunk.js.map