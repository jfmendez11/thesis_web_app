import React from "react";
import moment from "moment";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Time from "@material-ui/icons/Schedule";
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

import useDimensions from "react-cool-dimensions";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const getDateCount = (dates) => {
  return Object.keys(dates).sort((a,b) => {
    let dateA = moment(a, "DD MMM YYYY");
    let dateB = moment(b, "DD MMM YYYY")
    return dateA.diff(dateB, 'days');
  }).map((date) => {
    let formattedDateObj = {
      "Fecha": date,
    };
    for(let topic in dates[date]) {
      formattedDateObj[topic] = (dates[date][topic]/dates[date]["Total"]).toFixed(3);
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
      if(topic !== "Total" && topic !== "Cuenta") {
        finalObject[topic] = (accountsObj[account][topic]/accountsObj[account]["Total"]).toFixed(3);
      }
    });
    
    accountsArray.push(finalObject);
  }
  return accountsArray;
};

const useStyles = makeStyles(styles);

export default function StackTimeAnalysis(props) {
  const classes = useStyles();
  const { ref, width, height, } = useDimensions();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card chart>
          <CardHeader stats icon color="info">
            <CardIcon color="info">
              <Time />
            </CardIcon>
            <h3 className={classes.cardTitle}>{`Relevancia del tópico en el tiempo`}</h3>
          </CardHeader>
          <div ref={ref}>
            <CardBody>
            {props.loading ? (
              <Skeleton width="100%" height={300}/>
            ) : (
              <BarGraph
                stack
                brush
                hasInterval
                width={width}
                xAxisHeight={70}
                xAxisDataKey={"Fecha"}
                dataKey="% de relevancia"
                topics={props.topics}
                data={getDateCount(props.dates)}
                angle={-60}
                colors={props.colors}
              />
            )}
            </CardBody>
            <h5 style={{textAlign: "center", marginTop: 0}}>Fecha</h5>
          </div>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card chart>
          <CardHeader stats icon color="info">
            <CardIcon color="info">
              <Time />
            </CardIcon>
            <h3 className={classes.cardTitle}>{`Relevancia del tópico por cuenta`}</h3>
          </CardHeader>
          <CardBody>
          {props.loading ? (
            <Skeleton width="100%" height={300}/>
          ) : (
            <BarGraph
              stack
              width={width}
              xAxisHeight={70}
              xAxisDataKey={"Cuenta"}
              dataKey="% de relevancia"
              topics={props.topics}
              data={getRelevanceByAccount(props.tweets)}
              angle={-60}
              colors={props.colors}
            />
          )}
           <h5 style={{textAlign: "center", marginTop: 0}}>Cuenta</h5>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};