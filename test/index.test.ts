import { somar } from "@/index"

test('Deve somar dois numeros', () => {
    const a = 1
    const b = 2
    expect(somar(a, b)).toBe(3)
})