import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import ComposedGraph from "components/Charts/ComposedChart.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import useDimensions from "react-cool-dimensions";

const useStyles = makeStyles(styles);

const getDocumentWordCountByTopics = (tweets) => {
  let topicsArray = [];
  for(let tweet of tweets) {
    let topicObj = topicsArray[tweet.dominant_topic];
    let docLength = tweet.tokenized_text.length;
    if(topicObj) {
      if(topicObj[docLength]) {
        topicObj[docLength] += 1;
      } else {
        topicObj[docLength] = 1;
      }
    } else {
      let topicObj = {};
      topicObj[docLength] = 1;
      topicsArray[tweet.dominant_topic] = topicObj;
    }
  }
  for(let i = 0; i < topicsArray.length; i++) {
    topicsArray[i] = Object.keys(topicsArray[i]).map((docLength) => {
      return {
        "Cantidad de documentos": topicsArray[i][docLength],
        "Palabras por documento": docLength,
      };
    });
  }
  return topicsArray;
};

export default function CountByTopic(props) {
  const classes = useStyles();
  const { ref, width, height, } = useDimensions();
  return (
    <GridContainer>
      {(props.loading ? Array.from(new Array(Number(props.topics))) : getDocumentWordCountByTopics(props.tweets)).map((data, i) => (
        <GridItem key={`generalinfo-graph1-${i}`} xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <h3 className={classes.cardTitle}>{`Cuenta por Tópico Dominante - Tópico ${i}`}</h3>
            </CardHeader>
            <div ref={ref}>
              <CardBody>
                {data ? (
                  <ComposedGraph width={width} data={data} xAxisDataKey="Palabras por documento" dataKey="Cantidad de documentos"/>
                ) : (
                  <Skeleton width="100%" height={300} />
                )}
              </CardBody>
            </div>
            <CardFooter chart>
              <div className={classes.stats}>
                campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </GridContainer>
  );
}