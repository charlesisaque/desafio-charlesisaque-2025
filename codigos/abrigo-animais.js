class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const lista = [];
    const b1 = brinquedosPessoa1.split(',');
    const b2 = brinquedosPessoa2.split(',');
    const animais = ordemAnimais.split(',');

    const brinquedosValidos = ['RATO','BOLA','LASER','CAIXA','NOVELO','SKATE'];
    const animaisValidos = ['Rex','Fofo','Bola','Mimi','Bebe','Loco'];

    // Brinquedos duplicados
    if (new Set(b1).size !== b1.length || new Set(b2).size !== b2.length) {
      return { erro: 'Brinquedo inválido', lista: null };
    }

    // Brinquedos inválidos
    for (const b of [...b1, ...b2]) {
      if (!brinquedosValidos.includes(b)) {
        return { erro: 'Brinquedo inválido', lista: null };
      }
    }

    // Animais inválidos
    for (const a of animais) {
      if (!animaisValidos.includes(a)) {
        return { erro: 'Animal inválido', lista: null };
      }
    }

    // Limite de 3 animais
    if (animais.length > 3) {
      return { erro: 'Não pode adotar mais de 3 animais', lista: null };
    }

    // Loco só vai para o abrigo se for o único
    if (animais.includes('Loco') && animais.length < 2) {
      lista.push('Loco - abrigo');
      return { erro: null, lista };
    }

    // Pontuação baseada nos brinquedos
    const pontos = {};
    animais.forEach(a => pontos[a] = 0);

    animais.forEach(a => {
      if (b1.includes(a)) pontos[a] += 1;
      if (b2.includes(a)) pontos[a] += 1;
    });

    // Separar gatos
    const gatos = ['Fofo','Mimi'];

    // Distribuição final
    animais.forEach((a, i) => {
      if (gatos.includes(a)) {
        lista.push(`${a} - abrigo`);
      } else {
        // Alterna pessoas se não for gato
        const count1 = lista.filter(x => x.includes('pessoa 1')).length;
        const count2 = lista.filter(x => x.includes('pessoa 2')).length;
        const pessoa = count1 <= count2 ? 1 : 2;
        lista.push(`${a} - pessoa ${pessoa}`);
      }
    });

    return { erro: null, lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
