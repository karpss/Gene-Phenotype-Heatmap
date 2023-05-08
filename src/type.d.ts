/*eslint-disable*/


interface PhenotypeData  {
    mp_term_id: string;
    mp_term_name: string;
  };

  interface TopLevelPhenotypeTerm  {
    top_level_mp_term_id: string;
    top_level_mp_term_name: string;
  };
  
  interface ParsedHeatmapData{
    id: string;
    total_phenotype_terms:number;
    marker_accession_id: string;
    data: HeatmapListData[];

  }



interface HeatmapListData {
    x:string;
    y: number | null;
    xKey: string;
   yKey: string;
   index: number;
   top_level_phenotype_term_id:string;
   phenotype_terms?: PhenotypeData[]
   procedures?: string[];
   top_level_phenotype_term?: TopLevelPhenotype & { index: number };
   gene_list?: ParsedHeatmapData
  
}

interface PaginationProps {
page: number;
setPage: React.Dispatch<React.SetStateAction<number>>;
totalHeatMapPages:number;

}