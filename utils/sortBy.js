const sortBy = (data, input, ascendingOrder) => {
  const arr = data.slice();

  if (input === 'time' || input === 'moves'){
    if (ascendingOrder) {
      return arr.sort( (a, b) => { return a[input] - b[input]; })
    } else if (!ascendingOrder) {
      return arr.sort( (a, b) => { return b[input] - a[input]; })
    }
  } else if (input === 'name'){
    if (ascendingOrder) {
      return arr.sort( (a, b) => {
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();

        if (name1 < name2) { return -1; }
        if (name1 > name2) { return 1; }

        return 0;
      })
    } else if (!ascendingOrder){
      return arr.sort( (a, b) => {
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();

        if (name1 > name2) { return -1; }
        if (name1 < name2) { return 1; }

        return 0;
      })
    }
  }
}

export default sortBy;