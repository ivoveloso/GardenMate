module.exports = {
  current_date: () => {

    return new Date().toDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return '<span for="img" aria-label="lightbulb">💡</span>';
    } else if (randomNum > 0.4) {
      return '<span for="img" aria-label="laptop">💻</span>';
    } else {
      return '<span for="img" aria-label="gear">⚙️</span>';
    }
  },

  format_start_time: (date1) => {
    const date2 = new Date(date1);
    if (date2.getUTCHours() < 11) {
      return date2.getUTCHours() + "am";
    } else {
      return date2.getUTCHours() + "pm";
    }
  },

  format_end_time: (date1, duration) => {

    const date2 = new Date(date1);
    if (date2.getUTCHours() + duration/60 < 11) {
      return date2.getUTCHours() + duration/60 + "am";
    } else {
      return date2.getUTCHours() + duration/60 + "pm";
    }
  },
};
