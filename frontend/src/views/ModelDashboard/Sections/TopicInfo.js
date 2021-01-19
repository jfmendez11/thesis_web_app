import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import BarGraph from "components/Charts/BarChart.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import useDimensions from "react-cool-dimensions";

const getTopicWordCountAndImportance = (modelInfo) => {
  let topicsArray = [];
  for(let topic in modelInfo) {
    let words = Object.keys(modelInfo[topic].words).map((word) => {
      return {
        "Palabras del tópico": word,
        "Cantidad de palabras por tópico dominante": modelInfo[topic].words[word].count,
        "Peso de la palabra en el tópico": modelInfo[topic].words[word].importance
      };
    });
    topicsArray.push(words);
  }
  return topicsArray;
};

const getTopicDocumentCount = (modelInfo) => {
  let countArray = [];
  countArray.push(Object.keys(modelInfo).map((topic) => {
    return {
      "Número de documentos": modelInfo[topic].document_count,
      "Tópico": "Topico " + topic,
    }
  }));
  countArray.push(Object.keys(modelInfo).map((topic) => {
    return {
      "Número de documentos total": modelInfo[topic].weight_count,
      "Tópico": "Topico " + topic,
    }
  }));
  return countArray;
};

const useStyles = makeStyles(styles);

export default function TopicInfo(props) {
  const classes = useStyles();
  const { ref, width, height, } = useDimensions();
  let countDataKeys = ["Número de documentos","Número de documentos total"]
  return (
    <div>
      <GridContainer>
        {(props.loading ? Array.from(new Array(Number(props.topics))) : getTopicWordCountAndImportance(props.modelInfo)).map((data, i) => (
          <GridItem key={`topicinfo-graph1-${i}`} xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger">
                <h3 className={classes.cardTitle}>{`Importancia y cuenta del Tópico ${i}`}</h3>
              </CardHeader>
              <div ref={ref}>
              <CardBody>
                {data ? (
                  <BarGraph
                    shared
                    width={width} 
                    data={data} 
                    xAxisDataKey="Palabras del tópico" 
                    dataKey="Cantidad de palabras por tópico dominante;Peso de la palabra en el tópico"
                    angle={-30}
                  />
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
        <GridContainer>
        {(props.loading ? Array.from(new Array(Number(2))) : getTopicDocumentCount(props.modelInfo)).map((data, i) => (
          <GridItem key={`topicinfo-graph2-${i}`} xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <h3 className={classes.cardTitle}>{`Cuenta por Tópico Dominante`}</h3>
              </CardHeader>
              <CardBody>
                {data ? (
                  <BarGraph
                    width={width}
                    data={data} 
                    xAxisDataKey="Tópico" 
                    dataKey={countDataKeys[i]}
                    angle={-30}
                  />
                ) : (
                  <Skeleton width="100%" height={300} />
                )}
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}