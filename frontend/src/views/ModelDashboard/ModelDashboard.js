import React from "react";
import moment from "moment";
import { TagCloud } from 'react-tagcloud'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Twitter from '@material-ui/icons/Twitter'
import TopicsIcon from "@material-ui/icons/PermDataSetting";
import Info from "@material-ui/icons/InfoOutlined";
import Time from "@material-ui/icons/Schedule";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GeneralInfo from './Sections/GeneralInfo.js';
import TopicInfo from './Sections/TopicInfo.js';
import TimeAnalysis from './Sections/TimeAnalysis.js';
import TweetAnalysis from './Sections/TweetAnalysis.js';

import { executeLDAModel } from "../../API/LDAModelAPI.js"

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

export default function Dashboard(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [tweets, setTweets] = React.useState([]);
  const [modelInfo, setModelInfo] = React.useState({});
  const [dates, setDates] = React.useState({});
  const [colors, setColors] = React.useState({});
  const [pageCount, setPageCount] = React.useState(0);
  React.useEffect(() => {
    setLoading(true);
    executeLDAModel(props.parameters, (data, err) => {
      setLoading(false);
      if(!err && data.success) {
        console.log(data);
        setModelInfo(data.data.model_info);
        setTweets(data.data.tweets);
        setPageCount(Math.ceil(data.data.tweets.length/10));
        getDates(data.data.tweets);
        getColors(data.data.model_info);
      } else if (!err) {
        console.log(data.message);
      } else {
        console.log(err);
      }
    });
  }, []);
  
  const getDates = (tweets) => {
    let datesObj = {};
    for(let tweet of tweets) {
      let date = moment(tweet.created_at.$date).startOf('day').format('DD MMM YYYY');
      let dateObj = datesObj[date];
      if(!dateObj) {
        let informationObject = {};
        informationObject["Tópico " + tweet.dominant_topic] = 1;
        informationObject["Total"] = 1;
        datesObj[date] = informationObject;
      } else {
        let topic = dateObj["Tópico " + tweet.dominant_topic];
        if(topic) {
          dateObj["Tópico " + tweet.dominant_topic] += 1;
        } else {
          dateObj["Tópico " + tweet.dominant_topic] = 1
        }
        dateObj["Total"] += 1;
      }
    }
    setDates(datesObj);
  };

  const getColors = (modelInfo) => {
    let colorsObj = {};
    for(let topic in modelInfo) {
      colorsObj["Tópico " + topic] = modelInfo[topic].color;
    }
    colorsObj["Ninguno"] = "#000";
    setColors(colorsObj);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Twitter />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Twits Analizados</p>
                  <h3 className={classes.cardTitle}>
                    {tweets.length}
                  </h3>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
              {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se analizaron ${tweets.length} twits al ejectar el modelo`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <TopicsIcon />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Tópicos</p>
                  <h3 className={classes.cardTitle}>{props.parameters.topics}</h3>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
            {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se agruparon los twits en ${props.parameters.topics} tópicos`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <DateRange />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Fechas</p>
                  <h5 className={classes.cardTitle}>{props.parameters.start}</h5>-<h5 className={classes.cardTitle}>{props.parameters.end}</h5>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
            {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se analizaron twits de ${props.parameters.start} a ${props.parameters.end}`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Accessibility />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Cuentas</p>
                  <h3 className={classes.cardTitle}>{6}</h3>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
            {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se analizaron los twits de ${25} cuentas`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="info">
            </CardHeader>
            <CardBody>
            {loading ? <Skeleton /> : getWordCloudData(modelInfo).map(((data, i) => (
                <GridItem key={`topic-wordcloud-${i}`} md={12}>
                  <TagCloud
                    minSize={12}
                    maxSize={35}
                    tags={data}
                    onClick={tag => alert(`'${tag.value}' was selected!`)}
                  />
                </GridItem>
              )))}
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Resultados:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Información General",
                tabIcon: Info,
                tabContent: (
                  <GeneralInfo
                    tweets={tweets}
                  />
                )
              },
              {
                tabName: "Tópicos",
                tabIcon: TopicsIcon,
                tabContent: (
                  <TopicInfo
                    modelInfo={modelInfo}
                  />
                )
              },
              {
                tabName: "Análisis Temporal",
                tabIcon: Time,
                tabContent: (
                  <TimeAnalysis
                    tweets={tweets}
                    dates={dates}
                    topics={props.parameters.topics}
                  />
                )
              },
              {
                tabName: "Tweets",
                tabIcon: Twitter,
                tabContent: (
                  <TweetAnalysis
                    tweets={tweets}
                    modelInfo={modelInfo}
                    colors={colors}
                    pageCount={pageCount}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
