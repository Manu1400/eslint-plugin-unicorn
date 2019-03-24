// 11538 -> Literal

const invalid = /^by @([a-zA-Z0-9-]+)/
const valid   = /^by @([a-zA-Z\d-]+)/

const c = /^([0-9])/
const d = /^by @([0-9])/
const e = /^by @([0-9]+)/
// but with a space, or other char
const f = /[0-9 ]/

// https://github.com/DmitrySoshnikov/regexp-tree/tree/master/src/optimizer
// please use : charClassRemoveDuplicates
const ll = /[\d\d]/


const a = /[0-9][0-9][0-9][0-9][0-9][0-9]/ //TODO: fixer, could be \d{6}
const b = /[0-9][0-9][0-9][0-9][0-9][0-9]{1}/ //TODO: fixer, could be \d{6}

console.log(invalid.test("by @d")) // true

const detected  = /^@([0-9])/
const detected1 = /([0-9]+)/
const detected2 = /([0-9]+)/
const detected3  = /[0-9]{,9}/
const detected4  = /[0-9]{1,9}/
const detected5 = /[0-9]?/
const detected6 = /[0-9][0-9]?/ // but fixer failed
const detected7 = /(1)[0-9]?/
const detected8 = /(1dkdkkdkoekeozkzdokkk'';llsl?)[0-9]?/
const detected9 = /l+([0-9])/
const detected10 = /^([0-9])/

const undetected  = /[0-9\d]/

const undetected1 = /^@([(0-9)]+)/

const undetected2 = /[0\d]/
const undetected3 = /^[(0-9)]+/
const undetected4 = /^@([a0-9]+)/
const undetected5 = /[1234567890]/
const undetected6 = /[0123456789]/

// /foo/
// /fooooooooooooooooooooooodooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo/

const oo = /aaabbbaaabbb/
const ou = /aaaa/

(/[0-9\d]/)
