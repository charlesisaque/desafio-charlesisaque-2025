import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

test('Deve rejeitar brinquedos duplicados', () => {
  const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA,LASER', 'Rex');
  expect(resultado.erro).toBe('Brinquedo inválido');
});

test('Deve rejeitar brinquedo inválido', () => {
  const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BICICLETA', 'Rex');
  expect(resultado.erro).toBe('Brinquedo inválido');
});

test('Não pode adotar mais de 3 animais', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA,LASER,CAIXA,NOVELO', 
    'RATO,BOLA,LASER,CAIXA,NOVELO', 
    'Rex,Bebe,Bola,Fofo,Mimi'
  ); 
});

test('Loco só pode ser adotado se houver outro animal', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'SKATE,RATO', 'RATO,BOLA', 'Loco,Rex'
  );
});

test('Gatos em empate ficam no abrigo (tadinhos)', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'BOLA,LASER', 'BOLA,LASER', 'Mimi,Fofo'
  );
  expect(resultado.lista.includes('Mimi - abrigo')).toBe(true);
  expect(resultado.lista.includes('Fofo - abrigo')).toBe(true);
});

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});
