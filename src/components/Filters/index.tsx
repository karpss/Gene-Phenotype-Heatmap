/*eslint-disable*/
import React, {useMemo}  from 'react';
import Select, { ActionMeta } from "react-select";
import Button from 'react-bootstrap/Button';

const Filters: React.FC<FilterProps> = ({
  data,
  genes,
  setGenes,
  onFilterChange,
  phenotype,
  percentage,
  setPercentage,
  page,
  setPage,
  filter,
  setFilter,
  setPhenotype



}) => {



  const handleGeneFilter = (
    selections:any,
    _actionMeta: ActionMeta<any>

 ) => {
   const selectedGenes = selections
     ? selections.map(
      (option: { value: string; label: string   }) => 
      option.value
      )

     : [];
     setGenes(selectedGenes);
     setFilter(selectedGenes.length > 0 ? "genes_list" : undefined);
     onFilterChange();
 };

 




  const handlePhenotypeFilter = (
    selections: any,
    _actionMeta: ActionMeta<any>
  ) => {
    const topPhenotypes = selections
      ? selections.map(
          (option: { value: string; label: string }) => option.value
        )
      : [];
      setPhenotype(topPhenotypes);
      setFilter(topPhenotypes.length > 0 ? "phenotype" : undefined);
      onFilterChange();
  };



    


    const handlePercentageFilter = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const filterCount = parseInt(event.target.value);
      setPercentage(filterCount);
      setFilter("calc_percentage");
      onFilterChange();
    };

    const handleReset = () => {
      setPhenotype([]);
      setGenes([]);
      setPercentage(0);
      setFilter(undefined);
      setPage(0);
      onFilterChange();
    };

    const geneSelections = useMemo(
      () =>
        data?.gene_list?.map((g:any) => ({
          value: g.marker_accession_id,
          label: g.id,
        })) ?? [],
      [data]
    );


    const phenotypeSelections = useMemo(
      () =>
        data?.top_level_phenotype_terms?.map((phen:any) => ({
          value: phen.top_level_mp_term_id,
          label: phen.top_level_mp_term_name,
        })) ?? [],
      [data]
    );



    console.log("GGG",geneSelections);


  return (
    <div className="filter_container">
      <div className="row">
        <div className="col-md-6 col-sm-12 mb-2">
          <label htmlFor="gene_filter-input">
            Filter by gene list: 
          </label>
          <Select
            id="gene-filter"
            className="m-2 select-filter"
            options={geneSelections}
            value={genes.map((gene) => ({
              value: gene,
              label:
              geneSelections?.find((option:any) => 
              option.value === gene)?.label ||
                "",
            }))}
            isMulti
            onChange={handleGeneFilter}
            placeholder="Select genes..."
          />
        </div>
        <div className="col-md-6 col-sm-12 mb-2">
          <label htmlFor="term-filter-select">
            Filter by significant phenotype system: 
          </label>
          <Select
            id="phenotype-filter-select"
            className="m-2 select-filter"
            options={phenotypeSelections}
            value={phenotype.map((phen) => ({
              value: phen,
              label:
              phenotypeSelections?.find((option:any) => option.value === phen)?.label ||
                "",
            }))}
            isMulti
            onChange={handlePhenotypeFilter}
            
            placeholder="Select phenotypes..."
          />
        </div>
        <div className="col-md-6 col-sm-12 mb-2">
          <label htmlFor="percentage-filter-input">
            Filter top 10% of the genes that have the highest phenotype count{" "}
            
          </label>
          <div >
            <input
              type="range"
              id="percentage-filter"
              className="form-range me-2 m-2"
              min="0"
              max="70"
              step="5"
              value={percentage}
              onChange={handlePercentageFilter}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mb-2 d-flex justify-content-end">
          <Button size="sm" onClick={handleReset} variant="primary">Reset</Button>{' '}
        </div>
      </div>
    </div>
  )
}

export default Filters;