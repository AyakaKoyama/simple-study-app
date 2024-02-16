test("1+1=2",()=>{
    expect(myFunc(1,1)).toBe(2)

})

const myFunc = (first, second) => {
    return first + second
}