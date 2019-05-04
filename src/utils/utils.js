export default {
  formatDate(time) {
    if (!time) return;
    let date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
