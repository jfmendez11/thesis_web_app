import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core
import Stats from "@material-ui/icons/InsertChart";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import BarGraph from "components/Charts/BarChart.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
            <CardHeader stats icon color="info">
              <CardIcon color="info">
                <Stats />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {"Información del Tópico " + i}
              </h3>
            </CardHeader>
            <div ref={ref}>
              <CardBody>
                {data ? (
                  <BarGraph 
                    width={width} 
                    colors={["#8884d8"]} 
                    data={data}
                    xAxisDataKey="Palabras por documento" 
                    dataKey="Cantidad de documentos"/>
                ) : (
                  <Skeleton width="100%" height={300} />
                )}
                <h5 style={{textAlign: "center", marginTop: 0}}>Palabras por documento</h5>
              </CardBody>
            </div>
          </Card>
        </GridItem>
      ))}
    </GridContainer>
  );
}