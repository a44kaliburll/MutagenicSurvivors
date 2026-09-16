const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
const code = html.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/init\(\);\s*$/, '');
function boot() {
  const listeners = {};
  const el = () => ({ style: {}, classList: {add(){}, remove(){}, toggle(){}}, querySelector: () => el(), addEventListener(){}, innerHTML: '' });
  const context = vm.createContext({ console, window: {addEventListener(){}, matchMedia:()=>({matches:false})}, document: {addEventListener(){}, getElementById:()=>el(), querySelectorAll:()=>[]}, addEventListener: (name, fn) => { listeners[name] = fn; }, localStorage:{setItem(){},getItem(){return null}}, setTimeout(){}, clearTimeout(){}, navigator:{} });
  vm.runInContext(code, context);
  return { run: text => vm.runInContext(text, context), listeners };
}
test('all inline game JavaScript compiles and definitions initialize', () => { boot(); });
test('pooled objects never inherit old projectile or particle flags', () => {
  const {run} = boot();
  assert.equal(run("const pool=makePool(()=>({})); const old=pool.obtain(); old.ring=true; old.hostile=true; pool.release(old); Object.keys(pool.obtain()).length"),0);
});
test('decorative particle budget is bounded', () => {
  const {run} = boot();
  assert.equal(run("spawnParticles(0,0,'red',1000); spawnRing(0,0,'red',10); game.particles.length"),600);
});
test('comfort preferences can disable particles without changing enemies', () => {
  const {run} = boot();
  assert.equal(run("SAVE.comfort={particles:false}; spawnParticles(0,0,'red',20); spawnRing(0,0,'red',10); game.particles.length"),0);
});
test('save snapshots retain colony and mutation state independently', () => {
  const {run} = boot();
  assert.equal(run("game.player=createPlayer(); game.swarm=[{x:2,y:3,hp:12}]; game.mutagen={cur:67,max:100}; game.mutagensApplied={shell:1}; const snap=serializeRun(); game.swarm[0].hp=0; snap.swarm[0].hp===12 && snap.mutagen.cur===67 && snap.mutagensApplied.shell===1"),true);
});
test('combat stops immediately when an objective opens a choice', () => {
  const {run} = boot();
  assert.equal(run("game.state='running'; buildQuadtree=()=>{}; updateDirector=()=>{}; updateEnvironment=()=>{}; updateBoostPads=()=>{}; updateObjective=()=>{game.state='mutation'}; let attacks=0; updateWeapons=()=>attacks++; stepGame(0.016); attacks"),0);
});
test('typing in a save field does not trigger movement or shortcuts', () => {
  const {run,listeners} = boot(); run('setupInput(); game.state="running";');
  listeners.keydown({key:'w', target:{closest:()=>true}, preventDefault(){throw Error('Text input intercepted');}});
  assert.equal(run('input.up'),false);
});
test('held pause key does not repeatedly toggle pause', () => {
  const {run,listeners} = boot(); run('setupInput(); let toggles=0; togglePause=()=>toggles++;');
  listeners.keydown({key:'Escape', repeat:true, target:{closest:()=>false}});
  assert.equal(run('toggles'),0);
});
test('leaving a running game clears input, pauses and saves', () => {
  const {run} = boot();
  assert.equal(run("game.state='running'; input.up=true; input.stick={x:1,y:0}; togglePause=()=>game.state='paused'; let saved=false; saveRunSnapshot=()=>saved=true; pauseOnLeave(); game.state==='paused' && !input.up && input.stick===null && saved"),true);
});
test('leaving a choice screen never resumes combat', () => {
  const {run} = boot();
  assert.equal(run("game.state='mutation'; saveRunSnapshot=()=>{}; pauseOnLeave(); game.state"),'mutation');
});
test('swarm resume restores mutation effects before deriving player stats', () => {
  const {run} = boot();
  assert.equal(run(`
    game.player=createPlayer(); game.mode='swarm'; game.swarm=[{x:2,y:3,hp:12}];
    game.mutagensApplied={shell:true}; game.mutagen={cur:67,max:100}; SAVE.suspended=serializeRun();
    let restoredBeforeStats=false;
    recomputeStats=()=>{ restoredBeforeStats=!!game.mutagensApplied.shell; game.player.maxHp=100; };
    refreshTray=()=>{}; hideAllOverlays=()=>{}; setHud=()=>{}; bigBanner=()=>{};
    Music.randomTrack=()=>{}; Music.setIntensity=()=>{}; Music.start=()=>{};
    resumeSavedRun();
    restoredBeforeStats && game.swarm[0].hp===12 && game.mutagen.cur===67
  `),true);
});
