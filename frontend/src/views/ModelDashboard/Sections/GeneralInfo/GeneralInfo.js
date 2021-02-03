import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Stats from "@material-ui/icons/InsertChart";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import BarGraph from "components/Charts/BarChart.js";
import CountByTopic from "./CountByTopic.js";

import useDimensions from "react-cool-dimensions";

import arr from "stats.js"
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const getDistributionOfDocs = (tweets) => {
  let docsDistributionObj = {};
  for(let tweet of tweets) {
    let docLength = tweet.tokenized_text.length;
    if(docsDistributionObj[docLength]) {
      docsDistributionObj[docLength] += 1;
    } else {
      docsDistributionObj[docLength] = 1;
    }
  }
  let docsDistribution = Object.keys(docsDistributionObj).map((docLength) => {
    return {
      "Cantidad de documentos": docsDistributionObj[docLength],
      "Palabras por documento": docLength,
    };
  });
  return docsDistribution
};

export default function GeneralInfo(props) {
  const classes = useStyles();
  const { ref, width, height, } = useDimensions();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader stats icon color="info">
              <CardIcon color="info">
                <Stats />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                Información de los Twits
              </h3>
            </CardHeader>
            <div ref={ref}>
              <CardBody>
                {props.loading ? (
                  <Skeleton width="100%" height={300}/>
                ) : (
                  <BarGraph 
                    width={width} 
                    colors={["#8884d8"]}
                    data={getDistributionOfDocs(props.tweets)} 
                    xAxisDataKey="Palabras por documento"
                    dataKey="Cantidad de documentos"
                  />
                )}
                <h5 style={{textAlign: "center", marginTop: 0}}>Palabras por documento</h5>
              </CardBody>
            </div>
          </Card>
        </GridItem>
      </GridContainer>
      <CountByTopic
        topics={props.topics}
        tweets={props.tweets}
        loading={props.loading}
        colors={props.colors}
      />
    </div>
  );
}