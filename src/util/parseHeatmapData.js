const findGeneIndex = (gene_list, marker_symbol) =>
  gene_list.findIndex(({ id: geneId }) => geneId === marker_symbol);

const findTopLevelPhenotypeIndex = (
  top_level_phenotype_terms,
  top_level_mp_term_id
) =>
  top_level_phenotype_terms.findIndex(
    ({ top_level_mp_term_id: tlpId }) => tlpId === top_level_mp_term_id
  );

const parseHeatmapData = (data) => {
  const geneList = [];
  const topLevelPhenotypeTerms = [];

  for (let i = 0; i < data.length; i += 1) {
    const phenotype = data[i];
    let geneListIndex = findGeneIndex(geneList, phenotype.marker_symbol);
    if (geneListIndex === -1) {
      geneListIndex = geneList.length;
      geneList.push({
        id: phenotype.marker_symbol,
        total_phenotype_terms: 0,
        marker_accession_id: phenotype.marker_accession_id,
        data: [],
      });
    }

    let topLevelPhenotypeIndex = findTopLevelPhenotypeIndex(
      topLevelPhenotypeTerms,
      phenotype.top_level_phenotype_term.top_level_mp_term_id
    );

    if (topLevelPhenotypeIndex === -1) {
      topLevelPhenotypeIndex = topLevelPhenotypeTerms.length;
      topLevelPhenotypeTerms.push(phenotype.top_level_phenotype_term);
    }

    geneList[geneListIndex].data[topLevelPhenotypeIndex] = {
      x: phenotype.top_level_phenotype_term.top_level_mp_term_name,
      y: phenotype.phenotype_count,
      xKey: phenotype.top_level_phenotype_term.top_level_mp_term_id,
      yKey: phenotype.marker_accession_id,
      index: geneListIndex,
      procedures: phenotype.procedures,
      top_level_phenotype_term_id:
        phenotype.top_level_phenotype_term.top_level_mp_term_id,
      phenotype_terms: phenotype.phenotype_terms,
    };
  }

  const geneListRanking = [];

  for (let i = 0; i < geneList.length; i += 1) {
    for (let j = 0; j < topLevelPhenotypeTerms.length; j += 1) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const data = geneList[i].data[j];
      if (data === undefined) {
        geneList[i].data[j] = {
          x: topLevelPhenotypeTerms[j].top_level_mp_term_name,
          y: null,
          index: j,
          xKey: 'top_level_mp_term_name',
          yKey: '',
          top_level_phenotype_term_id:
            topLevelPhenotypeTerms[j].top_level_mp_term_id,
        };
      } else {
        geneList[i].total_phenotype_terms += data.y ?? 0;
      }
    }

    geneList[i].data.sort(({ x }, { x: y }) => x.localeCompare(y, 'en-US'));
    geneListRanking[i] = i;
  }

  geneList.sort(({ id: a }, { id: b }) => a.localeCompare(b, 'en-US'));

  geneListRanking.sort(
    (a, b) =>
      geneList[b].total_phenotype_terms - geneList[a].total_phenotype_terms
  );

  topLevelPhenotypeTerms.sort((a, b) =>
    a.top_level_mp_term_name.localeCompare(b.top_level_mp_term_name, 'en-US')
  );

  topLevelPhenotypeTerms.forEach((value, index) => {
    topLevelPhenotypeTerms[index] = { ...value, index };
  });

  return {
    geneList,
    geneListRanking,
    topLevelPhenotypeTerms,
  };
};

export default parseHeatmapData;
