document.addEventListener("DOMContentLoaded", function() {
  // 1. Find all team tables
  const teamContainers = document.querySelectorAll('.team-list');

  teamContainers.forEach(container => {
    const rows = container.querySelectorAll('tbody tr');
    const birthdayMap = {};

    rows.forEach(row => {
      // 2. Get the birthday string from the last cell
      // We trim it to avoid issues with whitespace
      const bdayCell = row.cells[row.cells.length - 1];
      if (!bdayCell) return;

      const fullBday = bdayCell.innerText.trim();
      
      // 3. Optional: Strip the year so "12/05/1995" matches "12/05/1998"
      // We split by '/' and take the first two parts (DD/MM)
      const bdayParts = fullBday.split('/');
      const dayMonth = bdayParts[0] + '/' + bdayParts[1];

      // Skip if the birthday is empty or TBC
      if (!dayMonth || dayMonth.includes('undefined')) return;

      // 4. Map the rows to their birthdays
      if (!birthdayMap[dayMonth]) {
        birthdayMap[dayMonth] = [];
      }
      birthdayMap[dayMonth].push(row);
    });

    // 5. Identify the Paradoxes!
    Object.keys(birthdayMap).forEach(date => {
      if (birthdayMap[date].length > 1) {
        // We found a match! Add the class to all matching rows
        birthdayMap[date].forEach(matchingRow => {
          matchingRow.classList.add('is-paradox');
          
          // Optional: Add a little tooltip or text indicator
          const nameCell = matchingRow.cells[1];
          nameCell.innerHTML += ' <small title="Birthday Match!">🎂</small>';
        });
        
        console.log(`Paradox found in ${container.querySelector('h3').innerText}: ${date}`);
      }
    });
  });
});