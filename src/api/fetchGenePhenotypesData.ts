/*eslint-disable*/
import axios from 'axios';

export const fetchGenePhenotypesData = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/mpi2/EBI02126-web-developer/main/gene_phenotypes.json"
    );
    const data = response.data;
    return data;
  };