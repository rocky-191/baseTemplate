function Map() {
    let items = {};
    this.size = 0;

    // 操作方法
    // has方法
    this.has = function(val) {
        return items.hasOwnProperty(val);
    };
    // set(key, val)方法
    this.set = function(key, val) {
        items[key] = val;
        this.size++;
    };
    // get(key)方法
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };
    // delete(key)方法
    this.delete = function(key) {
        if (this.has(key)) {
            delete items[key];
            this.size--;
            return true;
        }
        return false;
    };
    // clear()方法
    this.clear = function() {
        items = {};
        this.size = 0;
    };
    // 遍历方法
    // keys()方法
    this.keys = function() {
        return Object.keys(items);
    };
    // values()方法
    this.values = function() {
        return Object.values(items);
    };
    // forEach(fn, context)方法
    this.forEach = function(fn, context) {
        for (let i = 0; i < this.size; i++) {
            let key = Object.keys(items)[i];
            let value = Object.values(items)[i];
            fn.call(context, value, key, items);
        }
    };
}

module.exports = Map;

// 作者：chenhongdong
// 链接：https://juejin.im/post/5acc57eff265da237f1e9f7c
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

//demo
// map.js
// 使用Map类
const Map = require('./Map.js');
let m = new Map();
m.set('Jay', 'Jay的Chou');
m.set(true, '真的');
console.log(m.has('Chou')); // false
console.log(m.size); // 2
console.log(m.keys()); // [ 'Jay', 'true' ]
console.log(m.values()); // [ 'Jay的Chou', '真的' ]
console.log(m.get('jay')); // undefined

m.delete(true);
console.log(m.keys()); // [ 'Jay' ]
console.log(m.values()); // [ 'Jay的Chou' ]