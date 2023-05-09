import axios from 'axios';

const fetchGenePhenotypesData = async () => {
  const { data } = await axios.get(
    'https://raw.githubusercontent.com/mpi2/EBI02126-web-developer/main/gene_phenotypes.json'
  );
  return data;
};

export default fetchGenePhenotypesData;
