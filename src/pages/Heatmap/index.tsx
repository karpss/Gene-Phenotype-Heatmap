import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import fetchGenePhenotypesData from '../../api/fetchGenePhenotypesData';
import parseHeatmapData from '../../util/parseHeatmapData';
import styles from './Heatmap.module.css';
import PaginateHeatmap from '../../components/PaginateHeatmap';
import Filters from '../../components/Filters';

function Heatmap() {
  const [isLoading, setIsLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState<FormattedData | null>(null);
  const [formattedheatmapData, setFormattedheatmapData] =
    useState<FormattedData | null>(null);
  const [page, setPage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(20);
  const [percentage, setPercentage] = useState<number>(0);
  const [filter, setFilter] = useState<
    'genes_list' | 'calc_percentage' | 'phenotype'
  >();
  const [phenotype, setPhenotype] = useState<string[]>([]);
  const [genes, setGenes] = useState<string[]>([]);

  /// console.log("Data", heatmapData);

  const memoizedFilters = useCallback(() => {
    if (!heatmapData) return;

    let filteredHeatmapData: ParsedHeatmapData[] = [...heatmapData.geneList];

    if (filter === 'genes_list') {
      filteredHeatmapData = filteredHeatmapData.filter((gene) => {
        if (genes.length === 0) {
          return true;
        }
        return genes.some(
          (accessionId) => accessionId === gene.marker_accession_id
        );
      });
    }

    if (filter === 'calc_percentage' && percentage > 0) {
      const topPercentage = Math.ceil(
        (percentage / 100) * (heatmapData?.geneList.length ?? 0)
      );
      filteredHeatmapData =
        filteredHeatmapData.length > topPercentage
          ? filteredHeatmapData
              .sort((a, b) => b.total_phenotype_terms - a.total_phenotype_terms)
              .slice(0, topPercentage)
          : filteredHeatmapData;
    }

    if (filter === 'phenotype') {
      filteredHeatmapData = filteredHeatmapData
        .map((phen) => {
          if (phenotype.length === 0) {
            return phen;
          }
          return {
            ...phen,
            data: phen.data.filter((p) =>
              phenotype.includes(p.top_level_phenotype_term_id)
            ),
          };
        })
        .filter((phene) => phene.data.length > 0);
    }

    setFormattedheatmapData({
      ...heatmapData,
      geneList: filteredHeatmapData,
    });

    if (page * dataPerPage >= filteredHeatmapData.length) {
      setPage(0);
    }
  }, [heatmapData, genes, phenotype, filter, percentage, page, dataPerPage]);

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataPerPage(Number(e.target.value));
  };

  useEffect(() => {
    memoizedFilters();
  }, [genes, phenotype, filter, percentage, memoizedFilters]);

  useEffect(() => {
    setIsLoading(true);
    fetchGenePhenotypesData().then((data) => {
      const parsedData = parseHeatmapData(data);
      setHeatmapData(parsedData);
      setIsLoading(false);
    });
  }, []);

  const totalHeatMapPages = Math.ceil(
    (formattedheatmapData?.geneList.length ?? 0) / dataPerPage
  );

  const paginatedHeatmapData = useMemo(() => {
    return formattedheatmapData?.geneList.slice(
      page * dataPerPage,
      page * dataPerPage + dataPerPage
    );
  }, [page, formattedheatmapData, dataPerPage]);

  return (
    <div className={styles.main_container}>
      <div className={styles.header}>
        <h1>IMPC Gene-Phenotype Associations Heatmap</h1>
      </div>

      <Filters
        phenotype={phenotype}
        setPhenotype={setPhenotype}
        data={heatmapData}
        percentage={percentage}
        setPercentage={setPercentage}
        page={page}
        setPage={setPage}
        onFilterChange={memoizedFilters}
        genes={genes}
        setGenes={setGenes}
        setFilter={setFilter}
        filter={filter}
      />
      <div className={styles.heatmap_container}>
        {isLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {paginatedHeatmapData && paginatedHeatmapData.length > 0 ? (
          <div className={styles.heatmap_card}>
            <ResponsiveHeatMapCanvas
              key={paginatedHeatmapData.length}
              data={paginatedHeatmapData}
              margin={{ top: 120, right: 90, bottom: 60, left: 90 }}
              valueFormat=">-0.3s"
              xOuterPadding={0.1}
              xInnerPadding={0.1}
              yOuterPadding={0.1}
              yInnerPadding={0.1}
              axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -25,
                legend: 'Phenotype System',
                legendOffset: -110,
                legendPosition: 'middle',
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Gene List',
                legendPosition: 'middle',
                legendOffset: -72,
              }}
              axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Gene List',
                legendPosition: 'middle',
                legendOffset: 70,
              }}
              colors={{
                type: 'sequential',
                scheme: 'blues',
              }}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 8]],
              }}
              emptyColor="#0000"
              borderWidth={2}
              annotations={[]}
            />
          </div>
        ) : (
          <p> No Data Found!</p>
        )}
      </div>

      <div className={styles.pagination}>
        <PaginateHeatmap
          page={page}
          setPage={setPage}
          totalHeatMapPages={totalHeatMapPages}
        />
      </div>

      <div className={styles.dataPerPage}>
        <label htmlFor="dataPerPage"> Showing </label>
        <select
          name="dataPerPage"
          id="dataPerPage"
          value={dataPerPage}
          onChange={handlePageChange}
        >
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
        <label htmlFor="dataPerPage"> columns per page. </label>
      </div>
    </div>
  );
}

export default Heatmap;
