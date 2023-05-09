import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import logo from './assets/IMPC-logo.png';
import Embryo1 from './assets/embryo_image_1.jpeg';
import Embryo2 from './assets/embryo_image_2.jpg';
import Embryo3 from './assets/embryo_image_3.jpeg';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-header">
        <ul className="top-header">
          <img className="header-logo" src={logo} alt="logo" />
          <li>About Us</li>
          <li>Our Research</li>
          <li>Learn More</li>
        </ul>

        <div className="splash-box">
          <div className="content">
            <span className="headline-text">
              Introduction to IMPC Embryo Data
            </span>
            <span className="sub-headline-text">
              <p>
                Up to one third of homozygous knockout lines are lethal, which
                means no homozygous mice or less than expected are observed past
                the weaning stage (IMPC{' '}
                <a href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7">
                  Viability Primary Screen procedure.
                </a>
                ) Early death may occur during embryonic development or soon
                after birth, during the pre-weaning stage. For this reason, the
                IMPC established a{' '}
                <a href="https://www.mousephenotype.org/impress/index">
                  systematic embryonic phenotyping pipeline
                </a>{' '}
                to morphologically evaluate mutant embryos to ascertain the
                primary perturbations that cause early death and thus gain
                insight into gene function.
              </p>

              <p>
                As determined in IMPReSS see interactive diagram{' '}
                <a href="https://www.mousephenotype.org/impress/index">here</a>,
                all embryonic lethal lines undergo gross morphology assessment
                at E12.5 (embryonic day 12.5) to determine whether defects occur
                earlier or later during embryonic development. A comprehensive
                imaging platform is then used to assess dysmorphology. Embryo
                gross morphology, as well as 2D and 3D imaging are actively
                being implemented by the IMPC for lethal lines.
              </p>
              <p>
                Read more in our paper on{' '}
                <a href="https://europepmc.org/article/PMC/5295821">
                  High-throughput discovery of novel developmental phenotypes,
                  Nature 2016.
                </a>
              </p>
            </span>
            <button
              type="button"
              onClick={() => {
                navigate('/heamtmap');
              }}
              className="heatmap-navigation"
              aria-label="Use Heatmap"
            >
              Use Heatmap
            </button>
          </div>

          <img src={Embryo1} alt="An Embryo" className="splash-image" />
        </div>
      </div>

      <div className="information">
        <h3>Accessing Embryo Phenotype Data</h3>
        <p>Embryo phenotype data can be accessed in multiple ways:</p>
        <ul>
          <li>
            <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo_imaging">
              Embryo Images: interactive heatmap
            </a>{' '}
            A compilation of all our Embryo Images, organised by gene and life
            stage, with access to the Interactive Embryo Viewer, where you can
            compare mutants and wild types side by side and rotate 2D and 3D
            images; we also provide access to our external partners embryo
            images.
          </li>
          <li>
            <a href="https://github.com/mpi2/EBI02126-web-developer/blob/main/data/embryo/vignettes">
              Embryo Vignettes
            </a>{' '}
            Showcase of best embryo images with detailed explanations.
          </li>

          <li>
            From the FTP site, latest release All our results. Reports need to
            be filtered by a dedicated column, Life Stage (E9.5, E12.5, E15.5
            and E18.5). Please check the README file or see documentation{' '}
            <a href="https://www.mousephenotype.org/help/non-programmatic-data-access/">
              here.
            </a>
          </li>

          <li>
            Using the REST API (see documentation{' '}
            <a href="https://www.mousephenotype.org/help/programmatic-data-access/">
              here
            </a>
            )
          </li>
        </ul>
        <span className="information-headline">Some Images of Embryos</span>
        <div className="cards">
          <div className="individual-card">
            <img src={Embryo1} alt="An Embryo" />
          </div>

          <div className="individual-card">
            <img src={Embryo2} alt="An Embryo" />
          </div>

          <div className="individual-card">
            <img src={Embryo3} alt="An Embryo" />
          </div>
        </div>
      </div>

      <div className="quote">
        <h3>Determining Lethal Lines</h3>
        <p>
          The IMPC assesses each gene knockout line for viability (Viability
          Primary Screen{' '}
          <a href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7">
            IMPC_VIA_001
          </a>
          ). In this procedure, the proportion of homozygous pups is determined
          soon after birth, during the preweaning stage, in litters produced
          from mating heterozygous animals. A line is declared lethal if no
          homozygous pups for the null allele are detected at weaning age, and
          subviable if pups homozygous for the null allele constitute less than
          12.5% of the litter.
        </p>
        <p>
          Lethal strains are further phenotyped in the{' '}
          <a href="https://www.mousephenotype.org/impress/index">
            embryonic phenotyping pipeline
          </a>
          . For embryonic lethal and subviable strains, heterozygotes are
          phenotyped in the IMPC{' '}
          <a href="https://www.mousephenotype.org/impress/index">
            {' '}
            adult phenotyping pipeline.
          </a>
        </p>
      </div>

      <div className="footer">
        <p>
          Copyright <span>&#169;</span> IMPC All rights reserved
        </p>
      </div>
    </>
  );
}

export default LandingPage;
