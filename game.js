const $=x=>document.getElementById(x),C=$("content"),bar=$("progress"),lvl=$("lvl"),coinsEl=$("coins"),tag=$("tag"),hearts=$("hearts"),hint=$("hint");
let n=0,coins=0,lives=3,timer;
const L=[
["01","THE OBVIOUS BUTTON","This button is completely safe. Probably.","START 😇",()=>trap()],
["02","THREE DOORS","One door gives you the prize. Two doors waste your time.","doors",()=>doors()],
["03","DO NOT TAP","The instruction is simple: do absolutely nothing.","wait",()=>wait()],
["04","GENIUS CHECK","Select the answer that is definitely correct.","quiz",()=>quiz()],
["05","PASSWORD","Enter the secret password. Hint: it's written below.","pass",()=>password()],
["06","REACTION TEST","Tap the button exactly when it says NOW.","reaction",()=>reaction()],
["07","INVISIBLE MAZE","Get the dot to the exit. Walls are totally fair.","maze",()=>maze()],
["08","99% LOADING","Please wait patiently. This is a serious game.","load",()=>loading()],
["09","THE EXIT","Finally! Press EXIT to leave.","exit",()=>exitTrap()],
["10","FINAL BOSS","Defeat the boss. Surely the game can't troll you now.","boss",()=>boss()],
["11","THE INTERVIEW","Answer honestly. The game respects honesty.","interview",()=>interview()],
["12","ABSOLUTELY FINAL","This is definitely the final level.","final",()=>finale()]
];
function base(title,text,emoji="😂"){C.innerHTML=`<div class="hero"><div class="emoji">${emoji}</div><h1>${title}</h1><p>${text}</p><div class="arena" id="arena"></div></div>`}
function b(text,fn,cl="btn primary"){let x=document.createElement("button");x.className=cl;x.textContent=text;x.onclick=fn;return x}
function fail(msg){coins++;coinsEl.textContent=coins;hearts.textContent="❤️".repeat(lives);$("arena").classList.add("shake");toast(msg);hint.textContent="Wrong. But funny.";setTimeout(()=>{$("arena").classList.remove("shake")},300)}
function toast(msg){let t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>t.classList.remove("show"),1800)}
function trap(){base("You really pressed it.","That was the most suspicious button in history.");let a=$("arena"),x=b("OPEN REWARD 🎁",()=>fail("REWARD.exe has stopped working. 😂"));a.append(x);setTimeout(()=>x.textContent="DELETE YOUR PROGRESS",900)}
function doors(){base("Choose one.","Left, middle or right. There is definitely a correct answer.","🚪");let a=$("arena");["LEFT","MIDDLE","RIGHT"].forEach((x,i)=>{let q=b(x+" 🚪",()=>fail(["Left was correct... but we moved the prize.","Middle? Bold choice. Still wrong.","Right was correct 2 seconds ago. 😂"][i]),"btn");a.append(q)})}
function wait(){base("Don't touch anything.","Wait 4 seconds. If you tap, you lose.","🤫");let a=$("arena");a.innerHTML='<b id="wait">WAIT... 4</b>';let s=4;let iv=setInterval(()=>{s--;wait.textContent=s?`WAIT... ${s}`:"DONE!";if(!s){clearInterval(iv);setTimeout(()=>next(),500)}},1000);a.onclick=()=>{clearInterval(iv);fail("You touched the screen. Incredible. 😂");setTimeout(()=>wait(),700)}}
function quiz(){base("What is 2 + 2?","Easy. Don't overthink it.","🧠");let a=$("arena");["3","4","22","Depends"].forEach(x=>{let q=b(x,()=>x==="4"?fail("Correct! Unfortunately, this level rejects correct answers. 😂"):fail("Wrong answer. Your brain deserves a loading screen."),"btn");a.append(q)})}
function password(){base("Secret password","The password is literally: TRUSTME","🔐");let a=$("arena");let inp=document.createElement("input");inp.placeholder="Type password";inp.style.cssText="padding:14px;border-radius:12px;background:#ffffff0b;border:1px solid #ffffff17;color:white;width:55%";let q=b("UNLOCK",()=>fail(inp.value.toUpperCase()==="TRUSTME"?"Correct password. Wrong game. 😂":"Even the password rejected you."));a.append(inp,q)}
function reaction(){base("Wait for NOW","Then tap the button. Not before.","⏱️");let a=$("arena"),q=b("WAIT...",()=>fail("TOO EARLY! 😂"));a.append(q);setTimeout(()=>{q.textContent="NOW! TAP!";q.onclick=()=>{coins+=5;coinsEl.textContent=coins;next()}},2500)}
function maze(){base("Find the exit","The green-looking button is definitely not suspicious.","🧩");let a=$("arena");for(let i=0;i<7;i++){let q=b(i===6?"EXIT 🟢":"?",()=>i===6?next():fail("Wrong path. The maze laughed at you."),"btn tiny absolute");q.style.left=(8+Math.random()*78)+"%";q.style.top=(8+Math.random()*78)+"%";a.append(q)}}
function loading(){base("Loading...","Please do not refresh.","⌛");let a=$("arena");a.innerHTML='<div class="meter"><i id="m"></i></div>';let p=0;let iv=setInterval(()=>{p++;m.style.width=p+"%";if(p>=99){clearInterval(iv);setTimeout(()=>fail("99% COMPLETE. That's enough. 😂"),800)}},35)}
function exitTrap(){base("Congratulations!","You escaped the game. Just press EXIT.","🚪");let a=$("arena"),q=b("EXIT",()=>{fail("EXIT button was a lie. Welcome back. 😂");setTimeout(()=>next(),700)});a.append(q)}
function boss(){base("FINAL BOSS","Tap ATTACK. What could go wrong?","👹");let a=$("arena"),boss=document.createElement("div");boss.className="face";boss.textContent="👹";a.append(boss);let q=b("ATTACK ⚔️",()=>{q.textContent="BOSS DEFEATED";setTimeout(()=>next(),700)});q.style.marginTop="150px";a.append(q)}
function interview(){base("Why should we hire you?","Choose your strongest skill.","💼");let a=$("arena");["I NEVER GIVE UP","I READ THE MANUAL","I GOOGLE EVERYTHING","I AM THE BOSS"].forEach(x=>{let q=b(x,()=>fail("Excellent answer. Unfortunately, the interviewer is also a troll."),"btn tiny");a.append(q)})}
function finale(){base("THE REAL FINAL LEVEL","Pick the winning button.","🏆");let a=$("arena");["WIN","WIN","WIN"].forEach((x,i)=>{let q=b(x+" 🏆",()=>i===1?finish():fail("Wrong WIN. Yes, there are multiple wrong WIN buttons. 😂"),"btn");a.append(q)})}
function finish(){base("YOU SURVIVED!","12 levels. Hundreds of bad decisions. One professional backbencher.","🏆😂");let a=$("arena");a.innerHTML=`<div><div class="win">🎉</div><h2>FINAL SCORE: ${coins}</h2><p class="green">Achievement unlocked: TRUSTED THE UNTRUSTWORTHY</p></div>`;let q=b("PLAY AGAIN",()=>{n=0;coins=0;lives=3;coinsEl.textContent=0;load()},"btn primary");a.append(q)}
function load(){let x=L[n];lvl.textContent=n+1;tag.textContent="LEVEL "+x[0]+" • "+x[1];bar.style.width=((n+1)/L.length*100)+"%";lives=3;hearts.textContent="❤️❤️❤️";x[5]();n===L.length-1?null:null}
function next(){n++;if(n>=L.length){finish();return}load()}
load();