function Set(arr = []) {
    let items = {};
    this.size = 0;
    // has方法
    this.has = function(val) {
        return items.hasOwnProperty(val);
    };
    // add方法
    this.add = function(val) {
        // 如果没有存在items里面就可以直接写入
        if (!this.has(val)) {
            items[val] = val;
            this.size++;
            return true;
        }
        return false;
    };
    arr.forEach((val, i) => {
        this.add(val);
    });
    // delete方法
    this.delete = function(val) {
        if (this.has(val)) {
            delete items[val]; // 将items对象上的属性删掉
            this.size--;
            return true;
        }
        return false;
    };
    // clear方法
    this.clear = function() {
        items = {};
        this.size = 0;
    };
    // keys方法
    this.keys = function() {
        return Object.keys(items);
    };
    // values方法
    this.values = function() {
            return Object.values(items);
        }
        // forEach方法
    this.forEach = function(fn, context) {
        for (let i = 0; i < this.size; i++) {
            let item = Object.keys(items)[i];
            fn.call(context, item, item, items);
        }
    }

    // 并集
    this.union = function(other) {
        let union = new Set();
        let values = this.values();

        for (let i = 0; i < values.length; i++) {
            union.add(values[i]);
        }
        values = other.values(); // 将values重新赋值为新的集合
        for (let i = 0; i < values.length; i++) {
            union.add(values[i]);
        }

        return union;
    };
    // 交集
    this.intersect = function(other) {
        let intersect = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (other.has(values[i])) {
                intersect.add(values[i]);
            }
        }
        return intersect;
    };
    // 差集
    this.difference = function(other) {
        let difference = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            if (!other.has(values[i])) {
                difference.add(values[i]);
            }
        }
        return difference;
    };
    // 子集
    this.subset = function(other) {
        if (this.size > other.size) {
            return false;
        } else {
            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                console.log(values[i])
                console.log(other.values())
                if (!other.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    };
}

module.exports = Set;

// 作者：chenhongdong
// 链接：https://juejin.im/post/5acc57eff265da237f1e9f7c
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


//demo
const Set = require('./Set.js'); //引入上述方法
let set = new Set([2, 1, 3]);
console.log(set.keys()); // [ '1', '2', '3' ]
console.log(set.values()); // [ 1, 2, 3 ]
console.log(set.size); // 3
set.delete(1);
console.log(set.values()); // [ 2, 3 ]
set.clear();
console.log(set.size); // 0

// 并集
let a = [1, 2, 3];
let b = new Set([4, 3, 2]);
let union = new Set(a).union(b).values();
console.log(union); // [ 1, 2, 3, 4 ]

// 交集
let c = new Set([4, 3, 2]);
let intersect = new Set([1, 2, 3]).intersect(c).values();
console.log(intersect); // [ 2, 3 ]

// 差集
let d = new Set([4, 3, 2]);
let difference = new Set([1, 2, 3]).difference(d).values();
// [1,2,3]和[4,3,2]的差集是1
console.log(difference); // [ 1 ]