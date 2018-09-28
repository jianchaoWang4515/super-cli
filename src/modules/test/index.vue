<template>
    <div></div>
</template>
<script>
export default {
    name: 'test',
    created () {
    // 解构赋值与扩展运算符对于复合型的数据是浅拷贝属于引用
        let obj = {
            b: '1',
            a: {
                b: 2
            }
        }
        let { b, a } = obj
        obj.b = '2'
        console.log(b) // 1
        b = 'q'
        a.b = 4
        console.log(obj.a.b) // 4 解构赋值对于复合型数据为引用
        obj.a.b = 3
        console.log(a.b) // 3 引用
        console.log(b) // 'q'
        console.log(obj) // { b: '1', a: { b: 3 } }
        let z = { a: 3, b: { c: 5 } }
        let n = { ...z }
        let f = Object.assign({}, z)
        z.a = 4
        console.log(n.a) // 3
        n.a = 5
        n.b.c = 6
        n.b = 9
        console.log(z) // { a: 4, b: { c: 6 } }
        console.log(n) // { a: 5, b: 9 }
        console.log(f) // { a: 3, b: { c: 6 } }
        let t = { a: 1 }
        let y = t
        y.a = 2
        console.log(t) // { a: 2 }
        let q = { a: 1, b: { c: 7 } }
        let w = JSON.parse(JSON.stringify(q))
        w.b.c = 8
        console.log(q) // { a: 1, b: { c: 7 } }
    }
}
</script>