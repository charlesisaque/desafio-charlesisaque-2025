// validador.js
// Utilitários de validação e checagem de capacidade de adoção.

function validarAnimais(animaisEntrada, animaisValidos = ['Rex','Mimi','Fofo','Zero','Bola','Bebe','Loco']) {
  const seen = new Set();
  for (const a of animaisEntrada) {
    if (!animaisValidos.includes(a) || seen.has(a)) {
      return { valido: false, erro: 'Animal inválido' };
    }
    seen.add(a);
  }
  return { valido: true };
}

// Valida brinquedos de UMA pessoa: deve ser brinquedo válido e sem duplicatas na lista da pessoa
function validarBrinquedos(brinquedosEntrada, brinquedosValidos = ['RATO','BOLA','LASER','NOVELO','CAIXA','SKATE']) {
  const seen = new Set();
  for (const b of brinquedosEntrada) {
    if (!brinquedosValidos.includes(b) || seen.has(b)) {
      return { valido: false, erro: 'Brinquedo inválido' };
    }
    seen.add(b);
  }
  return { valido: true };
}

// Verifica se brinquedosAnimal aparecem na sequência dos brinquedosPessoa,
// permitindo itens extras entre eles (intercalação).
// Se ordemImporta === false, apenas verifica se TODOS os brinquedos estão presentes (conjunto).
function podeAdotar(brinquedosPessoa, brinquedosAnimal, ordemImporta = true) {
  if (ordemImporta) {
    let idx = 0;
    for (let i = 0; i < brinquedosPessoa.length && idx < brinquedosAnimal.length; i++) {
      if (brinquedosPessoa[i] === brinquedosAnimal[idx]) idx++;
    }
    return idx === brinquedosAnimal.length;
  } else {
    // ordem não importa: todos devem estar presentes
    return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
  }
}

function contarAnimaisAdotados(listaAdocoes, pessoa) {
  return listaAdocoes.filter(item => item.endsWith(pessoa)).length;
}

// Regra do Loco: retorna true se já existe outro animal adotado (pessoa 1 ou 2)
function aplicarRegraLoco(listaAdocoes) {
  const outros = listaAdocoes.filter(item => (item.endsWith('pessoa 1') || item.endsWith('pessoa 2')));
  return outros.length > 0;
}

export {
  validarAnimais,
  validarBrinquedos,
  podeAdotar,
  contarAnimaisAdotados,
  aplicarRegraLoco
};
