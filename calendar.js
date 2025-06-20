document.addEventListener('DOMContentLoaded', () => {
  const monthYearDisplay = document.getElementById('monthYearLg');
  const prevMonthBtn = document.getElementById('prevMonthLg');
  const nextMonthBtn = document.getElementById('nextMonthLg');
  const calendarDays = document.getElementById('calendarDaysLg');

  const currentDate = new Date(); // Data atual real
  let displayDate = new Date();   // Data que muda conforme navegação

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Notas
  const notes = {
    '2025-07-07': 'APOL 1 e 2 (FDS)',
  };

  function renderCalendar() {
    calendarDays.innerHTML = ''; // Limpa os dias anteriores

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();

    // Atualiza o título com mês e ano
    monthYearDisplay.textContent = `${months[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Dia da semana do dia 1
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Quantidade de dias no mês

    // Dias vazios antes do primeiro dia
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('day-cell', 'empty');
      calendarDays.appendChild(emptyCell);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('day-cell');

      const dayNumber = document.createElement('div');
      dayNumber.classList.add('day-number');
      dayNumber.textContent = day;
      dayCell.appendChild(dayNumber);

      // Verifica se é hoje
      if (
        day === currentDate.getDate() &&
        month === currentDate.getMonth() &&
        year === currentDate.getFullYear()
      ) {
        dayCell.classList.add('today');
      }

      // Verifica se há uma nota para essa data
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      if (notes[dateKey]) {
        const note = document.createElement('p');
        note.classList.add('manual-note');
        note.textContent = notes[dateKey];
        dayCell.appendChild(note);
      }

      calendarDays.appendChild(dayCell);
    }
  }

  // Botão para mês anterior
  prevMonthBtn.addEventListener('click', () => {
    displayDate.setMonth(displayDate.getMonth() - 1);
    renderCalendar();
  });

  // Botão para próximo mês
  nextMonthBtn.addEventListener('click', () => {
    displayDate.setMonth(displayDate.getMonth() + 1);
    renderCalendar();
  });

  // Primeira renderização
  renderCalendar();
});
