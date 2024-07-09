const filterFollowers = (followers) => {
    let ac = followers.filter(function(follower) {
        if (this.count < 10 && follower.username.toLowerCase().includes(userSearch.toLowerCase())) {
            return true
        }
        return false;
    }, { count: 0 })
    setAcData(ac)
}

function *filter(array, condition, maxSize) {
    if (!maxSize || maxSize > array.length) {
      maxSize = array.length;
    }
    let count = 0;
    let i = 0;
    while ( count< maxSize && i < array.length ) {
      if (condition(array[i])) {
        yield array[i];
        count++;
      }
      i++;
    }
  }
