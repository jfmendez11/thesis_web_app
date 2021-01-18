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
import ComposedGraph from "components/Charts/ComposedChart.js";


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

export default function GeneralInfo(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="success">
              <BarGraph data={getDistributionOfDocs(props.tweets)} xAxisDataKey="Palabras por documento" dataKey="Cantidad de documentos"/>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {loading ? (
          <Skeleton />
        ) : (
          getDocumentWordCountByTopics(props.tweets).map((data, i) =>(
            (
              <GridItem key={`generalinfo-graph1-${i}`} xs={12} sm={12} md={6}>
                <Card chart>
                  <CardHeader color="warning">
                    <GridContainer>
                      <GridItem md={12}>
                        <ComposedGraph data={data} xAxisDataKey="Palabras por documento" dataKey="Cantidad de documentos"/>
                      </GridItem>
                    </GridContainer>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                    <p className={classes.cardCategory}>Last Campaign Performance</p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      campaign sent 2 days ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            )
          ))
        )}
      </GridContainer>
    </div>
  );
}