export function currencyFormatterBRL(value: number, withoutSpace = false) {
  const valueFormatted = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  if (withoutSpace) {
    return valueFormatted.replace(/\s/g, '');
  }

  return valueFormatted;
}
