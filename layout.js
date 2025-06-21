document.addEventListener("DOMContentLoaded", function () {
  // Page has finished loading. Now, do things.
  loadLayout();

  // Add any custom JavaScript code here...
});

function loadLayout() {
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  mainEl.insertAdjacentHTML("beforebegin", headerHTML());
  mainEl.insertAdjacentHTML("afterend", footerHTML());
  giveActiveClassToCurrentPage();
}

// const nesting = getNesting();

function headerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `
      <!-- HEADER -->

      <header>
        
      </header>
        
      <!-- LEFT SIDEBAR -->

      <aside class="left-sidebar">
        
        <!-- NAVIGATION -->
        <nav>
          <div class="sidebar-title"> Disciplinas </div>
          <ul>
            <li><a class="link" href="modulo-introdutorio.html">Módulo Introdutório de Conceitos Básicos de Computação</a></li>
            <li><a class="link" href="FDS.html">Fundamentos de Desenvolvimento de Software</a></li>
            <li><a class="link" href="design.html">Fundamentos de Design de Sistemas</a></li>
          </ul>
        </nav>
        
        <div class="sidebar-section">
          <div class="calendar-header">
            <button id="prev-month">&lt;</button>
            <h2 id="calendar-month-year">Maio 2025</h2>
            <button id="next-month">&gt;</button>
          </div>
          <div class="calendar-grid" id="calendar-grid">
            <!-- Dias aparecem aqui via JS -->
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Antes de iniciar os estudos:</div>
          <ul>
            <li>limpe toda sua mesa de estudo</li>
            <li>deixe seu celular longe do seu alcance (se usa ele, coloque no mudo)</li>
            <li>coloque sua playlist de estudos preferida </li>
            <li>separe a garrafa de água e beba pelo menos 3x ao dia</li>
          </ul>
        </div>
        
      </aside>
      `;
}

function footerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `
      <!-- FOOTER -->

      <footer>
            <div>Footer Text. <a href="/">Link.</a></div>
      </footer>`;
}

// function giveActiveClassToCurrentPage() {
//   const els = document.querySelectorAll("nav a");
//   [...els].forEach((el) => {
//     const href = el.getAttribute("href").replace(".html", "").replace("#", "");

//     let pathname = window.location.pathname.replace("/public/", "");

//     // Remove '.html' do pathname se presente
//     pathname = pathname.replace(".html", "");

//     // Garante que o pathname da raiz seja tratado como '/'
//     if (pathname === '/index') { // Se a URL for /index.html ou /index
//         pathname = '/';
//     }

//     // Compara o href do link com o pathname atual
//     // Para a Home: se href for '/' ou '/index', e pathname for '/'
//     if ((href === "/" || href === "/index") && pathname === "/") {
//       el.classList.add("active");
//     }
//     // Para outras páginas: se href e pathname forem exatamente iguais
//     else if (href !== "/" && href === pathname) {
//       el.classList.add("active");
//     }

//     /* Lógica de Subnavegação: */
//     if (el.classList.contains("active")) { // Apenas se o link for ativo
//       if (el.closest("details")) {
//         el.closest("details").setAttribute("open", "open");
//         el.closest("details").classList.add("active");
//       }

//       if (el.closest("ul")) {
//         if (el.closest("ul").closest("ul")) { // Para sub-sub-menus
//           el.closest("ul").closest("ul").classList.add("active");
//         }
//       }
//     }
//   });
// }

// function getNesting() {
//   const numberOfSlashes = window.location.pathname.split("/").length - 1;
//   if (numberOfSlashes == 1) return "./";
//   return "../".repeat(numberOfSlashes - 1);
// }

// calendario
document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById("calendar-grid");
  const monthYear = document.getElementById("calendar-month-year");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  let currentDate = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    monthYear.textContent = `${monthNames[month]} ${year}`;
    calendarGrid.innerHTML = "";

    // Dias da semana
    ["D", "S", "T", "Q", "Q", "S", "S"].forEach((d) => {
      const dayEl = document.createElement("div");
      dayEl.textContent = d;
      // dayEl.style.fontWeight = "bold";
      calendarGrid.appendChild(dayEl);
    });

    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement("div");
      calendarGrid.appendChild(emptyCell);
    }

    const today = new Date();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement("div");
      dayEl.textContent = day;

      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayEl.classList.add("today");
      }

      calendarGrid.appendChild(dayEl);
    }
  }

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});
