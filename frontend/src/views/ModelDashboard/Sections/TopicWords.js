import React from "react";
import { TagCloud } from 'react-tagcloud';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const getWordCloudData = (modelInfo) => {
  let topicsWordCloud = [];
  for(let topic in modelInfo) {
    topicsWordCloud.push(Object.keys(modelInfo[topic].words).map((word) => {
      return {
        value: word,
        count: Math.round(modelInfo[topic].words[word].importance*1000),
        color: modelInfo[topic].color,
      };
    }));
  }
  return topicsWordCloud;
};

const useStyles = makeStyles(styles);

export default function TopicWords(props) {
  const classes = useStyles();
  return (
    <GridContainer>
      {(props.loading ? Array.from(new Array(Number(props.topics))) : getWordCloudData(props.modelInfo)).map((data, i) => (
        <GridItem key={`topic-wordcloud-${i}`} xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="info">
              <h3 className={classes.cardTitle}>{`Tópico ${i}`}</h3>
            </CardHeader>
            <CardBody>
              {!data ? (
                <Skeleton width="100%" height={200}/>
              ) : (
                <GridItem key={`topic-wordcloud-loading-${i}`} md={12}>
                  <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={data}
                    onClick={tag => alert(`'${tag.value}' was selected!`)}
                  />
                </GridItem>
              )}
            </CardBody>
          </Card>
        </GridItem>
      )
      )}
    </GridContainer>
  );
};
