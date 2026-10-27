// Začátek turnaje: 22. 5. 2027, 9:00 (letní čas, UTC+2)
const START = new Date("2027-05-22T09:00:00+02:00");
const DURATION_HOURS = 10; // po této době se zobrazí "Turnaj skončil"

// Přihlášené týmy – stačí upravit seznam
const TEAMS_OPEN = [
  "Team 01",
  "Team 02",
  "Team 03",
  "Team 04",
  "Team 05",
  "Team 06",
  "Team 07"
];


// Přihlášené týmy – stačí upravit seznam
const TEAMS_OLD_BOYS = [
  "Team 1",
  "Team 2",
  "Team 3",
  "Team 4",
  "Team 5"
];

// Správný tvar slova podle počtu (1 den, 2 dny, 5 dní)
function plural(n, one, few, many) {
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return few;
  return many;
}

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const now = new Date();
  const diff = START - now;
  const status = $("status");

  if (diff <= 0) {
    const ended = now - START > DURATION_HOURS * 3600 * 1000;
    status.textContent = ended ? "Turnaj skončil. Děkujeme všem za účast." : "Turnaj právě probíhá!";
    $("d").textContent = "0";
    $("h").textContent = $("m").textContent = $("s").textContent = "00";
    clearInterval(timer);
    return;
  }

  const total = Math.floor(diff / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  $("d").textContent = d;
  $("h").textContent = pad(h);
  $("m").textContent = pad(m);
  $("s").textContent = pad(s);

  $("d-l").textContent = plural(d, "den", "dny", "dní");
  $("h-l").textContent = plural(h, "hodina", "hodiny", "hodin");
  $("m-l").textContent = plural(m, "minuta", "minuty", "minut");
  $("s-l").textContent = plural(s, "sekunda", "sekundy", "sekund");
}

function renderTeamsOpen() {
  const list = $("team-list-open");
  TEAMS_OPEN.forEach((name, i) => {
    const li = document.createElement("li");
    const no = document.createElement("span");
    no.className = "no";
    no.textContent = i + 1;
    li.append(no, name);
    list.append(li);
  });
  $("team-count-open").textContent = "(" + TEAMS_OPEN.length + ")";
}

function renderTeamsOldBoys() {
  const list = $("team-list-old-boys");
  TEAMS_OLD_BOYS.forEach((name, i) => {
    const li = document.createElement("li");
    const no = document.createElement("span");
    no.className = "no";
    no.textContent = i + 1;
    li.append(no, name);
    list.append(li);
  });
  $("team-count-old-boys").textContent = "(" + TEAMS_OLD_BOYS.length + ")";
}

renderTeamsOpen();
renderTeamsOldBoys();
tick();
const timer = setInterval(tick, 1000);
