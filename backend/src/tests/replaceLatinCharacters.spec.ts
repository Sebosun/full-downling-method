import { expect, test, describe } from 'vitest'
import { replaceLatinCharacters } from '../helpers/replaceLatinCharacters'

describe('Replacement of latin characters in words', () => {
    test('replaces correctly', () => {
        const sentence = 'ā ō ī ē ū'
        const expected = 'a o i e u'
        expect(replaceLatinCharacters(sentence)).toBe(expected)
    })

    test('does not replace other characters', () => {
        const sentence = 'ā ō ī ē ū abc'
        const expected = 'a o i e u abc'
        expect(replaceLatinCharacters(sentence)).toBe(expected)
    })

    const words = ["rosae", "rosārum", "rosīs", "rosās", "rosīs", "rēx", "rēgis", "rēgī", "rēgem", "rēge", "rēgēs", "rēgum", "rēgibus", "rēgēs", "rēgibus"]
    const expct = ["rosae", "rosarum", "rosis", "rosas", "rosis", "rex", "regis", "regi", "regem", "rege", "reges", "regum", "regibus", "reges", "regibus"]

    words.forEach((word, idx) => {
        test(`replaces ${word}`, () => {
            expect(replaceLatinCharacters(word)).toBe(expct[idx])
        })
    })
})

