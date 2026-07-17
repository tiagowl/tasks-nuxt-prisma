function capitalizeFirstWord(value) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toLocaleUpperCase("pt-BR") + trimmed.slice(1);
}

export { capitalizeFirstWord as c };
//# sourceMappingURL=formatters.mjs.map
