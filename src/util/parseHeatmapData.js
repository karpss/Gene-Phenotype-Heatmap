/*eslint-disable*/

const findGeneIndex = (gene_list, marker_symbol) =>
gene_list.findIndex(({ id: geneId }) => geneId === marker_symbol);

const findTopLevelPhenotypeIndex = (top_level_phenotype_terms, top_level_mp_term_id) =>
top_level_phenotype_terms.findIndex(({ top_level_mp_term_id: tlpId }) => tlpId === top_level_mp_term_id);


 export const parseHeatmapData = (data) => {

    const gene_list = [];
    const top_level_phenotype_terms = [];

    for (let i = 0; i < data.length; i++) {
        const phenotype = data[i];
        let gene_list_index = findGeneIndex(gene_list, phenotype.marker_symbol);
        if (gene_list_index === -1) {
            gene_list_index = gene_list.length;
          gene_list.push({
            id: phenotype.marker_symbol,
            total_phenotype_terms: 0,
            marker_accession_id: phenotype.marker_accession_id,
            data: [],
          });
        }

        let topLevelPhenotypeIndex = findTopLevelPhenotypeIndex(
            top_level_phenotype_terms,
            phenotype.top_level_phenotype_term.top_level_mp_term_id
          );
           
          if (topLevelPhenotypeIndex === -1) {
            topLevelPhenotypeIndex = top_level_phenotype_terms.length;
            top_level_phenotype_terms.push(phenotype.top_level_phenotype_term);
          }

          gene_list[gene_list_index].data[topLevelPhenotypeIndex] = {
            x: phenotype.top_level_phenotype_term.top_level_mp_term_name,
            y: phenotype.phenotype_count,
            xKey: phenotype.top_level_phenotype_term.top_level_mp_term_id,
            yKey: phenotype.marker_accession_id,
            index: gene_list_index,
            procedures: phenotype.procedures,
            top_level_phenotype_term_id: phenotype.top_level_phenotype_term.top_level_mp_term_id,
            phenotype_terms: phenotype.phenotype_terms,
          };





    }


    const genes_list_ranking = [];

    for (let i = 0; i < gene_list.length; i++) {

        for (let j = 0; j < top_level_phenotype_terms.length; j++) {
            const data = gene_list[i].data[j]; 
            if (data === undefined) {
                gene_list[i].data[j] = {
                    x: top_level_phenotype_terms[j].top_level_mp_term_name,
                    y: null,
                    index: j,
                    xKey: "top_level_mp_term_name",
                    yKey: "",
                    top_level_phenotype_term_id: top_level_phenotype_terms[j].top_level_mp_term_id,
                }





            } else {
                gene_list[i].total_phenotype_terms += data.y ?? 0;
              }





    }

    
    gene_list[i].data.sort(({ x }, { x: y }) => x.localeCompare(y, "en-US"));
    genes_list_ranking[i] = i;

}



gene_list.sort(({ id: a }, { id: b }) => a.localeCompare(b, "en-US"));

genes_list_ranking.sort(
  (a, b) => gene_list[b].total_phenotype_terms - gene_list[a].total_phenotype_terms
);

top_level_phenotype_terms.sort((a, b) => a.top_level_mp_term_name.localeCompare(b.top_level_mp_term_name, "en-US"));


for (const [index, value] of top_level_phenotype_terms.entries()) {
    value.index = index;
  }

  return {
    gene_list,
    genes_list_ranking,
    top_level_phenotype_terms,
  };





}

