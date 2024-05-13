let a = [[{chat: 1}] ,[{chat: 2}],[{chat: 3}],[{chat: 4}]]
let b = [];
for(let i = 0; i < a.length ; i++){
    b.push(a[i][0].chat)
}
console.log(b)