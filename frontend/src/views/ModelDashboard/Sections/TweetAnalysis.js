import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Twitter from "@material-ui/icons/Twitter";
import Favorite from "@material-ui/icons/Favorite";
import Retweets from "@material-ui/icons/Loop";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PieGraph from "components/Charts/PieChart.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const getTweetTopicPercentage = (topics) => {
  let total = 0;
  let dataArray = [];
  for(let topic in topics) {
    total += topics[topic];
    let topicPercentje = {
      name: "Tópico " + topic,
      value: topics[topic],
    };
    dataArray.push(topicPercentje);
  }
  if(1 - total > 0) {
    dataArray.push({
      name: "Ninguno",
      value: 1 - total,
    });
  }
  return dataArray;
}

const useStyles = makeStyles(styles);

export default function TweetAnalysis(props) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = React.useState(0);
  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader stats icon color="info">
              <CardIcon color="info">
                <Twitter />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                Acerca de los Twits
              </h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem md={4}>
                  <h5>Tokens Lematizados</h5>
                </GridItem>
                <GridItem md={4}>
                  <h5>Tuit</h5>
                </GridItem>
                <GridItem md={4}>
                  <h5>Distribución de Tópicos</h5>
                </GridItem>
              </GridContainer>
            {props.loading ? <Skeleton /> : props.tweets.slice(currentPage*10,(currentPage+1)*10).map(((tweet, i) => (
              <GridContainer key={tweet.tweet_id}>
                  <GridItem md={4}>
                    {Object.keys(tweet.text_topic).map(text => {
                      return (<span key={tweet._id.$oid + text + i} style={{color: props.modelInfo[tweet.text_topic[text]].color}}>{text + " "}</span>);
                    })}
                  </GridItem>
                  <GridItem md={4}>
                    <Card>
                      <CardBody>
                        <p>{tweet.text}</p>
                      </CardBody>
                      <CardFooter chart>
                        <div className={classes.stats}>
                          <Favorite /> {tweet.favorite_count}
                          <Retweets /> {tweet.retweet_count}
                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem md={4}>
                    <PieGraph
                      data={getTweetTopicPercentage(tweet.topics)}
                      colors={props.colors}
                    />
                  </GridItem>
                </GridContainer>
              )))}
            </CardBody>
            <CardFooter chart>
              <Pagination 
                count={props.pageCount} 
                page={currentPage + 1} 
                variant="outlined" 
                showFirstButton 
                showLastButton
                onChange={handlePageChange}
              />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}