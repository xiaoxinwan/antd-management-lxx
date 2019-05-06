function addZero(time) {
  return time<10 ? `0${time}`: time
}

export default {
  formatDate(time) {
    if (!time) return;
    let date = new Date(time);
    return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
      date.getDate()
    )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
      date.getSeconds()
    )}`;
  },
  pagination(data, callback) {
    return {
      current: data.result.page,
      pagesize: data.result.page_size,
      total: data.result.total,
      showQuickJumper: true,
      onChange: (current) => {
        callback(current);
      },
      showTotal: () => {
        return `共${data.result.total}页`;
      }
    };
  }
};
