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

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import useDimensions from "react-cool-dimensions";

const getTopicWordCountAndImportance = (modelInfo) => {
  let topicsArray = [];
  for(let topic in modelInfo) {
    let words = Object.keys(modelInfo[topic].words).map((word) => {
      return {
        "Palabras del tópico": word,
        "Frecuencia por tópico dominante": modelInfo[topic].words[word].count,
        "Peso de la palabra en el tópico": modelInfo[topic].words[word].importance.toFixed(3),
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
              <CardHeader stats icon color="info">
                <CardIcon color="info">
                  <Stats />
                </CardIcon>
                <h3 className={classes.cardTitle}>
                 {`Importancia y conteo del Tópico ${i}`}
                </h3>
              </CardHeader>
              <div ref={ref}>
              <CardBody>
                {data ? (
                  <BarGraph
                    shared
                    width={width} 
                    data={data} 
                    xAxisHeight={100}
                    colors={[props.colors["Tópico " + i], props.colors["Tópico " + i]]}
                    xAxisDataKey="Palabras del tópico" 
                    dataKey="Frecuencia por tópico dominante;Peso de la palabra en el tópico"
                    angle={-30}
                  />
                ) : (
                  <Skeleton width="100%" height={300} />
                )}
                <h5 style={{textAlign: "center", marginTop: 0}}>Palabras del tópico</h5>
              </CardBody>
              </div>
            </Card>
          </GridItem>
        ))}
        </GridContainer>
        <GridContainer>
        {(props.loading ? Array.from(new Array(Number(2))) : getTopicDocumentCount(props.modelInfo)).map((data, i) => (
          <GridItem key={`topicinfo-graph2-${i}`} xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader stats icon color="info">
                <CardIcon color="info">
                  <Stats />
                </CardIcon>
                <h3 className={classes.cardTitle}>
                 {`Conteo por dominancia del tópico ${i}`}
                </h3>
              </CardHeader>
              <CardBody>
                {data ? (
                  <BarGraph
                    width={width}
                    data={data}
                    colors={i%2 === 0 ? ["#8884d8"] : ["#82ca9d"]}
                    xAxisDataKey="Tópico" 
                    dataKey={countDataKeys[i]}
                    angle={-30}
                  />
                ) : (
                  <Skeleton width="100%" height={300} />
                )}
                <h5 style={{textAlign: "center", marginTop: 0}}>Tópico</h5>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}