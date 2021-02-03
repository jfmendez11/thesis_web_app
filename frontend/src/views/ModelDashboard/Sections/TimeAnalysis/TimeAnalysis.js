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
import LineGraph from "components/Charts/LineChart.js";
import StackTimeAnalysis from "./StackTimeAnalysis.js";

import useDimensions from "react-cool-dimensions";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const getDateCount = (dates, percentage) => {
  return Object.keys(dates).sort((a,b) => {
    let dateA = moment(a, "DD MMM YYYY");
    let dateB = moment(b, "DD MMM YYYY")
    return dateA.diff(dateB, 'days');
  }).map((date) => {
    let formattedDateObj = {
      "Fecha": date,
    };
    for(let topic in dates[date]) {
      formattedDateObj[topic] = percentage ? dates[date][topic]/dates[date]["Total"] : dates[date][topic];
    }
    return formattedDateObj;
  });
};

const useStyles = makeStyles(styles);

export default function TimeAnalysis(props) {
  const classes = useStyles();
  const { ref, width, height, } = useDimensions();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader stats icon color="info">
              <CardIcon color="info">
                <Time />
              </CardIcon>
              <h3 className={classes.cardTitle}>{`Evolución de los tópicos en el tiempo`}</h3>
            </CardHeader>
            <div ref={ref}>
            <CardBody>
              {props.loading ? (
                <Skeleton width="100%" height={300}/>
              ) : (
                <LineGraph
                  width={width}
                  topics={props.topics}
                  data={getDateCount(props.dates, false)}
                  colors={props.colors}
                />
              )}
            </CardBody>
            </div>
          </Card>
        </GridItem>
      </GridContainer>
      <StackTimeAnalysis
        tweets={props.tweets}
        dates={props.dates}
        loading={props.loading}
        topics={props.topics}
        colors={props.colors}
      />
    </div>
  );
}