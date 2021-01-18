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
  const [loading, setLoading] = React.useState(false);
  let countDataKeys = ["Número de documentos","Número de documentos total"]
  return (
    <div>
      <GridContainer>
        {loading ? (
          <Skeleton />
        ) : (
          getTopicWordCountAndImportance(props.modelInfo).map((data, i) => (
            <GridItem key={`topicinfo-graph1-${i}`} xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="danger">
                    <GridItem md={12}>
                      <BarGraph
                        shared 
                        data={data} 
                        xAxisDataKey="Palabras del tópico" 
                        dataKey="Cantidad de palabras por tópico dominante;Peso de la palabra en el tópico"
                        angle={-30}
                      />
                    </GridItem>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  <p className={classes.cardCategory}>Last Campaign Performance</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))
        )}
        </GridContainer>
        <GridContainer>
        {loading ? (
          <Skeleton />
        ) : (
          getTopicDocumentCount(props.modelInfo).map((data, i) => (
            <GridItem key={`topicinfo-graph2-${i}`} xs={12} sm={12} md={6}>
              <Card chart>
                <CardHeader color="info">
                    <GridItem>
                      <BarGraph
                        data={data} 
                        xAxisDataKey="Tópico" 
                        dataKey={countDataKeys[i]}
                        angle={-30}
                      />
                    </GridItem>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Completed Tasks</h4>
                  <p className={classes.cardCategory}>Last Campaign Performance</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    campaign sent 2 days ago
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          ))
        )}
      </GridContainer>
    </div>
  );
}