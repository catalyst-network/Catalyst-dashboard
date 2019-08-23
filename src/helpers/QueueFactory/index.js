function Queue(size = 50) {
  this.data = new Array(size).fill(19);
}

Queue.prototype.add = function add(record) {
  this.data.unshift(record);
};

Queue.prototype.remove = function remove() {
  this.data.pop();
};

Queue.prototype.first = function first() {
  return this.data[0];
};

Queue.prototype.last = function last() {
  return this.data[this.data.length - 1];
};

Queue.prototype.size = function size() {
  return this.data.length;
};
export default Queue;
