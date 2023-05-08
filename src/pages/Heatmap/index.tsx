/*eslint-disable*/
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ResponsiveHeatMapCanvas } from "@nivo/heatmap";
import { fetchGenePhenotypesData } from "../../api/fetchGenePhenotypesData";
import {parseHeatmapData} from "../../util/parseHeatmapData";

const Heatmap = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [heatmapData, setHeatmapData] = useState<any>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchGenePhenotypesData().then((data) => {
          const parsedData = parseHeatmapData(data);
          setHeatmapData(parsedData);
          setIsLoading(false);
        });
      }, []);


      console.log("Data", heatmapData);





  return (
    <div>Heatmap</div>
  )
}

export default Heatmap;