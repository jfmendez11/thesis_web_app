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
import LineGraph from "components/Charts/LineChart.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const getDateCount = (dates, percentage) => {
  return Object.keys(dates).reverse().map((date) => {
    let formattedDateObj = {
      "Fecha": date,
    };
    for(let topic in dates[date]) {
      formattedDateObj[topic] = percentage ? dates[date][topic]/dates[date]["Total"] : dates[date][topic];
    }
    return formattedDateObj;
  });
};

const getRelevanceByAccount = (tweets) => {
  let accountsObj = {};
  for(let tweet of tweets) {
    let accountInfo = accountsObj[tweet.screen_name];
    if(accountInfo) {
      let topicInfo = accountInfo["Tópico " + tweet.dominant_topic];
      if(topicInfo) {
        accountsObj[tweet.screen_name]["Tópico " + tweet.dominant_topic] += 1;
      } else {
        accountsObj[tweet.screen_name]["Tópico " + tweet.dominant_topic] = 1;
      }
      accountsObj[tweet.screen_name]["Total"] += 1;
    } else {
      let topicInfo = {
        "Cuenta": tweet.screen_name,
      };
      topicInfo[`Tópico ${tweet.dominant_topic}`] = 1;
      accountsObj[tweet.screen_name] = topicInfo;
      accountsObj[tweet.screen_name]["Total"] = 1;
    }
  }
  let accountsArray = [];
  for(let account in accountsObj) {
    let finalObject = {};
    finalObject["Cuenta"] = account;
    Object.keys(accountsObj[account]).forEach(topic => {
      if(topic !== "Total") {
        finalObject[topic] = accountsObj[account][topic]/accountsObj[account]["Total"];
      }
    });
    accountsArray.push(finalObject);
  }
  return accountsArray;
};

const useStyles = makeStyles(styles);

export default function TimeAnalysis(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <GridContainer>
        {loading ? (
          <Skeleton />
        ) : (
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="info">
                <GridItem md={12}>
                  <LineGraph
                    topics={props.topics}
                    data={getDateCount(props.dates, false).slice(1,5)}
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
        )}
      </GridContainer>
      <GridContainer>
        {loading ? (
          <Skeleton />
        ) : (
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <GridItem md={12}>
                  <BarGraph
                    stack
                    xAxisDataKey={"Fecha"}
                    dataKey="% de relevancia"
                    topics={props.topics}
                    data={getDateCount(props.dates, true).slice(1,5)}
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
        )}
      {/*</GridContainer>
      <GridContainer>*/}
        {loading ? (
          <Skeleton />
        ) : (
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <GridItem md={12}>
                  <BarGraph
                    stack
                    xAxisDataKey={"Cuenta"}
                    dataKey="% de relevancia"
                    topics={props.topics}
                    data={getRelevanceByAccount(props.tweets)}
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
        )}
      </GridContainer>
    </div>
  );
}